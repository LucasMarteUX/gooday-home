import type { GoodayHomeViewModel } from "@/lib/gooday/useGoodayHome";

type Props = {
  vm: GoodayHomeViewModel;
};

export function MobileNav({ vm }: Props) {
  return (
    <nav
      aria-label="Navegação principal"
      className="fixed inset-x-0 bottom-0 z-[45] flex h-[78px] items-center justify-around border-t border-white/[0.06] bg-[rgba(21,26,31,0.92)] pb-[env(safe-area-inset-bottom)] backdrop-blur-2xl min-[800px]:hidden"
    >
      {vm.tabs.map((t) => (
        <button
          key={t.id}
          type="button"
          onClick={t.go}
          aria-label={t.label}
          data-tab={t.id}
          className="grid h-14 w-14 place-items-center rounded-2xl"
          style={{ color: t.color }}
        >
          <span className="grid place-items-center">{t.icon}</span>
        </button>
      ))}
    </nav>
  );
}
