export const QUESTIONS_GODS = [
  {
    id: 'g1',
    texto: 'Uma ameaça sobrenatural surge de repente na cidade. Qual sua primeira reação?',
    opcoes: [
      { texto: 'Avançar sem hesitar, de arma em punho.', effect: { coragem: 2, preguica: -1 } },
      { texto: 'Avaliar os sinais antes de agir.', effect: { sabedoria: 2, astucia: 1 } },
      { texto: 'Reunir aliados e organizar um plano.', effect: { ordem: 2, confianca: 1 } },
      { texto: 'Esperar a poeira baixar antes de se envolver.', effect: { preguica: 2, coragem: -1 } },
      { texto: 'Eu seria a ameaça', effect: { ambicao: 2, preguica: -1 } },
    ],
  },
  {
    id: 'g2',
    texto: 'Como você lida com um segredo perigoso que só você conhece?',
    opcoes: [
      { texto: 'Guardo comigo para sempre.', effect: { confianca: 2, ordem: 1 } },
      { texto: 'Uso a informação a meu favor quando for útil.', effect: { astucia: 2, ambicao: 1 } },
      { texto: 'Conto pra alguém, porque sozinho não aguentaria.', effect: { compaixao: 1, confianca: -2 } },
      { texto: 'Ignoro, ué.', effect: { preguica: 2, compaixao: -1 } },
    ],
  },
  {
    id: 'g3',
    texto: 'O que mais te motiva a agir?',
    opcoes: [
      { texto: 'Provar que sou capaz de qualquer coisa.', effect: { ambicao: 2, confianca: 1 } },
      { texto: 'Proteger quem eu amo.', effect: { compaixao: 2, coragem: 1 } },
      { texto: 'Entender como o mundo realmente funciona.', effect: { sabedoria: 2 } },
      { texto: 'Manter as coisas em equilíbrio e sob controle.', effect: { ordem: 2 } },
      { texto: 'Não preciso agir por status ou conquista nenhuma.', effect: { preguica: 1, ambicao: -2 } },
    ],
  },
  {
    id: 'g4',
    texto: 'Você é convidado para um jogo de risco alto. O que faz?',
    opcoes: [
      { texto: 'Topo na hora.', effect: { coragem: 2, ambicao: 1 } },
      { texto: 'Calculo as chances antes de decidir.', effect: { astucia: 2, sabedoria: 1 } },
      { texto: 'Prefiro nem calcular os riscos, só assisto de longe.', effect: { preguica: 2, ambicao: -1, astucia: -1 } },
      { texto: 'Só entro se eu puder ditar as regras.', effect: { ordem: 2, confianca: 1 } },
      { texto: 'Eu teria feito o convite.', effect: { ambicao: 2, confianca: 1 } },
    ],
  },
  {
    id: 'g5',
    texto: 'Um amigo comete um erro grave que machuca outras pessoas. Como você reage?',
    opcoes: [
      { texto: 'Ofereço ajuda para consertar o quê der', effect: { compaixao: 2 } },
      { texto: 'Cobro responsabilidade e consequências claras.', effect: { ordem: 2, confianca: 1 } },
      { texto: 'Uso a situação a meu favor, se possível.', effect: { astucia: 2, ambicao: 1 } },
      { texto: 'Me afasto.', effect: { preguica: 2, compaixao: -1 } },
      { texto: 'Ajo no impulso, xingo sem pensar.', effect: { astucia: -2, compaixao: -1 } },
    ],
  },
  {
    id: 'g6',
    texto: 'Como você prefere passar seu tempo livre?',
    opcoes: [
      { texto: 'Treinando o físico, esportes', effect: { preguica: -2, ordem: 1 } },
      { texto: 'Lendo, estudando, investigando mistérios.', effect: { sabedoria: 2 } },
      { texto: 'Em festas, boa companhia, resenha.', effect: { preguica: 2, compaixao: 1 } },
      { texto: 'Planejando meu próximo projeto.', effect: { ambicao: 2, astucia: -1 } },
      { texto: 'Tempo livre?', effect: { preguica: -1, sabedoria: 2 } },
    ],
  },
  {
    id: 'g7',
    texto: 'Alguém questiona sua autoridade abertamente. O que você faz?',
    opcoes: [
      { texto: 'Encaro de frente, sem recuar.', effect: { coragem: 2, confianca: 1 } },
      { texto: 'Escuto com calma, pode ter um ponto válido.', effect: { sabedoria: 2, coragem: -1 } },
      { texto: 'Reviro a situação com palavras, não força.', effect: { astucia: 2 } },
      { texto: 'Deixo pra lá, nem sei se vale meu tempo.', effect: { preguica: 2, confianca: -2 } },
      { texto: 'Saio na porrada.', effect: { coragem: 2, ambicao: 1 } },
    ],
  },
  {
    id: 'g8',
    texto: 'O que você mais teme perder?',
    opcoes: [
      { texto: 'Minha liberdade.', effect: { ordem: -2, astucia: 1 } },
      { texto: 'As pessoas que eu protejo.', effect: { compaixao: 2 } },
      { texto: 'O controle da situação.', effect: { ordem: 2, confianca: 1 } },
      { texto: 'Minha reputação e o respeito dos outros.', effect: { confianca: 2, ambicao: 1 } },
      { texto: 'Nada, na real. Não ligo pra manter nada disso.', effect: { ambicao: -2, confianca: -1 } },
    ],
  },
  {
    id: 'g9',
    texto: 'Como as outras pessoas costumam te descrever?',
    opcoes: [
      { texto: 'Corajoso e leal', effect: { coragem: 2 } },
      { texto: 'Frio e calculista.', effect: { astucia: 2, compaixao: -1 } },
      { texto: 'Confiável e presente.', effect: { confianca: 2, compaixao: 1 } },
      { texto: 'Difícil e amargo.', effect: { preguica: 2, coragem: 1 } },
      { texto: 'Engraçado e fofo.', effect: { preguica: 1, compaixao: 3 } },
    ],
  },
  {
    id: 'g10',
    texto: 'Um poder inesperado desperta em você. O que faz primeiro?',
    opcoes: [
      { texto: 'Testo os limites imediatamente, ambicionando dominá-lo.', effect: { ambicao: 2, coragem: 1 } },
      { texto: 'Estudo cuidadosamente antes de usar.', effect: { sabedoria: 2, ordem: 1 } },
      { texto: 'Escondo por instinto, sem pensar direito no que fazer.', effect: { astucia: -2, sabedoria: -1 } },
      { texto: 'Uso para ajudar quem está perto de mim.', effect: { compaixao: 2 } },
      { texto: 'KAABUMMMM', effect: { preguica: 1, coragem: 2, compaixao: -3 } },
      { texto: 'Mato quem me machucou um dia.', effect: { ambicao: 2, ordem: -1, compaixao: -1 } },
    ],
  },
  {
    id: 'g11',
    texto: 'Um inimigo mais fraco foge da luta, sem representar mais ameaça. O que você faz?',
    opcoes: [
      { texto: 'Persigo e termino o combate. Deixar vivo é fraqueza.', effect: { compaixao: -2, sabedoria: -1, coragem: 1 } },
      { texto: 'Deixo ir, a vitória já foi provada.', effect: { compaixao: 1, confianca: 1 } },
      { texto: 'Uso a chance para negociar algo em troca da vida dele.', effect: { astucia: 2, ambicao: 1 } },
      { texto: 'Prendo para interrogar depois, com calma.', effect: { ordem: 2, sabedoria: 1 } },
      { texto: 'Eu venci uma luta?', effect:{ compaixao: 1, sabedoria: -1}}
    ],
  },
  {
    id: 'g12',
    texto: 'Você mataria algum inimigo apenas para ganhar experiência de combate?',
    opcoes: [
      { texto: 'Sim, sem pensar duas vezes!', effect: { sabedoria: -2, compaixao: -2, coragem: 1 } },
      { texto: 'Só se ele representasse perigo real no futuro.', effect: { sabedoria: 1, ordem: 1 } },
      { texto: 'Nunca! Vidas importam.', effect: { compaixao: 2, sabedoria: 1 } },
      { texto: 'Prefiro formas mais espertas de treinar.', effect: { astucia: 1, preguica: 1 } },
    ],
  },
  {
    id: 'g13',
    texto: 'Fazer mal a alguém inocente garantiria proteger quem você ama. Você faria?',
    opcoes: [
      { texto: 'A dor dele não pesa mais que a segurança dos meus.', effect: { compaixao: -2, sabedoria: -1, ordem: -1 } },
      { texto: 'Buscaria qualquer outra saída antes disso.', effect: { sabedoria: 2, compaixao: 1 } },
      { texto: 'Delegaria a decisão, não confio no meu próprio julgamento.', effect: { preguica: 1, confianca: -2 } },
      { texto: 'Calcularia se vale a pena, sem emoção envolvida.', effect: { astucia: 2, ordem: 1 } },
    ],
  },
  {
    id: 'g14',
    texto: 'Uma decisão importante precisa ser tomada agora, sem tempo pra pensar muito. O que prevalece?',
    opcoes: [
      { texto: 'Sigo o que já está estabelecido. Regra é regra.', effect: { astucia: -2, ordem: 2 } },
      { texto: 'Duvido de mim mesmo até o último segundo.', effect: { confianca: -2, sabedoria: 1 } },
      { texto: 'Decido rápido e sigo em frente sem olhar pra trás.', effect: { coragem: 1, confianca: 1 } },
      { texto: 'Procuro um jeito esperto de ganhar mais tempo.', effect: { astucia: 1, ambicao: 1 } },
    ],
  },
    {
    id: 'g15',
    texto: 'Você gostou deste quiz?',
    opcoes: [
      { texto: 'Meio mal feito...', effect: {  } },
      { texto: 'Amei!', effect: {  } },
      { texto: 'Deu uma preguiça...', effect: { } },
      { texto: 'Eu cliquei rápido para ver como funcionava.', effect: { } },
    ],
  },
];