import type { GoodayHomeViewModel } from "@/lib/gooday/useGoodayHome";

type FeedItem = GoodayHomeViewModel["feed"][number];

type Props = {
  post: FeedItem;
  reactionsEnabled: boolean;
};

export function FeedPost({ post, reactionsEnabled }: Props) {
  return (
    <article className="rounded-[var(--gd-radius-card)] border border-[color:var(--gd-card-border)] bg-gd-card px-3.5 pb-2.5 pt-3.5 min-[800px]:border-b min-[800px]:border-[color:var(--gd-card-border)]">
      <header className="flex items-start gap-3">
        <button type="button" onClick={post.openAuthor} className="cursor-pointer">
          <img
            src={post.av}
            alt=""
            className="h-11 w-11 rounded-full border-[1.5px] border-gd-brand p-[1.5px] object-cover min-[800px]:h-[46px] min-[800px]:w-[46px]"
          />
        </button>
        <div className="min-w-0 flex-1">
          <button
            type="button"
            onClick={post.openAuthor}
            className="m-0 cursor-pointer text-left text-[15px] font-semibold tracking-[-0.01em]"
          >
            {post.handle}
          </button>
          <p className="mt-[3px] flex items-center gap-1.5 text-[13px] text-gd-text-subtle">
            <svg width="18" height="10" viewBox="0 0 26 14" fill="none" stroke="currentColor" strokeWidth="1.6">
              <circle cx="7" cy="7" r="5" />
              <circle cx="19" cy="7" r="5" />
            </svg>
            <button type="button" onClick={post.openPost} className="cursor-pointer">
              {post.time}
              {post.groupLabel}
            </button>
          </p>
        </div>
        <button
          type="button"
          onClick={post.menu}
          aria-label="Mais opções"
          className="grid h-10 w-10 place-items-center rounded-[10px] text-gd-text-muted"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="5.5" r="1.7" />
            <circle cx="12" cy="12" r="1.7" />
            <circle cx="12" cy="18.5" r="1.7" />
          </svg>
        </button>
      </header>

      <p className="mx-0.5 mt-3 text-[15px] leading-[1.55] text-gd-text-secondary text-pretty">{post.text}</p>

      {post.hasTags ? (
        <div className="mx-0.5 mt-3 flex flex-wrap gap-2">
          {post.tags.map((t, i) => (
            <span
              key={i}
              className="inline-flex h-[30px] items-center rounded-full border border-gd-brand bg-gd-brand/20 px-3 text-[13px] font-medium text-gd-text"
            >
              {t.label}
            </span>
          ))}
        </div>
      ) : null}

      {post.hasImg ? (
        <button
          type="button"
          onClick={post.like2x}
          className="-mx-3.5 mt-3 block w-[calc(100%+1.75rem)] overflow-hidden bg-gd-elevated min-[800px]:mx-0 min-[800px]:mt-3.5 min-[800px]:w-full min-[800px]:rounded-[var(--gd-radius-media)]"
        >
          <img src={post.img} alt={post.alt} className="block aspect-[4/3] w-full object-cover" />
        </button>
      ) : null}

      {post.hasReactions ? (
        <div className="mx-0.5 mt-3 flex items-center gap-1.5">
          {post.reactions.map((r, i) => (
            <span
              key={i}
              className="inline-flex h-[30px] items-center gap-1.5 rounded-full border px-2.5 text-[13px] text-gd-text-secondary"
              style={{ background: r.bg, borderColor: r.border }}
            >
              {r.emoji} {r.count}
            </span>
          ))}
        </div>
      ) : null}

      <footer className="mt-2.5 flex items-center gap-0.5 pt-1 min-[800px]:mt-3 min-[800px]:gap-1.5 min-[800px]:pt-1.5">
        <button
          type="button"
          onClick={post.toggleLike}
          aria-label="Curtir"
          className="flex h-11 items-center gap-2 rounded-xl px-2.5 text-sm font-medium"
          style={{ color: post.likeColor }}
        >
          <span className="grid place-items-center" style={{ animation: post.likeAnim }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill={post.likeFill} stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round">
              <path d="M12 20s-7.2-4.4-9-9a4.8 4.8 0 019-2.6A4.8 4.8 0 0121 11c-1.8 4.6-9 9-9 9z" />
            </svg>
          </span>
          {post.likes}
        </button>
        <button
          type="button"
          onClick={post.openComments}
          aria-label="Comentar"
          className="flex h-11 items-center gap-2 rounded-xl px-2.5 text-sm font-medium text-gd-text-muted"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 12a7.5 7.5 0 01-10.9 6.7L4 20l1.4-4.2A7.5 7.5 0 1120 12z" />
          </svg>
          {post.comments}
        </button>
        {reactionsEnabled ? (
          <button
            type="button"
            onClick={post.openReactions}
            aria-label="Reagir"
            className="flex h-11 items-center rounded-xl px-2.5 text-gd-text-muted"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
              <circle cx="12" cy="12" r="9" />
              <path d="M9 10h.01M15 10h.01M8.6 14.4a4.4 4.4 0 006.8 0" />
            </svg>
          </button>
        ) : null}
        <button
          type="button"
          onClick={post.openShare}
          aria-label="Compartilhar"
          className="flex h-11 items-center rounded-xl px-2.5 text-gd-text-muted"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 13.5c3.5-6.5 8-7.5 11-7.5V3l5 5.5-5 5.5v-3c-4 0-8 .8-11 3.5z" />
          </svg>
        </button>
        <span className="flex-1" />
        <button
          type="button"
          onClick={post.toggleSave}
          aria-label="Salvar"
          className="grid h-11 w-11 place-items-center rounded-xl"
          style={{ color: post.saveColor }}
        >
          <svg width="21" height="21" viewBox="0 0 24 24" fill={post.saveFill} stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round">
            <path d="M6.5 4h11a1 1 0 011 1v15l-6.5-4-6.5 4V5a1 1 0 011-1z" />
          </svg>
        </button>
      </footer>

      {post.hasPreview ? (
        <button
          type="button"
          onClick={post.openComments}
          className="mt-1 flex w-full items-center gap-2.5 border-t border-gd-elevated px-0.5 py-2.5 text-left"
        >
          <span className="flex">
            {post.commenters.map((a, i) => (
              <img
                key={i}
                src={a.src}
                alt=""
                className="-mr-2 h-[26px] w-[26px] rounded-full border-2 border-gd-card object-cover"
              />
            ))}
          </span>
          <span onClick={post.openPost} className="ml-2 cursor-pointer text-sm text-gd-text-muted">
            {post.previewLabel}
          </span>
        </button>
      ) : null}
    </article>
  );
}
