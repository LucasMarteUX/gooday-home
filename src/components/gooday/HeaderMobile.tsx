'use client';

import type { GoodayHomeViewModel } from "@/lib/gooday/useGoodayHome";
import { GoodayLogo } from "@/lib/gooday/theme";

type Props = {
  vm: GoodayHomeViewModel;
};

export function HeaderMobile({ vm }: Props) {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between gap-3 bg-[color:var(--gd-header-mobile)] px-4 pb-3 pt-[max(12px,env(safe-area-inset-top))] min-[800px]:hidden">
      <GoodayLogo className="h-8 w-auto min-[400px]:h-9" />
      <div className="flex items-center gap-0.5">
        <button
          type="button"
          onClick={vm.openCreate}
          aria-label="Criar publicação"
          className="grid h-11 w-11 place-items-center rounded-xl text-gd-text transition-colors hover:bg-black/5 active:bg-black/10"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 8.4v7.2M8.4 12h7.2" />
          </svg>
        </button>
        <button
          type="button"
          onClick={vm.openNotifications}
          aria-label="Notificações"
          className="relative grid h-11 w-11 place-items-center rounded-xl text-gd-text transition-colors hover:bg-black/5 active:bg-black/10"
        >
          <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 9a6 6 0 10-12 0c0 5-2 6-2 6h16s-2-1-2-6" />
            <path d="M13.7 20a2 2 0 01-3.4 0" />
          </svg>
          {vm.hasUnread ? (
            <span className="absolute right-[7px] top-[7px] h-[9px] w-[9px] rounded-full border-2 border-[color:var(--gd-header-mobile)] bg-gd-danger" />
          ) : null}
        </button>
        <button
          type="button"
          onClick={vm.openAvatarMenu}
          aria-label="Menu do perfil"
          className="ml-1 h-9 w-9 overflow-hidden rounded-full border-[1.5px] border-gd-text/15 bg-white"
        >
          <img src={vm.me.av} alt="Seu perfil" className="block h-full w-full object-cover" />
        </button>
      </div>
    </header>
  );
}
