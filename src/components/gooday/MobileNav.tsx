import type { GoodayHomeViewModel } from "@/lib/gooday/useGoodayHome";

type Props = {
  vm: GoodayHomeViewModel;
};

export function MobileNav({ vm }: Props) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[45] flex justify-center px-3 min-[800px]:hidden">
      <nav
        aria-label="Navegação principal"
        className="pointer-events-auto mb-[calc(16px+env(safe-area-inset-bottom))] flex w-full max-w-[420px] items-end justify-around gap-0.5 rounded-full border border-[color:var(--gd-hairline-strong)] bg-[color:var(--gd-nav-float)] px-1.5 py-1.5 shadow-[var(--gd-shadow)] backdrop-blur-2xl"
      >
        {vm.tabs.map((t) => {
          const isCreate = t.id === "create";

          if (isCreate) {
            return (
              <button
                key={t.id}
                type="button"
                onClick={t.go}
                aria-label={t.label}
                className="relative -mt-6 flex min-w-[56px] flex-col items-center justify-end gap-1 pb-0.5"
              >
                <span className="grid place-items-center">{t.icon}</span>
                <span className="text-[9px] font-semibold leading-none text-gd-text">{t.label}</span>
              </button>
            );
          }

          return (
            <button
              key={t.id}
              type="button"
              onClick={t.go}
              aria-label={t.label}
              aria-current={t.active ? "page" : undefined}
              data-tab={t.id}
              className="flex min-w-0 flex-1 flex-col items-center justify-center gap-0.5 rounded-full px-1 py-1.5"
              style={{ color: t.color }}
            >
              <span className="grid scale-90 place-items-center">{t.icon}</span>
              <span className="text-[9px] font-medium leading-none opacity-90">{t.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
