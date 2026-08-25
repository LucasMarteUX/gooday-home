'use client';

import type { GoodayHomeViewModel } from "@/lib/gooday/useGoodayHome";
import { useDragScroll } from "@/lib/gooday/useDragScroll";

type Props = {
  vm: GoodayHomeViewModel;
};

const STORY_RING = 'var(--gd-story-ring)';

export function StoriesRow({ vm }: Props) {
  const scrollRef = useDragScroll<HTMLElement>();

  return (
    <section
      ref={scrollRef}
      aria-label="Stories"
      className="no-scrollbar flex snap-x snap-mandatory gap-2.5 overflow-x-auto px-4 pb-1 pt-3 pl-4 touch-pan-x select-none min-[800px]:gap-2.5 min-[800px]:px-6 min-[800px]:pl-6 min-[800px]:pt-4"
    >
      <div className="relative h-[152px] w-[112px] flex-none overflow-hidden rounded-[var(--gd-radius-story)] border border-[color:var(--gd-card-border)] bg-gd-elevated scroll-snap-align-start min-[800px]:h-[158px] min-[800px]:w-[118px]">
        <button
          type="button"
          onClick={vm.myStory.open}
          aria-label={vm.myStory.hasStory ? 'Ver seus stories' : 'Criar story'}
          className="absolute inset-0"
        >
          <img
            src={vm.myStory.cover}
            alt=""
            draggable={false}
            className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          />
          <span className="absolute inset-0 bg-gradient-to-b from-transparent from-35% to-black/80" />
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            vm.myStory.openCreate();
          }}
          aria-label="Postar novo story"
          className="absolute bottom-2.5 left-2.5 z-[1] grid h-10 w-10 place-items-center rounded-full border-2 border-white text-lg font-semibold leading-none text-gd-on-brand"
          style={{ background: vm.myStory.hasStory ? STORY_RING : 'var(--gd-brand)' }}
        >
          +
        </button>
      </div>
      {vm.stories.map((s, i) => (
        <button
          key={i}
          type="button"
          onClick={s.open}
          className="relative h-[152px] w-[112px] flex-none rounded-[var(--gd-radius-story)] p-px scroll-snap-align-start min-[800px]:h-[158px] min-[800px]:w-[118px]"
          style={{
            background: s.unseen ? STORY_RING : 'transparent',
          }}
        >
          <span className="relative block h-full w-full overflow-hidden rounded-[calc(var(--gd-radius-story)-1px)] border border-[color:var(--gd-card-border)] bg-gd-elevated">
            <img
              src={s.img}
              alt={s.alt}
              draggable={false}
              className="pointer-events-none absolute inset-0 h-full w-full object-cover"
              style={{ filter: s.filter }}
            />
            <span className="absolute inset-0 bg-gradient-to-b from-transparent from-35% to-black/80" />
            <span
              className="absolute bottom-2.5 left-2.5 h-10 w-10 rounded-full p-0.5"
              style={{ background: s.ring }}
            >
              <img src={s.av} alt="" draggable={false} className="pointer-events-none h-full w-full rounded-full border-2 border-gd-bg object-cover" />
            </span>
          </span>
        </button>
      ))}
    </section>
  );
}
