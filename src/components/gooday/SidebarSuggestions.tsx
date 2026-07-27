import type { GoodayHomeViewModel } from "@/lib/gooday/useGoodayHome";

type Props = {
  vm: GoodayHomeViewModel;
};

export function SidebarSuggestions({ vm }: Props) {
  return (
    <aside className="sticky top-[92px] flex h-[calc(100vh-116px)] min-w-0 flex-col gap-3.5 pt-5">
      <section className="flex min-h-0 flex-1 flex-col rounded-[20px] bg-gd-card p-4">
        <div className="flex items-center justify-between gap-2 border-b border-gd-elevated pb-3">
          <h2 className="m-0 text-[13px] font-semibold">Sugestões para você</h2>
          <button type="button" onClick={vm.openAllPeople} className="text-xs font-semibold text-gd-brand-light">
            Ver tudo
          </button>
        </div>
        <div className="no-scrollbar flex min-h-0 flex-1 flex-col gap-0.5 overflow-y-auto pt-2">
          {vm.suggestions.map((s, i) => (
            <div key={i} className="flex flex-none items-center gap-2 py-[5px]">
              <button type="button" onClick={s.open}>
                <img src={s.av} alt="" className="h-7 w-7 flex-none cursor-pointer rounded-full object-cover" />
              </button>
              <button
                type="button"
                onClick={s.open}
                className="min-w-0 flex-1 cursor-pointer truncate text-[13px] text-gd-text-secondary"
              >
                {s.handle}
              </button>
              <button
                type="button"
                onClick={s.follow}
                className="h-[22px] flex-none whitespace-nowrap rounded-full px-[9px] text-[11px] font-semibold text-white"
                style={{ background: s.btnBg, color: s.btnColor }}
              >
                {s.btnLabel}
              </button>
            </div>
          ))}
        </div>
      </section>
    </aside>
  );
}
