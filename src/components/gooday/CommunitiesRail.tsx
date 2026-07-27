import type { GoodayHomeViewModel } from "@/lib/gooday/useGoodayHome";

type Community = GoodayHomeViewModel["communities"][number];

function CommunityCard({ c, compact }: { c: Community; compact?: boolean }) {
  return (
    <article
      onClick={c.open}
      className={`cursor-pointer rounded-[20px] bg-gd-card-alt transition-colors hover:bg-[#1D2329] ${compact ? "w-[216px] flex-none scroll-snap-align-start p-2.5" : "flex-none p-3"}`}
    >
      <div className={`relative rounded-[14px] bg-gd-elevated ${compact ? "h-[120px]" : "h-[130px]"}`}>
        <img src={c.img} alt={c.name} className="block h-full w-full rounded-[14px] object-cover" />
        <div className="absolute bottom-[-14px] left-2 flex">
          {c.avatars.map((a, i) => (
            <img
              key={i}
              src={a.src}
              alt=""
              className="-mr-2 h-[30px] w-[30px] rounded-full border-2 border-gd-card object-cover"
            />
          ))}
        </div>
      </div>
      <div className={`flex items-center justify-between gap-2 ${compact ? "mt-[22px]" : "mt-[22px]"}`}>
        <h3 className={`m-0 font-semibold tracking-[-0.01em] ${compact ? "text-base leading-[1.3]" : "text-[15px]"}`}>
          {c.name}
        </h3>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            c.share(e);
          }}
          aria-label="Compartilhar comunidade"
          className="grid h-9 w-9 place-items-center rounded-[10px] text-gd-text-muted"
        >
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="5" r="2.6" />
            <circle cx="6" cy="12" r="2.6" />
            <circle cx="18" cy="19" r="2.6" />
            <path d="M8.4 10.8l7.2-4.2M8.4 13.2l7.2 4.2" />
          </svg>
        </button>
      </div>
      <div className="mt-2 flex flex-col gap-2 text-sm text-gd-text-muted">
        <span className="flex items-center gap-2">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
            <rect x="3.5" y="3.5" width="7" height="7" rx="2" />
            <rect x="13.5" y="3.5" width="7" height="7" rx="2" />
            <rect x="3.5" y="13.5" width="7" height="7" rx="2" />
            <rect x="13.5" y="13.5" width="7" height="7" rx="2" />
          </svg>
          {c.groups}
        </span>
        <span className="flex items-center gap-2">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="8" r="3.2" />
            <path d="M3.5 19c.6-3 2.9-4.6 5.5-4.6s4.9 1.6 5.5 4.6" />
            <path d="M17.5 12.5l1.6-1.6a1.6 1.6 0 10-2.3-2.3l-.3.4-.3-.4a1.6 1.6 0 10-2.3 2.3z" />
          </svg>
          {c.members}
        </span>
      </div>
    </article>
  );
}

type Props = {
  vm: GoodayHomeViewModel;
};

export function CommunitiesCarousel({ vm }: Props) {
  if (!vm.showCommunities) return null;

  return (
    <section
      aria-label="Comunidades recomendadas"
      className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto pb-4 pl-6 pr-4"
    >
      {vm.communities.map((c, i) => (
        <CommunityCard key={i} c={c} compact />
      ))}
    </section>
  );
}

export function CommunitiesRail({ vm }: Props) {
  return (
    <aside className="gooday-sidebar-sticky flex min-w-0 flex-col gap-3.5">
      <div className="no-scrollbar flex min-h-0 flex-1 flex-col gap-3.5 overflow-y-auto">
        {vm.railCommunities.map((c, i) => (
          <CommunityCard key={i} c={c} />
        ))}
        <button
          type="button"
          onClick={vm.openAllGroups}
          className="h-10 flex-none rounded-xl border border-white/[0.08] bg-gd-surface text-[13px] font-semibold text-gd-brand-soft transition-colors hover:bg-gd-elevated"
        >
          Ver tudo
        </button>
      </div>
    </aside>
  );
}
