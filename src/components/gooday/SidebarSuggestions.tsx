import type { GoodayHomeViewModel } from "@/lib/gooday/useGoodayHome";
import { StickySidebarColumn, StickySidebarScroll } from "./StickySidebarColumn";

type Props = {
  vm: GoodayHomeViewModel;
};

export function SidebarSuggestions({ vm }: Props) {
  return (
    <StickySidebarColumn className="w-max max-w-[240px] justify-self-start" alwaysActive>
      <section className="flex w-[220px] min-h-0 flex-1 flex-col overflow-hidden rounded-[20px] bg-gd-card p-3.5">
        <div className="flex flex-none items-center justify-between gap-2 border-b border-gd-elevated pb-3">
          <h2 className="m-0 text-[13px] font-semibold whitespace-nowrap">Sugestões para você</h2>
          <button
            type="button"
            onClick={vm.openAllPeople}
            className="flex-none text-xs font-semibold whitespace-nowrap text-gd-brand-light"
          >
            Ver tudo
          </button>
        </div>
        <StickySidebarScroll fadeColor="var(--gd-card)" className="gap-0.5 pt-2" alwaysScrollable>
          {vm.suggestions.map((s, i) => (
            <div key={i} className="flex flex-none items-center gap-2 py-[5px]">
              <button type="button" onClick={s.open} className="flex-none">
                <img src={s.av} alt="" className="h-7 w-7 cursor-pointer rounded-full object-cover" />
              </button>
              <button
                type="button"
                onClick={s.open}
                className="min-w-0 flex-1 cursor-pointer truncate text-left text-[13px] text-gd-text-secondary"
              >
                {s.handle}
              </button>
              <button
                type="button"
                onClick={s.follow}
                className="inline-flex h-[22px] flex-none items-center justify-center whitespace-nowrap rounded-full px-[9px] text-[11px] font-semibold leading-none text-white"
                style={{ background: s.btnBg, color: s.btnColor }}
              >
                {s.btnLabel}
              </button>
            </div>
          ))}
        </StickySidebarScroll>
      </section>
    </StickySidebarColumn>
  );
}
