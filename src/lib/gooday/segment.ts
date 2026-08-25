import * as gooday from './data';
import * as gamers from './data/gamers';
import type { GoodayUser, UserMeta, CommunityData } from './data';

export type GoodaySegment = 'gooday' | 'gamers';

export type GoodayDataPack = {
  U: Record<string, GoodayUser>;
  STORIES: typeof gooday.STORIES;
  COMMUNITIES: CommunityData[];
  POSTS: typeof gooday.POSTS;
  NOTIFS: typeof gooday.NOTIFS;
  CONVERSATIONS: typeof gooday.CONVERSATIONS;
  MEMBER_ROLES: typeof gooday.MEMBER_ROLES;
  EMOJIS: typeof gooday.EMOJIS;
  EXTRA_KEYS: typeof gooday.EXTRA_KEYS;
  USER_META: Record<string, UserMeta>;
  GROUP_FILTERS: readonly { id: string; label: string }[];
  defaultJoined: Record<string, boolean>;
  defaultEdit: { name: string; user: string; bio: string; loc: string };
  contextMessage: string;
  segmentLabel: string;
  switchLabel: string;
  switchHref: string;
};

const goodayPack: GoodayDataPack = {
  U: gooday.U,
  STORIES: gooday.STORIES,
  COMMUNITIES: gooday.COMMUNITIES,
  POSTS: gooday.POSTS,
  NOTIFS: gooday.NOTIFS,
  CONVERSATIONS: gooday.CONVERSATIONS,
  MEMBER_ROLES: gooday.MEMBER_ROLES,
  EMOJIS: gooday.EMOJIS,
  EXTRA_KEYS: gooday.EXTRA_KEYS,
  USER_META: gooday.USER_META,
  GROUP_FILTERS: gooday.GROUP_FILTERS,
  defaultJoined: {
    'Corrida 5K': true,
    'Nutrição Consciente': true,
    'Treino Funcional': true,
  },
  defaultEdit: {
    name: 'Marcos Vinícius',
    user: '@marcos_v',
    bio: 'Corrida, comida de verdade e rotina leve. Um dia bom por vez.',
    loc: 'São Paulo, SP',
  },
  contextMessage: 'Respeite sua mente e trate seu corpo bem.',
  segmentLabel: 'Gooday',
  switchLabel: 'Ir para XP Zone',
  switchHref: '/gamers',
};

const gamersPack: GoodayDataPack = {
  U: gamers.U,
  STORIES: gamers.STORIES as unknown as typeof gooday.STORIES,
  COMMUNITIES: gamers.COMMUNITIES,
  POSTS: gamers.POSTS as unknown as typeof gooday.POSTS,
  NOTIFS: gamers.NOTIFS,
  CONVERSATIONS: gamers.CONVERSATIONS,
  MEMBER_ROLES: gamers.MEMBER_ROLES,
  EMOJIS: gamers.EMOJIS,
  EXTRA_KEYS: gamers.EXTRA_KEYS,
  USER_META: gamers.USER_META,
  GROUP_FILTERS: gamers.GROUP_FILTERS,
  defaultJoined: {
    'Counter-Strike 2': true,
    'League of Legends': true,
    'Elden Ring': true,
  },
  defaultEdit: {
    name: 'Marcos Vinícius',
    user: '@marcos_v',
    bio: 'Ranked noturno, clips e setup RGB. GG sempre.',
    loc: 'São Paulo, SP',
  },
  contextMessage: 'Encontre sua squad hoje.',
  segmentLabel: 'XP Zone',
  switchLabel: 'Ir para Gooday',
  switchHref: '/',
};

export function getDataPack(segment: GoodaySegment = 'gooday'): GoodayDataPack {
  return segment === 'gamers' ? gamersPack : goodayPack;
}
