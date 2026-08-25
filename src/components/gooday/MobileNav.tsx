import type { GoodayHomeViewModel } from "@/lib/gooday/useGoodayHome";

type Props = {
  vm: GoodayHomeViewModel;
};

export function MobileNav({ vm }: Props) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[45] flex justify-center px-3 min-[800px]:hidden">
      <nav
        aria-label="Navegação principal"
        className="pointer-events-auto mb-[calc(12px+env(safe-area-inset-bottom))] flex w-full max-w-[420px] items-center justify-around gap-1 rounded-full border border-[color:var(--gd-hairline)] bg-[color:var(--gd-nav-float)] px-2 py-2 shadow-[var(--gd-shadow)]"
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
                className="grid h-12 w-12 place-items-center text-gd-text"
              >
                {t.icon}
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
              className="grid h-12 w-12 place-items-center text-gd-text"
            >
              <span
                className={[
                  "grid h-11 w-11 place-items-center rounded-full transition-colors",
                  t.active ? "bg-gd-brand" : "bg-transparent",
                ].join(" ")}
              >
                {t.icon}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
