'use client';

import { useState } from 'react';
import type { GoodayHomeViewModel } from "@/lib/gooday/useGoodayHome";
import { StickySidebarColumn, StickySidebarScroll, ScrollFadeRow } from "./StickySidebarColumn";
import { PeopleSuggestions } from "./SidebarSuggestions";

type Community = GoodayHomeViewModel["communities"][number];

function CommunityCard({ c, compact }: { c: Community; compact?: boolean }) {
  return (
    <article
      onClick={c.open}
      className={`cursor-pointer rounded-[20px] bg-gd-card-alt transition-colors hover:bg-[#1D2329] ${
        compact ? "w-[216px] flex-none scroll-snap-align-start p-2.5" : "min-w-0 p-2.5"
      }`}
    >
      <div className={`relative rounded-[14px] bg-gd-elevated ${compact ? "h-[120px]" : "aspect-[16/10]"}`}>
        <img src={c.img} alt={c.name} className="block h-full w-full rounded-[14px] object-cover" />
        <div className="absolute bottom-[-14px] left-2 flex">
          {c.avatars.map((a, i) => (
            <img
              key={i}
              src={a.src}
              alt=""
              className="-mr-2 h-[28px] w-[28px] rounded-full border-2 border-gd-card object-cover"
            />
          ))}
        </div>
      </div>
      <div className="mt-[20px] flex items-center justify-between gap-1.5">
        <h3
          className={`m-0 min-w-0 truncate font-semibold tracking-[-0.01em] ${
            compact ? "text-base leading-[1.3]" : "text-[13px] leading-tight"
          }`}
        >
          {c.name}
        </h3>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            c.share(e);
          }}
          aria-label="Compartilhar comunidade"
          className="grid h-8 w-8 flex-none place-items-center rounded-[10px] text-gd-text-muted"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="5" r="2.6" />
            <circle cx="6" cy="12" r="2.6" />
            <circle cx="18" cy="19" r="2.6" />
            <path d="M8.4 10.8l7.2-4.2M8.4 13.2l7.2 4.2" />
          </svg>
        </button>
      </div>
      <div className="mt-1.5 flex flex-col gap-1.5 text-[12px] text-gd-text-muted">
        <span className="flex items-center gap-1.5 truncate">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="flex-none">
            <rect x="3.5" y="3.5" width="7" height="7" rx="2" />
            <rect x="13.5" y="3.5" width="7" height="7" rx="2" />
            <rect x="3.5" y="13.5" width="7" height="7" rx="2" />
            <rect x="13.5" y="13.5" width="7" height="7" rx="2" />
          </svg>
          {c.groups}
        </span>
        <span className="flex items-center gap-1.5 truncate">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="flex-none">
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

function SearchIcon({ active }: { active?: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" className={active ? 'text-gd-brand-light' : undefined}>
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.2-3.2" />
    </svg>
  );
}

function FilterIcon({ active }: { active?: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className={active ? 'text-gd-brand-light' : undefined}>
      <path d="M4 6h16M7 12h10M10 18h4" />
    </svg>
  );
}

function GroupsList({ vm }: Props) {
  return (
    <StickySidebarScroll fadeColor="var(--gd-bg)" className="gap-3" alwaysScrollable>
      {vm.railCommunities.length === 0 ? (
        <p className="m-0 px-1 py-6 text-center text-[13px] text-gd-text-subtle">Nenhum grupo encontrado.</p>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(190px,1fr))] gap-2.5">
          {vm.railCommunities.map((c, i) => (
            <CommunityCard key={i} c={c} />
          ))}
        </div>
      )}
      <button
        type="button"
        onClick={vm.openAllGroups}
        className="h-10 flex-none rounded-xl border border-white/[0.08] bg-gd-surface text-[13px] font-semibold text-gd-brand-soft transition-colors hover:bg-gd-elevated"
      >
        Ver tudo
      </button>
    </StickySidebarScroll>
  );
}

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

