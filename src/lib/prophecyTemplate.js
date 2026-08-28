import { GODS } from '../data/gods';
import { ORGANIZATIONS } from '../data/orgs';

// Uma ou duas aberturas por deus, evocando seu domínio (ver src/data/gods.js).
const ABERTURAS_POR_DEUS = {
  zeus: [
    'Enquanto o trovão ecoa sobre as montanhas do Olimpo e o céu se dobra à vontade do Pai dos Deuses',
    'Sob o cetro que ordena as leis do mundo, quando o raio corta a escuridão em nome de Zeus',
  ],
  poseidon: [
    'Enquanto as marés se revoltam contra a costa e o mar guarda seus segredos mais instáveis',
    'Sob a tempestade que Poseidon ergue com um só golpe de tridente',
  ],
  hades: [
    'Nas profundezas onde nenhum mortal ousa descer, onde Hades governa o silêncio e o ouro enterrado',
    'Sob a sombra fria do submundo, onde cada alma encontra seu lugar final',
  ],
  atena: [
    'Enquanto a coruja de Atena observa cada movimento no tabuleiro do destino',
    'Sob o olhar estratégico da deusa nascida da mente de Zeus, onde nenhuma jogada é por acaso',
  ],
  apolo: [
    'Enquanto o sol percorre seu arco dourado e a lira de Apolo afina os versos do porvir',
    'Sob a luz que revela verdades e a profecia que Apolo sussurra aos ouvidos dos escolhidos',
  ],
  ares: [
    'Ao som de lâminas se chocando e do grito de guerra que Ares ama acima de tudo',
    'Sob o campo de batalha onde a fúria é a única linguagem que Ares reconhece',
  ],
  afrodite: [
    'Enquanto o perfume de Afrodite se espalha e corações se rendem sem pedir licença',
    'Sob o olhar da deusa que faz do amor a mais perigosa das armas',
  ],
  hefesto: [
    'Junto às fornalhas onde Hefesto forja o que nenhum outro deus ousaria imaginar',
    'Sob o martelo que nunca descansa, onde cada peça criada carrega um propósito',
  ],
  hermes: [
    'Enquanto sandálias aladas cortam o vento e Hermes carrega mensagens entre mundos',
    'Sob o olhar ardiloso do deus mensageiro, sempre um passo à frente de todos',
  ],
  demeter: [
    'Quando os campos florescem à vontade de Deméter e a colheita promete fartura',
    'Sob o manto generoso da deusa que nutre a terra e tudo o que dela nasce',
  ],
  dionisio: [
    'Ao som de taças se chocando e do êxtase que Dioniso espalha por onde passa',
    'Sob o vinho que rompe regras como quem rompe garrafas, em nome de Dioniso',
  ],
  nike: [
    'Enquanto a vitória paira no ar e Nike aponta o caminho para os que não desistem',
    'Sob as asas da deusa que nunca perde uma corrida, muito menos uma batalha',
  ],
  hecate: [
    'Nas encruzilhadas onde Hécate acende sua tocha e revela o que estava oculto',
    'Sob a magia antiga que só os filhos de Hécate sabem interpretar',
  ],
  nyx: [
    'Quando o manto estrelado de Nyx cobre o céu e guarda os segredos mais íntimos',
    'Sob a noite que tudo acolhe, onde Nyx sussurra o que ninguém mais ousa dizer',
  ],
  thanatos: [
    'No instante do último suspiro, onde Thânatos aguarda com serenidade inabalável',
    'Sob o silêncio que precede a travessia, guiado pelas mãos pacientes de Thânatos',
  ],
  nemesis: [
    'Quando a balança de Nêmesis pende contra o orgulho desmedido dos mortais e dos deuses',
    'Sob o olhar implacável da guardiã do equilíbrio, onde nenhum erro passa impune',
  ],
};

// Uma ou duas continuações por organização (ver src/data/orgs.js).
const MISSOES_POR_ORG = {
  'Lua-nova': [
    'erguerá muralhas invisíveis entre o mundo mortal e a escuridão que o espreita',
    'caminhará pelos portões da cidade sagrada, protegendo cada semideus recém-chegado',
  ],
  Anthros: [
    'incendiará os altares antigos, jurando apagar todo traço do sangue divino que carrega',
    'caminhará como sombra entre os mortais, forjando um futuro onde os deuses não têm lugar',
  ],
  Imitheos: [
    'reivindicará o que os deuses jamais lhe ofereceram, subjugando o que for preciso',
    'moverá exércitos silenciosos em nome do sangue divino que corre em suas veias',
  ],
  83: [
    'erguerá a bandeira da Legião 83 e marchará contra o próprio destino traçado pelas Moiras',
    'quebrará as correntes do fado, exigindo escolher seu próprio caminho — deuses que se danem',
  ],
  taurinos: [
    'seguirá o rastro sagrado dos minotauros até os confins mais estranhos de Pandora',
    'jurará lealdade eterna aos chifres antigos, por razões que nem as Moiras compreendem',
  ],
};

const ABERTURA_PADRAO = ['Nos fios entrelaçados do destino, onde nada é escrito por acaso'];
const MISSAO_PADRAO = ['seguirá um caminho que nem os próprios deuses souberam prever'];

function escolherAleatorio(lista) {
  return lista[Math.floor(Math.random() * lista.length)];
}

/**
 * Gera o texto de uma profecia combinando fragmentos por deus + organização.
 * Função pura (exceto pela aleatoriedade do sorteio) — não faz I/O.
 *
 * @param {{ nomeExibicao: string, parenteDivino: string, organizacao: string }} params
 *   `parenteDivino` e `organizacao` são os `id` de GODS/ORGANIZATIONS.
 * @returns {string}
 */
export function gerarProfecia({ nomeExibicao, parenteDivino, organizacao }) {
  const deus = GODS.find((g) => g.id === parenteDivino);
  const org = ORGANIZATIONS.find((o) => o.id === organizacao);

  const abertura = escolherAleatorio(ABERTURAS_POR_DEUS[parenteDivino] ?? ABERTURA_PADRAO);
  const missao = escolherAleatorio(MISSOES_POR_ORG[organizacao] ?? MISSAO_PADRAO);
  const nomeDeus = deus?.nome ?? 'um deus esquecido pelo tempo';
  const nomeOrg = org?.nome ?? 'uma ordem sem nome';

  return `${abertura}, as Moiras teceram este fio: ${nomeExibicao}, sangue de ${nomeDeus}, ${missao}. Que ${nomeOrg} testemunhe o que há de vir — pois nenhum mortal, semideus ou deus ousa desfazer o que já foi dito.`;
}
