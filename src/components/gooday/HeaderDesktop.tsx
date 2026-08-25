'use client';

import type { GoodayHomeViewModel } from "@/lib/gooday/useGoodayHome";
import { GoodayLogo } from "@/lib/gooday/theme";

type Props = {
  vm: GoodayHomeViewModel;
};

function logoBrand(segment: GoodayHomeViewModel['segment']) {
  if (segment === 'gamers') return 'xpzone' as const;
  if (segment === 'pets') return 'petshare' as const;
  if (segment === 'church') return 'one' as const;
  if (segment === 'language') return 'lingo' as const;
  if (segment === 'roam') return 'roam' as const;
  return 'gooday' as const;
}

function searchPlaceholder(segment: GoodayHomeViewModel['segment']) {
  if (segment === 'gamers') return 'O que quer jogar hoje?';
  if (segment === 'pets') return 'O que seu pet fez de fofo hoje?';
  if (segment === 'church') return 'Encontre pessoas, igrejas ou comunidades';
  if (segment === 'language') return 'Search people, languages or communities...';
  if (segment === 'roam') return 'Where do you want to go?';
  return 'O que deseja fazer de bom hoje?';
}

function ContextIcon({ segment }: { segment: GoodayHomeViewModel['segment'] }) {
  if (segment === 'gamers') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M6.5 10.5h11c2.2 0 3.5 1.6 3.5 3.4v1.2c0 1.8-1.3 3.4-3.5 3.4h-1.2l-1.1 2H8.8l-1.1-2H6.5C4.3 18.5 3 16.9 3 15.1v-1.2c0-1.8 1.3-3.4 3.5-3.4z" />
        <path d="M8 14h2.5M9.25 12.75v2.5" />
        <circle cx="15.25" cy="13.6" r="0.85" fill="currentColor" stroke="none" />
        <circle cx="17.15" cy="15.1" r="0.85" fill="currentColor" stroke="none" />
        <path d="M6.8 8.2c.4-1.2 1.5-2 2.8-2M17.2 8.2c-.4-1.2-1.5-2-2.8-2" />
      </svg>
    );
  }
  if (segment === 'pets') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <ellipse cx="7" cy="7.5" rx="2" ry="2.5" />
        <ellipse cx="12" cy="5.8" rx="2" ry="2.5" />
        <ellipse cx="17" cy="7.5" rx="2" ry="2.5" />
        <path d="M12 10.2c-2.9 0-5.3 2-5.3 4.7 0 1.4 1 2.5 2.3 2.9.6.2 1.2-.1 1.6-.5l.6-.9c.3-.5 1.1-.5 1.4 0l.6.9c.4.4 1 .7 1.6.5 1.3-.4 2.3-1.5 2.3-2.9 0-2.7-2.4-4.7-5.3-4.7z" />
      </svg>
    );
  }
  if (segment === 'church') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <circle cx="9" cy="8" r="3" />
        <circle cx="16" cy="9.5" r="2.5" />
        <path d="M3.5 19c.8-3.2 3-5 5.5-5s4.7 1.8 5.5 5" />
        <path d="M14 16.2c1.2-.8 2.6-1.2 4-1.2 1.8 0 3.4.7 4.5 2" />
      </svg>
    );
  }
  if (segment === 'language') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18" />
        <path d="M12 3c2.5 2.8 3.8 5.8 3.8 9s-1.3 6.2-3.8 9c-2.5-2.8-3.8-5.8-3.8-9S9.5 5.8 12 3z" />
      </svg>
    );
  }
  if (segment === 'roam') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21" />
        <path d="M8.2 8.2l1.6 1.6M14.2 14.2l1.6 1.6M14.2 9.8l1.6-1.6M8.2 15.8l1.6-1.6" />
        <circle cx="12" cy="12" r="2.2" />
      </svg>
    );
  }
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 22V12" />
      <path d="M12 12C12 7.5 8 4 4 4c0 5 3 8 8 8z" />
      <path d="M12 12c0-4.5 4-8 8-8 0 5-3 8-8 8z" />
    </svg>
  );
}

export function HeaderDesktop({ vm }: Props) {
  const segment = vm.segment;

  return (
    <header className="sticky top-0 z-40 hidden items-center gap-5 border-b border-[color:var(--gd-hairline)] bg-[color:var(--gd-header-desktop)] px-7 py-2.5 backdrop-blur-2xl min-[800px]:flex">
      <GoodayLogo brand={logoBrand(segment)} />
      <div className="flex h-10 max-w-[480px] flex-1 items-center gap-2 rounded-[var(--gd-radius-control)] border border-[color:var(--gd-hairline-strong)] bg-gd-card py-0 pl-3.5 pr-1">
        <input
          readOnly
          onFocus={vm.openSearch}
          placeholder={searchPlaceholder(segment)}
          aria-label="Buscar pessoas e grupos"
          className="h-full min-w-0 flex-1 cursor-pointer border-none bg-transparent text-[13px] text-gd-text outline-none placeholder:text-gd-text-subtle"
        />
        <button
          type="button"
          onClick={vm.openSearch}
          aria-label="Buscar"
          className="grid h-8 w-8 flex-none place-items-center rounded-[var(--gd-radius-control)] bg-gd-brand text-gd-on-brand"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.2-3.2" />
          </svg>
        </button>
      </div>
      <div className="flex min-w-0 flex-1 items-center justify-center gap-2">
        <span className="grid h-[18px] w-[18px] flex-none place-items-center text-gd-brand" aria-hidden>
          <ContextIcon segment={segment} />
        </span>
        <p className="m-0 truncate text-sm font-normal text-gd-text">{vm.contextMessage}</p>
        {segment === 'language' ? (
          <span className="hidden items-center gap-1.5 rounded-full border border-[color:var(--gd-border)] bg-gd-card px-2.5 py-1 text-[12px] font-semibold text-gd-text min-[1100px]:inline-flex">
            <span aria-hidden>🔥</span> 12
            <span className="text-gd-text-muted">·</span>
            <span aria-hidden>🇺🇸</span> B1
          </span>
        ) : null}
      </div>
      <button
        type="button"
        onClick={vm.openNotifications}
        aria-label="Notificações"
        className="relative grid h-11 w-11 flex-none place-items-center rounded-[var(--gd-radius-control)] text-gd-text-secondary"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 9a6 6 0 10-12 0c0 5-2 6-2 6h16s-2-1-2-6" />
          <path d="M13.7 20a2 2 0 01-3.4 0" />
        </svg>
        {vm.hasUnread ? (
          <span className="absolute right-2 top-2 h-[9px] w-[9px] rounded-full border-2 border-[color:var(--gd-header-desktop)] bg-[color:var(--gd-notif-dot)]" />
        ) : null}
      </button>
      <button
        type="button"
        onClick={vm.openAvatarMenu}
        aria-label="Menu do perfil"
        className="h-11 w-11 flex-none overflow-hidden rounded-full border border-gd-border bg-gd-elevated"
      >
        <img src={vm.me.av} alt="Seu perfil" className="block h-full w-full object-cover" />
      </button>
    </header>
  );
}
