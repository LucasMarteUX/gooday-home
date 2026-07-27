'use client';

import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
  type ChangeEvent,
  type KeyboardEvent,
  type MouseEvent,
  type CSSProperties,
  type ReactNode,
} from 'react';
import {
  U,
  STORIES,
  COMMUNITIES,
  POSTS,
  NOTIFS,
  CONVERSATIONS,
  MEMBER_ROLES,
  EMOJIS,
  EXTRA_KEYS,
  USER_META,
  GROUP_FILTERS,
  CREATE_MEDIA_SAMPLES,
  type GroupFilterId,
  type CommunityData,
} from './data';
import {
  renderGoodayIcon,
  CreateTabIcon,
  CreateIcon,
  type GoodayIconName,
} from '@/components/gooday/icons';
import { CreateComposer, CreatePicker } from '@/components/gooday/CreateComposer';
import { EmojiPicker } from '@/components/gooday/EmojiPicker';
import { useBodyScrollLock } from './uiGuards';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type GoodayHomeProps = {
  contextMessage?: string;
  showCommunities?: boolean;
  reactionsEnabled?: boolean;
  showSuggestions?: boolean;
  storyDurationMs?: number;
};

type ViewKind =
  | 'search'
  | 'person'
  | 'group'
  | 'post'
  | 'messages'
  | 'chat'
  | 'profile'
  | 'editProfile'
  | 'members'
  | 'follows'
  | 'groups'
  | 'settings'
  | 'changeEmail'
  | 'changePassword'
  | null;

type SheetKind =
  | 'createPicker'
  | 'create'
  | 'story'
  | 'comments'
  | 'reactions'
  | 'share'
  | 'menu'
  | 'notifications'
  | 'avatar'
  | 'logout'
  | 'search'
  | null;

type TabId = 'home' | 'search' | 'create' | 'chat' | 'saved' | 'groups';

type UserProfile = { name: string; handle: string; av: string };

type ThreadComment = { u: string; t: string; time: string };

type Post = {
  id: string;
  u: string;
  time: string;
  group: string;
  text: string;
  tags: string[];
  img: string;
  alt: string;
  likes: number;
  liked: boolean;
  saved: boolean;
  comments: number;
  reactions: Record<string, number>;
  commenters: string[];
  thread: ThreadComment[];
};

type Conversation = {
  u: string;
  unread: number;
  online: boolean;
  msgs: { me: boolean; t: string; time: string }[];
};

type Notification = {
  g: string;
  u: string;
  t: string;
  time: string;
  unread: boolean;
  action?: string;
};

type EditProfile = {
  name: string;
  user: string;
  bio: string;
  loc: string;
};

type StackEntry = { kind: ViewKind; param: string | null };

const SHEET_STYLES = {
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    minHeight: 52,
    padding: '6px 4px',
    width: '100%',
    textAlign: 'left' as const,
    fontSize: 15,
    color: '#E1E4E8',
    borderRadius: 12,
  },
  av: {
    width: 40,
    height: 40,
    borderRadius: 999,
    objectFit: 'cover' as const,
    flex: 'none' as const,
  },
  sub: { margin: '2px 0 0', fontSize: 13, color: '#7B818C' },
  primary: {
    height: 48,
    borderRadius: 14,
    background: '#4667F5',
    color: '#fff',
    fontWeight: 600,
    fontSize: 15,
    width: '100%',
  },
};

type StoryItem = { u: string; img: string; alt: string; time: string; seen: boolean };

function cloneStories(): StoryItem[] {
  return STORIES.map((s) => ({ ...s }));
}

