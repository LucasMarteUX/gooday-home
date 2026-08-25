import * as gooday from './data';
import * as gamers from './data/gamers';
import * as pets from './data/pets';
import * as church from './data/church';
import * as language from './data/language';
import type { GoodayUser, UserMeta, CommunityData } from './data';

export type GoodaySegment = 'gooday' | 'gamers' | 'pets' | 'church' | 'language';

export type SegmentSwitch = { label: string; href: string };

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
  /** @deprecated Prefer `switches` — mantido para o primeiro destino. */
  switchLabel: string;
  /** @deprecated Prefer `switches`. */
  switchHref: string;
  switches: SegmentSwitch[];
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
  switches: [
    { label: 'Ir para XP Zone', href: '/gamers' },
    { label: 'Ir para Petshare', href: '/pets' },
    { label: 'Ir para ONE', href: '/church' },
    { label: 'Ir para LINGO', href: '/language' },
  ],
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
  switches: [
    { label: 'Ir para Gooday', href: '/' },
    { label: 'Ir para Petshare', href: '/pets' },
    { label: 'Ir para ONE', href: '/church' },
    { label: 'Ir para LINGO', href: '/language' },
  ],
};

const petsPack: GoodayDataPack = {
  U: pets.U,
  STORIES: pets.STORIES as unknown as typeof gooday.STORIES,
  COMMUNITIES: pets.COMMUNITIES,
  POSTS: pets.POSTS as unknown as typeof gooday.POSTS,
  NOTIFS: pets.NOTIFS,
  CONVERSATIONS: pets.CONVERSATIONS,
  MEMBER_ROLES: pets.MEMBER_ROLES,
  EMOJIS: pets.EMOJIS,
  EXTRA_KEYS: pets.EXTRA_KEYS,
  USER_META: pets.USER_META,
  GROUP_FILTERS: pets.GROUP_FILTERS,
  defaultJoined: {
    'Apaixonados por Gatos': true,
    'Golden Retriever Brasil': true,
    'Adoção Responsável': true,
  },
  defaultEdit: {
    name: 'Marcos Vinícius',
    user: '@marcos_v',
    bio: 'Tutor de pet, passeios e muita fofura no feed.',
    loc: 'São Paulo, SP',
  },
  contextMessage: 'Compartilhe o carinho com seu pet.',
  segmentLabel: 'Petshare',
  switchLabel: 'Ir para Gooday',
  switchHref: '/',
  switches: [
    { label: 'Ir para Gooday', href: '/' },
    { label: 'Ir para XP Zone', href: '/gamers' },
    { label: 'Ir para ONE', href: '/church' },
    { label: 'Ir para LINGO', href: '/language' },
  ],
};

const churchPack: GoodayDataPack = {
  U: church.U,
  STORIES: church.STORIES as unknown as typeof gooday.STORIES,
  COMMUNITIES: church.COMMUNITIES,
  POSTS: church.POSTS as unknown as typeof gooday.POSTS,
  NOTIFS: church.NOTIFS,
  CONVERSATIONS: church.CONVERSATIONS,
  MEMBER_ROLES: church.MEMBER_ROLES,
  EMOJIS: church.EMOJIS,
  EXTRA_KEYS: church.EXTRA_KEYS,
  USER_META: church.USER_META,
  GROUP_FILTERS: church.GROUP_FILTERS,
  defaultJoined: {
    'Jovens ONE': true,
    'Worship & Música': true,
    'Voluntários': true,
  },
  defaultEdit: {
    name: 'Gabriel Melo',
    user: '@gabriel',
    bio: 'fé · música · design. Encontrando comunidade no caminho.',
    loc: 'São Paulo, SP',
  },
  contextMessage: 'Encontre sua comunidade.',
  segmentLabel: 'ONE',
  switchLabel: 'Ir para Gooday',
  switchHref: '/',
  switches: [
    { label: 'Ir para Gooday', href: '/' },
    { label: 'Ir para XP Zone', href: '/gamers' },
    { label: 'Ir para Petshare', href: '/pets' },
    { label: 'Ir para LINGO', href: '/language' },
  ],
};

const languagePack: GoodayDataPack = {
  U: language.U,
  STORIES: language.STORIES as unknown as typeof gooday.STORIES,
  COMMUNITIES: language.COMMUNITIES,
  POSTS: language.POSTS as unknown as typeof gooday.POSTS,
  NOTIFS: language.NOTIFS,
  CONVERSATIONS: language.CONVERSATIONS,
  MEMBER_ROLES: language.MEMBER_ROLES,
  EMOJIS: language.EMOJIS,
  EXTRA_KEYS: language.EXTRA_KEYS,
  USER_META: language.USER_META,
  GROUP_FILTERS: language.GROUP_FILTERS,
  defaultJoined: {
    '🇺🇸 English': true,
    '🇪🇸 Español': true,
    '🇺🇸 English for Developers': true,
  },
  defaultEdit: {
    name: 'Lucas Martins',
    user: '@lucas.m',
    bio: '🇧🇷 Portuguese — Native · 🇺🇸 English — B1. Learning through people.',
    loc: 'São Paulo, Brazil',
  },
  contextMessage: 'Ready to practice?',
  segmentLabel: 'LINGO',
  switchLabel: 'Go to Gooday',
  switchHref: '/',
  switches: [
    { label: 'Go to Gooday', href: '/' },
    { label: 'Go to XP Zone', href: '/gamers' },
    { label: 'Go to Petshare', href: '/pets' },
    { label: 'Go to ONE', href: '/church' },
  ],
};

export function getDataPack(segment: GoodaySegment = 'gooday'): GoodayDataPack {
  if (segment === 'gamers') return gamersPack;
  if (segment === 'pets') return petsPack;
  if (segment === 'church') return churchPack;
  if (segment === 'language') return languagePack;
  return goodayPack;
}
