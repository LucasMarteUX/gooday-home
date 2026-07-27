import type { GoodayHomeViewModel } from "@/lib/gooday/useGoodayHome";

type Props = {
  vm: GoodayHomeViewModel;
};

export function SheetModal({ vm }: Props) {
  if (!vm.sheet) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={vm.sheetOverlayStyle}
      onClick={vm.closeSheet}
    >
      <div style={vm.sheetPanelStyle} onClick={vm.stop}>
        {vm.isMobile ? (
          <div className="mx-auto mb-3.5 h-1 w-11 rounded-full bg-gd-border-strong" />
        ) : null}
        <div className="mb-3.5 flex items-center justify-between gap-3">
          <h2 className="m-0 text-lg font-semibold tracking-[-0.01em]">{vm.sheet.title}</h2>
          <button
            type="button"
            onClick={vm.closeSheet}
            aria-label="Fechar"
            className="grid h-10 w-10 place-items-center rounded-xl bg-gd-elevated text-[#C3C7CF]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
        {vm.sheet.body}
      </div>
    </div>
  );
}