function parseTags(text: string): string[] {
  const matches = text.match(/#[\w\u00C0-\u024F]+/g);
  return matches ? [...new Set(matches)] : [];
}

function resetCreateDraft() {
  return {
    draft: '',
    media: '',
    mediaAlt: '',
    audience: 'Todos',
    location: '',
    group: '',
    tagged: [] as string[],
    showMediaPicker: false,
    mode: 'post' as 'post' | 'story',
  };
}

function clonePosts(): Post[] {
  return POSTS.map((p) => ({
    ...p,
    reactions: { ...p.reactions } as Record<string, number>,
    thread: [...p.thread],
  }));
}

function cloneNotifs(): Notification[] {
  return NOTIFS.map((n) => ({ ...n }));
}

function cloneConvs(): Conversation[] {
  return CONVERSATIONS.map((c) => ({ ...c, msgs: c.msgs.slice() }));
}

function defer(fn: () => void) {
  queueMicrotask(fn);
}

/** View-model shape returned as `vm` from the hook. */
export type GoodayHomeViewModel = ReturnType<typeof useGoodayHome>['vm'];

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useGoodayHome({
  contextMessage = 'Respeite sua mente e trate seu corpo bem.',
  showCommunities = true,
  reactionsEnabled = true,
  showSuggestions = true,
  storyDurationMs = 5000,
}: GoodayHomeProps = {}) {
  const [w, setW] = useState(1200);
  const [tab, setTab] = useState<TabId>('home');
  const [posts, setPosts] = useState<Post[]>(clonePosts);
  const [popped, setPopped] = useState<string | null>(null);
  const [storyIdx, setStoryIdx] = useState<number | null>(null);
  const [storyP, setStoryP] = useState(0);
  const [seen, setSeen] = useState<Record<number, boolean>>({});
  const [sheet, setSheet] = useState<SheetKind>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [notifs, setNotifs] = useState<Notification[]>(cloneNotifs);
  const [following, setFollowing] = useState<Record<string, boolean>>({});
  const [draft, setDraft] = useState('');
  const [comment, setComment] = useState('');
  const [commentEmojiOpen, setCommentEmojiOpen] = useState(false);
  const [view, setView] = useState<ViewKind>(null);
  const [viewParam, setViewParam] = useState<string | null>(null);
  const [stack, setStack] = useState<StackEntry[]>([]);
  const [convs, setConvs] = useState<Conversation[]>(cloneConvs);
  const [convKey, setConvKey] = useState<string | null>(null);
  const [msgDraft, setMsgDraft] = useState('');
  const [searchQ, setSearchQ] = useState('');
  const [joined, setJoined] = useState<Record<string, boolean>>({
    'Corrida 5K': true,
    'Nutrição Consciente': true,
    'Treino Funcional': true,
  });
  const [profileTab, setProfileTab] = useState('Publicações');
  const [storiesList, setStoriesList] = useState<StoryItem[]>(cloneStories);
  const [createDraft, setCreateDraft] = useState('');
  const [createMedia, setCreateMedia] = useState('');
  const [createMediaAlt, setCreateMediaAlt] = useState('');
  const [createAudience, setCreateAudience] = useState('Todos');
  const [createLocation, setCreateLocation] = useState('');
  const [createGroup, setCreateGroup] = useState('');
  const [createTagged, setCreateTagged] = useState<string[]>([]);
  const [createShowMediaPicker, setCreateShowMediaPicker] = useState(false);
  const [createMode, setCreateMode] = useState<'post' | 'story'>('post');
  const [groupsSearchQ, setGroupsSearchQ] = useState('');
  const [groupsFilter, setGroupsFilter] = useState<GroupFilterId>('all');
  const [peopleSearchQ, setPeopleSearchQ] = useState('');
  const [railTab, setRailTab] = useState<'groups' | 'people'>('groups');
  const [edit, setEdit] = useState<EditProfile>({
    name: 'Marcos Vinícius',
    user: '@marcos_v',
    bio: 'Corrida, comida de verdade e rotina leve. Um dia bom por vez.',
    loc: 'São Paulo, SP',
  });
  const [accountEmail, setAccountEmail] = useState('marcos.v@email.com');
  const [emailDraft, setEmailDraft] = useState('');
  const [passwordDraft, setPasswordDraft] = useState({
    current: '',
    next: '',
    confirm: '',
  });

  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const popTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const storyTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const storyNextRef = useRef<() => void>(() => {});

  const user = useCallback((k: string): UserProfile => {
    return k === 'me' ? U.me : (U[k as keyof typeof U] as UserProfile);
  }, []);

  const flash = useCallback((msg: string) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast(msg);
    toastTimerRef.current = setTimeout(() => setToast(null), 2600);
  }, []);

  const viewRef = useRef(view);
  const viewParamRef = useRef(viewParam);
  viewRef.current = view;
  viewParamRef.current = viewParam;

  const closeSheet = useCallback(() => {
    setCommentEmojiOpen(false);
    setSheet(null);
  }, []);

  useBodyScrollLock(!!sheet || storyIdx !== null || !!view);

  const go = useCallback((kind: ViewKind, param?: string | null) => {
    setStack((s) => [...s, { kind: viewRef.current, param: viewParamRef.current }]);
    setView(kind);
    setViewParam(param ?? null);
    setCommentEmojiOpen(false);
    setSheet(null);
    window.scrollTo({ top: 0 });
  }, []);

  const back = useCallback(() => {
    setStack((s) => {
      const nextStack = s.slice();
      const prev = nextStack.pop() ?? { kind: null, param: null };
      setView(prev.kind);
      setViewParam(prev.param);
      return nextStack;
    });
  }, []);

  const sendMsg = useCallback(() => {
    const t = msgDraft.trim();
    if (!t || !convKey) return;
    setMsgDraft('');
    setConvs((s) =>
      s.map((c) =>
        c.u === convKey ? { ...c, msgs: [...c.msgs, { me: true, t, time: 'agora' }] } : c,
      ),
    );
  }, [msgDraft, convKey]);

  const openChat = useCallback(
    (u: string) => {
      setConvKey(u);
      setConvs((s) => s.map((c) => (c.u === u ? { ...c, unread: 0 } : c)));
      setStack((s) => [...s, { kind: viewRef.current, param: viewParamRef.current }]);
      setView('chat');
      setViewParam(u);
      setSheet(null);
      window.scrollTo({ top: 0 });
    },
    [],
  );

  const toggleJoin = useCallback(
    (name: string) => {
      setJoined((s) => {
        const next = !s[name];
        defer(() => flash(next ? 'Solicitação enviada' : 'Solicitação cancelada'));
        return { ...s, [name]: next };
      });
    },
    [flash],
  );

  const closeStory = useCallback(() => {
    if (storyTimerRef.current) clearInterval(storyTimerRef.current);
    setStoryIdx(null);
    setStoryP(0);
  }, []);

  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (commentEmojiOpen) {
        setCommentEmojiOpen(false);
        return;
      }
      if (storyIdx !== null) {
        closeStory();
        return;
      }
      if (sheet) {
        closeSheet();
        return;
      }
      if (view) back();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [commentEmojiOpen, storyIdx, sheet, view, back, closeSheet, closeStory]);

  const storyNext = useCallback(() => {
    setStoryIdx((i) => {
      if (i === null) return null;
      if (i + 1 >= storiesList.length) {
        defer(closeStory);
        return i;
      }
      defer(() => openStoryRef.current(i + 1));
      return i;
    });
  }, [closeStory]);

  const openStoryRef = useRef<(i: number) => void>(() => {});

  const openStory = useCallback(
    (i: number) => {
      setStoryIdx(i);
      setStoryP(0);
      setSeen((s) => ({ ...s, [i]: true }));
      if (storyTimerRef.current) clearInterval(storyTimerRef.current);
      const step = 60;
      const dur = storyDurationMs;
      storyTimerRef.current = setInterval(() => {
        setStoryP((prev) => {
          const next = prev + (step / dur) * 100;
          if (next >= 100) {
            defer(() => storyNextRef.current());
            return 0;
          }
          return next;
        });
      }, step);
    },
    [storyDurationMs],
  );

  openStoryRef.current = openStory;
  storyNextRef.current = storyNext;

  const storyPrev = useCallback(() => {
    setStoryIdx((i) => {
      if (i === null) return null;
      defer(() => openStoryRef.current(Math.max(0, i - 1)));
      return i;
    });
  }, []);

  const toggleLike = useCallback((id: string, force?: boolean) => {
    setPopped(id);
    setPosts((s) =>
      s.map((p) => {
        if (p.id !== id) return p;
        const liked = force ? true : !p.liked;
        if (force && p.liked) return p;
        return { ...p, liked, likes: p.likes + (liked ? 1 : -1) };
      }),
    );
    if (popTimerRef.current) clearTimeout(popTimerRef.current);
    popTimerRef.current = setTimeout(() => setPopped(null), 300);
  }, []);

  const toggleSave = useCallback(
    (id: string) => {
      let saved = false;
      setPosts((s) =>
        s.map((p) => {
          if (p.id !== id) return p;
          saved = !p.saved;
          return { ...p, saved };
        }),
      );
      defer(() => flash(saved ? 'Publicação salva' : 'Removida dos salvos'));
    },
    [flash],
  );

  const react = useCallback((id: string, emoji: string) => {
    setSheet(null);
    setPosts((s) =>
      s.map((p) =>
        p.id === id
          ? { ...p, reactions: { ...p.reactions, [emoji]: (p.reactions[emoji] || 0) + 1 } }
          : p,
      ),
    );
  }, []);

  const addComment = useCallback((id: string) => {
    const t = comment.trim();
    if (!t) return;
    setComment('');
    setPosts((s) =>
      s.map((p) =>
        p.id === id
          ? {
              ...p,
              comments: p.comments + 1,
              thread: [...p.thread, { u: 'me', t, time: 'agora' }],
            }
          : p,
      ),
    );
  }, [comment]);

  const publish = useCallback(() => {
    const t = createDraft.trim();
    if (!t && !createMedia) {
      flash('Adicione uma foto ou legenda antes de publicar');
      return;
    }
    const post: Post = {
      id: 'n' + Date.now(),
      u: 'me',
      time: 'agora',
      group: createGroup,
      text: t,
      tags: parseTags(t),
      img: createMedia,
      alt: createMediaAlt || 'Publicação',
      likes: 0,
      liked: false,
      saved: false,
      comments: 0,
      reactions: {},
      commenters: [],
      thread: [],
    };
    setSheet(null);
    setCreateDraft('');
    setCreateMedia('');
    setCreateMediaAlt('');
    setCreateGroup('');
    setCreateTagged([]);
    setCreateShowMediaPicker(false);
    setPosts((s) => [post, ...s]);
    defer(() => flash('Publicação compartilhada'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [createDraft, createMedia, createMediaAlt, createGroup, flash]);

  const publishStory = useCallback(() => {
    if (!createMedia && !createDraft.trim()) {
      flash('Adicione uma foto ou legenda ao story');
      return;
    }
    const sample = CREATE_MEDIA_SAMPLES.find((m) => m.img === createMedia);
    const story: StoryItem = {
      u: 'me',
      img: createMedia || CREATE_MEDIA_SAMPLES[0].img,
      alt: createMediaAlt || sample?.alt || createDraft.trim() || 'Seu story',
      time: 'agora',
      seen: false,
    };
    setStoriesList((s) => [story, ...s]);
    setSheet(null);
    setCreateDraft('');
    setCreateMedia('');
    setCreateMediaAlt('');
    setCreateShowMediaPicker(false);
    defer(() => flash('Story publicado'));
  }, [createDraft, createMedia, createMediaAlt, flash]);

  const openCreatePicker = useCallback(() => {
    setCreateMode('post');
    setCreateDraft('');
    setCreateMedia('');
    setCreateMediaAlt('');
    setCreateShowMediaPicker(false);
    setSheet('createPicker');
  }, []);

  const openCreatePost = useCallback(() => {
    setCreateMode('post');
    setSheet('create');
  }, []);

  const openCreateStorySheet = useCallback(() => {
    setCreateMode('story');
    setCreateDraft('');
    setCreateMedia('');
    setCreateMediaAlt('');
    setCreateShowMediaPicker(false);
    setSheet('story');
  }, []);

  useEffect(() => {
    const onResize = () => setW(window.innerWidth);
    onResize();
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      if (storyTimerRef.current) clearInterval(storyTimerRef.current);
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
      if (popTimerRef.current) clearTimeout(popTimerRef.current);
    };
  }, []);

  const icon = useCallback(
    (name: GoodayIconName, active: boolean, activeColor?: string, size?: number): ReactNode => {
      if (name === 'create') return <CreateIcon active={active} activeColor={activeColor ?? '#C3C7CF'} size={size ?? 16} />;
      return renderGoodayIcon(name, { active, activeColor, size });
    },
    [],
  );

  const sheetView = useCallback((): ReactNode => {
    const kind = sheet;
    if (!kind) return null;
    const S = SHEET_STYLES;
    const post = posts.find((p) => p.id === activeId);

    if (kind === 'createPicker') {
      return <CreatePicker onPost={openCreatePost} onStory={openCreateStorySheet} />;
    }

    if (kind === 'create' || kind === 'story') {
      return (
        <CreateComposer
          mode={createMode}
          draft={createDraft}
          onDraft={(e) => setCreateDraft(e.target.value)}
          media={createMedia}
          mediaAlt={createMediaAlt}
          audience={createAudience}
          location={createLocation}
          group={createGroup}
          taggedLabel={createTagged.length ? `${createTagged.length} pessoa(s)` : 'Adicionar'}
          showMediaPicker={createShowMediaPicker}
          mediaSamples={CREATE_MEDIA_SAMPLES}
          meAv={U.me.av}
          pickMedia={() => setCreateShowMediaPicker((v) => !v)}
          selectMedia={(i) => {
            const sample = CREATE_MEDIA_SAMPLES[i];
            setCreateMedia(sample.img);
            setCreateMediaAlt(sample.alt);
            setCreateShowMediaPicker(false);
          }}
          tagPeople={() => {
            setCreateTagged(['renata', 'tiago']);
            flash('Pessoas marcadas');
          }}
          addLocation={() => {
            setCreateLocation('São Paulo, SP');
            flash('Local adicionado');
          }}
          setAudience={() => {
            setCreateAudience((a) => (a === 'Todos' ? 'Seguidores' : a === 'Seguidores' ? 'Amigos próximos' : 'Todos'));
          }}
          pickGroup={() => {
            const idx = COMMUNITIES.findIndex((c) => c.name === createGroup);
            const next = COMMUNITIES[(idx + 1) % COMMUNITIES.length];
            setCreateGroup(next.name === createGroup ? '' : next.name);
          }}
          publishPost={publish}
          publishStory={publishStory}
        />
      );
    }

    if (kind === 'comments' && post) {
      const mentionQ = /@([a-zA-Z0-9_]*)$/.exec(comment);
      const mentionMatches = mentionQ
        ? Object.keys(U)
            .filter(
              (k) =>
                k !== 'me' &&
                (U[k as keyof typeof U] as UserProfile).handle
                  .slice(1)
                  .toLowerCase()
                  .startsWith(mentionQ[1].toLowerCase()),
            )
            .slice(0, 5)
        : [];
      const author = user(post.u);

      const threadList =
        post.thread.length === 0 ? (
          <p style={{ margin: '8px 0 16px', color: '#7B818C', fontSize: 15 }}>
            Ainda não há comentários. Seja a primeira pessoa a responder.
          </p>
        ) : (
          post.thread.map((c, i) => {
            const u = user(c.u);
            return (
              <div key={i} style={{ display: 'flex', gap: 12, padding: '10px 0' }}>
                <img src={u.av} alt="" style={S.av} />
                <div>
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 600 }}>{u.name}</p>
                  <p style={{ margin: '3px 0 0', fontSize: 15, color: '#C3C7CF', lineHeight: 1.5 }}>{c.t}</p>
                  <p style={S.sub}>{c.time} · Curtir · Responder</p>
                </div>
              </div>
            );
          })
        );

      const composer = (
        <div style={{ position: 'relative', flex: 'none' }}>
          {mentionMatches.length > 0 ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                padding: '8px 4px',
                background: '#1A1F24',
                border: '1px solid #2B3037',
                borderRadius: 12,
                marginBottom: 8,
              }}
            >
              {mentionMatches.map((k) => {
                const u = U[k as keyof typeof U] as UserProfile;
                return (
                  <button
                    key={k}
                    type="button"
                    onClick={() =>
                      setComment((prev) =>
                        prev.replace(/@([a-zA-Z0-9_]*)$/, '@' + u.handle.slice(1) + ' '),
                      )
                    }
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      height: 40,
                      padding: '0 8px',
                      borderRadius: 10,
                      textAlign: 'left',
                    }}
                  >
                    <img
                      src={u.av}
                      alt=""
                      style={{ width: 26, height: 26, borderRadius: 999, objectFit: 'cover' }}
                    />
                    <span style={{ fontSize: 14, color: '#E1E4E8' }}>{u.name}</span>
                    <span style={{ fontSize: 13, color: '#7B818C' }}>{u.handle}</span>
                  </button>
                );
              })}
            </div>
          ) : null}
          <div
            style={{
              display: 'flex',
              gap: 10,
              alignItems: 'center',
              paddingTop: 12,
              borderTop: '1px solid #22272D',
            }}
          >
            <img src={U.me.av} alt="" style={{ ...S.av, width: 36, height: 36 }} />
            <div style={{ position: 'relative', flex: 1 }}>
              {commentEmojiOpen ? (
                <EmojiPicker
                  onSelect={(e) => {
                    setComment((prev) => prev + e);
                    setCommentEmojiOpen(false);
                  }}
                  onClose={() => setCommentEmojiOpen(false)}
                />
              ) : null}
              <input
                value={comment}
                autoFocus
                placeholder="Escreva um comentário… use @ para marcar alguém"
                onChange={(e) => setComment(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') addComment(post.id);
                }}
                style={{
                  width: '100%',
                  height: 48,
                  borderRadius: 14,
                  background: '#22272D',
                  border: '1px solid #41474F',
                  padding: '0 44px 0 16px',
                  color: '#fff',
                  outline: 'none',
                  fontSize: 15,
                }}
              />
              <button
                type="button"
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation();
                  setCommentEmojiOpen((v) => !v);
                }}
                aria-label="Emoji"
                aria-expanded={commentEmojiOpen}
                style={{
                  position: 'absolute',
                  right: 6,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: 32,
                  height: 32,
                  borderRadius: 10,
                  background: commentEmojiOpen ? '#2B3037' : 'transparent',
                  fontSize: 18,
                  display: 'grid',
                  placeItems: 'center',
                }}
              >
                😊
              </button>
            </div>
            <button
              type="button"
              onClick={() => addComment(post.id)}
              style={{ ...S.primary, width: 92, flex: 'none' }}
            >
              Enviar
            </button>
          </div>
        </div>
      );

      if (w >= 800) {
        return (
          <div style={{ display: 'flex', gap: 20, flex: 1, minHeight: 0 }}>
            <div
              style={{
                flex: '0 0 44%',
                position: 'relative',
                borderRadius: 16,
                overflow: 'hidden',
                background: '#000',
              }}
            >
              {post.img ? (
                <img
                  src={post.img}
                  alt={post.alt}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              ) : (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 24,
                    background: '#151A1F',
                    color: '#C3C7CF',
                    fontSize: 18,
                    textAlign: 'center',
                    lineHeight: 1.5,
                  }}
                >
                  {post.text}
                </div>
              )}
            </div>
            <div
              style={{
                flex: '1 1 56%',
                display: 'flex',
                flexDirection: 'column',
                minWidth: 0,
                minHeight: 0,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 'none' }}>
                <img src={author.av} alt="" style={{ ...S.av, width: 40, height: 40 }} />
                <div>
                  <p style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>{author.handle}</p>
                  <p style={S.sub}>
                    {post.time}
                    {post.group ? ' · ' + post.group : ''}
                  </p>
                </div>
              </div>
              {post.img ? (
                <p
                  style={{
                    margin: '10px 0 0',
                    fontSize: 14,
                    color: '#C3C7CF',
                    lineHeight: 1.5,
                    flex: 'none',
                  }}
                >
                  {post.text}
                </p>
              ) : null}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '12px 0',
                  borderBottom: '1px solid #22272D',
                  flex: 'none',
                }}
              >
                <button
                  type="button"
                  onClick={() => toggleLike(post.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    height: 36,
                    padding: '0 8px',
                    borderRadius: 10,
                    color: post.liked ? '#F05A67' : '#9EA3AD',
                    fontSize: 13,
                    fontWeight: 500,
                  }}
                >
                  ♥ {post.likes}
                </button>
                <span style={{ fontSize: 13, color: '#9EA3AD' }}>{post.comments} comentários</span>
                <button
                  type="button"
                  onClick={() => {
                    setSheet('share');
                    setActiveId(post.id);
                  }}
                  style={{
                    marginLeft: 'auto',
                    height: 36,
                    padding: '0 12px',
                    borderRadius: 10,
                    color: '#9EA3AD',
                    fontSize: 13,
                    fontWeight: 500,
                  }}
                >
                  Compartilhar
                </button>
                <button
                  type="button"
                  onClick={() => toggleSave(post.id)}
                  style={{
                    height: 36,
                    padding: '0 12px',
                    borderRadius: 10,
                    color: post.saved ? '#6887FF' : '#9EA3AD',
                    fontSize: 13,
                    fontWeight: 500,
                  }}
                >
                  {post.saved ? 'Salvo' : 'Salvar'}
                </button>
              </div>
              <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '4px 0' }}>{threadList}</div>
              {composer}
            </div>
          </div>
        );
      }

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {threadList}
          {composer}
        </div>
      );
    }

    if (kind === 'reactions' && post) {
      return (
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', paddingBottom: 8 }}>
          {EMOJIS.map((e) => (
            <button
              key={e}
              type="button"
              onClick={() => react(post.id, e)}
              style={{
                width: 60,
                height: 60,
                borderRadius: 18,
                background: '#22272D',
                border: '1px solid #2B3037',
                fontSize: 26,
              }}
            >
              {e}
            </button>
          ))}
        </div>
      );
    }

    if (kind === 'share') {
      return (
        <div>
          <div style={{ display: 'flex', gap: 14, overflowX: 'auto', paddingBottom: 16 }}>
            {(['renata', 'tiago', 'nicole', 'bruno', 'julia', 'marina'] as const).map((k) => {
              const u = U[k];
              return (
                <button
                  key={k}
                  type="button"
                  onClick={() => {
                    setSheet(null);
                    defer(() => flash('Enviado para ' + u.name));
                  }}
                  style={{
                    flex: 'none',
                    width: 68,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  <img
                    src={u.av}
                    alt=""
                    style={{ width: 56, height: 56, borderRadius: 999, objectFit: 'cover' }}
                  />
                  <span style={{ fontSize: 12, color: '#9EA3AD', textAlign: 'center' }}>
                    {u.name.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>
          <div style={{ borderTop: '1px solid #22272D', paddingTop: 8 }}>
            {['Copiar link', 'Compartilhar em um grupo', 'Enviar por mensagem', 'Compartilhar fora do Gooday'].map(
              (l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => {
                    setSheet(null);
                    defer(() => flash(l === 'Copiar link' ? 'Link copiado' : l));
                  }}
                  style={S.row}
                >
                  {l}
                </button>
              ),
            )}
          </div>
        </div>
      );
    }

    if (kind === 'menu') {
      return (
        <div>
          {['Salvar publicação', 'Não tenho interesse', 'Deixar de seguir', 'Copiar link'].map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => {
                setSheet(null);
                defer(() => flash(l));
              }}
              style={S.row}
            >
              {l}
            </button>
          ))}
          <button
            type="button"
            onClick={() => {
              setSheet(null);
              defer(() => flash('Denúncia enviada'));
            }}
            style={{
              ...S.row,
              color: '#F05A67',
              borderTop: '1px solid #22272D',
              marginTop: 6,
              paddingTop: 12,
            }}
          >
            Denunciar
          </button>
        </div>
      );
    }

    if (kind === 'notifications') {
      const groups = ['Hoje', 'Esta semana'];
      return (
        <div>
          <button
            type="button"
            onClick={() => {
              setNotifs((s) => s.map((n) => ({ ...n, unread: false })));
              defer(() => flash('Todas marcadas como lidas'));
            }}
            style={{ fontSize: 14, fontWeight: 600, color: '#6887FF', paddingBottom: 8 }}
          >
            Marcar todas como lidas
          </button>
          {groups.map((g) => (
            <div key={g} style={{ paddingTop: 8 }}>
              <p
                style={{
                  margin: '0 0 4px',
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: '.04em',
                  color: '#7B818C',
                  textTransform: 'uppercase',
                }}
              >
                {g}
              </p>
              {notifs
                .filter((n) => n.g === g)
                .map((n, i) => {
                  const u = U[n.u as keyof typeof U] as UserProfile;
                  return (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        gap: 12,
                        alignItems: 'center',
                        padding: '10px 8px',
                        margin: '0 -8px',
                        borderRadius: 14,
                        background: n.unread ? 'rgba(70,103,245,.08)' : 'transparent',
                      }}
                    >
                      <img src={u.av} alt="" style={S.av} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ margin: 0, fontSize: 15, color: '#E1E4E8', lineHeight: 1.4 }}>
                          <strong style={{ fontWeight: 600 }}>{u.name}</strong> {n.t}
                        </p>
                        <p style={S.sub}>{n.time}</p>
                      </div>
                      {n.action ? (
                        <button
                          type="button"
                          onClick={() => flash(n.action!)}
                          style={{
                            height: 34,
                            padding: '0 12px',
                            borderRadius: 999,
                            background: '#4667F5',
                            color: '#fff',
                            fontSize: 13,
                            fontWeight: 600,
                            flex: 'none',
                          }}
                        >
                          {n.action}
                        </button>
                      ) : null}
                      {n.unread ? (
                        <span
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: 999,
                            background: '#4667F5',
                            flex: 'none',
                          }}
                        />
                      ) : null}
                    </div>
                  );
                })}
            </div>
          ))}
        </div>
      );
    }

    if (kind === 'avatar') {
      return (
        <div>
          <div
            style={{
              display: 'flex',
              gap: 12,
              alignItems: 'center',
              paddingBottom: 14,
              borderBottom: '1px solid #22272D',
            }}
          >
            <img
              src={U.me.av}
              alt=""
              style={{ width: 56, height: 56, borderRadius: 999, objectFit: 'cover' }}
            />
            <div>
              <p style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>Marcos Vinícius</p>
              <p style={S.sub}>@marcos_v · 148 seguidores</p>
            </div>
          </div>
          <div style={{ paddingTop: 8 }}>
            <button
              type="button"
              onClick={() => go('profile')}
              style={S.row}
            >
              Meu perfil
            </button>
            <button
              type="button"
              onClick={() => go('editProfile')}
              style={S.row}
            >
              Editar perfil
            </button>
            <button
              type="button"
              onClick={() => go('settings')}
              style={S.row}
            >
              Configurações
            </button>
            <button
              type="button"
              onClick={() => {
                closeSheet();
                defer(() => flash('Ajuda — próxima tela'));
              }}
              style={S.row}
            >
              Ajuda
            </button>
            <button
              type="button"
              onClick={() => setSheet('logout')}
              style={{
                ...S.row,
                color: '#F05A67',
                borderTop: '1px solid #22272D',
                marginTop: 6,
                paddingTop: 12,
              }}
            >
              Sair
            </button>
          </div>
        </div>
      );
    }

    if (kind === 'logout') {
      return (
        <div>
          <p style={{ margin: '0 0 20px', fontSize: 15, color: '#9EA3AD', lineHeight: 1.55 }}>
            Você poderá retornar à experiência a qualquer momento.
          </p>
          <div style={{ display: 'flex', gap: 10 }}>
            <button
              type="button"
              onClick={() => setSheet(null)}
              style={{
                flex: 1,
                height: 48,
                borderRadius: 14,
                background: '#2B3037',
                color: '#E1E4E8',
                fontWeight: 600,
              }}
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={() => {
                setSheet(null);
                defer(() => flash('Sessão encerrada (mock)'));
              }}
              style={{
                flex: 1,
                height: 48,
                borderRadius: 14,
                background: '#F05A67',
                color: '#fff',
                fontWeight: 600,
              }}
            >
              Sair
            </button>
          </div>
        </div>
      );
    }

    if (kind === 'search') {
      return (
        <p style={{ margin: '0 0 12px', fontSize: 15, color: '#9EA3AD', lineHeight: 1.55 }}>
          A busca com autocomplete de pessoas e grupos é a próxima tela do fluxo.
        </p>
      );
    }

    return null;
  }, [
    sheet,
    posts,
    activeId,
    createDraft,
    createMedia,
    createMediaAlt,
    createAudience,
    createLocation,
    createGroup,
    createTagged,
    createShowMediaPicker,
    createMode,
    comment,
    commentEmojiOpen,
    w,
    notifs,
    flash,
    publish,
    publishStory,
    openCreatePost,
    openCreateStorySheet,
    user,
    addComment,
    toggleLike,
    toggleSave,
    react,
    closeSheet,
    go,
  ]);

  function buildScreenVals(isDesktop: boolean) {
    const titles: Record<string, string> = {
      search: 'Buscar',
      person: 'Perfil',
      group: 'Grupo',
      post: 'Publicação',
      messages: 'Mensagens',
      chat: '',
      profile: 'Meu perfil',
      editProfile: 'Editar perfil',
      members: 'Membros',
      follows: 'Seguidores',
      groups: 'Meus grupos',
      settings: 'Configurações',
      changeEmail: 'Alterar e-mail',
      changePassword: 'Alterar senha',
    };
    const q = searchQ.trim().toLowerCase();
    const personKey = view === 'person' ? (viewParam || 'bruna') : null;
    const person = personKey ? (U[personKey as keyof typeof U] as UserProfile) : null;
    const groupName = view === 'group' ? (viewParam || COMMUNITIES[0].name) : null;
    const group = groupName
      ? COMMUNITIES.find((c) => c.name === groupName) || COMMUNITIES[0]
      : null;
    const postId = view === 'post' ? viewParam : null;
    const post = postId ? posts.find((p) => p.id === postId) : null;
    const conv = view === 'chat' ? convs.find((c) => c.u === convKey) : null;
    const chatUser = conv ? user(conv.u) : null;

    const personMeta = personKey ? USER_META[personKey] : null;
    const personPosts = person
      ? posts
          .filter((p) => p.u === personKey && p.img)
          .map((p) => ({ img: p.img, alt: p.alt, likes: p.likes + ' curtidas', open: () => go('post', p.id) }))
      : [];
    const groupPosts = groupName
      ? posts
          .filter((p) => p.group === groupName && p.img)
          .map((p) => {
            const u = user(p.u);
            return {
              av: u.av,
              handle: u.handle,
              time: p.time,
              text: p.text,
              img: p.img,
              alt: p.alt,
              likes: p.likes + '',
              comments: p.comments + '',
            };
          })
      : [];

    return {
      view,
      viewTitle: view ? titles[view] || '' : '',
      viewSearch: view === 'search',
      viewPerson: view === 'person',
      viewGroup: view === 'group',
      viewPost: view === 'post',
      viewMessages: view === 'messages',
      viewChat: view === 'chat',
      viewProfile: view === 'profile',
      viewEdit: view === 'editProfile',
      viewMembers: view === 'members',
      viewFollows: view === 'follows',
      viewGroups: view === 'groups',
      viewSettings: view === 'settings',
      viewChangeEmail: view === 'changeEmail',
      viewChangePassword: view === 'changePassword',
      back,
      searchQ,
      onSearch: (e: ChangeEvent<HTMLInputElement>) => setSearchQ(e.target.value),
      clearSearch: () => setSearchQ(''),
      searchHasQuery: q.length > 0,
      searchEmpty:
        q.length > 0 &&
        !Object.keys(U).some(
          (k) =>
            k !== 'me' &&
            ((U[k as keyof typeof U] as UserProfile).name.toLowerCase().includes(q) ||
              (U[k as keyof typeof U] as UserProfile).handle.toLowerCase().includes(q)),
        ) &&
        !COMMUNITIES.some((c) => c.name.toLowerCase().includes(q)),
      hasSearchPeople: Object.keys(U).some(
        (k) =>
          k !== 'me' &&
          (!q ||
            (U[k as keyof typeof U] as UserProfile).name.toLowerCase().includes(q) ||
            (U[k as keyof typeof U] as UserProfile).handle.toLowerCase().includes(q)),
      ),
      hasSearchGroups: COMMUNITIES.some((c) => !q || c.name.toLowerCase().includes(q)),
      hasPersonPosts: personPosts.length > 0,
      personNoPosts: !!person && personPosts.length === 0,
      searchPeople: Object.keys(U)
        .filter(
          (k) =>
            k !== 'me' &&
            (!q ||
              (U[k as keyof typeof U] as UserProfile).name.toLowerCase().includes(q) ||
              (U[k as keyof typeof U] as UserProfile).handle.toLowerCase().includes(q)),
        )
        .slice(0, 8)
        .map((k) => ({
          av: (U[k as keyof typeof U] as UserProfile).av,
          name: (U[k as keyof typeof U] as UserProfile).name,
          handle: (U[k as keyof typeof U] as UserProfile).handle,
          context: '3 interesses em comum',
          open: () => go('person', k),
        })),
      searchGroups: COMMUNITIES.filter((c) => !q || c.name.toLowerCase().includes(q))
        .slice(0, 6)
        .map((c) => ({
          img: c.img,
          name: c.name,
          meta: c.members + ' · ' + (c.name.length % 2 ? 'Público' : 'Privado'),
          open: () => go('group', c.name),
        })),
      recentSearches: ['corrida', 'nutrição', 'ciclismo urbano', 'yoga'].map((t) => ({
        label: t,
        go: () => setSearchQ(t),
      })),
      person: person
        ? {
            av: person.av,
            name: person.name,
            handle: person.handle,
            cover: personMeta?.cover || COMMUNITIES[1].img,
            bio: personMeta?.bio || 'Membro da comunidade Gooday.',
            loc: personMeta?.loc || 'Brasil',
            followers: personMeta ? String(personMeta.followers) : '1.248',
            following: personMeta ? String(personMeta.following) : '312',
            posts: personPosts.length + '',
            following_state: following[personKey!] ? 'Seguindo' : 'Seguir',
            followBg: following[personKey!] ? '#2B3037' : '#4667F5',
            toggleFollow: () =>
              setFollowing((s) => ({ ...s, [personKey!]: !s[personKey!] })),
            message: () => openChat(personKey!),
            openFollows: () => go('follows', personKey!),
            interests: (personMeta?.interests || ['Corrida', 'Nutrição', 'Yoga']).map((i) => ({ label: i })),
          }
        : null,
      personPosts,
      group: group
        ? {
            name: group.name,
            img: group.img,
            groups: group.groups,
            members: group.members,
            avatars: group.avs.map((k) => ({ src: user(k).av })),
            desc: group.description,
            status: group.isPublic ? 'Público' : 'Privado',
            joinLabel: joined[group.name]
              ? 'Participando'
              : group.isPublic
                ? 'Participar'
                : 'Solicitar entrada',
            joinBg: joined[group.name] ? '#2B3037' : '#4667F5',
            join: () => toggleJoin(group.name),
            openMembers: () => go('members', group.name),
          }
        : null,
      groupPosts,
      postView: post
        ? {
            av: user(post.u).av,
            handle: user(post.u).handle,
            time: post.time,
            text: post.text,
            img: post.img,
            alt: post.alt,
            hasImg: !!post.img,
            likes: post.likes + '',
            comments: post.comments + '',
            liked: post.liked,
            likeColor: post.liked ? '#F05A67' : '#9EA3AD',
            toggleLike: () => toggleLike(post.id),
            thread: post.thread.map((c, i) => ({
              key: i,
              av: user(c.u).av,
              name: user(c.u).name,
              text: c.t,
              time: c.time,
            })),
            openComments: () => {
              setSheet('comments');
              setActiveId(post.id);
            },
          }
        : null,
      conversations: convs.map((c) => {
        const u = user(c.u);
        const last = c.msgs[c.msgs.length - 1];
        return {
          av: u.av,
          name: u.name,
          last: (last.me ? 'Você: ' : '') + last.t,
          time: last.time,
          unread: c.unread > 0,
          unreadCount: c.unread + '',
          dot: c.online ? '#35C47A' : 'transparent',
          open: () => openChat(c.u),
        };
      }),
      chat: conv
        ? {
            name: chatUser!.name,
            av: chatUser!.av,
            status: conv.online ? 'online agora' : 'visto há 2 h',
            msgs: conv.msgs.map((m, i) => ({
              key: i,
              text: m.t,
              time: m.time,
              align: m.me ? ('flex-end' as const) : ('flex-start' as const),
              bg: m.me ? '#3653D8' : '#22272D',
              color: m.me ? '#fff' : '#E1E4E8',
            })),
            draft: msgDraft,
            onDraft: (e: ChangeEvent<HTMLInputElement>) => setMsgDraft(e.target.value),
            onKey: (e: KeyboardEvent<HTMLInputElement>) => {
              if (e.key === 'Enter') sendMsg();
            },
            send: () => sendMsg(),
            openProfile: () => go('person', conv.u),
          }
        : null,
      profile: {
        av: U.me.av,
        cover: USER_META.me?.cover || COMMUNITIES[0].img,
        name: edit.name,
        handle: edit.user,
        bio: edit.bio,
        loc: edit.loc,
        followers: String(USER_META.me?.followers ?? 148),
        following: String(USER_META.me?.following ?? 203),
        posts: String(posts.filter((p) => p.u === 'me').length),
        editProfile: () => go('editProfile'),
        openFollows: () => go('follows', 'me'),
        openGroups: () => go('groups'),
      },
      profileGrid: (() => {
        if (profileTab === 'Salvos') {
          return posts
            .filter((p) => p.saved && p.img)
            .map((p) => ({ img: p.img, alt: p.alt, open: () => go('post', p.id) }));
        }
        if (profileTab === 'Grupos') {
          return COMMUNITIES.filter((c) => joined[c.name]).map((c) => ({
            img: c.img,
            alt: c.name,
            open: () => go('group', c.name),
          }));
        }
        if (profileTab === 'Sobre') {
          return [];
        }
        return posts
          .filter((p) => p.u === 'me' && p.img)
          .map((p) => ({ img: p.img, alt: p.alt, open: () => go('post', p.id) }));
      })(),
      profileTabs: ['Publicações', 'Salvos', 'Grupos', 'Sobre'].map((t) => ({
        label: t,
        color: profileTab === t ? '#FFFFFF' : '#7B818C',
        border: profileTab === t ? '2px solid #4667F5' : '2px solid transparent',
        go: () => setProfileTab(t),
      })),
      profileTab,
      edit,
      onEditName: (e: ChangeEvent<HTMLInputElement>) =>
        setEdit((s) => ({ ...s, name: e.target.value })),
      onEditUser: (e: ChangeEvent<HTMLInputElement>) =>
        setEdit((s) => ({ ...s, user: e.target.value })),
      onEditBio: (e: ChangeEvent<HTMLTextAreaElement>) =>
        setEdit((s) => ({ ...s, bio: e.target.value })),
      onEditLoc: (e: ChangeEvent<HTMLInputElement>) =>
        setEdit((s) => ({ ...s, loc: e.target.value })),
      saveProfile: () => {
        back();
        flash('Perfil atualizado');
      },
      members: MEMBER_ROLES.map(([k, role]) => ({
        av: (U[k as keyof typeof U] as UserProfile).av,
        name: (U[k as keyof typeof U] as UserProfile).name,
        handle: (U[k as keyof typeof U] as UserProfile).handle,
        role,
        roleColor: role === 'Membro' ? '#7B818C' : '#91A8FF',
        open: () => go('person', k),
      })),
      follows: ['renata', 'tiago', 'nicole', 'bruno', 'julia', 'lidiane', 'camila', 'marina', 'pedro', 'aline'].map(
        (k) => ({
          av: (U[k as keyof typeof U] as UserProfile).av,
          name: (U[k as keyof typeof U] as UserProfile).name,
          handle: (U[k as keyof typeof U] as UserProfile).handle,
          btnLabel: following[k] ? 'Seguindo' : 'Seguir',
          btnBg: following[k] ? '#2B3037' : '#4667F5',
          follow: () => setFollowing((s) => ({ ...s, [k]: !s[k] })),
          open: () => go('person', k),
        }),
      ),
      myGroups: COMMUNITIES.filter((c) => joined[c.name]).map((c) => ({
        img: c.img,
        name: c.name,
        meta: c.groups + ' · ' + c.members,
        open: () => go('group', c.name),
      })),
      settings: {
        email: accountEmail,
        openChangeEmail: () => {
          setEmailDraft(accountEmail);
          go('changeEmail');
        },
        openChangePassword: () => {
          setPasswordDraft({ current: '', next: '', confirm: '' });
          go('changePassword');
        },
        logout: () => setSheet('logout'),
      },
      emailDraft,
      onEmailDraft: (e: ChangeEvent<HTMLInputElement>) => setEmailDraft(e.target.value),
      saveEmail: () => {
        const next = emailDraft.trim();
        if (!next || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(next)) {
          flash('Informe um e-mail válido');
          return;
        }
        setAccountEmail(next);
        back();
        flash('E-mail atualizado');
      },
      passwordDraft,
      onPasswordCurrent: (e: ChangeEvent<HTMLInputElement>) =>
        setPasswordDraft((s) => ({ ...s, current: e.target.value })),
      onPasswordNext: (e: ChangeEvent<HTMLInputElement>) =>
        setPasswordDraft((s) => ({ ...s, next: e.target.value })),
      onPasswordConfirm: (e: ChangeEvent<HTMLInputElement>) =>
        setPasswordDraft((s) => ({ ...s, confirm: e.target.value })),
      savePassword: () => {
        const { current, next, confirm } = passwordDraft;
        if (!current.trim()) {
          flash('Informe a senha atual');
          return;
        }
        if (next.length < 8) {
          flash('A nova senha deve ter pelo menos 8 caracteres');
          return;
        }
        if (next !== confirm) {
          flash('As senhas não coincidem');
          return;
        }
        setPasswordDraft({ current: '', next: '', confirm: '' });
        back();
        flash('Senha alterada com sucesso');
      },
      allGroups: COMMUNITIES.filter((c) => {
        const q = groupsSearchQ.trim().toLowerCase();
        if (q && !c.name.toLowerCase().includes(q) && !c.description.toLowerCase().includes(q)) return false;
        if (groupsFilter === 'joined' && !joined[c.name]) return false;
        if (groupsFilter === 'suggested' && joined[c.name]) return false;
        if (groupsFilter !== 'all' && groupsFilter !== 'joined' && groupsFilter !== 'suggested' && c.category !== groupsFilter) {
          return false;
        }
        return true;
      }).map((c) => ({
        img: c.img,
        name: c.name,
        meta: c.members,
        avatars: c.avs.map((k) => ({ src: user(k).av })),
        badge: joined[c.name] ? 'Participando' : c.isPublic ? 'Público' : 'Privado',
        badgeBg: joined[c.name] ? 'rgba(70,103,245,.14)' : c.isPublic ? 'rgba(53,196,122,.14)' : 'rgba(120,73,236,.14)',
        badgeColor: joined[c.name] ? '#91A8FF' : c.isPublic ? '#35C47A' : '#B79AFF',
        open: () => go('group', c.name),
      })),
    };
  }

  function buildRenderVals() {
    const isDesktop = w >= 800;
    const rail = showSuggestions && isDesktop;
    const brand = '#4667F5';

    const stories = storiesList
      .map((s, i) => ({ s, i }))
      .filter(({ s }) => s.u !== 'me')
      .map(({ s, i }) => {
        const isSeen = !!(s.seen || seen[i]);
        return {
          img: s.img,
          alt: s.alt,
          av: user(s.u).av,
          unseen: !isSeen,
          ring: isSeen
            ? '#41474F'
            : 'linear-gradient(135deg,#7849EC,#4667F5 55%,#39BCE7)',
          filter: isSeen ? 'grayscale(1) brightness(.75)' : 'none',
          open: () => openStory(i),
        };
      });

    const myStoryIndex = storiesList.findIndex((s) => s.u === 'me');
    const myStoryCover = myStoryIndex >= 0 ? storiesList[myStoryIndex].img : U.me.av;
    const myStory = {
      cover: myStoryCover,
      av: U.me.av,
      hasStory: myStoryIndex >= 0,
      open: () => {
        if (myStoryIndex >= 0) openStory(myStoryIndex);
        else openCreateStorySheet();
      },
      openCreate: openCreateStorySheet,
    };

    const filterCommunity = (c: CommunityData) => {
      const q = groupsSearchQ.trim().toLowerCase();
      if (q && !c.name.toLowerCase().includes(q) && !c.description.toLowerCase().includes(q)) return false;
      if (groupsFilter === 'joined' && !joined[c.name]) return false;
      if (groupsFilter === 'suggested' && joined[c.name]) return false;
      if (groupsFilter !== 'all' && groupsFilter !== 'joined' && groupsFilter !== 'suggested' && c.category !== groupsFilter) {
        return false;
      }
      return true;
    };

    const filteredCommunities = COMMUNITIES.filter(filterCommunity);

    const mkCommunity = (c: (typeof COMMUNITIES)[number]) => ({
      name: c.name,
      img: c.img,
      groups: c.groups,
      members: c.members,
      avatars: c.avs.map((k) => ({ src: user(k).av })),
      open: () => go('group', c.name),
      share: (e?: MouseEvent) => {
        if (e?.stopPropagation) e.stopPropagation();
        setSheet('share');
      },
    });

    const feed = posts.map((p) => {
      const u = user(p.u);
      const rx = Object.keys(p.reactions);
      return {
        av: u.av,
        handle: u.handle,
        time: p.time,
        openAuthor: () => go('person', p.u === 'me' ? 'bruna' : p.u),
        openPost: () => go('post', p.id),
        groupLabel: p.group ? ' · ' + p.group : '',
        text: p.text,
        hasTags: p.tags.length > 0,
        tags: p.tags.map((t) => ({ label: t })),
        hasImg: !!p.img,
        img: p.img,
        alt: p.alt,
        hasReactions: rx.length > 0,
        reactions: rx.map((e) => ({
          emoji: e,
          count: p.reactions[e],
          bg: 'rgba(70,103,245,.10)',
          border: '#2E43AF',
        })),
        likes: p.likes,
        comments: p.comments,
        likeColor: p.liked ? '#F05A67' : '#9EA3AD',
        likeFill: p.liked ? '#F05A67' : 'none',
        likeAnim: popped === p.id ? 'gd-pop 240ms cubic-bezier(0.34,1.56,0.64,1)' : 'none',
        saveColor: p.saved ? '#6887FF' : '#9EA3AD',
        saveFill: p.saved ? '#6887FF' : 'none',
        hasPreview: p.commenters.length > 0,
        commenters: p.commenters.map((k) => ({ src: user(k).av })),
        previewLabel: p.comments + ' comentários',
        toggleLike: () => toggleLike(p.id),
        like2x: () => toggleLike(p.id, true),
        toggleSave: () => toggleSave(p.id),
        openComments: () => {
          setSheet('comments');
          setActiveId(p.id);
        },
        openReactions: () => {
          setSheet('reactions');
          setActiveId(p.id);
        },
        openShare: () => {
          setSheet('share');
          setActiveId(p.id);
        },
        menu: () => {
          setSheet('menu');
          setActiveId(p.id);
        },
      };
    });

    const tabDefs: { id: TabId; label: string; icon: GoodayIconName }[] = [
      { id: 'home', label: 'Início', icon: 'home' },
      { id: 'search', label: 'Buscar', icon: 'search' },
      { id: 'create', label: 'Criar', icon: 'create' },
      { id: 'chat', label: 'Mensagens', icon: 'chat' },
      { id: 'saved', label: 'Perfil', icon: 'heart' },
    ];

    const tabs = tabDefs.map((t) => {
      if (t.id === 'create') {
        return {
          id: t.id,
          label: t.label,
          color: '#fff',
          active: false,
          go: () => openCreatePicker(),
          icon: <CreateTabIcon brand={brand} size={48} />,
        };
      }
      const active = tab === t.id;
      return {
        id: t.id,
        label: t.label,
        color: active ? brand : '#9EA3AD',
        active,
        go: () => {
          setTab(t.id);
          if (t.id === 'search') go('search');
          else if (t.id === 'chat') go('messages');
          else if (t.id === 'saved') go('profile');
          else {
            setView(null);
            setViewParam(null);
            setStack([]);
          }
        },
        icon: icon(t.icon, active, brand, 22),
      };
    });

    const SUGGESTION_POOL = [
      'renata',
      'julia',
      'camila',
      'rafael',
      'marina',
      'pedro',
      'gabriela',
      'diego',
      'aline',
      'lucas',
      'gustavo',
      'fernanda',
      'rodrigo',
      'isabela',
      'vitor',
      'larissa',
      'felipe',
      'amanda',
      'daniel',
      'patricia',
      'eduardo',
      'carolina',
      'marcelo',
      'beatriz',
      'igor',
      'sabrina',
      'henrique',
      'natalia',
      'leonardo',
      'bruno',
      'camille',
      'yasmin',
      'priscila',
      'thiago',
      'caio',
      'wesley',
      'clara',
      'bernardo',
      'raquel',
      'monica',
      'otavio',
      'debora',
      'yara',
      'matheus',
      'andre',
      'luiza',
      'valentina',
      'hugo',
      'simone',
      'bianca',
      'denise',
      'paula',
      'ingrid',
      'everton',
      'helena',
      'tania',
      'claudio',
      'jonas',
      'robson',
      'fabiana',
      'ricardo2',
      'breno',
      'samuel',
      'cecilia',
    ].concat(EXTRA_KEYS);

    const navDefs: { id: TabId; label: string; icon: GoodayIconName }[] = [
      { id: 'home', label: 'Início', icon: 'home' },
      { id: 'search', label: 'Buscar', icon: 'search' },
      { id: 'chat', label: 'Mensagens', icon: 'chat' },
      { id: 'create', label: 'Criar', icon: 'create' },
      { id: 'groups', label: 'Grupos', icon: 'groups' },
      { id: 'saved', label: 'Perfil', icon: 'heart' },
    ];

    const navItems = navDefs.map((n) => {
      const active = tab === n.id;
      return {
        id: n.id,
        label: n.label,
        bg: active ? brand : 'transparent',
        color: active ? '#FFFFFF' : '#9EA3AD',
        glyph:
          n.icon === 'create' ? (
            <CreateIcon active={active} activeColor="#C3C7CF" size={18} />
          ) : (
            icon(n.icon, active, '#FFFFFF', 18)
          ),
        go: () => {
          setTab(n.id);
          if (n.id === 'create') openCreatePicker();
          else if (n.id === 'search') go('search');
          else if (n.id === 'chat') go('messages');
          else if (n.id === 'groups') go('groups');
          else if (n.id === 'saved') go('profile');
          else {
            setView(null);
            setViewParam(null);
            setStack([]);
          }
        },
      };
    });

    const railTabs = [
      { id: 'groups' as const, label: 'Grupos', active: railTab === 'groups', go: () => setRailTab('groups') },
      { id: 'people' as const, label: 'Pessoas', active: railTab === 'people', go: () => setRailTab('people') },
    ];

    const s = storyIdx === null ? null : storiesList[storyIdx];
    const story = s
      ? {
          img: s.img,
          alt: s.alt,
          av: user(s.u).av,
          name: user(s.u).name,
          time: s.time,
        }
      : null;
    const storyBars = storiesList.map((_, i) => ({
      w: i < (storyIdx ?? -1) ? '100%' : i === storyIdx ? storyP + '%' : '0%',
    }));
    const storyHasPrev = storyIdx !== null && storyIdx > 0;
    const storyHasNext = storyIdx !== null && storyIdx < storiesList.length - 1;

    const titles: Record<string, string> = {
      createPicker: 'Criar',
      create: 'Nova publicação',
      story: 'Novo story',
      comments: 'Comentários',
      reactions: 'Reagir',
      share: 'Compartilhar',
      menu: 'Opções da publicação',
      notifications: 'Notificações',
      avatar: 'Sua conta',
      logout: 'Deseja sair?',
      search: 'Buscar',
    };

    const sheetBody = sheetView();

    return {
      ...buildScreenVals(isDesktop),
      me: U.me,
      isDesktop,
      isMobile: !isDesktop,
      showRail: rail,
      contextMessage,
      showCommunities,
      reactionsEnabled,
      hasUnread: notifs.some((n) => n.unread),
      storiesStyle: {
        display: 'flex',
        gap: 10,
        overflowX: 'auto',
        padding: `16px 16px 4px ${isDesktop ? 16 : 24}px`,
        scrollSnapType: 'x mandatory',
      } as CSSProperties,
      stories,
      communities: filteredCommunities.map(mkCommunity),
      railCommunities: filteredCommunities.map(mkCommunity),
      groupsSearchQ,
      onGroupsSearch: (e: ChangeEvent<HTMLInputElement>) => setGroupsSearchQ(e.target.value),
      groupsFilters: GROUP_FILTERS.map((f) => ({
        id: f.id,
        label: f.label,
        active: groupsFilter === f.id,
        go: () => setGroupsFilter(f.id),
      })),
      railTab,
      railTabs,
      myStory,
      suggestions: SUGGESTION_POOL.map((k) => {
        const u = U[k as keyof typeof U] as UserProfile;
        const f = !!following[k];
        return {
          key: k,
          av: u.av,
          handle: u.handle,
          name: u.name,
          open: () => go('person', k),
          btnLabel: f ? 'Seguindo' : 'Seguir',
          btnBg: f ? '#2B3037' : brand,
          btnColor: '#fff',
          follow: () => setFollowing((x) => ({ ...x, [k]: !x[k] })),
        };
      }).filter((s) => {
        const q = peopleSearchQ.trim().toLowerCase();
        if (!q) return true;
        return s.handle.toLowerCase().includes(q) || s.name.toLowerCase().includes(q);
      }),
      peopleSearchQ,
      onPeopleSearch: (e: ChangeEvent<HTMLInputElement>) => setPeopleSearchQ(e.target.value),
      clearPeopleSearch: () => setPeopleSearchQ(''),
      clearGroupsSearch: () => setGroupsSearchQ(''),
      feed,
      tabs,
      navItems,
      story,
      storyBars,
      storyHasPrev,
      storyHasNext,
      quickReactions: ['❤️', '👏', '🔥'].map((e) => ({
        emoji: e,
        send: () => {
          closeStory();
          flash('Você reagiu com ' + e);
        },
      })),
      openSearch: () => go('search'),
      openAllGroups: () => go('groups'),
      openAllPeople: () => go('follows', 'me'),
      openCreate: openCreatePicker,
      openCreateStory: openCreateStorySheet,
      openNotifications: () => setSheet('notifications'),
      openAvatarMenu: () => setSheet('avatar'),
      openSettings: () => go('settings'),
      closeStory,
      storyNext,
      storyPrev,
      closeSheet,
      stop: (e: MouseEvent) => e.stopPropagation(),
      rowGridStyle: isDesktop
        ? ({
            display: 'grid',
            gridTemplateColumns: 'max-content minmax(280px,560px) minmax(240px,1fr)',
            gap: 40,
            maxWidth: 1920,
            margin: '0 auto',
            padding: '0 24px 40px',
            justifyContent: 'center',
            alignItems: 'flex-start',
          } as CSSProperties)
        : ({ display: 'flex', padding: '0 0 120px' } as CSSProperties),
      sheetOverlayStyle: isDesktop
        ? ({
            position: 'fixed',
            inset: 0,
            zIndex: 70,
            background: 'rgba(0,0,0,.68)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'gd-fade 180ms ease',
          } as CSSProperties)
        : ({
            position: 'fixed',
            inset: 0,
            zIndex: 70,
            background: 'rgba(0,0,0,.68)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            animation: 'gd-fade 180ms ease',
          } as CSSProperties),
      sheetPanelStyle: isDesktop
        ? sheet === 'comments'
          ? ({
              width: '92%',
              maxWidth: 980,
              height: '80vh',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              background: '#1A1F24',
              border: '1px solid rgba(255,255,255,.08)',
              borderRadius: 24,
              padding: 24,
              boxShadow: '0 24px 64px rgba(0,0,0,.44)',
              animation: 'gd-in 240ms cubic-bezier(0.2,0,0,1)',
            } as CSSProperties)
          : ({
              width: '92%',
              maxWidth: 500,
              maxHeight: '84vh',
              overflow: 'auto',
              background: '#1A1F24',
              border: '1px solid rgba(255,255,255,.08)',
              borderRadius: 22,
              padding: '22px 22px 24px',
              boxShadow: '0 24px 64px rgba(0,0,0,.44)',
              animation: 'gd-in 240ms cubic-bezier(0.2,0,0,1)',
            } as CSSProperties)
        : ({
            width: '100%',
            maxWidth: 600,
            maxHeight: '90dvh',
            overflow: 'auto',
            background: '#1A1F24',
            borderTop: '1px solid rgba(255,255,255,.08)',
            borderRadius: '22px 22px 0 0',
            padding: '10px 16px calc(20px + env(safe-area-inset-bottom))',
            animation: 'gd-up 320ms cubic-bezier(0.2,0,0,1)',
          } as CSSProperties),
      avatarMenu:
        isDesktop && sheet === 'avatar'
          ? {
              name: 'Marcos Vinícius',
              sub: '@marcos_v · 148 seguidores',
              items: [
                { label: 'Meu perfil', color: '#E1E4E8', go: () => go('profile') },
                { label: 'Editar perfil', color: '#E1E4E8', go: () => go('editProfile') },
                {
                  label: 'Configurações',
                  color: '#E1E4E8',
                  go: () => go('settings'),
                },
                {
                  label: 'Ajuda',
                  color: '#E1E4E8',
                  go: () => {
                    setSheet(null);
                    defer(() => flash('Ajuda — próxima tela'));
                  },
                },
                { label: 'Sair', color: '#F05A67', go: () => setSheet('logout') },
              ],
            }
          : null,
      sheet:
        sheet && !(isDesktop && sheet === 'avatar')
          ? { title: titles[sheet] || '', body: sheetBody }
          : null,
      toast,
    };
  }

  const vm = useMemo(
    () => buildRenderVals(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      w,
      tab,
      posts,
      popped,
      storyIdx,
      storyP,
      seen,
      sheet,
      activeId,
      toast,
      notifs,
      following,
      draft,
      comment,
      commentEmojiOpen,
      view,
      viewParam,
      convs,
      convKey,
      msgDraft,
      searchQ,
      groupsSearchQ,
      groupsFilter,
      peopleSearchQ,
      railTab,
      storiesList,
      joined,
      profileTab,
      edit,
      accountEmail,
      emailDraft,
      passwordDraft,
      contextMessage,
      showCommunities,
      reactionsEnabled,
      showSuggestions,
      sheetView,
      back,
      go,
      user,
      openStory,
      toggleLike,
      toggleSave,
      closeStory,
      storyNext,
      storyPrev,
      flash,
      icon,
      openChat,
      toggleJoin,
      sendMsg,
      closeSheet,
    ],
  );

  return {
    vm,
    sheetView,
    sheetBody: sheet ? sheetView() : null,
  };
}
