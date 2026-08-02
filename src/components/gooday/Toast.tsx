import type { GoodayHomeViewModel } from "@/lib/gooday/useGoodayHome";

type Props = {
  vm: GoodayHomeViewModel;
};

export function Toast({ vm }: Props) {
  if (!vm.toast) return null;

  return (
    <div
      role="status"
      className="pointer-events-none fixed inset-x-4 bottom-[calc(68px+env(safe-area-inset-bottom))] z-[90] flex justify-center min-[800px]:bottom-[100px]"
    >
      <div
        className="flex max-w-[420px] animate-[gd-up_240ms_ease] items-center gap-2.5 rounded-[14px] border border-[color:var(--gd-hairline-strong)] bg-[color:var(--gd-toast)] px-4 py-3.5 text-sm font-medium text-[color:var(--gd-toast-text)] shadow-[var(--gd-shadow)]"
      >
        <span className="h-2 w-2 flex-none rounded-full bg-[color:var(--gd-toast-accent)] ring-2 ring-[color:var(--gd-toast-accent)]/30" />
        {vm.toast}
      </div>
    </div>
  );
}
