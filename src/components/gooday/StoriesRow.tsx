import type { GoodayHomeViewModel } from "@/lib/gooday/useGoodayHome";

type Props = {
  vm: GoodayHomeViewModel;
};

export function StoriesRow({ vm }: Props) {
  return (
    <section
      aria-label="Stories"
      className="no-scrollbar flex snap-x snap-mandatory gap-2.5 overflow-x-auto px-4 pb-1 pt-4 pl-6 min-[800px]:px-6"
    >
      <button
        type="button"
        onClick={vm.myStory.open}
        className="relative h-[158px] w-[118px] flex-none overflow-hidden rounded-[20px] bg-gd-elevated scroll-snap-align-start"
      >
        <img src={vm.me.av} alt="" className="absolute inset-0 h-full w-full object-cover opacity-80" />
        <span className="absolute inset-0 bg-gradient-to-b from-transparent from-45% to-black/60" />
        <span
          className="absolute bottom-2.5 left-2.5 grid h-10 w-10 place-items-center rounded-full border-2 border-gd-bg bg-gd-brand text-lg leading-none text-white"
          style={{ background: vm.myStory.hasStory ? 'linear-gradient(135deg,#7849EC,#4667F5 55%,#39BCE7)' : '#4667F5' }}
        >
          +
        </span>
        <span className="absolute bottom-2.5 left-14 text-[11px] font-semibold text-white">Seu story</span>
      </button>
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
