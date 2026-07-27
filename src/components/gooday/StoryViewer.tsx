import type { GoodayHomeViewModel } from "@/lib/gooday/useGoodayHome";

type Props = {
  vm: GoodayHomeViewModel;
};

export function StoryViewer({ vm }: Props) {
  if (!vm.story) return null;

  return (
    <div role="dialog" aria-label="Story" className="fixed inset-0 z-[80] animate-[gd-fade_180ms_ease] bg-[#080B0E]">
      <img src={vm.story.img} alt={vm.story.alt} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 from-0% via-transparent via-[25%] to-black/80 to-100%" />
      <div className="absolute bottom-0 left-0 top-0 w-[32%]" onClick={vm.storyPrev} />
      <div className="absolute bottom-0 right-0 top-0 w-[68%]" onClick={vm.storyNext} />
      <div className="absolute left-0 right-0 top-0 flex gap-[5px] px-4 py-3.5">
        {vm.storyBars.map((b, i) => (
          <span key={i} className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/30">
            <span className="block h-full rounded-full bg-white" style={{ width: b.w }} />
          </span>
        ))}
      </div>
      <div className="absolute left-4 right-4 top-8 flex items-center gap-2.5">
        <img
          src={vm.story.av}
          alt=""
          className="h-[38px] w-[38px] rounded-full border-2 border-white/80 object-cover"
        />
        <div className="flex-1">
          <p className="m-0 text-[15px] font-semibold">{vm.story.name}</p>
          <p className="mt-0.5 text-xs text-white/70">{vm.story.time}</p>
        </div>
        <button
          type="button"
          onClick={vm.closeStory}
          aria-label="Fechar story"
          className="grid h-11 w-11 place-items-center rounded-full bg-black/35 text-white"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>
      <div className="absolute bottom-[26px] left-4 right-4 flex items-center gap-2.5">
        <div className="flex h-12 flex-1 items-center rounded-full border border-white/40 bg-black/30 px-4">
          <input
            placeholder="Responder..."
            aria-label="Responder story"
            className="flex-1 border-none bg-transparent text-[15px] text-white outline-none"
          />
        </div>
        {vm.quickReactions.map((q, i) => (
          <button
            key={i}
            type="button"
            onClick={q.send}
            aria-label="Reagir"
            className="grid h-11 w-11 place-items-center rounded-full bg-black/35 text-xl"
          >
            {q.emoji}
          </button>
        ))}
      </div>
    </div>
  );
}
