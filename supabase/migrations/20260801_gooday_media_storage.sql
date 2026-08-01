-- Gooday: storage e políticas para posts/stories (fotos)
-- NÃO executar automaticamente em projetos compartilhados sem revisar.
-- Buckets já existentes no Supabase ligado: post-images, story-images, stories.

-- Garante buckets públicos de imagem (idempotente)
insert into storage.buckets (id, name, public)
values
  ('post-images', 'post-images', true),
  ('story-images', 'story-images', true)
on conflict (id) do update set public = excluded.public;

-- Paths esperados pelo app:
--   posts/{userId}/{postId}/{fileName}
--   stories/{userId}/{storyId}/{fileName}

-- Leitura pública das imagens
drop policy if exists "gooday_post_images_public_read" on storage.objects;
create policy "gooday_post_images_public_read"
on storage.objects for select
to public
using (bucket_id = 'post-images');

drop policy if exists "gooday_story_images_public_read" on storage.objects;
create policy "gooday_story_images_public_read"
on storage.objects for select
to public
using (bucket_id = 'story-images');

-- Upload autenticado apenas no próprio diretório
drop policy if exists "gooday_post_images_auth_insert" on storage.objects;
create policy "gooday_post_images_auth_insert"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'post-images'
  and (storage.foldername(name))[1] = 'posts'
  and (storage.foldername(name))[2] = auth.uid()::text
);

drop policy if exists "gooday_story_images_auth_insert" on storage.objects;
create policy "gooday_story_images_auth_insert"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'story-images'
  and (storage.foldername(name))[1] = 'stories'
  and (storage.foldername(name))[2] = auth.uid()::text
);

-- Remoção/atualização apenas dos próprios arquivos
drop policy if exists "gooday_post_images_auth_delete" on storage.objects;
create policy "gooday_post_images_auth_delete"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'post-images'
  and (storage.foldername(name))[2] = auth.uid()::text
);

drop policy if exists "gooday_story_images_auth_delete" on storage.objects;
create policy "gooday_story_images_auth_delete"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'story-images'
  and (storage.foldername(name))[2] = auth.uid()::text
);

-- Stories: garantir expires_at em 24h na aplicação (created_at + interval '24 hours').
-- A tabela public.stories já possui: id, user_id, media_url, media_type, caption, visibility, expires_at, created_at.
