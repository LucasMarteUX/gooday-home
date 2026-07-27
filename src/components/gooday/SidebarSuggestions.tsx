import type { GoodayHomeViewModel } from "@/lib/gooday/useGoodayHome";
import { StickySidebarColumn, StickySidebarScroll } from "./StickySidebarColumn";

type Props = {
  vm: GoodayHomeViewModel;
  compact?: boolean;
};

/** Lista de pessoas para seguir — usada na tab do painel direito. */
export function PeopleSuggestions({ vm, compact }: Props) {
  return (
    <>
      {!compact ? (
        <div className="mb-3 flex flex-none items-center justify-between gap-2">
          <h2 className="m-0 text-[13px] font-semibold">Sugestões para você</h2>
          <button
            type="button"
            onClick={vm.openAllPeople}
            className="text-xs font-semibold text-gd-brand-light"
          >
            Ver tudo
          </button>
        </div>
      ) : null}
      <StickySidebarScroll fadeColor="var(--gd-bg)" className="gap-0.5" bottomInset={56} alwaysScrollable>
        {vm.suggestions.length === 0 ? (
          <p className="m-0 px-1 py-6 text-center text-[13px] text-gd-text-subtle">Nenhuma pessoa encontrada.</p>
        ) : (
          vm.suggestions.map((s, i) => (
            <div
              key={i}
              className="flex flex-none items-center gap-2.5 rounded-xl px-1 py-2 transition-colors hover:bg-gd-hover-subtle"
            >
              <button type="button" onClick={s.open} className="flex-none">
                <img src={s.av} alt="" className="h-9 w-9 cursor-pointer rounded-full object-cover" />
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
                className="inline-flex h-7 flex-none items-center justify-center whitespace-nowrap rounded-full px-3 text-[11px] font-semibold leading-none text-white"
                style={{ background: s.btnBg, color: s.btnColor }}
              >
                {s.btnLabel}
              </button>
            </div>
          ))
        )}
        {compact ? (
          <button
            type="button"
            onClick={vm.openAllPeople}
            className="mt-2 h-10 flex-none rounded-xl border border-[color:var(--gd-hairline-strong)] bg-gd-surface text-[13px] font-semibold text-gd-brand-soft transition-colors hover:bg-gd-hover-subtle"
          >
            Ver tudo
          </button>
        ) : null}
      </StickySidebarScroll>
    </>
  );
}

/** Mantido para compat — redireciona ao conteúdo de pessoas. */
export function SidebarSuggestions({ vm }: Props) {
  return (
    <StickySidebarColumn className="w-max max-w-[280px] justify-self-start" alwaysActive>
      <section className="flex w-[260px] min-h-0 flex-1 flex-col overflow-hidden rounded-[20px] bg-gd-card p-3.5">
        <PeopleSuggestions vm={vm} />
      </section>
    </StickySidebarColumn>
  );
}
