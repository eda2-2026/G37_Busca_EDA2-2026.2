// Locais do Mapa Mundi — coordenadas em % da imagem (x, y).
// Conteúdo e coordenadas são um rascunho inicial: ajuste livremente, cada
// entrada é independente e não afeta nenhuma lógica do quiz.
export const MAP_LOCATIONS = [
  {
    id: 'entrada',
    nome: 'Entrada',
    x: 48,
    y: 95,
    resumo: 'Um portal com duas extensas colunas brancas e douradas, com esculturas de Poseidon e Selene.',
    conteudo:
      'Toda jornada de um jovem semideus começa aqui, nos portões de Lua Nova. Protegida por autômatos dos Filhos de Hefesto e por uma fina camada de poeira dos sonhos, garantida pelos filhos de Hypnos, a entrada é a visão mais memóravel de toda a cidade. Ninguém sabe onde fica, fisicamente, a cidade, então todo tipo de visitante entra pela mesma entrada.',
    tag: 'Ponto de chegada',
  },
  {
    id: 'centro',
    nome: 'Centro',
    x: 48,
    y: 44.5,
    resumo: 'O coração do território: o prédio PERSEUS engrandece o centro de tudo.',
    conteudo:
      'O ponto principal de Lua Nova. O centro possui três grandes referências: o restaurante comunitário, onde todo semideus tem acesso à comida e bebida gratuitamente, a grande fogueira, uma benção de Hestia que proíbe semideuses de morrerem dentro do território, e o grande prédio Perseus, um edifício de pele de vidro, recheado de salas de reunião, escritórios, itens-legado e segredos. Os quatro semideuses representantes vivem na cobertura.',
    tag: 'Ponto de encontro',
  },
  {
    id: 'escola',
    nome: 'Escola e Faculdade',
    x: 48,
    y: 21,
    resumo: 'Não existe poder sem responsabilidade, e não existe responsabilidade sem conhecimento.',
    conteudo:
      'Administrada majoritariamente por filhos de Atena, Hécate e Nyx, a instituição ORFEU é responsável por educar e preparar todo semideus para a vida adulta. Muitos reclamam das disciplinas mortais, como matemática ou geografia, ainda estarem na grade horária, mesmo tendo de enfrentar tempos difícies. Contudo, os professores são sempre rígidos e repetivivos em suas respostas: "o mundo, com ou sem os mitos, ainda é mundo. Todos vocês terão contas à pagar...". E sim, eles possuem um jato embaixo da quadra de basquete.',
    tag: 'Educação',
  },
  {
    id: 'centro-batalha',
    nome: 'Centro de Batalha',
    x: 58.8,
    y: 27,
    resumo: 'Arena de treinamento de combate corpo a corpo e habilidades de guerra.',
    conteudo:
      'Filhos de Ares e Nike praticamente vivem aqui. O Centro de Batalha hospeda torneios mensais, e é comum ver duelos amistosos (ou nem tanto) entre semideuses testando os limites de sua força. Como Hestia proíbe que qualquer semideus perca a vida, mas não impede desmembramentos ou contusões, muitos acidentes foram registrados quando o clima esquentava. Nunca pergunte o quê foi o "acidente do touro louco", você não vai querer saber.',
    tag: 'Treinamento',
  },
  {
    id: 'simulador',
    nome: 'Simulador',
    x: 74.2,
    y: 13.3,
    resumo: 'Câmara de simulação mágica pra treinar cenários de risco real.',
    conteudo:
      'Uma construção relativamente nova, erguida com a ajuda de artesãos ligados a Hefesto e Zeus. O Simulador recria ameaças sobrenaturais em ambiente controlado. Considera-se como a forma mais segura (e mais assustadora) de se preparar pro mundo lá fora, mas também causa graves acidentes quando as máquinas dão problema. Uma vez, um semideus de Nike tinha certeza de que venceria uma luta com uma simulação do colosso Talos...',
    tag: 'Treinamento',
  },
  {
    id: 'templo-geral',
    nome: 'Templo Geral',
    x: 84.2,
    y: 18,
    resumo: 'Santuário compartilhado, aberto à devoção de qualquer um dos deuses.',
    conteudo:
      'Diferente dos altares pessoais espalhados pelo território, o Templo Geral não pertence a nenhum deus específico — é neutro, e recebe oferendas e rituais de todas as origens. Alguns dizem que Nêmesis observa de perto quem usa esse espaço pra vantagem própria. Sempre que sentir saudade de seu Parente Divino, aqui é um ótimo lugar para receber conselhos ou um presente de aniversário atrasado. Os únicos deuses que recusam todos os chamados são Thânatos e Hércules.',
    tag: 'Religioso',
  },
  {
    id: 'mercado',
    nome: 'Mercado',
    x: 74.2,
    y: 44.5,
    resumo: 'Comércio, trocas e informação. O ponto de encontro dos filhos de Hermes.',
    conteudo:
      'Se você precisa de algo — item raro, informação, ou só um bom papo —, é aqui que encontra. O "Mochila de Hermes" opera boa parte das trocas comerciais e de favores do território a partir do Mercado, garantindo que a inflação não atinja o cotidiano dos moradores (ou, pelo menos, garantir que eles não percebam). É comum ver compras sendo realizadas por escambo, frutas de guaraná ou dracmas de ouro.',
    tag: 'Comércio',
  },
  {
    id: 'coleta',
    nome: 'Coleta',
    x: 53.4,
    y: 61,
    resumo: 'Uma região para abandonados e esquecidos. Um lugar para chamarem de lar.',
    conteudo:
      'Lua Nova é conhecida por suas boas e solidárias instituições. O centro de coleta é, basicamente, um grande bairro construído por filhos de Nêmesis para todos os injustiçados: semideuses de deuses menores, filhos de semideuses que já morreram, meio-monstros ou qualquer possível criatura com sangue dourado que necessite de um lugar, de uma família. Seus habitantes costumeiramente não fixam residência, pois desistem da permanência ou saem em missões de auto descobrimento. A moradora mais velha é Lydia Rodrigues, filha de Tália, uma das três graças. ',
    tag: 'Abrigos.',
  },
  {
    id: 'colinas',
    nome: 'Colinas',
    x: 13.8,
    y: 50,
    resumo: 'Região residencial mais afastada. Bairro dos filhos de Zeus, Nike e Éolo.',
    conteudo:
      'As Colinas concentram moradias de semideuses que preferem a altitude. O ar rarefeito é o ideal para os pulmões de Zeônidas e Éolídeos, adequando seus poderes para o mais próximo possível ao divino. Nikédeos costumam viver ali apenas pelo puro desafio. ',
    tag: 'Residencial',
  },
  {
    id: 'bosque',
    nome: 'Bosque',
    x: 60.6,
    y: 73.6,
    resumo: 'Mata densa nos limites do território.',
    conteudo:
      'Oficialmente parte do território, o Bosque é onde a vigilância é mais fraca. Filhos de Dioniso e Afrodite às vezes desaparecem por lá em busca de privacidade. Sabe-se, também, que foi alvo da única invasão datada na história de Lua Nova, por conta de uma falha no espaço-tempo causada por uma máquina da organização Anthros.',
    tag: 'Área selvagem',
  },
  {
    id: 'estabulo',
    nome: 'Estábulo',
    x: 6.8,
    y: 26,
    resumo: 'Abriga as montarias e criaturas ligadas a Poseidon e companhia.',
    conteudo:
      'Cavalos e Pégasos que nunca deveriam nadar tão bem, e algumas criaturas que ninguém tem muita certeza de como classificar. O Estábulo é cuidado majoritariamente por filhos de Poseidon, com uma paciência que poucos esperariam deles, mas também é possível ver Apolídas e Hefestídeos passeando por aí.',
    tag: 'Criaturas',
  },
  {
    id: 'fogueira-secundaria',
    nome: 'Fogueira Secundária',
    x: 13.1,
    y: 17,
    resumo: 'Um segundo ponto de encontro, menor e mais reservado.',
    conteudo:
      'Usada principalmente por grupos menores que preferem não competir pela atenção da Fogueira Principal. Ponto de encontro para conselhos discretos, conversas difíceis, ou só uma noite mais silenciosa entre amigos próximos.',
    tag: 'Ponto de encontro',
  },
    {
    id: 'bairro-mescla',
    nome: 'Bairro Mesclas',
    x: 27.1,
    y: 17,
    resumo: 'Um bairro completo para semideuses que preferem viver com seus amigos.',
    conteudo:
      'Em 2016, uma reunião geral foi convocada pelo representante de Lua Nova, Kayo Marinho, do time Ômega. Suas requisições se baseavam na construção de um bairro onde semideuses de diferentes parentes divinos pudessem viver em conjunto, por quaisquer razão. Acreditava que separar os habitantes da cidade em bairros baseados nos deuses era burrice, pois apenas alimentava discussões e conflitos internos, e impedia semideuses de formarem família dentro do territória Minguante. Assim, nasceu o Bairro Mescla, uma área residencial onde semideuses de diferentes parentes divinos poderiam usufruir de moradias privadas.',
    tag: 'Ponto de encontro',
  },
];
