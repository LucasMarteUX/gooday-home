import type { GoodayHomeViewModel } from "@/lib/gooday/useGoodayHome";

type Props = {
  vm: GoodayHomeViewModel;
};

export function DesktopNav({ vm }: Props) {
  return (
    <nav
      aria-label="Navegação principal"
      className="fixed bottom-6 left-1/2 z-[45] flex -translate-x-1/2 items-center gap-1 rounded-full border border-white/[0.08] bg-[rgba(21,26,31,0.92)] p-1.5 shadow-[0_16px_48px_rgba(0,0,0,0.32)] backdrop-blur-2xl"
    >
      {vm.navItems.map((n, i) => (
        <button
          key={i}
          type="button"
          onClick={n.go}
          className="inline-flex h-[38px] items-center justify-center gap-2 whitespace-nowrap rounded-full px-4 text-[13px] font-semibold leading-none"
          style={{ background: n.bg, color: n.color }}
        >
          <span className="flex h-4 w-4 flex-none shrink-0 items-center justify-center">{n.glyph}</span>
          {n.label}
        </button>
      ))}
    </nav>
  );
}
