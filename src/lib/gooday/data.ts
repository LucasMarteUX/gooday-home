export const IMG = (id: string, w: number, h: number) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=70`;
export const AV = (id: string) => IMG(id, 160, 160);

export type GoodayUser = { name: string; handle: string; av: string };

export const U: Record<string, GoodayUser> = {
  me:      { name: 'Você',          handle: '@voce',          av: AV('1500648767791-00dcc994a43e') },
  bruna:   { name: 'Bruna Carla',   handle: '@bruna_carla',   av: AV('1494790108377-be9c29b29330') },
  renata:  { name: 'Renata Silva',  handle: '@renata_silva',  av: AV('1534528741775-53994a69daeb') },
  lucas:   { name: 'Lucas Marte',   handle: '@lucas_marte',   av: AV('1507003211169-0a1dd7228f2d') },
  nicole:  { name: 'Nicole Bueno',  handle: '@nicole_bueno',  av: AV('1438761681033-6461ffad8d80') },
  bruno:   { name: 'Bruno Mendes',  handle: '@bruno_mendes',  av: AV('1472099645785-5658abf4ff4e') },
  lidiane: { name: 'Lidiane Costa', handle: '@lidiane_costa', av: AV('1517841905240-472988babdf9') },
  tiago:   { name: 'Tiago Souza',   handle: '@tiago_souza',   av: AV('1519345182560-3f2917c472ef') },
  julia:   { name: 'Júlia Andrade', handle: '@julia_andrade', av: AV('1524504388940-b1c1722653e1') },
  rafael:  { name: 'Rafael Lima',   handle: '@rafael_lima',   av: AV('1506794778202-cad84cf45f1d') },
  camila:  { name: 'Camila Ferreira', handle: '@camila_f',    av: AV('1489424731084-a5d8b219a5bb') },
  marina:  { name: 'Marina Rocha',  handle: '@marina_rocha',  av: AV('1531123897727-8f129e1688ce') },
  pedro:   { name: 'Pedro Nunes',   handle: '@pedro_nunes',   av: AV('1502685104226-ee32379fefbe') },
  gabriela:{ name: 'Gabriela Torres', handle: '@gabriela_t',  av: AV('1544725176-7c40e5a71c5e') },
  diego:   { name: 'Diego Farias',  handle: '@diego_farias',  av: AV('1544723795-3fb6469f5b39') },
  aline:   { name: 'Aline Souza',   handle: '@aline_souza',   av: AV('1552058544-f2b08422138a') },
  gustavo: { name: 'Gustavo Reis',  handle: '@gustavo_reis',  av: AV('1499996860823-5214fcc65f8f') },
  fernanda:{ name: 'Fernanda Alves', handle: '@fernanda_a',   av: AV('1544005313-94ddf0286df2') },
  rodrigo: { name: 'Rodrigo Alves', handle: '@rodrigo_alves', av: AV('1519085360753-af0119f7cbe7') },
  isabela: { name: 'Isabela Cruz',  handle: '@isabela_cruz',  av: AV('1487412720507-e7ab37603c6f') },
  vitor:   { name: 'Vitor Ramos',   handle: '@vitor_ramos',   av: AV('1544168190-79c17527004f') },
  larissa: { name: 'Larissa Dias',  handle: '@larissa_dias',  av: AV('1524250502761-1ac6f2e30d43') },
  felipe:  { name: 'Felipe Nogueira', handle: '@felipe_n',    av: AV('1492562080023-ab3db95bfbce') },
  amanda:  { name: 'Amanda Rezende', handle: '@amanda_rezende', av: AV('1573497019940-1c28c88b4f3e') },
  daniel:  { name: 'Daniel Prado',  handle: '@daniel_prado',  av: AV('1504257432389-52343af06ae3') },
  patricia:{ name: 'Patrícia Moura', handle: '@patricia_moura', av: AV('1508214751196-bcfd4ca60f91') },
  eduardo: { name: 'Eduardo Castro', handle: '@eduardo_castro', av: AV('1463453091185-61582044d556') },
  carolina:{ name: 'Carolina Reis', handle: '@carolina_reis', av: AV('1544717305-2782549b5136') },
  marcelo: { name: 'Marcelo Vieira', handle: '@marcelo_v',    av: AV('1541101767792-f9b2b1c4f127') },
  beatriz: { name: 'Beatriz Lopes', handle: '@beatriz_lopes', av: AV('1531891437562-4301cf35b7e4') },
  igor:    { name: 'Igor Batista',  handle: '@igor_batista',  av: AV('1552374196-c4e7ffc6e126') },
  sabrina: { name: 'Sabrina Teixeira', handle: '@sabrina_t',  av: AV('1607746882042-944635dfe10e') },
  henrique:{ name: 'Henrique Farias', handle: '@henrique_f',  av: AV('1506863530036-1efeddceb993') },
  natalia: { name: 'Natália Gomes', handle: '@natalia_gomes', av: AV('1508186225823-0963cf9ab0de') },
  leonardo:{ name: 'Leonardo Dutra', handle: '@leonardo_dutra', av: AV('1547425260-76bcadfb4f2c') },
  camille: { name: 'Camille Duarte', handle: '@camille_d',     av: AV('1580489944761-15a19d654956') },
  yasmin:  { name: 'Yasmin Souza',   handle: '@yasmin_souza',  av: AV('1520813792240-56fc4a3765a7') },
  priscila:{ name: 'Priscila Nunes', handle: '@priscila_nunes', av: AV('1531384441138-2736e62e0919') },
  thiago:  { name: 'Thiago Ramalho', handle: '@thiago_ramalho', av: AV('1509783236416-c9ad59bae472') },
  caio:    { name: 'Caio Bezerra',   handle: '@caio_bezerra',  av: AV('1517070208541-6ddc4d3efbcb') },
  wesley:  { name: 'Wesley Moraes',  handle: '@wesley_moraes', av: AV('1546456073-6712f79251bb') },
  clara:   { name: 'Clara Menezes',  handle: '@clara_menezes', av: AV('1548142813-c348350df52b') },
  bernardo:{ name: 'Bernardo Salles', handle: '@bernardo_s',   av: AV('1539571696357-5a69c17a67c6') },
  raquel:  { name: 'Raquel Pires',   handle: '@raquel_pires',  av: AV('1601412436009-d964bd02edbc') },
  monica:  { name: 'Mônica Barros',  handle: '@monica_barros', av: AV('1512316609839-ce289d3eba0a') },
  otavio:  { name: 'Otávio Cardoso', handle: '@otavio_cardoso', av: AV('1560250097-0b93528c311a') },
  debora:  { name: 'Débora Antunes', handle: '@debora_antunes', av: AV('1516726817505-f5ed825624d8') },
  yara:    { name: 'Yara Correia',   handle: '@yara_correia',  av: AV('1607990283143-e81e7a2c9349') },
  matheus: { name: 'Matheus Costa',  handle: '@matheus_costa', av: AV('1519244703995-f4e0f30006d5') },
  andre:   { name: 'André Siqueira', handle: '@andre_siqueira', av: AV('1502031882019-24c0bccfffc6') },
  luiza:   { name: 'Luiza Bittencourt', handle: '@luiza_b',    av: AV('1517841905240-472988babdf9') },
  valentina:{ name: 'Valentina Rocha', handle: '@valentina_rocha', av: AV('1541216970279-affbfdd55aa8') },
  hugo:    { name: 'Hugo Peixoto',   handle: '@hugo_peixoto',  av: AV('1568602471122-7832951cc4c5') },
  simone:  { name: 'Simone Alencar', handle: '@simone_alencar', av: AV('1554151228-14d9def656e4') },
  bianca:  { name: 'Bianca Freitas', handle: '@bianca_freitas', av: AV('1500917293891-ef795e70e1f6') },
  denise:  { name: 'Denise Campos', handle: '@denise_campos', av: AV('1502764613149-7f1d229e230f') },
  paula:   { name: 'Paula Guimarães', handle: '@paula_g',     av: AV('1541823709867-1b206113eafd') },
  ingrid:  { name: 'Ingrid Vasconcelos', handle: '@ingrid_v', av: AV('1553514029-1318c9127859') },
  everton: { name: 'Everton Lacerda', handle: '@everton_lacerda', av: AV('1595152772835-219674b2a8a6') },
  helena:  { name: 'Helena Marques', handle: '@helena_marques', av: AV('1466978913421-dad2ebd01d17') },
  tania:   { name: 'Tânia Ribeiro',  handle: '@tania_ribeiro', av: AV('1601288496920-b6154fe3626a') },
  claudio: { name: 'Cláudio Serra',  handle: '@claudio_serra', av: AV('1618077360395-f3068be8e001') },
  jonas:   { name: 'Jonas Trindade', handle: '@jonas_trindade', av: AV('1614289371518-722f2615943d') },
  robson:  { name: 'Robson Aguiar', handle: '@robson_aguiar', av: AV('1533227268428-f9ed0900fb3b') },
  fabiana: { name: 'Fabiana Xavier', handle: '@fabiana_xavier', av: AV('1607346256330-dee7af15f7c5') },
  ricardo2:{ name: 'Ricardo Melo',  handle: '@ricardo_melo',  av: AV('1502980426475-b83966705988') },
  breno:   { name: 'Breno Cavalcante', handle: '@breno_c',    av: AV('1544006659-f0b21884ce1d') },
  samuel:  { name: 'Samuel Nogueira', handle: '@samuel_nogueira', av: AV('1521119989659-a83eee488004') },
  cecilia: { name: 'Cecília Duarte', handle: '@cecilia_duarte', av: AV('1524638431109-93d95c968f03') }
};

export const AV_POOL = [
  '1494790108377-be9c29b29330','1534528741775-53994a69daeb','1507003211169-0a1dd7228f2d','1438761681033-6461ffad8d80',
  '1472099645785-5658abf4ff4e','1517841905240-472988babdf9','1519345182560-3f2917c472ef','1524504388940-b1c1722653e1',
  '1506794778202-cad84cf45f1d','1489424731084-a5d8b219a5bb','1531123897727-8f129e1688ce','1502685104226-ee32379fefbe',
  '1544725176-7c40e5a71c5e','1544723795-3fb6469f5b39','1552058544-f2b08422138a','1499996860823-5214fcc65f8f',
  '1544005313-94ddf0286df2','1519085360753-af0119f7cbe7','1487412720507-e7ab37603c6f','1544168190-79c17527004f',
  '1524250502761-1ac6f2e30d43','1492562080023-ab3db95bfbce','1573497019940-1c28c88b4f3e','1504257432389-52343af06ae3',
  '1508214751196-bcfd4ca60f91','1463453091185-61582044d556','1544717305-2782549b5136','1541101767792-f9b2b1c4f127',
  '1531891437562-4301cf35b7e4','1552374196-c4e7ffc6e126'
];

export const EXTRA_PEOPLE = [
  ['Alice Fontes', 'alice_fontes'], ['Murilo Braga', 'murilo_braga'], ['Elisa Tavares', 'elisa_tavares'],
  ['Danilo Rocha', 'danilo_rocha'], ['Aline Prado', 'aline_prado'], ['Vinícius Leal', 'vinicius_leal'],
  ['Bruna Vieira', 'bruna_vieira'], ['Rogério Pinto', 'rogerio_pinto'], ['Sofia Camargo', 'sofia_camargo'],
  ['Emerson Dias', 'emerson_dias'], ['Letícia Braga', 'leticia_braga'], ['Fábio Queiroz', 'fabio_queiroz'],
  ['Manuela Reis', 'manuela_reis'], ['Anderson Melo', 'anderson_melo'], ['Júlia Fontana', 'julia_fontana'],
  ['Guilherme Sá', 'guilherme_sa'], ['Renata Bastos', 'renata_bastos'], ['Alexandre Pires', 'alexandre_pires'],
  ['Nayara Lima', 'nayara_lima'], ['Rafaela Mota', 'rafaela_mota'], ['Sérgio Barreto', 'sergio_barreto'],
  ['Kelly Andrade', 'kelly_andrade'], ['Otoniel Souza', 'otoniel_souza'], ['Vanessa Cordeiro', 'vanessa_cordeiro'],
  ['Márcio Teles', 'marcio_teles'], ['Bruno Sampaio', 'bruno_sampaio'], ['Isadora Neves', 'isadora_neves'],
  ['Leandro Vaz', 'leandro_vaz'], ['Talita Moraes', 'talita_moraes'], ['Nelson Aguiar', 'nelson_aguiar']
];

EXTRA_PEOPLE.forEach(([name, handle], i) => {
  U['p' + i] = { name, handle: '@' + handle, av: AV(AV_POOL[i % AV_POOL.length]) };
});

export const EXTRA_KEYS = EXTRA_PEOPLE.map((_, i) => 'p' + i);

export const STORIES = [
  { u: 'me',       img: IMG('1552674605-db6ffd4facb5', 480, 640), alt: 'Corrida ao amanhecer', time: 'há 8 min', seen: false },
  { u: 'me',       img: IMG('1517836357463-d25dfeac3438', 480, 640), alt: 'Treino de força', time: 'há 20 min', seen: false },
  { u: 'me',       img: IMG('1541534741688-6078c6bfb5c5', 480, 640), alt: 'Homem no esporte', time: 'há 35 min', seen: false },
  { u: 'tiago',    img: IMG('1461896836934-ffe607ba8211', 480, 640), alt: 'Largada de corrida', time: 'há 12 min', seen: false },
  { u: 'nicole',   img: IMG('1490645935967-10de6ba17061', 480, 640), alt: 'Prato colorido', time: 'há 25 min', seen: false },
  { u: 'bruno',    img: IMG('1502224562085-639556652f33', 480, 640), alt: 'Corrida noturna', time: 'há 40 min', seen: false },
  { u: 'renata',   img: IMG('1512621776951-a57141f2eefd', 480, 640), alt: 'Salada verde', time: 'há 1 h', seen: true },
  { u: 'lidiane',  img: IMG('1544367567-0f2fcb009e0b', 480, 640), alt: 'Yoga pela manhã', time: 'há 1 h', seen: false },
  { u: 'julia',    img: IMG('1518611012118-696072aa579a', 480, 640), alt: 'Treino de prancha', time: 'há 2 h', seen: true },
  { u: 'rafael',   img: IMG('1486218119243-13883505764c', 480, 640), alt: 'Corrida na estrada', time: 'há 2 h', seen: true },
  { u: 'camila',   img: IMG('1571019613454-1cb2f99b2d8b', 480, 640), alt: 'Treino de abdômen', time: 'há 3 h', seen: true },
  { u: 'marina',   img: IMG('1546069901-ba9599a7e63c', 480, 640), alt: 'Bowl saudável', time: 'há 3 h', seen: true },
  { u: 'bruna',    img: IMG('1622597467836-f3285f2131b8', 480, 640), alt: 'Suco verde natural', time: 'há 4 h', seen: true },
  { u: 'pedro',    img: IMG('1571008887538-b36bb32f4571', 480, 640), alt: 'Corrida no calçadão', time: 'há 4 h', seen: true },
  { u: 'gabriela', img: IMG('1534258936925-c58bed479fcb', 480, 640), alt: 'Ciclistas na estrada', time: 'há 5 h', seen: true },
  { u: 'diego',    img: IMG('1517649763962-0c623066013b', 480, 640), alt: 'Pelotão de ciclismo', time: 'há 5 h', seen: true },
  { u: 'aline',    img: IMG('1476480862126-209bfaa8edc8', 480, 640), alt: 'Corrida na escadaria', time: 'há 6 h', seen: true },
  { u: 'lucas',    img: IMG('1541625602330-2277a4c46182', 480, 640), alt: 'Pedal à beira-mar', time: 'há 6 h', seen: true },
  { u: 'gustavo',  img: IMG('1544033527-b192daee1f5b', 480, 640), alt: 'Treino de força', time: 'há 7 h', seen: true },
  { u: 'fernanda', img: IMG('1517836357463-d25dfeac3438', 480, 640), alt: 'Levantamento de peso', time: 'há 7 h', seen: true },
  { u: 'rodrigo',  img: IMG('1554284126-aa88f22d8b74', 480, 640), alt: 'Treino na academia', time: 'há 8 h', seen: true },
  { u: 'isabela',  img: IMG('1571731956672-f2b94d7dd0cb', 480, 640), alt: 'Treino de cabo', time: 'há 8 h', seen: true },
  { u: 'vitor',    img: IMG('1483721310020-03333e577078', 480, 640), alt: 'Preparação para corrida', time: 'há 9 h', seen: true },
  { u: 'larissa',  img: IMG('1526401485004-46910ecc8e51', 480, 640), alt: 'Pesos coloridos', time: 'há 9 h', seen: true },
  { u: 'felipe',   img: IMG('1494597564530-871f2b93ac55', 480, 640), alt: 'Bowl de aveia e frutas', time: 'há 10 h', seen: true },
  { u: 'amanda',   img: IMG('1490474418585-ba9bad8fd0ea', 480, 640), alt: 'Bowl de frutas', time: 'há 11 h', seen: true },
  { u: 'daniel',   img: IMG('1543362906-acfc16c67564', 480, 640), alt: 'Vegetais frescos', time: 'há 12 h', seen: true },
  { u: 'patricia', img: IMG('1571902943202-507ec2618e8f', 480, 640), alt: 'Academia vazia', time: 'há 13 h', seen: true },
  { u: 'eduardo',  img: IMG('1548690312-e3b507d8c110', 480, 640), alt: 'Alongamento pós-treino', time: 'há 14 h', seen: true },
  { u: 'carolina', img: IMG('1506126613408-eca07ce68773', 480, 640), alt: 'Meditação ao entardecer', time: 'há 16 h', seen: true },
  { u: 'marcelo',  img: IMG('1508739773434-c26b3d09e071', 480, 640), alt: 'Trilha nas montanhas', time: 'há 18 h', seen: true }
];

export type UserMeta = {
  bio: string;
  loc: string;
  followers: number;
  following: number;
  interests: string[];
  cover?: string;
};

export const USER_META: Record<string, UserMeta> = {
  me: { bio: 'Corrida, comida de verdade e constância. Compartilho rotina sem filtro.', loc: 'São Paulo, SP', followers: 148, following: 203, interests: ['Corrida', 'Nutrição', 'Hábitos'], cover: IMG('1461896836934-ffe607ba8211', 900, 300) },
  bruna: { bio: 'Receitas naturais e sucos coloridos. Menos industrializado, mais sabor.', loc: 'Curitiba, PR', followers: 2840, following: 412, interests: ['Nutrição', 'Sucos', 'Vida natural'], cover: IMG('1622597467836-f3285f2131b8', 900, 300) },
  tiago: { bio: '5h30 todo dia. Corredor amador que leva a sério.', loc: 'São Paulo, SP', followers: 1920, following: 288, interests: ['Corrida', 'Treino', 'Rotina'], cover: IMG('1552674605-db6ffd4facb5', 900, 300) },
  nicole: { bio: 'Nutricionista em formação. Meal prep e ciência na cozinha.', loc: 'Belo Horizonte, MG', followers: 1560, following: 301, interests: ['Nutrição', 'Meal prep', 'Saúde'], cover: IMG('1546069901-ba9599a7e63c', 900, 300) },
  bruno: { bio: 'Pedal todo fim de semana. SP → litoral quando dá.', loc: 'Santos, SP', followers: 980, following: 195, interests: ['Ciclismo', 'Corrida', 'Outdoor'], cover: IMG('1541625602330-2277a4c46182', 900, 300) },
  lidiane: { bio: 'Yoga, respiração e movimento consciente.', loc: 'Florianópolis, SC', followers: 1240, following: 267, interests: ['Yoga', 'Mindfulness', 'Hábitos'], cover: IMG('1544367567-0f2fcb009e0b', 900, 300) },
  julia: { bio: 'Funcional + corrida. Treino em grupo motiva mais.', loc: 'Campinas, SP', followers: 870, following: 224, interests: ['Treino funcional', 'Corrida', 'Grupos'], cover: IMG('1518611012118-696072aa579a', 900, 300) },
  renata: { bio: 'Alimentação consciente sem radicalismo.', loc: 'Porto Alegre, RS', followers: 2100, following: 389, interests: ['Nutrição', 'Receitas', 'Família'], cover: IMG('1512621776951-a57141f2eefd', 900, 300) },
  lucas: { bio: 'Dev que corre. Código de manhã, asfalto à tarde.', loc: 'São Paulo, SP', followers: 640, following: 178, interests: ['Corrida', 'Tech', 'Ciclismo'], cover: IMG('1541625602330-2277a4c46182', 900, 300) },
  camila: { bio: 'Cross e corrida. PRs pequenos todo mês.', loc: 'Rio de Janeiro, RJ', followers: 1120, following: 256, interests: ['Treino', 'Corrida', 'Força'], cover: IMG('1571019613454-1cb2f99b2d8b', 900, 300) },
};

export type CommunityCategory =
  | 'corrida'
  | 'ciclismo'
  | 'nutricao'
  | 'yoga'
  | 'habitos'
  | 'treino'
  | 'fps'
  | 'moba'
  | 'rpg'
  | 'esports'
  | 'streaming'
  | 'hardware'
  | 'gatos'
  | 'caes'
  | 'adocao'
  | 'adestramento'
  | 'cuidados'
  | 'exoticos'
  | 'aves'
  | 'jovens'
  | 'worship'
  | 'casais'
  | 'familia'
  | 'criativos'
  | 'empreendedores'
  | 'voluntariado'
  | 'homens'
  | 'mulheres'
  | 'english'
  | 'spanish'
  | 'french'
  | 'german'
  | 'italian'
  | 'japanese'
  | 'korean'
  | 'portuguese'
  | 'mandarin'
  | 'conversation'
  | 'business'
  | 'culture'
  | 'countries'
  | 'cities'
  | 'immigration'
  | 'travel'
  | 'study'
  | 'work'
  | 'nomads'
  | 'families'
  | 'housing';

export type CommunityData = {
  name: string;
  img: string;
  groups: string;
  members: string;
  avs: string[];
  category: CommunityCategory;
  isPublic: boolean;
  description: string;
  memberCount: number;
};

export const CREATE_MEDIA_SAMPLES = [
  { img: IMG('1622597467836-f3285f2131b8', 900, 900), alt: 'Suco verde' },
  { img: IMG('1552674605-db6ffd4facb5', 900, 900), alt: 'Corrida ao amanhecer' },
  { img: IMG('1546069901-ba9599a7e63c', 900, 900), alt: 'Bowl saudável' },
  { img: IMG('1541625602330-2277a4c46182', 900, 900), alt: 'Pedal na estrada' },
  { img: IMG('1544367567-0f2fcb009e0b', 900, 900), alt: 'Yoga matinal' },
  { img: IMG('1518611012118-696072aa579a', 900, 900), alt: 'Treino funcional' },
];

export const COMMUNITIES: CommunityData[] = [
  { name: 'Corrida para Iniciantes', img: IMG('1461896836934-ffe607ba8211', 640, 360), groups: '18 grupos', members: '512 membros', avs: ['tiago', 'julia', 'camila'], category: 'corrida', isPublic: true, description: 'Comece a correr no seu ritmo, com apoio e metas realistas.', memberCount: 512 },
  { name: 'Ciclismo Urbano', img: IMG('1541625602330-2277a4c46182', 640, 360), groups: '43 grupos', members: '975 membros', avs: ['bruno', 'rafael', 'tiago'], category: 'ciclismo', isPublic: true, description: 'Pedal na cidade, rotas seguras e encontros semanais.', memberCount: 975 },
  { name: 'Nutrição Consciente', img: IMG('1512621776951-a57141f2eefd', 640, 360), groups: '15 grupos', members: '396 membros', avs: ['renata', 'nicole', 'marina'], category: 'nutricao', isPublic: true, description: 'Trocar receitas, hábitos e ciência alimentar sem extremismo.', memberCount: 396 },
  { name: 'Vida Natural', img: IMG('1490645935967-10de6ba17061', 640, 360), groups: '11 grupos', members: '304 membros', avs: ['lidiane', 'aline', 'bruna'], category: 'habitos', isPublic: true, description: 'Menos processado, mais presença no dia a dia.', memberCount: 304 },
  { name: 'Treino Funcional', img: IMG('1518611012118-696072aa579a', 640, 360), groups: '14 grupos', members: '428 membros', avs: ['diego', 'julia', 'lucas'], category: 'treino', isPublic: true, description: 'WODs, progressão e treinos em grupo.', memberCount: 428 },
  { name: 'Alimentação Saudável', img: IMG('1546069901-ba9599a7e63c', 640, 360), groups: '9 grupos', members: '267 membros', avs: ['nicole', 'camila', 'renata'], category: 'nutricao', isPublic: false, description: 'Meal prep, listas de compras e desafios mensais.', memberCount: 267 },
  { name: 'Sucos Naturais', img: IMG('1622597467836-f3285f2131b8', 640, 360), groups: '7 grupos', members: '198 membros', avs: ['bruna', 'gabriela', 'pedro'], category: 'nutricao', isPublic: true, description: 'Combinações, receitas e detox sem modismo.', memberCount: 198 },
  { name: 'Hábitos que Transformam', img: IMG('1476480862126-209bfaa8edc8', 640, 360), groups: '12 grupos', members: '341 membros', avs: ['aline', 'marina', 'diego'], category: 'habitos', isPublic: true, description: 'Pequenas rotinas que viram identidade.', memberCount: 341 },
  { name: 'Corrida 5K', img: IMG('1571008887538-b36bb32f4571', 640, 360), groups: '23 grupos', members: '750 membros', avs: ['tiago', 'julia', 'camila'], category: 'corrida', isPublic: true, description: 'Do sofá aos 5 km com calendário de treinos.', memberCount: 750 },
  { name: 'Pedal de Fim de Semana', img: IMG('1502224562085-639556652f33', 640, 360), groups: '6 grupos', members: '152 membros', avs: ['bruno', 'lucas', 'gabriela'], category: 'ciclismo', isPublic: false, description: 'Rotas curtas e café depois do pedal.', memberCount: 152 },
  { name: 'Yoga', img: IMG('1544367567-0f2fcb009e0b', 640, 360), groups: '9 grupos', members: '284 membros', avs: ['lidiane', 'julia', 'bruna'], category: 'yoga', isPublic: true, description: 'Práticas guiadas, respiração e alongamento.', memberCount: 284 },
];

export const GROUP_FILTERS = [
  { id: 'all', label: 'Todos' },
  { id: 'joined', label: 'Participando' },
  { id: 'suggested', label: 'Sugeridos' },
  { id: 'corrida', label: 'Corrida' },
  { id: 'ciclismo', label: 'Ciclismo' },
  { id: 'nutricao', label: 'Nutrição' },
  { id: 'yoga', label: 'Yoga' },
  { id: 'treino', label: 'Treino' },
] as const;

export type GroupFilterId = (typeof GROUP_FILTERS)[number]['id'];

export const POSTS = [
  {
    id: 'p1', u: 'bruna', time: '5 min', group: '',
    text: 'Hoje foi o dia daquela bebida natural @naturalfit 😎',
    tags: ['#natural', '#suconatural'],
    img: IMG('1622597467836-f3285f2131b8', 900, 675), alt: 'Suco verde natural',
    likes: 128, liked: false, saved: false, comments: 25, reactions: { '💪': 6, '🌱': 4 },
    commenters: ['renata', 'julia', 'camila'],
    thread: [
      { u: 'renata', t: 'Que cor linda! Passa a receita 🌱', time: '3 min' },
      { u: 'tiago', t: 'Vou fazer amanhã antes da corrida', time: '2 min' }
    ]
  },
  {
    id: 'p2', u: 'tiago', time: '22 min', group: 'Corrida 5K',
    text: '10 km antes do sol nascer. O grupo das 5h30 é pequeno, mas não falha nenhum dia.',
    tags: ['#corrida', '#rotina'],
    img: IMG('1552674605-db6ffd4facb5', 900, 675), alt: 'Corrida em grupo ao amanhecer',
    likes: 342, liked: true, saved: false, comments: 41, reactions: { '🔥': 12, '👏': 9 },
    commenters: ['bruno', 'lidiane', 'marina'],
    thread: [
      { u: 'bruno', t: 'Semana que vem eu vou com vocês', time: '10 min' },
      { u: 'marina', t: 'Que ritmo vocês fazem?', time: '7 min' }
    ]
  },
  {
    id: 'p3', u: 'nicole', time: '1 h', group: 'Nutrição Consciente',
    text: 'Meal prep de domingo pronto: grãos, folhas e proteína pra semana inteira. Leva 40 minutos e salva os dias corridos.',
    tags: ['#alimentacaosaudavel'],
    img: IMG('1546069901-ba9599a7e63c', 900, 675), alt: 'Bowl saudável',
    likes: 96, liked: false, saved: true, comments: 12, reactions: {},
    commenters: ['renata', 'camila', 'bruna'],
    thread: [{ u: 'camila', t: 'Salvei! Preciso muito organizar isso', time: '35 min' }]
  },
  {
    id: 'p4', u: 'bruno', time: '2 h', group: 'Ciclismo Urbano',
    text: 'Primeira vez fechando 60 km sem parar pra descansar. Ano passado eu não fazia 10. 🚴',
    tags: ['#ciclismo', '#conquista'],
    img: IMG('1541625602330-2277a4c46182', 900, 675), alt: 'Ciclistas na estrada',
    likes: 214, liked: false, saved: false, comments: 33, reactions: { '👏': 18 },
    commenters: ['tiago', 'julia', 'rafael'],
    thread: [{ u: 'rafael', t: 'Monstro! Bora marcar um pedal de fim de semana', time: '1 h' }]
  },
  {
    id: 'p5', u: 'lidiane', time: '4 h', group: '',
    text: 'Dia 21 de hidratação em dia. Nada mudou na balança, mas o sono e a pele agradecem. Alguém mais nesse desafio?',
    tags: ['#habitos'],
    img: '', alt: '',
    likes: 58, liked: false, saved: false, comments: 9, reactions: { '💪': 3 },
    commenters: ['nicole', 'marina', 'bruna'],
    thread: [{ u: 'nicole', t: 'Tô no dia 14 😊', time: '2 h' }]
  },
  {
    id: 'p6', u: 'julia', time: '5 h', group: 'Treino Funcional',
    text: 'Treino de pernas concluído. Amanhã é descanso ativo 🦵',
    tags: ['#treino', '#funcional'],
    img: IMG('1518611012118-696072aa579a', 900, 675), alt: 'Treino funcional',
    likes: 89, liked: false, saved: true, comments: 14, reactions: { '💪': 8 },
    commenters: ['camila', 'diego', 'tiago'],
    thread: [{ u: 'camila', t: 'Arrasou!', time: '4 h' }]
  },
  {
    id: 'p7', u: 'renata', time: '6 h', group: 'Nutrição Consciente',
    text: 'Salada de grãos com tahine — almoço em 15 minutos.',
    tags: ['#nutricao', '#rapido'],
    img: IMG('1512621776951-a57141f2eefd', 900, 675), alt: 'Salada colorida',
    likes: 176, liked: true, saved: false, comments: 22, reactions: { '🌱': 11 },
    commenters: ['nicole', 'bruna', 'marina'],
    thread: []
  },
  {
    id: 'p8', u: 'camila', time: '7 h', group: 'Corrida 5K',
    text: 'Primeiro 5K sem parar. Chorei no final, mas valeu cada passo.',
    tags: ['#corrida', '#5k', '#conquista'],
    img: IMG('1571008887538-b36bb32f4571', 900, 675), alt: 'Medalha de corrida',
    likes: 412, liked: false, saved: true, comments: 56, reactions: { '🔥': 24, '👏': 15 },
    commenters: ['tiago', 'julia', 'bruno'],
    thread: [{ u: 'tiago', t: 'Orgulho! Próximo passo: 10K', time: '6 h' }]
  },
  {
    id: 'p9', u: 'lucas', time: '8 h', group: 'Ciclismo Urbano',
    text: '45 km pelo calçadão. Vento a favor ajudou demais hoje.',
    tags: ['#ciclismo', '#pedal'],
    img: IMG('1502224562085-639556652f33', 900, 675), alt: 'Pedal na orla',
    likes: 134, liked: false, saved: false, comments: 18, reactions: { '🚴': 6 },
    commenters: ['bruno', 'gabriela', 'rafael'],
    thread: []
  },
  {
    id: 'p10', u: 'marina', time: '9 h', group: 'Vida Natural',
    text: 'Troquei o refrigerante por água com limão e hortelã. Semana 3.',
    tags: ['#habitos', '#natural'],
    img: IMG('1490645935967-10de6ba17061', 900, 675), alt: 'Água aromatizada',
    likes: 67, liked: false, saved: false, comments: 11, reactions: {},
    commenters: ['lidiane', 'aline', 'bruna'],
    thread: []
  },
  {
    id: 'p11', u: 'me', time: '10 h', group: '',
    text: 'Voltei a correr depois de 2 semanas parado. Devagar, mas voltei.',
    tags: ['#corrida', '#volta'],
    img: IMG('1483721310020-03333e577078', 900, 675), alt: 'Tênis na calçada',
    likes: 45, liked: false, saved: false, comments: 8, reactions: { '💪': 5 },
    commenters: ['tiago', 'renata', 'julia'],
    thread: [{ u: 'tiago', t: 'Bem-vindo de volta!', time: '9 h' }]
  },
  {
    id: 'p12', u: 'diego', time: '11 h', group: 'Treino Funcional',
    text: 'WOD do dia: 20 burpees + 400m corrida x 4. Quem topa?',
    tags: ['#wod', '#funcional'],
    img: IMG('1517836357463-d25dfeac3438', 900, 675), alt: 'Treino intenso',
    likes: 98, liked: false, saved: false, comments: 19, reactions: { '🔥': 7 },
    commenters: ['julia', 'camila', 'igor'],
    thread: []
  },
  {
    id: 'p13', u: 'gabriela', time: '12 h', group: 'Pedal de Fim de Semana',
    text: 'Pelotão feminino fechando 35 km. Energia lá em cima!',
    tags: ['#ciclismo', '#mulheres'],
    img: IMG('1534258936925-c58bed479fcb', 900, 675), alt: 'Grupo de ciclistas',
    likes: 203, liked: true, saved: false, comments: 27, reactions: { '👏': 12 },
    commenters: ['bruno', 'lucas', 'rafael'],
    thread: []
  },
  {
    id: 'p14', u: 'aline', time: '14 h', group: 'Yoga',
    text: '15 minutos de respiração antes do trabalho mudam o dia inteiro.',
    tags: ['#yoga', '#mindfulness'],
    img: IMG('1544367567-0f2fcb009e0b', 900, 675), alt: 'Yoga ao amanhecer',
    likes: 112, liked: false, saved: true, comments: 16, reactions: { '🧘': 9 },
    commenters: ['lidiane', 'julia', 'marina'],
    thread: []
  },
  {
    id: 'p15', u: 'me', time: '1 d', group: 'Nutrição Consciente',
    text: 'Overnight oats com frutas vermelhas. Café da manhã resolvido.',
    tags: ['#mealprep', '#cafe'],
    img: IMG('1494597564530-871f2b93ac55', 900, 675), alt: 'Overnight oats',
    likes: 72, liked: false, saved: true, comments: 12, reactions: { '🌱': 4 },
    commenters: ['nicole', 'renata', 'bruna'],
    thread: []
  },
  {
    id: 'p16', u: 'rafael', time: '1 d', group: 'Corrida para Iniciantes',
    text: 'Semana 4 do plano: 3 km contínuos! O grupo me puxou pra cá.',
    tags: ['#iniciante', '#progresso'],
    img: IMG('1461896836934-ffe607ba8211', 900, 675), alt: 'Pista de corrida',
    likes: 156, liked: false, saved: false, comments: 31, reactions: { '👏': 14 },
    commenters: ['tiago', 'julia', 'camila'],
    thread: []
  },
  {
    id: 'p17', u: 'pedro', time: '2 d', group: 'Sucos Naturais',
    text: 'Detox verde: couve, maçã, gengibre e limão. Receita nos comentários.',
    tags: ['#suco', '#detox'],
    img: IMG('1622597467836-f3285f2131b8', 900, 675), alt: 'Suco detox',
    likes: 88, liked: false, saved: false, comments: 24, reactions: { '🌱': 6 },
    commenters: ['bruna', 'nicole', 'marina'],
    thread: [{ u: 'bruna', t: 'Qual proporção você usa?', time: '1 d' }]
  },
  {
    id: 'p18', u: 'fernanda', time: '2 d', group: 'Treino Funcional',
    text: 'PR no agachamento: 60 kg. Constância > intensidade.',
    tags: ['#forca', '#pr'],
    img: IMG('1571902943202-507ec2618e8f', 900, 675), alt: 'Agachamento com barra',
    likes: 245, liked: false, saved: false, comments: 38, reactions: { '💪': 20, '🔥': 8 },
    commenters: ['diego', 'camila', 'julia'],
    thread: []
  },
  {
    id: 'p19', u: 'nicole', time: '3 d', group: 'Nutrição Consciente',
    text: 'Lista de compras da semana: folhas, legumes, proteína magra e grãos integrais.',
    tags: ['#lista', '#organizacao'],
    img: IMG('1543362906-acfc16c67564', 900, 675), alt: 'Vegetais frescos',
    likes: 94, liked: false, saved: false, comments: 15, reactions: { '🌱': 5 },
    commenters: ['renata', 'marina', 'bruna'],
    thread: []
  },
  {
    id: 'p20', u: 'renata', time: '3 d', group: 'Nutrição Consciente',
    text: 'Sopa de legumes com gengibre — jantar leve depois do treino.',
    tags: ['#sopa', '#jantar'],
    img: IMG('1476224203421-9ac39bcb3327', 900, 675), alt: 'Sopa de legumes',
    likes: 118, liked: true, saved: false, comments: 19, reactions: { '🌱': 7 },
    commenters: ['nicole', 'camila', 'patricia'],
    thread: []
  },
  {
    id: 'p21', u: 'bruna', time: '4 d', group: 'Nutrição Consciente',
    text: 'Substituí o açúcar refinado por tâmara nas receitas doces. Funcionou!',
    tags: ['#doces', '#natural'],
    img: IMG('1490474418585-ba9bad8fd0ea', 900, 675), alt: 'Tâmaras e frutas',
    likes: 143, liked: false, saved: true, comments: 28, reactions: { '🌱': 9 },
    commenters: ['renata', 'nicole', 'marina'],
    thread: []
  },
  {
    id: 'p22', u: 'camila', time: '4 d', group: 'Nutrição Consciente',
    text: 'Proteína pós-treino: iogurte natural, banana e pasta de amendoim.',
    tags: ['#posTreino', '#proteina'],
    img: IMG('1505576391880-b3f9d713dc4f', 900, 675), alt: 'Snack pós-treino',
    likes: 87, liked: false, saved: false, comments: 11, reactions: { '💪': 4 },
    commenters: ['nicole', 'julia', 'tiago'],
    thread: []
  },
  {
    id: 'p23', u: 'patricia', time: '5 d', group: 'Nutrição Consciente',
    text: 'Desafio do grupo: 7 dias sem refrigerante. Quem entra comigo?',
    tags: ['#desafio', '#habitos'],
    img: '', alt: '',
    likes: 62, liked: false, saved: false, comments: 34, reactions: { '💪': 8 },
    commenters: ['renata', 'marina', 'aline'],
    thread: [{ u: 'marina', t: 'Eu topo!', time: '4 d' }]
  },
  {
    id: 'p24', u: 'marina', time: '5 d', group: 'Nutrição Consciente',
    text: 'Wrap integral com hummus, tomate seco e rúcula. Almoço em 10 min.',
    tags: ['#almoco', '#rapido'],
    img: IMG('1512621776951-a57141f2eefd', 900, 675), alt: 'Wrap saudável',
    likes: 105, liked: false, saved: true, comments: 17, reactions: { '🌱': 6 },
    commenters: ['nicole', 'renata', 'bruna'],
    thread: []
  },
  {
    id: 'p25', u: 'daniel', time: '6 d', group: 'Nutrição Consciente',
    text: 'Macro do dia: equilíbrio entre carboidrato, proteína e gordura boa.',
    tags: ['#macros', '#equilibrio'],
    img: IMG('1546069901-ba9599a7e63c', 900, 675), alt: 'Prato balanceado',
    likes: 76, liked: false, saved: false, comments: 9, reactions: {},
    commenters: ['nicole', 'camila', 'renata'],
    thread: []
  },
  {
    id: 'p26', u: 'lidiane', time: '3 d', group: 'Vida Natural',
    text: 'Skincare natural: óleo de coco + aloe vera. Simples e funciona.',
    tags: ['#skincare', '#natural'],
    img: IMG('1556228720-195a672e8a03', 900, 675), alt: 'Produtos naturais',
    likes: 98, liked: false, saved: true, comments: 14, reactions: { '🌱': 5 },
    commenters: ['aline', 'bruna', 'marina'],
    thread: []
  },
  {
    id: 'p27', u: 'aline', time: '4 d', group: 'Vida Natural',
    text: 'Desapeguei de 3 produtos de limpeza cheios de química. Substituí por vinagre e bicarbonato.',
    tags: ['#casa', '#sustentavel'],
    img: IMG('1556228453-efd6c1ff04f6', 900, 675), alt: 'Limpeza natural',
    likes: 112, liked: true, saved: false, comments: 21, reactions: { '🌿': 8 },
    commenters: ['lidiane', 'marina', 'nicole'],
    thread: []
  },
  {
    id: 'p28', u: 'bruna', time: '5 d', group: 'Vida Natural',
    text: 'Fiz meu próprio desodorante natural. Sem alumínio, cheiro suave o dia todo.',
    tags: ['#diy', '#natural'],
    img: IMG('1608571423902-eed4a5ad8108', 900, 675), alt: 'Desodorante natural',
    likes: 134, liked: false, saved: true, comments: 26, reactions: { '🌱': 10 },
    commenters: ['aline', 'lidiane', 'renata'],
    thread: []
  },
  {
    id: 'p29', u: 'marina', time: '6 d', group: 'Vida Natural',
    text: 'Caminhada descalça no parque. Reconectar com o chão faz diferença no humor.',
    tags: ['#natureza', '#mindfulness'],
    img: IMG('1506126613408-eca07ce68773', 900, 675), alt: 'Parque ao entardecer',
    likes: 89, liked: false, saved: false, comments: 13, reactions: { '🧘': 4 },
    commenters: ['lidiane', 'aline', 'julia'],
    thread: []
  },
  {
    id: 'p30', u: 'nicole', time: '1 sem', group: 'Vida Natural',
    text: 'Chá de camomila e mel antes de dormir. Rotina noturna que realmente acalma.',
    tags: ['#sono', '#rotina'],
    img: IMG('1556910103-1c02745aae4d', 900, 675), alt: 'Chá de camomila',
    likes: 71, liked: false, saved: false, comments: 10, reactions: {},
    commenters: ['lidiane', 'marina', 'bruna'],
    thread: []
  },
  {
    id: 'p31', u: 'renata', time: '1 sem', group: 'Vida Natural',
    text: 'Horta na varanda: manjericão, hortelã e alecrim crescendo bem!',
    tags: ['#horta', '#varanda'],
    img: IMG('1416879595882-3373a0480b5b', 900, 675), alt: 'Horta em vasos',
    likes: 156, liked: true, saved: false, comments: 22, reactions: { '🌿': 11 },
    commenters: ['aline', 'bruna', 'nicole'],
    thread: []
  },
  {
    id: 'p32', u: 'julia', time: '1 sem', group: 'Vida Natural',
    text: 'Fim de semana offline. Menos tela, mais sol e conversa de verdade.',
    tags: ['#digitaldetox', '#presenca'],
    img: IMG('1470071459604-3b5ec3a7fe05', 900, 675), alt: 'Natureza e descanso',
    likes: 198, liked: false, saved: true, comments: 31, reactions: { '✨': 12 },
    commenters: ['lidiane', 'marina', 'tiago'],
    thread: []
  }
];

export const NOTIFS = [
  { g: 'Hoje', u: 'renata', t: 'curtiu sua publicação sobre suco verde', time: '12 min', unread: true },
  { g: 'Hoje', u: 'bruno', t: 'começou a seguir você', time: '1 h', unread: true, action: 'Seguir de volta' },
  { g: 'Hoje', u: 'tiago', t: 'mencionou você em um comentário', time: '3 h', unread: true },
  { g: 'Esta semana', u: 'julia', t: 'aprovou sua entrada em Corrida 5K', time: 'ter', unread: false, action: 'Ver grupo' },
  { g: 'Esta semana', u: 'camila', t: 'comentou: "vamos marcar aquele pedal"', time: 'seg', unread: false },
  { g: 'Esta semana', u: 'marina', t: 'convidou você para Vida Natural', time: 'seg', unread: false, action: 'Aceitar' }
];

export const CONVERSATIONS = [
  { u: 'renata', unread: 2, online: true, msgs: [
    { me: false, t: 'Bom dia! Vai correr hoje?', time: '08:12' },
    { me: true, t: 'Vou sim, saio às 18h', time: '08:15' },
    { me: false, t: 'Combinado então 💪', time: '08:16' }] },
  { u: 'tiago', unread: 0, online: true, msgs: [
    { me: false, t: 'Fechei 10 km hoje, ritmo 5:20', time: '06:40' },
    { me: true, t: 'Monstro! Bora domingo?', time: '07:02' }] },
  { u: 'nicole', unread: 1, online: false, msgs: [
    { me: false, t: 'Te mandei a receita do bowl', time: 'ter' },
    { me: true, t: 'Recebi, obrigada 🌱', time: 'ter' }] },
  { u: 'bruno', unread: 0, online: false, msgs: [
    { me: true, t: 'Que horas sai o pedal sábado?', time: 'seg' },
    { me: false, t: '7h no ponto de sempre', time: 'seg' }] },
  { u: 'julia', unread: 3, online: true, msgs: [
    { me: false, t: 'Entrei no grupo Corrida 5K!', time: '09:30' },
    { me: false, t: 'Vamos treinar junto essa semana?', time: '09:31' }] },
  { u: 'lidiane', unread: 0, online: false, msgs: [
    { me: false, t: 'Aula de yoga amanhã às 7h', time: 'dom' },
    { me: true, t: 'Vou estar lá', time: 'dom' }] },
  { u: 'camila', unread: 0, online: false, msgs: [
    { me: false, t: 'Adorei seu post do suco', time: 'sex' }] },
  { u: 'marina', unread: 0, online: true, msgs: [
    { me: true, t: 'Bora caminhar hoje?', time: '11:10' },
    { me: false, t: 'Bora! 17h?', time: '11:12' }] }
];

export const MEMBER_ROLES = [
  ['tiago', 'Criador'], ['julia', 'Admin'], ['camila', 'Moderadora'], ['bruno', 'Membro'],
  ['renata', 'Membro'], ['nicole', 'Membro'], ['pedro', 'Membro'], ['aline', 'Membro'],
  ['diego', 'Membro'], ['marina', 'Membro']
];

export { EMOJIS, EMOJI_LIBRARY, EMOJI_CATEGORIES } from './emojiData';

