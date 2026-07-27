import type { GoodayHomeViewModel } from "@/lib/gooday/useGoodayHome";

type Props = {
  vm: GoodayHomeViewModel;
};

function ArrowIcon({ dir }: { dir: 'left' | 'right' }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      {dir === 'left' ? <path d="M15 5l-7 7 7 7" /> : <path d="M9 5l7 7-7 7" />}
    </svg>
  );
}

export function StoryViewer({ vm }: Props) {
  if (!vm.story) return null;

  return (
    <div
      role="dialog"
      aria-label="Story"
      aria-modal="true"
      className="fixed inset-0 z-[80] flex animate-[gd-fade_180ms_ease] items-center justify-center bg-black/85 p-3 backdrop-blur-sm min-[800px]:gap-4 min-[800px]:p-6"
      onClick={vm.closeStory}
    >
      {/* Seta anterior — fora do frame (estilo Instagram desktop) */}
      <button
        type="button"
        aria-label="Story anterior"
        disabled={!vm.storyHasPrev}
        onClick={(e) => {
          e.stopPropagation();
          vm.storyPrev();
        }}
        className={`hidden h-11 w-11 flex-none place-items-center rounded-full transition-colors min-[800px]:grid ${
          vm.storyHasPrev
            ? 'bg-white/15 text-white hover:bg-white/25'
            : 'pointer-events-none bg-white/5 text-white/25'
        }`}
      >
        <ArrowIcon dir="left" />
      </button>

      {/* Frame 9:16 */}
      <div
        className="relative aspect-[9/16] w-[min(420px,calc(100vw-24px),calc((100dvh-24px)*9/16))] max-h-[calc(100dvh-24px)] overflow-hidden rounded-[18px] bg-[#0a0d10] shadow-[0_24px_80px_rgba(0,0,0,0.55)] min-[800px]:w-[min(420px,calc(100vw-120px),calc((100dvh-48px)*9/16))] min-[800px]:max-h-[calc(100dvh-48px)] min-[800px]:rounded-[24px]"
        onClick={vm.stop}
      >
        <img
          src={vm.story.img}
          alt={vm.story.alt}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 from-0% via-transparent via-[22%] to-black/75 to-100%" />

        {/* Zonas de toque (mobile / dentro do card) */}
        <button
          type="button"
          aria-label="Story anterior"
          className="absolute bottom-0 left-0 top-0 z-[1] w-[30%]"
          onClick={vm.storyPrev}
        />
        <button
          type="button"
          aria-label="Próximo story"
          className="absolute bottom-0 right-0 top-0 z-[1] w-[70%]"
          onClick={vm.storyNext}
        />

        {/* Setas dentro do frame no mobile */}
        {vm.storyHasPrev ? (
          <button
            type="button"
            aria-label="Story anterior"
            onClick={vm.storyPrev}
            className="absolute left-2 top-1/2 z-[3] grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-black/40 text-white backdrop-blur-sm min-[800px]:hidden"
          >
            <ArrowIcon dir="left" />
          </button>
        ) : null}
        {vm.storyHasNext ? (
          <button
            type="button"
            aria-label="Próximo story"
            onClick={vm.storyNext}
            className="absolute right-2 top-1/2 z-[3] grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-black/40 text-white backdrop-blur-sm min-[800px]:hidden"
          >
            <ArrowIcon dir="right" />
          </button>
        ) : null}

        {/* Progress bars */}
        <div className="absolute left-0 right-0 top-0 z-[2] flex gap-[4px] px-3 pt-3">
          {vm.storyBars.map((b, i) => (
            <span key={i} className="h-[2.5px] flex-1 overflow-hidden rounded-full bg-white/30">
              <span className="block h-full rounded-full bg-white" style={{ width: b.w }} />
            </span>
          ))}
        </div>

        {/* Header */}
        <div className="absolute left-3 right-3 top-7 z-[2] flex items-center gap-2.5">
          <img
            src={vm.story.av}
            alt=""
            className="h-9 w-9 rounded-full border-2 border-white/80 object-cover"
          />
          <div className="min-w-0 flex-1">
            <p className="m-0 truncate text-[14px] font-semibold">{vm.story.name}</p>
            <p className="mt-0.5 text-[11px] text-white/70">{vm.story.time}</p>
          </div>
          <button
            type="button"
            onClick={vm.closeStory}
            aria-label="Fechar story"
            className="grid h-9 w-9 place-items-center rounded-full bg-black/35 text-white"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        {/* Reply + reactions */}
        <div className="absolute bottom-3 left-3 right-3 z-[2] flex items-center gap-2">
          <div className="flex h-11 flex-1 items-center rounded-full border border-white/35 bg-black/25 px-3.5">
            <input
              placeholder="Responder..."
              aria-label="Responder story"
              className="w-full border-none bg-transparent text-[14px] text-white outline-none placeholder:text-white/55"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          {vm.quickReactions.map((q, i) => (
            <button
              key={i}
              type="button"
              onClick={q.send}
              aria-label="Reagir"
              className="grid h-10 w-10 flex-none place-items-center rounded-full bg-black/35 text-lg"
            >
              {q.emoji}
            </button>
          ))}
        </div>
      </div>

      {/* Seta próximo — fora do frame */}
      <button
        type="button"
        aria-label="Próximo story"
        disabled={!vm.storyHasNext}
        onClick={(e) => {
          e.stopPropagation();
          vm.storyNext();
        }}
        className={`hidden h-11 w-11 flex-none place-items-center rounded-full transition-colors min-[800px]:grid ${
          vm.storyHasNext
            ? 'bg-white/15 text-white hover:bg-white/25'
            : 'pointer-events-none bg-white/5 text-white/25'
        }`}
      >
        <ArrowIcon dir="right" />
      </button>
    </div>
  );
}
