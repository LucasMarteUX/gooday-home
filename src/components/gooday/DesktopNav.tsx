import type { GoodayHomeViewModel } from "@/lib/gooday/useGoodayHome";
import { StickySidebarColumn } from "./StickySidebarColumn";

type Props = {
  vm: GoodayHomeViewModel;
};

function SettingsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1.1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.5-1.1 1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.8.3H9a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8V9c.2.6.7 1.1 1.5 1.1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z" />
    </svg>
  );
}

/** Nav principal desktop — altura hug no conteúdo. */
export function DesktopNav({ vm }: Props) {
  return (
    <StickySidebarColumn
      className="gooday-sidebar-nav w-max justify-self-start"
      alwaysActive
    >
      <nav
        aria-label="Navegação principal"
        className="flex w-[168px] flex-col rounded-[20px] border border-white/[0.06] bg-gd-card p-2"
      >
        <div className="flex flex-col gap-1">
          {vm.navItems.map((n, i) => (
            <button
              key={i}
              type="button"
              onClick={n.go}
              className="flex h-11 w-full flex-none items-center gap-2.5 rounded-2xl px-3 text-left text-[13px] font-semibold transition-colors"
              style={{ background: n.bg, color: n.color }}
            >
              <span className="grid h-5 w-5 flex-none place-items-center">{n.glyph}</span>
              <span className="truncate">{n.label}</span>
            </button>
          ))}
        </div>

        <div className="mt-2 flex flex-none flex-col gap-1 border-t border-white/[0.08] pt-2">
          <button
            type="button"
            onClick={vm.openSettings}
            className="flex h-11 w-full items-center gap-2.5 rounded-2xl px-3 text-left text-[13px] font-semibold text-[#C3C7CF] transition-colors hover:bg-gd-elevated hover:text-white"
          >
            <span className="grid h-5 w-5 flex-none place-items-center text-current">
              <SettingsIcon />
            </span>
            <span className="truncate">Configurações</span>
          </button>
        </div>
      </nav>
    </StickySidebarColumn>
  );
}
