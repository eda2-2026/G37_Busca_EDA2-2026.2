// Heróis da campanha exibidos na landing page. Pra revelar um novo:
//   1. Coloque o arquivo `{id}.png` em src/assets/imagens/campanha/
//   2. Troque `unlocked` pra true aqui embaixo (nome já fica visível mesmo travado)
//   3. Deploy — o retrato aparece revelado automaticamente
// Se `unlocked: true` mas o arquivo ainda não existir, o card cai pro
// estado travado ("?" no retrato) sozinho — ver HeroCard.jsx.
//
// `ator`: nome de quem interpreta o herói, mostrado no verso do card ao
// passar o mouse (só funciona se `unlocked` E a foto do ator existir — ver
// ACTOR_IMAGE_OVERRIDES em HeroCard.jsx, já que os arquivos atuais não
// seguem um padrão único de nome).
export const CAMPAIGN_HEROES = [
  { id: 'sophia', nome: 'Sophia Parochmos', origem: 'Filha de Atena', unlocked: true, ator: 'Yas Albuquerque' },
  { id: 'fissao', nome: 'Fissão', origem: 'Filho de Hades', unlocked: true, ator: 'Arthur Roma' },
  { id: 'cassius', nome: 'Cassius Creed', origem: 'FIlho de Poseidon', unlocked: true, ator: 'PauloDNF' },
  { id: 'diana', nome: 'Diana Gargouille', origem: 'Filha de Dionísio', unlocked: true, ator: 'Gabrielle' },
  { id: 'lelio', nome: 'Em breve', origem: null, unlocked: false, ator: null },
  { id: 'dakota', nome: 'Em breve', origem: null, unlocked: false, ator: null },
];
