-- Gooday: storage policies para posts/stories (fotos)
-- Aplicado via MCP: gooday_story_images_storage_policies
-- Padrão de path (compatível com RLS existente de post-images):
--   {userId}/{entityId}/{fileName}

update storage.buckets
set
  public = true,
  file_size_limit = 10485760,
  allowed_mime_types = array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
where id in ('post-images', 'story-images');

drop policy if exists "Public read story-images" on storage.objects;
create policy "Public read story-images"
on storage.objects for select
to public
using (bucket_id = 'story-images');

drop policy if exists "Authenticated users can upload to story-images" on storage.objects;
create policy "Authenticated users can upload to story-images"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'story-images'
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "Authenticated users can update own story-images" on storage.objects;
create policy "Authenticated users can update own story-images"
on storage.objects for update
to authenticated
using (
  bucket_id = 'story-images'
  and (storage.foldername(name))[1] = auth.uid()::text
)
with check (
  bucket_id = 'story-images'
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "Authenticated users can delete own story-images" on storage.objects;
create policy "Authenticated users can delete own story-images"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'story-images'
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "Public read post-images" on storage.objects;
create policy "Public read post-images"
on storage.objects for select
to public
using (bucket_id = 'post-images');
