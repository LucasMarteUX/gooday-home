import type { GoodayHomeViewModel } from "@/lib/gooday/useGoodayHome";
import { ScrollFadeRow } from "./StickySidebarColumn";
type Props = {
  vm: GoodayHomeViewModel;
};

export function OverlayScreens({ vm }: Props) {
  if (!vm.view) return null;

  return (
    <div className="fixed inset-0 z-[60] animate-[gd-slide_240ms_cubic-bezier(0.2,0,0,1)] overflow-y-auto overscroll-contain bg-gd-bg">
      <header className="sticky top-0 z-[5] flex items-center gap-3 border-b border-[color:var(--gd-hairline)] bg-[color:var(--gd-header-mobile)] px-4 pb-3 pt-[max(12px,env(safe-area-inset-top))] backdrop-blur-2xl min-[800px]:bg-[color:var(--gd-header-desktop)]">
        <button
          type="button"
          onClick={vm.back}
          aria-label="Voltar"
          className="grid h-11 w-11 place-items-center rounded-xl text-gd-text-secondary transition-colors hover:bg-gd-hover"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 5l-7 7 7 7" />
          </svg>
        </button>
        <h1 className="m-0 flex-1 text-base font-semibold tracking-[-0.01em]">{vm.viewTitle}</h1>
        {vm.viewChat && vm.chat ? (
          <button type="button" onClick={vm.chat.openProfile} className="flex items-center gap-2.5">
            <img src={vm.chat.av} alt="" className="h-9 w-9 rounded-full object-cover" />
            <span className="text-left">
              <span className="block text-[15px] font-semibold">{vm.chat.name}</span>
              <span className="block text-xs text-gd-success">{vm.chat.status}</span>
            </span>
          </button>
        ) : null}
      </header>

      <div className="mx-auto max-w-[640px] px-4 pb-[calc(32px+env(safe-area-inset-bottom))] pt-4">
        {vm.viewSearch ? <SearchScreen vm={vm} /> : null}
        {vm.viewPerson && vm.person ? <PersonScreen vm={vm} /> : null}
        {vm.viewGroup && vm.group ? <GroupScreen vm={vm} /> : null}
        {vm.viewPost && vm.postView ? <PostScreen vm={vm} /> : null}
        {vm.viewMessages ? <MessagesScreen vm={vm} /> : null}
        {vm.viewChat && vm.chat ? <ChatScreen vm={vm} /> : null}
        {vm.viewProfile ? <ProfileScreen vm={vm} /> : null}
        {vm.viewEdit ? <EditProfileScreen vm={vm} /> : null}
        {vm.viewMembers ? <MembersScreen vm={vm} /> : null}
        {vm.viewFollows ? <FollowsScreen vm={vm} /> : null}
        {vm.viewGroups ? <GroupsScreen vm={vm} /> : null}
        {vm.viewSettings ? <SettingsScreen vm={vm} /> : null}
        {vm.viewChangeEmail ? <ChangeEmailScreen vm={vm} /> : null}
        {vm.viewChangePassword ? <ChangePasswordScreen vm={vm} /> : null}
      </div>
    </div>
  );
}

