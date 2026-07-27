import type { GoodayHomeViewModel } from "@/lib/gooday/useGoodayHome";

type Props = {
  vm: GoodayHomeViewModel;
};

export function Toast({ vm }: Props) {
  if (!vm.toast) return null;

  return (
    <div
      role="status"
      className="pointer-events-none fixed inset-x-4 bottom-[calc(88px+env(safe-area-inset-bottom))] z-[90] flex justify-center min-[800px]:bottom-[100px]"
    >
      <div className="flex max-w-[420px] animate-[gd-up_240ms_ease] items-center gap-2.5 rounded-[14px] border border-white/[0.08] bg-gd-border px-4 py-3.5 text-sm text-[#F5F6F8] shadow-[0_8px_24px_rgba(0,0,0,0.24)]">
        <span className="h-2 w-2 flex-none rounded-full bg-gd-success" />
        {vm.toast}
      </div>
    </div>
  );
}
