// Traços vão de -1 (oposto do traço) a 1 (forte presença do traço).
export const GODS = [
  {
    id: 'zeus',
    nome: 'Zeus',
    dominio: 'Céu e Trovões',
    descricao:
      'Pai dos deuses e senhor do raio, Zeus é a autoridade que ordena as leis do mundo. Seus descendentes em Filhos do Destino nascem com uma vontade natural de liderar, grande carisma e bom humor! Mas sua paciência é seriamente testada quando alguém desafia seus planos.',
    traits: { coragem: 0.7, sabedoria: 0.5, ordem: 0.8, astucia: 0.2, compaixao: 0.1, ambicao: 0.9, preguica: -0.3, confianca: 0.9 },
    imagem: 'src/assets/imagens/deuses/zeus.png',
  },
  {
    id: 'poseidon',
    nome: 'Poseidon',
    dominio: 'Mares e Tempestades',
    descricao:
      'Instável como as marés que comanda, Poseidon é força bruta e emoção sem filtro. O deus mais perigoso entre os três grandes. Seus filhos carregam um temperamento ambíguo demais: podem ser protetores e decisivos, ou imprevisíveis e destrutivos. A única diferença está em como e onde cresceram.',
    traits: { coragem: 0.8, sabedoria: 0.2, ordem: -0.3, astucia: 0.1, compaixao: 0.0, ambicao: 0.5, preguica: -0.2, confianca: 0.7 },
    imagem: 'src/assets/imagens/deuses/poseidon.png',
  },
  {
    id: 'hades',
    nome: 'Hades',
    dominio: 'Submundo',
    descricao:
      'Tudo aquilo abaixo do seu pé. É isso que Hades governa: o chão, os minérios, o submundo e a morte. Seus filhos são reservados, observadores e calmos. Costumam ter inteligência emocional acima da média, e pensam muito na família e amigos próximos. Não são líderes natos, mas podem se tornar se for preciso!',
    traits: { coragem: 0.2, sabedoria: 0.4, ordem: 0.7, astucia: 0.8, compaixao: -0.2, ambicao: 0.3, preguica: 0.1, confianca: 0.3 },
    imagem: 'src/assets/imagens/deuses/hades.png',
  },
  {
    id: 'atena',
    nome: 'Atena',
    dominio: 'Sabedoria e Guerra Estratégica',
    descricao:
      'Nascida diretamente do cérebro de Zeus, Atena herda a astúcia, inteligência e capacidade de liderança do pai. Seus filhos são estrategistas natos, analisando TODAS as situações, desde uma guerra mundial até um "oi" no whatsapp. São confiáveis, mas podem ser frios em suas decisões. Você provavelmente gosta muito de literatura.',
    traits: { coragem: 0.6, sabedoria: 1, ordem: 0.8, astucia: 0.7, compaixao: -0.2, ambicao: 0.4, preguica: -0.6, confianca: 0.6 },
    imagem: 'src/assets/imagens/deuses/atena.png',
  },
  {
    id: 'apolo',
    nome: 'Apolo',
    dominio: 'Sol, Profecia e Artes',
    descricao:
      'Deus da luz, da música e da profecia, Apolo é o próprio conceito da perfeição. Se a vida é uma arte, então Apolo é toda a vida. E claro, sua prole seria confiante, egocêntrica e naturalmente talentosa como o tal. Carismáticos, mas arrogantes, provavelmente se acham os melhores em tudo. Beijam muito bem.',
    traits: { coragem: 0, sabedoria: 0.7, ordem: 0.4, astucia: -0.3, compaixao: 0.7, ambicao: 0.1, preguica: 0.5, confianca: 0.7 },
    imagem: 'src/assets/imagens/deuses/apolo.png',
  },
  {
    id: 'ares',
    nome: 'Ares',
    dominio: 'Guerra e Violência',
    descricao:
      'Ares é a personificação do ódio, seja ele qual for. Seus filhos são impulsivos e impacientes, e odeiam injustiça, maldade e covardia. Vão sair na porrada caso acreditem que é a coisa certa a se fazer. Se existe um jeito de acabar com o mal, é pela raiz.',
    traits: { coragem: 1, sabedoria: 0.4, ordem: 0.5, astucia: 0, compaixao: -0.1, ambicao: 0.6, preguica: -0.3, confianca: 0.8 },
    imagem: 'src/assets/imagens/deuses/ares.png',
  },
  {
    id: 'afrodite',
    nome: 'Afrodite',
    dominio: 'Amor e Beleza',
    descricao:
      'Afrodite tem domínio do extremo oposto de seu secreto amante: o amor. Apaixonados, dedicados e singelos são seus filhos, que sempre vão estar confusos com alguma escolha de sim ou não. Os mais protetores entre todos os semideuses, amam com tamanha convicção que jamais podem deixar alguém do grupo morrer. Contudo, ninguém realmente AMA um filho de Afrodite...',
    traits: { coragem: 0.2, sabedoria: -0.1, ordem: -0.4, astucia: 0.6, compaixao: 1, ambicao: 0.4, preguica: 0.6, confianca: 0.8 },
    imagem: 'src/assets/imagens/deuses/afrodite.png',
  },
  {
    id: 'hefesto',
    nome: 'Hefesto',
    dominio: 'Forja e Criação',
    descricao:
      'Inteligente, sábio e rancoroso como um antigo orvalho, Hefesto sempre vai se lembrar de alguém que o machucou. Seus filhos são muito parecidos: pensam demais, sempre estão distraídos ou iniciando novos projetos e vão odiar você pelo resto da vida, caso machuque-os por seus atos.',
    traits: { coragem: 0.3, sabedoria: 0.8, ordem: 0.8, astucia: 0.4, compaixao: 0.2, ambicao: 0.4, preguica: -0.7, confianca: 0.2 },
    imagem: 'src/assets/imagens/deuses/hefesto.png',
  },
  {
    id: 'hermes',
    nome: 'Hermes',
    dominio: 'Mensageiro e Comércio',
    descricao:
      'Rápido, esperto e sempre um passo à frente, Hermes percorre todas as possibilidades em segundos. Seus filhos pensam sobre tudo, mas agem por impulso sempre na pior escolha possível. Engraçados, divertidos e ardilosos. Enganam qualquer um só pelo bom humor, roubando dinheiro, olhares ou posições de poder.',
    traits: { coragem: 0.3, sabedoria: 0.4, ordem: -0.4, astucia: 1, compaixao: 0.1, ambicao: 0.5, preguica: 0.1, confianca: 0.6 },
    imagem: 'src/assets/imagens/deuses/hermes.png',
  },
  {
    id: 'demeter',
    nome: 'Deméter',
    dominio: 'Colheita e Fertilidade',
    descricao:
      'Deméter se apresenta como alguém paciente, generosa, incansável. Seus descendentes colocam o bem-estar coletivo acima da própria ambição e sempre são os mais queridinhos em um grupo. Contudo, vão se fazer de coitados para conseguirem o quê querem. São perigosos quando irritados.',
    traits: { coragem: 0.1, sabedoria: 0.5, ordem: 0.5, astucia: 0, compaixao: 0.9, ambicao: -0.1, preguica: 0, confianca: 0.3 },
    imagem: 'src/assets/imagens/deuses/demeter.png',
  },
  {
    id: 'dionisio',
    nome: 'Dionisio',
    dominio: 'Vinho e Êxtase',
    descricao:
      'Dioniso rompe regras como quem rompe garrafas. Culpa, ansiedade ou represálias? Dane-se! Seus filhos vivem intensamente o presente, atraem multidões e desconfiam de qualquer coisa que pareça fácil demais. São populistas natos, e conseguem se passar por qualquer um para alcançar um objetivo, se conseguirem definir um.',
    traits: { coragem: 0.3, sabedoria: 0.2, ordem: -0.4, astucia: 0.3, compaixao: 0.4, ambicao: -0.1, preguica: 1, confianca: 0.5 },
    imagem: 'src/assets/imagens/deuses/dionisio.png',
  },
  {
    id: 'nike',
    nome: 'Nike',
    dominio: 'Força e Vitória',
    descricao:
      'Nike é sempre a primeira das divindades, em qualquer tema. Espalhando coragem e determinação por onde passa, seus filhos são grandes atletas, empresários ou investidores. Acreditam no trabalho duro, na perseverança e no aprendizado através do erro. ',
    traits: { coragem: 0.8, sabedoria: 0.6, ordem: 0.1, astucia: 0.3, compaixao: -0.1, ambicao: 1, preguica: -0.3, confianca: 1 },
    imagem: 'src/assets/imagens/deuses/nike.png',
  },
  {
    id: 'hecate',
    nome: 'Hécate',
    dominio: 'Magia e encruzilhadas',
    descricao:
      'Guardiã silenciosa do oculto, Hécate toca tudo aquilo que não conseguimos compreender. Sua prolé é quieta, calma, reflexiva e estudiosa. Acreditam que toda palavra tem poder, confiam em cristais e estrelas. Supersticiosos, nunca diga algo ambíguo para um filho de Hécate: ele irá achar o resultado dessa encruzilhada.',
    traits: { coragem: 0.1, sabedoria: 1, ordem: 0.2, astucia: -0.5, compaixao: 0.6, ambicao: -0.3, preguica: 0.1, confianca: -0.3 },
    imagem: 'src/assets/imagens/deuses/hecate.png',
  },
  {
    id: 'nyx',
    nome: 'Nyx',
    dominio: 'Astros e intímo',
    descricao:
      'Nyx é a rainha dos segredos, dos astros, estrelas e do próprio íntimo do humano. Ela lhe abraça quando guardas um segredo pessoal, quando coloca uma face que não é sua para agradar à outrém. Seus filhos são atenciosos, bons ouvintes e aconchegantes, como um céu estrelado.',
    traits: { coragem: 0.3, sabedoria: 0.6, ordem: 0.2, astucia: 0.4, compaixao: 0.8, ambicao: 0, preguica: -0.1, confianca: 1 },
    imagem: 'src/assets/imagens/deuses/nyx.png',
  },
  {
    id: 'thanatos',
    nome: 'Thanatos',
    dominio: 'Morte',
    descricao:
      'O último suspiro é o mais belo de todos para Thânato. Nenhum mortal vai à Hades sem a presença deste ser carregando sua alma em seus braços. Seus filhos são serenos, cumprem promessas à risca e raramente demonstram o peso que carregam por dentro. Sempre gostam do final de todas as histórias, e odeiam fofocas inacabadas.',
    traits: { coragem: 0.5, sabedoria: 0.7, ordem: 0.3, astucia: -0.1, compaixao: -0.9, ambicao: 0, preguica: 0.9, confianca: 0.3 },
    imagem: 'src/assets/imagens/deuses/thanatos.png',
  },
  {
    id: 'nemesis',
    nome: 'Nêmesis',
    dominio: 'Justiça e Equilíbrio',
    descricao:
      'A Filha da Noite e guardiã da justiça divina, Nêmesis é o equilíbrio que pune o orgulho desmedido e recompensa a humildade. Seus filhos carregam o peso da justiça, sendo observadores implacáveis, nunca deixando um erro passar impune. Preferem morrer ao errar, e acreditam que seguir o certo é seguir o que foi prescrito pelos nossos antepassados.',
    traits: { coragem: 0.5, sabedoria: 0.8, ordem: 1, astucia: -0.3, compaixao: -0.2, ambicao: 0.2, preguica: -0.4, confianca: 0.8 },
    imagem: 'src/assets/imagens/deuses/nemesis.png',
  },
];
