import type { GoodayHomeViewModel } from "@/lib/gooday/useGoodayHome";

type Props = {
  vm: GoodayHomeViewModel;
};

export function AvatarMenu({ vm }: Props) {
  if (!vm.avatarMenu) return null;

  return (
    <>
      <div className="fixed inset-0 z-[75]" onClick={vm.closeSheet} />
      <div
        role="menu"
        className="fixed right-7 top-[70px] z-[76] w-[264px] animate-[gd-fade_160ms_ease] rounded-[18px] border border-[color:var(--gd-hairline-strong)] bg-gd-surface p-3.5 shadow-[var(--gd-shadow)]"
      >
        <div className="flex items-center gap-3 border-b border-[color:var(--gd-hairline)] pb-3.5">
          <img src={vm.me.av} alt="" className="h-12 w-12 rounded-full object-cover" />
          <div>
            <p className="m-0 text-[15px] font-semibold">{vm.avatarMenu.name}</p>
            <p className="mt-0.5 text-[13px] text-gd-text-subtle">{vm.avatarMenu.sub}</p>
          </div>
        </div>
        <div className="flex flex-col gap-0.5 pt-2">
          {vm.avatarMenu.items.map((item, i) => (
            <button
              key={i}
              type="button"
              onClick={item.go}
              className="flex h-11 items-center rounded-xl px-2.5 text-left text-sm font-medium transition-colors hover:bg-gd-hover"
              style={{ color: item.color }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
