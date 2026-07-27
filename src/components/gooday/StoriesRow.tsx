import type { GoodayHomeViewModel } from "@/lib/gooday/useGoodayHome";

type Props = {
  vm: GoodayHomeViewModel;
};

export function StoriesRow({ vm }: Props) {
  return (
    <section aria-label="Stories" style={vm.storiesStyle} className="no-scrollbar">
      {vm.stories.map((s, i) => (
        <button
          key={i}
          type="button"
          onClick={s.open}
          className="relative h-[158px] w-[118px] flex-none overflow-hidden rounded-[20px] bg-gd-elevated scroll-snap-align-start"
        >
          <img
            src={s.img}
            alt={s.alt}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ filter: s.filter }}
          />
          <span className="absolute inset-0 bg-gradient-to-b from-transparent from-45% to-black/60" />
          <span
            className="absolute bottom-2.5 left-2.5 h-10 w-10 rounded-full p-0.5"
            style={{ background: s.ring }}
          >
            <img src={s.av} alt="" className="h-full w-full rounded-full border-2 border-gd-bg object-cover" />
          </span>
        </button>
      ))}
    </section>
  );
}
