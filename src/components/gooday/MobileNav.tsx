import type { GoodayHomeViewModel } from "@/lib/gooday/useGoodayHome";

type Props = {
  vm: GoodayHomeViewModel;
};

export function MobileNav({ vm }: Props) {
  return (
    <nav
      aria-label="Navegação principal"
      className="fixed inset-x-0 bottom-0 z-[45] flex h-[calc(52px+env(safe-area-inset-bottom))] items-start justify-around border-t border-white/[0.06] bg-[rgba(14,18,22,0.94)] px-1 pt-1 pb-[env(safe-area-inset-bottom)] backdrop-blur-2xl min-[800px]:hidden"
    >
      {vm.tabs.map((t) => (
        <button
          key={t.id}
          type="button"
          onClick={t.go}
          aria-label={t.label}
          aria-current={t.active ? 'page' : undefined}
          data-tab={t.id}
          className="flex h-10 w-12 flex-col items-center justify-center gap-0.5 rounded-xl"
          style={{ color: t.color }}
        >
          <span className="grid scale-90 place-items-center">{t.icon}</span>
          <span className="text-[9px] font-medium leading-none opacity-90">{t.label}</span>
        </button>
      ))}
    </nav>
  );
}
