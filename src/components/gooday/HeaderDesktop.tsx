import type { GoodayHomeViewModel } from "@/lib/gooday/useGoodayHome";

type Props = {
  vm: GoodayHomeViewModel;
};

export function HeaderDesktop({ vm }: Props) {
  return (
    <header className="sticky top-0 z-40 hidden items-center gap-5 border-b border-white/[0.06] bg-[rgba(14,18,22,0.88)] px-7 py-2 backdrop-blur-2xl min-[800px]:flex">
      <img
        src="/uploads/logotipo%20gooday.png"
        alt="Gooday"
        className="block h-7 w-auto"
      />
      <div className="flex h-9 max-w-[480px] flex-1 items-center gap-2 rounded-full border border-white/[0.08] bg-gd-surface/80 py-0 pl-3.5 pr-1">
        <input
          readOnly
          onFocus={vm.openSearch}
          placeholder="O que deseja fazer de bom hoje?"
          aria-label="Buscar pessoas e grupos"
          className="h-full min-w-0 flex-1 cursor-pointer border-none bg-transparent text-[13px] text-white outline-none placeholder:text-gd-text-subtle"
        />
        <button
          type="button"
          onClick={vm.openSearch}
          aria-label="Buscar"
          className="grid h-7 w-7 flex-none place-items-center rounded-full bg-gd-brand"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round">
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.2-3.2" />
          </svg>
        </button>
      </div>
      <div className="flex min-w-0 flex-1 items-center justify-center gap-2">
        <span className="grid h-[18px] w-[18px] flex-none place-items-center text-gd-success" aria-hidden>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22V12" />
            <path d="M12 12C12 7.5 8 4 4 4c0 5 3 8 8 8z" />
            <path d="M12 12c0-4.5 4-8 8-8 0 5-3 8-8 8z" />
          </svg>
        </span>
        <p className="m-0 truncate text-sm font-normal text-white">{vm.contextMessage}</p>
      </div>
      <button
        type="button"
        onClick={vm.openNotifications}
        aria-label="Notificações"
        className="relative grid h-11 w-11 flex-none place-items-center rounded-xl text-gd-text-secondary"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 9a6 6 0 10-12 0c0 5-2 6-2 6h16s-2-1-2-6" />
          <path d="M13.7 20a2 2 0 01-3.4 0" />
        </svg>
        {vm.hasUnread ? (
          <span className="absolute right-2 top-2 h-[9px] w-[9px] rounded-full border-2 border-gd-bg bg-gd-danger" />
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