/** Painel direito minimalista — título/tabs à esquerda, lupa + filtro à direita. */
export function RightRail({ vm }: Props) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const isGroups = vm.railTab === 'groups';

  return (
    <StickySidebarColumn alwaysActive className="min-w-0">
      <div className="flex flex-none items-center gap-2">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          {vm.railTabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => {
                t.go();
                setSearchOpen(false);
                setFilterOpen(false);
              }}
              className={`relative pb-1 text-[15px] font-semibold transition-colors ${
                t.active ? 'text-white' : 'text-gd-text-subtle hover:text-gd-text-muted'
              }`}
            >
              {t.label}
              {t.active ? (
                <span className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-gd-brand" />
              ) : null}
            </button>
          ))}
        </div>

        <div className="flex flex-none items-center gap-0.5">
          <button
            type="button"
            onClick={() => {
              setSearchOpen((v) => !v);
              if (!searchOpen) setFilterOpen(false);
            }}
            aria-label={isGroups ? 'Buscar grupos' : 'Buscar pessoas'}
            aria-pressed={searchOpen}
            className={`grid h-9 w-9 place-items-center rounded-xl transition-colors ${
              searchOpen ? 'bg-gd-elevated text-gd-brand-light' : 'text-gd-text-muted hover:bg-gd-elevated hover:text-white'
            }`}
          >
            <SearchIcon active={searchOpen} />
          </button>
          {isGroups ? (
            <button
              type="button"
              onClick={() => {
                setFilterOpen((v) => !v);
                if (!filterOpen) setSearchOpen(false);
              }}
              aria-label="Filtrar grupos"
              aria-pressed={filterOpen}
              className={`grid h-9 w-9 place-items-center rounded-xl transition-colors ${
                filterOpen || vm.groupsFilters.some((f) => f.active && f.id !== 'all')
                  ? 'bg-gd-elevated text-gd-brand-light'
                  : 'text-gd-text-muted hover:bg-gd-elevated hover:text-white'
              }`}
            >
              <FilterIcon active={filterOpen} />
            </button>
          ) : null}
        </div>
      </div>

      {searchOpen ? (
        <div className="flex h-10 flex-none items-center gap-2 rounded-xl border border-gd-border bg-gd-surface px-3">
          <SearchIcon />
          <input
            autoFocus
            value={isGroups ? vm.groupsSearchQ : vm.peopleSearchQ}
            onChange={isGroups ? vm.onGroupsSearch : vm.onPeopleSearch}
            placeholder={isGroups ? 'Buscar grupos...' : 'Buscar pessoas...'}
            aria-label={isGroups ? 'Buscar grupos' : 'Buscar pessoas'}
            className="min-w-0 flex-1 border-none bg-transparent text-[13px] text-white outline-none placeholder:text-gd-text-subtle"
          />
          {(isGroups ? vm.groupsSearchQ : vm.peopleSearchQ) ? (
            <button
              type="button"
              onClick={isGroups ? vm.clearGroupsSearch : vm.clearPeopleSearch}
              aria-label="Limpar busca"
              className="grid h-6 w-6 place-items-center rounded-full bg-gd-border text-[12px] text-gd-text-muted"
            >
              ×
            </button>
          ) : null}
        </div>
      ) : null}

      {isGroups && filterOpen ? (
        <ScrollFadeRow fadeColor="var(--gd-bg)" className="pb-0.5">
          <div className="flex gap-1.5 pr-1">
            {vm.groupsFilters.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={f.go}
                className={`h-7 flex-none rounded-full px-3 text-[11px] font-semibold whitespace-nowrap ${
                  f.active ? 'bg-gd-brand text-white' : 'bg-gd-surface text-gd-text-muted'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </ScrollFadeRow>
      ) : null}

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        {isGroups ? <GroupsList vm={vm} /> : <PeopleSuggestions vm={vm} compact />}
      </div>
    </StickySidebarColumn>
  );
}

/** Alias legado */
export function CommunitiesRail({ vm }: Props) {
  return <RightRail vm={vm} />;
}