function SearchScreen({ vm }: Props) {
  return (
    <>
      <div className="flex h-12 items-center gap-2.5 rounded-full border border-gd-border bg-gd-surface px-3.5">
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.2-3.2" />
        </svg>
        <input
          value={vm.searchQ}
          onChange={vm.onSearch}
          placeholder="Pessoas, grupos e interesses"
          aria-label="Buscar"
          className="h-11 flex-1 border-none bg-transparent text-[15px] text-gd-text outline-none placeholder:text-gd-text-subtle"
        />
        {vm.searchHasQuery ? (
          <button
            type="button"
            onClick={vm.clearSearch}
            aria-label="Limpar"
            className="grid h-7 w-7 place-items-center rounded-full bg-gd-border text-[13px] text-gd-text-secondary"
          >
            ×
          </button>
        ) : null}
      </div>

      {vm.searchEmpty ? (
        <div className="px-2 py-10 text-center">
          <p className="m-0 mb-2 text-[17px] font-semibold">Nenhum resultado encontrado</p>
          <p className="m-0 text-sm leading-normal text-gd-text-subtle">
            Tente pesquisar por outro nome, interesse ou comunidade.
          </p>
        </div>
      ) : null}

      <div className="mt-4 flex flex-wrap gap-2">
        {vm.recentSearches.map((r, i) => (
          <button
            key={i}
            type="button"
            onClick={r.go}
            className="h-[30px] rounded-full border border-gd-border bg-gd-card px-3 text-[13px] text-gd-text-secondary"
          >
            {r.label}
          </button>
        ))}
      </div>

      {vm.hasSearchPeople ? (
        <>
          <h2 className="mb-2 mt-6 text-[13px] font-semibold uppercase tracking-[0.04em] text-gd-text-subtle">
            Pessoas
          </h2>
          <div className="flex flex-col">
            {vm.searchPeople.map((p, i) => (
              <button key={i} type="button" onClick={p.open} className="flex items-center gap-3 py-2.5 text-left">
                <img src={p.av} alt="" className="h-11 w-11 flex-none rounded-full object-cover" />
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold">{p.name}</span>
                  <span className="block text-[13px] text-gd-text-subtle">
                    {p.handle} · {p.context}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </>
      ) : null}

      {vm.hasSearchGroups ? (
        <>
          <h2 className="mb-2 mt-6 text-[13px] font-semibold uppercase tracking-[0.04em] text-gd-text-subtle">
            Grupos
          </h2>
          <div className="flex flex-col">
            {vm.searchGroups.map((g, i) => (
              <button key={i} type="button" onClick={g.open} className="flex items-center gap-3 py-2.5 text-left">
                <img src={g.img} alt="" className="h-[52px] w-[52px] flex-none rounded-[14px] object-cover" />
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold">{g.name}</span>
                  <span className="block text-[13px] text-gd-text-subtle">{g.meta}</span>
                </span>
              </button>
            ))}
          </div>
        </>
      ) : null}
    </>
  );
}

function PersonScreen({ vm }: Props) {
  const person = vm.person!;
  return (
    <>
      <div className="h-[120px] overflow-hidden rounded-[18px] bg-gd-elevated">
        <img src={person.cover} alt="" className="block h-full w-full object-cover" />
      </div>
      <img
        src={person.av}
        alt=""
        className="relative -mt-11 ml-1 block h-[88px] w-[88px] rounded-full border-[3px] border-gd-bg object-cover"
      />
      <h2 className="mb-0.5 mt-3 text-xl font-bold tracking-[-0.02em]">{person.name}</h2>
      <p className="m-0 text-sm text-gd-text-subtle">
        {person.handle} · {person.loc}
      </p>
      <p className="mt-2.5 text-sm leading-[1.55] text-gd-text-secondary">{person.bio}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {person.interests.map((i, idx) => (
          <span
            key={idx}
            className="inline-flex h-7 items-center rounded-full border border-gd-brand bg-gd-brand/20 px-3 text-xs text-gd-text"
          >
            {i.label}
          </span>
        ))}
      </div>
      <div className="mt-4 flex gap-5">
        <button type="button" onClick={person.openFollows} className="text-left">
          <span className="block text-base font-bold">{person.followers}</span>
          <span className="block text-[13px] text-gd-text-subtle">seguidores</span>
        </button>
        <button type="button" onClick={person.openFollows} className="text-left">
          <span className="block text-base font-bold">{person.following}</span>
          <span className="block text-[13px] text-gd-text-subtle">seguindo</span>
        </button>
        <span className="text-left">
          <span className="block text-base font-bold">{person.posts}</span>
          <span className="block text-[13px] text-gd-text-subtle">publicações</span>
        </span>
      </div>
      <div className="mt-4 flex gap-2.5">
        <button
          type="button"
          onClick={person.toggleFollow}
          className="h-12 flex-1 rounded-[14px] text-sm font-semibold text-gd-on-brand"
          style={{ background: person.followBg }}
        >
          {person.following_state}
        </button>
        <button
          type="button"
          onClick={person.message}
          className="h-12 flex-1 rounded-[14px] border border-gd-border-strong bg-gd-border text-sm font-semibold text-gd-text-secondary"
        >
          Mensagem
        </button>
      </div>
      <h3 className="mb-2.5 mt-7 text-[13px] font-semibold uppercase tracking-[0.04em] text-gd-text-subtle">
        Publicações
      </h3>
      {vm.hasPersonPosts ? (
        <div className="grid grid-cols-3 gap-1.5">
          {vm.personPosts.map((pp, i) => (
            <img key={i} src={pp.img} alt={pp.alt} className="block aspect-square w-full rounded-[10px] object-cover" />
          ))}
        </div>
      ) : null}
      {vm.personNoPosts ? (
        <div className="rounded-2xl bg-gd-elevated px-5 py-7 text-center">
          <p className="m-0 mb-1.5 text-[15px] font-semibold">Nada publicado por aqui ainda</p>
          <p className="m-0 text-[13px] leading-normal text-gd-text-subtle">
            Quando {person.name} publicar, as fotos aparecem nesta aba.
          </p>
        </div>
      ) : null}
    </>
  );
}

function GroupScreen({ vm }: Props) {
  const group = vm.group!;
  return (
    <>
      <div className="h-40 overflow-hidden rounded-[18px] bg-gd-elevated">
        <img src={group.img} alt={group.name} className="block h-full w-full object-cover" />
      </div>
      <h2 className="mb-1 mt-3.5 text-[21px] font-bold leading-[1.2] tracking-[-0.02em]">{group.name}</h2>
      <p className="m-0 text-sm text-gd-text-subtle">
        {group.status} · {group.groups} · {group.members}
      </p>
      <p className="mt-2.5 text-sm leading-[1.55] text-gd-text-secondary">{group.desc}</p>
      <button type="button" onClick={group.openMembers} className="mt-3.5 flex items-center gap-2.5">
        <span className="flex">
          {group.avatars.map((a, i) => (
            <img
              key={i}
              src={a.src}
              alt=""
              className="-mr-2 h-[30px] w-[30px] rounded-full border-2 border-gd-bg object-cover"
            />
          ))}
        </span>
        <span className="ml-2.5 text-sm font-medium text-gd-brand-soft">Ver membros</span>
      </button>
      <button
        type="button"
        onClick={group.join}
        className="mt-4 h-12 w-full rounded-[14px] text-sm font-semibold text-gd-on-brand"
        style={{ background: group.joinBg }}
      >
        {group.joinLabel}
      </button>
      <h3 className="mb-3 mt-7 text-[13px] font-semibold uppercase tracking-[0.04em] text-gd-text-subtle">
        Feed do grupo
      </h3>
      <div className="flex flex-col gap-3.5">
        {vm.groupPosts.map((gp, i) => (
          <article key={i} className="rounded-[20px] bg-gd-card p-3.5">
            <header className="flex items-center gap-2.5">
              <img src={gp.av} alt="" className="h-10 w-10 rounded-full object-cover" />
              <span>
                <span className="block text-sm font-semibold">{gp.handle}</span>
                <span className="block text-xs text-gd-text-subtle">{gp.time}</span>
              </span>
            </header>
            <p className="mt-2.5 text-sm leading-[1.55] text-gd-text-secondary">{gp.text}</p>
            <img src={gp.img} alt={gp.alt} className="mt-3 block aspect-[4/3] w-full rounded-[14px] object-cover" />
            <p className="mt-2.5 text-[13px] text-gd-text-subtle">
              {gp.likes} curtidas · {gp.comments} comentários
            </p>
          </article>
        ))}
      </div>
    </>
  );
}

function PostScreen({ vm }: Props) {
  const post = vm.postView!;
  return (
    <>
      <article className="rounded-[20px] bg-gd-card p-4">
        <header className="flex items-center gap-3">
          <img src={post.av} alt="" className="h-[46px] w-[46px] rounded-full object-cover" />
          <span>
            <span className="block text-[15px] font-semibold">{post.handle}</span>
            <span className="block text-[13px] text-gd-text-subtle">{post.time}</span>
          </span>
        </header>
        <p className="mt-3.5 text-[15px] leading-[1.55] text-gd-text-secondary">{post.text}</p>
        {post.hasImg ? (
          <img src={post.img} alt={post.alt} className="mt-3.5 block aspect-[4/3] w-full rounded-2xl object-cover" />
        ) : null}
        <div className="mt-3.5 flex items-center gap-4 border-t border-gd-elevated pt-3">
          <button
            type="button"
            onClick={post.toggleLike}
            className="flex items-center gap-2 text-sm font-medium"
            style={{ color: post.likeColor }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
              <path d="M12 20s-7.2-4.4-9-9a4.8 4.8 0 019-2.6A4.8 4.8 0 0121 11c-1.8 4.6-9 9-9 9z" />
            </svg>
            {post.likes}
          </button>
          <button type="button" onClick={post.openComments} className="text-sm font-medium text-gd-text-muted">
            {post.comments} comentários
          </button>
        </div>
      </article>
      <div className="mt-4 flex flex-col">
        {post.thread.map((c) => (
          <div key={c.key} className="flex gap-3 py-2.5">
            <img src={c.av} alt="" className="h-10 w-10 flex-none rounded-full object-cover" />
            <span>
              <span className="block text-sm font-semibold">{c.name}</span>
              <span className="mt-[3px] block text-[15px] leading-normal text-gd-text-secondary">{c.text}</span>
              <span className="mt-0.5 block text-[13px] text-gd-text-subtle">{c.time} · Curtir · Responder</span>
            </span>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={post.openComments}
        className="mt-3 h-12 w-full rounded-[14px] bg-gd-elevated text-sm font-semibold text-gd-text-secondary"
      >
        Escrever comentário
      </button>
    </>
  );
}

function MessagesScreen({ vm }: Props) {
  return (
    <div className="flex flex-col">
      {vm.conversations.map((c, i) => (
        <button key={i} type="button" onClick={c.open} className="flex items-center gap-3 border-b border-gd-surface py-3 text-left">
          <span className="relative flex-none">
            <img src={c.av} alt="" className="block h-[52px] w-[52px] rounded-full object-cover" />
            <span
              className="absolute bottom-0.5 right-0 h-3 w-3 rounded-full border-2 border-gd-bg"
              style={{ background: c.dot }}
            />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-semibold">{c.name}</span>
            <span className="block truncate text-[13px] text-gd-text-subtle">{c.last}</span>
          </span>
          <span className="flex-none text-right">
            <span className="block text-xs text-gd-text-subtle">{c.time}</span>
            {c.unread ? (
              <span className="mt-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-gd-brand px-1.5 text-[11px] font-semibold text-gd-on-brand">
                {c.unreadCount}
              </span>
            ) : null}
          </span>
        </button>
      ))}
    </div>
  );
}

function ChatScreen({ vm }: Props) {
  const chat = vm.chat!;
  return (
    <>
      <div className="flex flex-col gap-2.5 pb-20">
        {chat.msgs.map((m) => (
          <div key={m.key} className="flex" style={{ justifyContent: m.align }}>
            <span
              className="max-w-[78%] rounded-[18px] px-3.5 py-[11px] text-sm leading-normal"
              style={{ background: m.bg, color: m.color }}
            >
              {m.text}
              <span className="mt-1 block text-[11px] opacity-65">{m.time}</span>
            </span>
          </div>
        ))}
      </div>
      <div className="fixed inset-x-0 bottom-0 border-t border-[color:var(--gd-hairline)] bg-[color:var(--gd-overlay)] px-4 py-3 pb-[calc(12px+env(safe-area-inset-bottom))] backdrop-blur-2xl">
        <div className="mx-auto flex max-w-[640px] items-center gap-2.5">
          <input
            value={chat.draft}
            onChange={chat.onDraft}
            onKeyDown={chat.onKey}
            placeholder="Escreva uma mensagem…"
            aria-label="Mensagem"
            className="h-12 flex-1 rounded-full border border-gd-border-strong bg-gd-elevated px-4 text-[15px] text-gd-text outline-none placeholder:text-gd-text-subtle"
          />
          <button
            type="button"
            onClick={chat.send}
            aria-label="Enviar"
            className="grid h-12 w-12 place-items-center rounded-full bg-gd-brand"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className="text-gd-on-brand">
              <path d="M4 12l16-8-6 16-3-6z" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}

function ProfileScreen({ vm }: Props) {
  return (
    <>
      <div className="h-[120px] overflow-hidden rounded-[18px] bg-gd-elevated">
        <img src={vm.profile.cover} alt="" className="block h-full w-full object-cover" />
      </div>
      <img
        src={vm.profile.av}
        alt=""
        className="relative -mt-11 ml-1 block h-[88px] w-[88px] rounded-full border-[3px] border-gd-bg object-cover"
      />
      <h2 className="mb-0.5 mt-3 text-xl font-bold tracking-[-0.02em]">{vm.profile.name}</h2>
      <p className="m-0 text-sm text-gd-text-subtle">
        {vm.profile.handle} · {vm.profile.loc}
      </p>
      <p className="mt-2.5 text-sm leading-[1.55] text-gd-text-secondary">{vm.profile.bio}</p>
      <div className="mt-4 flex gap-5">
        <button type="button" onClick={vm.profile.openFollows} className="text-left">
          <span className="block text-base font-bold">{vm.profile.followers}</span>
          <span className="block text-[13px] text-gd-text-subtle">seguidores</span>
        </button>
        <button type="button" onClick={vm.profile.openFollows} className="text-left">
          <span className="block text-base font-bold">{vm.profile.following}</span>
          <span className="block text-[13px] text-gd-text-subtle">seguindo</span>
        </button>
        <span>
          <span className="block text-base font-bold">{vm.profile.posts}</span>
          <span className="block text-[13px] text-gd-text-subtle">publicações</span>
        </span>
      </div>
      <div className="mt-4 flex gap-2.5">
        <button
          type="button"
          onClick={vm.profile.editProfile}
          className="h-12 flex-1 rounded-[14px] bg-gd-brand text-sm font-semibold text-gd-on-brand"
        >
          Editar perfil
        </button>
        <button
          type="button"
          onClick={vm.profile.openGroups}
          className="h-12 flex-1 rounded-[14px] border border-gd-border-strong bg-gd-border text-sm font-semibold text-gd-text-secondary"
        >
          Meus grupos
        </button>
      </div>
      <div className="mt-6 flex gap-4 border-b border-gd-elevated">
        {vm.profileTabs.map((t, i) => (
          <button
            key={i}
            type="button"
            onClick={t.go}
            className="h-10 px-0.5 text-sm font-semibold"
            style={{ color: t.color, borderBottom: t.border }}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="mt-3.5 grid grid-cols-3 gap-1.5">
        {vm.profileGrid.length === 0 ? (
          <p className="col-span-full m-0 py-8 text-center text-sm text-gd-text-subtle">
            {vm.profileTab === 'Sobre'
              ? `${vm.profile.bio} · ${vm.profile.loc}`
              : 'Nenhum item para mostrar aqui.'}
          </p>
        ) : (
          vm.profileGrid.map((g, i) => (
            <button key={i} type="button" onClick={g.open} className="aspect-square overflow-hidden rounded-[10px]">
              <img src={g.img} alt={g.alt} className="block h-full w-full object-cover" />
            </button>
          ))
        )}
      </div>
    </>
  );
}

function EditProfileScreen({ vm }: Props) {
  return (
    <>
      <div className="flex items-center gap-3.5">
        <img src={vm.me.av} alt="" className="h-[72px] w-[72px] rounded-full object-cover" />
        <button className="h-10 rounded-xl border border-gd-border-strong bg-gd-elevated px-4 text-sm font-medium text-gd-text-secondary">
          Alterar foto
        </button>
      </div>
      <div className="mt-6 flex flex-col gap-4">
        <label className="block">
          <span className="mb-1.5 block text-[13px] text-gd-text-muted">Nome</span>
          <input
            value={vm.edit.name}
            onChange={vm.onEditName}
            className="h-12 w-full rounded-[14px] border border-gd-border-strong bg-gd-elevated px-4 text-[15px] text-gd-text outline-none placeholder:text-gd-text-subtle"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[13px] text-gd-text-muted">Nome de usuário</span>
          <input
            value={vm.edit.user}
            onChange={vm.onEditUser}
            className="h-12 w-full rounded-[14px] border border-gd-border-strong bg-gd-elevated px-4 text-[15px] text-gd-text outline-none placeholder:text-gd-text-subtle"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[13px] text-gd-text-muted">Bio</span>
          <textarea
            value={vm.edit.bio}
            onChange={vm.onEditBio}
            className="min-h-28 w-full resize-y rounded-2xl border border-gd-border-strong bg-gd-elevated px-4 py-3.5 text-[15px] text-gd-text outline-none placeholder:text-gd-text-subtle"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[13px] text-gd-text-muted">Localização</span>
          <input
            value={vm.edit.loc}
            onChange={vm.onEditLoc}
            className="h-12 w-full rounded-[14px] border border-gd-border-strong bg-gd-elevated px-4 text-[15px] text-gd-text outline-none placeholder:text-gd-text-subtle"
          />
        </label>
        <button
          type="button"
          onClick={vm.saveProfile}
          className="h-12 w-full rounded-[14px] bg-gd-brand text-sm font-semibold text-gd-on-brand"
        >
          Salvar alterações
        </button>
      </div>
    </>
  );
}

function MembersScreen({ vm }: Props) {
  return (
    <div className="flex flex-col">
      {vm.members.map((m, i) => (
        <button key={i} type="button" onClick={m.open} className="flex items-center gap-3 border-b border-gd-surface py-3 text-left">
          <img src={m.av} alt="" className="h-11 w-11 flex-none rounded-full object-cover" />
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-semibold">{m.name}</span>
            <span className="block text-[13px] text-gd-text-subtle">{m.handle}</span>
          </span>
          <span className="flex-none text-xs font-semibold" style={{ color: m.roleColor }}>
            {m.role}
          </span>
        </button>
      ))}
    </div>
  );
}

function FollowsScreen({ vm }: Props) {
  return (
    <div className="flex flex-col">
      {vm.follows.map((f, i) => (
        <div key={i} className="flex items-center gap-3 border-b border-gd-surface py-3">
          <button type="button" onClick={f.open} className="flex min-w-0 flex-1 items-center gap-3 text-left">
            <img src={f.av} alt="" className="h-11 w-11 flex-none rounded-full object-cover" />
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-semibold">{f.name}</span>
              <span className="block text-[13px] text-gd-text-subtle">{f.handle}</span>
            </span>
          </button>
          <button
            type="button"
            onClick={f.follow}
            className="h-[34px] flex-none rounded-full px-3.5 text-[13px] font-semibold text-gd-on-brand"
            style={{ background: f.btnBg }}
          >
            {f.btnLabel}
          </button>
        </div>
      ))}
    </div>
  );
}

function GroupsScreen({ vm }: Props) {
  return (
    <>
      <p className="m-0 mb-3 text-sm leading-normal text-gd-text-subtle">
        Comunidades que você participa e acompanha.
      </p>
      <div className="mb-4 flex h-11 items-center gap-2.5 rounded-xl border border-gd-border bg-gd-surface px-3.5">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.2-3.2" />
        </svg>
        <input
          value={vm.groupsSearchQ}
          onChange={vm.onGroupsSearch}
          placeholder="Buscar grupos e comunidades..."
          aria-label="Buscar grupos"
          className="min-w-0 flex-1 border-none bg-transparent text-[15px] text-gd-text outline-none placeholder:text-gd-text-subtle"
        />
      </div>
      <ScrollFadeRow fadeColor="var(--gd-bg)" className="mb-4 pb-1">
        <div className="flex gap-2 pr-1">
          {vm.groupsFilters.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={f.go}
              className={`h-8 flex-none rounded-full px-3.5 text-[12px] font-semibold whitespace-nowrap ${
                f.active ? 'bg-gd-brand text-gd-on-brand' : 'bg-gd-surface text-gd-text-muted'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </ScrollFadeRow>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-3">
        {vm.allGroups.length === 0 ? (
          <p className="col-span-full m-0 py-8 text-center text-sm text-gd-text-subtle">Nenhum grupo encontrado.</p>
        ) : (
          vm.allGroups.map((g, i) => (
          <article
            key={i}
            onClick={g.open}
            className="cursor-pointer rounded-[var(--gd-radius-card)] border border-[color:var(--gd-card-border)] bg-gd-card p-2.5 transition-colors hover:bg-gd-hover-subtle"
          >
            <div className="h-[104px] overflow-hidden rounded-[var(--gd-radius-media)] bg-gd-elevated">
              <img src={g.img} alt={g.name} className="block h-full w-full object-cover" />
            </div>
            <div className="relative z-[1] -mt-3 ml-1.5 flex w-max">
              {g.avatars.map((a, j) => (
                <img
                  key={j}
                  src={a.src}
                  alt=""
                  className="-mr-2 h-[26px] w-[26px] rounded-full border-2 border-gd-card object-cover"
                />
              ))}
            </div>
            <h3 className="mb-1 mt-2.5 text-sm font-semibold leading-[1.3] tracking-[-0.01em]">{g.name}</h3>
            <p className="m-0 text-xs text-gd-text-subtle">{g.meta}</p>
            <span
              className="mt-2 inline-flex h-[22px] items-center rounded-full px-[9px] text-[11px] font-semibold"
              style={{ background: g.badgeBg, color: g.badgeColor }}
            >
              {g.badge}
            </span>
          </article>
          ))
        )}
      </div>
    </>
  );
}

function SettingsRow({
  label,
  hint,
  onClick,
  danger,
}: {
  label: string;
  hint?: string;
  onClick: () => void;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3.5 text-left transition-colors hover:bg-gd-hover ${
        danger ? 'text-gd-danger' : 'text-gd-text-secondary'
      }`}
    >
      <span className="min-w-0 flex-1">
        <span className="block text-[15px] font-medium">{label}</span>
        {hint ? <span className="mt-0.5 block truncate text-[13px] text-gd-text-subtle">{hint}</span> : null}
      </span>
      {!danger ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="flex-none text-gd-text-subtle">
          <path d="M9 6l6 6-6 6" />
        </svg>
      ) : null}
    </button>
  );
}

function SettingsScreen({ vm }: Props) {
  const settings = vm.settings!;
  return (
    <>
      <div className="mb-4 flex items-center gap-3.5 rounded-[20px] border border-[color:var(--gd-hairline)] bg-gd-card p-4">
        <img src={vm.me.av} alt="" className="h-14 w-14 rounded-full object-cover" />
        <div className="min-w-0">
          <p className="m-0 truncate text-base font-semibold">{vm.edit.name}</p>
          <p className="m-0 truncate text-sm text-gd-text-subtle">{vm.edit.user}</p>
        </div>
      </div>

      <section className="rounded-[20px] border border-[color:var(--gd-hairline)] bg-gd-card p-1">
        <SettingsRow label="Alterar e-mail" hint={settings.email} onClick={settings.openChangeEmail} />
        <div className="mx-3 h-px bg-[color:var(--gd-hairline)]" />
        <SettingsRow label="Alterar senha" hint="••••••••" onClick={settings.openChangePassword} />
      </section>

      <section className="mt-4 rounded-[20px] border border-[color:var(--gd-hairline)] bg-gd-card p-1">
        <SettingsRow label="Sair da conta" onClick={settings.logout} danger />
      </section>
    </>
  );
}

function ChangeEmailScreen({ vm }: Props) {
  return (
    <>
      <p className="m-0 mb-5 text-sm leading-normal text-gd-text-subtle">
        Seu e-mail é usado para login, recuperação de senha e notificações importantes.
      </p>
      <label className="block">
        <span className="mb-1.5 block text-[13px] text-gd-text-muted">Novo e-mail</span>
        <input
          type="email"
          value={vm.emailDraft}
          onChange={vm.onEmailDraft}
          autoComplete="email"
          placeholder="seu@email.com"
          className="h-12 w-full rounded-[14px] border border-gd-border-strong bg-gd-elevated px-4 text-[15px] text-gd-text outline-none placeholder:text-gd-text-subtle"
        />
      </label>
      <button
        type="button"
        onClick={vm.saveEmail}
        className="mt-6 h-12 w-full rounded-[14px] bg-gd-brand text-sm font-semibold text-gd-on-brand"
      >
        Salvar e-mail
      </button>
    </>
  );
}

function ChangePasswordScreen({ vm }: Props) {
  return (
    <>
      <p className="m-0 mb-5 text-sm leading-normal text-gd-text-subtle">
        Use pelo menos 8 caracteres. Evite senhas que você já usa em outros serviços.
      </p>
      <div className="flex flex-col gap-4">
        <label className="block">
          <span className="mb-1.5 block text-[13px] text-gd-text-muted">Senha atual</span>
          <input
            type="password"
            value={vm.passwordDraft.current}
            onChange={vm.onPasswordCurrent}
            autoComplete="current-password"
            className="h-12 w-full rounded-[14px] border border-gd-border-strong bg-gd-elevated px-4 text-[15px] text-gd-text outline-none placeholder:text-gd-text-subtle"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[13px] text-gd-text-muted">Nova senha</span>
          <input
            type="password"
            value={vm.passwordDraft.next}
            onChange={vm.onPasswordNext}
            autoComplete="new-password"
            className="h-12 w-full rounded-[14px] border border-gd-border-strong bg-gd-elevated px-4 text-[15px] text-gd-text outline-none placeholder:text-gd-text-subtle"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[13px] text-gd-text-muted">Confirmar nova senha</span>
          <input
            type="password"
            value={vm.passwordDraft.confirm}
            onChange={vm.onPasswordConfirm}
            autoComplete="new-password"
            className="h-12 w-full rounded-[14px] border border-gd-border-strong bg-gd-elevated px-4 text-[15px] text-gd-text outline-none placeholder:text-gd-text-subtle"
          />
        </label>
        <button
          type="button"
          onClick={vm.savePassword}
          className="mt-2 h-12 w-full rounded-[14px] bg-gd-brand text-sm font-semibold text-gd-on-brand"
        >
          Salvar senha
        </button>
      </div>
    </>
  );
}
