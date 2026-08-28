// Cada opção soma pequenos valores (-2 a 2) ao vetor de traços do usuário.
export const QUESTIONS_ORGS = [
  {
    id: 'o1',
    texto: 'O que você busca ao entrar para um grupo?',
    opcoes: [
      { texto: 'Propósito claro e disciplina.', effect: { ordem: 2, preguica: -1 } },
      { texto: 'Liberdade e caos.', effect: { ordem: -2, ambicao: 1 } },
      { texto: 'Uma comunidade que cuida uns dos outros.', effect: { compaixao: 1, coragem:2} },
      { texto: 'Vantagem e oportunidades.', effect: { ambicao: 2, astucia: 1 } },
    ],
  },
  {
    id: 'o2',
    texto: 'Como você reage a regras rígidas?',
    opcoes: [
      { texto: 'Sigo sempre. Elas existem por um motivo.', effect: { ordem: 2, confianca: 1 } },
      { texto: 'Sigo até onde me convém.', effect: { astucia: 1, ordem: -1 } },
      { texto: 'Questiono e ajudo a melhorá-las.', effect: { sabedoria: 1, ordem: 1 } },
      { texto: 'Ignoro quando acredito que não me beneficiam.', effect: { ordem: -2, ambicao: 1 } },
      { texto: 'Não me importo com elas.', effect: { preguica: 2, ordem: -1 } },
    ],
  },
  {
    id: 'o3',
    texto: 'Diante de um conflito entre dois grupos, você:',
    opcoes: [
      { texto: 'Escolhe um lado e luta por ele.', effect: { coragem: 2, confianca: 1 } },
      { texto: 'Tenta mediar e encontrar um meio-termo.', effect: { compaixao: 1, sabedoria: 1 } },
      { texto: 'Aproveita para negociar vantagens com ambos.', effect: { astucia: 2, ambicao: 1 } },
      { texto: 'Evita se envolver.', effect: { preguica: 2, ordem: -1 } },
      { texto: 'Mato os dois lados.', effect: { sabedoria: -1, ambicao: 1 } },
    ],
  },
  {
    id: 'o4',
    texto: 'O que te faz confiar em alguém?',
    opcoes: [
      { texto: 'Lealdade comprovada em crise.', effect: { coragem: 1, confianca: 1 } },
      { texto: 'Competência e resultados.', effect: { ambicao: 1, ordem: 1 } },
      { texto: 'Cuidado genuíno com os outros ao meu redor.', effect: { compaixao: 2 } },
      { texto: 'Discrição e ausência de perguntas.', effect: { astucia: 2 } },
      { texto: 'Se eu for com a cara da pessoa, confio.', effect: { preguica: 1, confianca: 1 } },
    ],
  },
  {
    id: 'o5',
    texto: 'Sua ideia de sucesso é:',
    opcoes: [
      { texto: 'Ser reconhecido como o melhor no que faço.', effect: { ambicao: 2, confianca: 1 } },
      { texto: 'Viver bem, sem excesso de estresse.', effect: { preguica: 1, sabedoria: 1 } },
      { texto: 'Ver as pessoas ao meu redor prosperando.', effect: { compaixao: 2 } },
      { texto: 'Ter conhecimento e influência que poucos possuem.', effect: { sabedoria: 1, astucia: 1 } },
      { texto: 'Conhecer um minotauro.', effect: { ambicao: 1, preguica: 3 } },
    ],
  },
  {
    id: 'o6',
    texto: 'Frente a uma oportunidade lucrativa mas moralmente cinzenta, você:',
    opcoes: [
      { texto: 'Recuso. Eu sempre penso no melhor!.', effect: { coragem: 1, compaixao: 1 } },
      { texto: 'Aceito sem pestanejar.', effect: { astucia: 2, ambicao: 1 } },
      { texto: 'Avalio os riscos com cuidado antes de decidir.', effect: { sabedoria: 2 } },
      { texto: 'Aceito, mas cuido para que ninguém saia ferido.', effect: { compaixao: 1, astucia: 1 } },
    ],
  },
  {
    id: 'o7',
    texto: 'Qual seu papel natural em um grupo?',
    opcoes: [
      { texto: 'O líder.', effect: { confianca: 2, ordem: 1 } },
      { texto: 'O estrategista.', effect: { astucia: 2, sabedoria: 1 } },
      { texto: 'O apoio emocional.', effect: { compaixao: 2 } },
      { texto: 'O lobo solitário.', effect: { ordem: -2, coragem: 1 } },
      { texto: 'O piadista', effect: { preguica: 1, compaixao: 1 } },
    ],
  },
  {
    id: 'o8',
    texto: 'Como você lida com hierarquia e autoridade?',
    opcoes: [
      { texto: 'Respeito, desde que seja justa.', effect: { ordem: 2 } },
      { texto: 'Prefiro não responder a ninguém.', effect: { ordem: -2, ambicao: 1 } },
      { texto: 'Sigo enquanto for útil aos meus objetivos.', effect: { astucia: 1, ambicao: 1 } },
      { texto: 'Só respeito quem realmente se importa com o grupo.', effect: { coragem: 1, compaixao: 1 } },
    ],
  },
  {
    id: 'o9',
    texto: 'O que você faria com um recurso raro e valioso que encontrasse?',
    opcoes: [
      { texto: 'Reporto e entrego aos Deuses.', effect: { ordem: 2, confianca: 1 } },
      { texto: 'Guardo para mim! Pode ser útil depois.', effect: { astucia: 2, ambicao: 1 } },
      { texto: 'Divido com quem precisa mais que eu.', effect: { compaixao: 2 } },
      { texto: 'Vendo para o maior comprador.', effect: { ambicao: 2, astucia: 1 } },
      { texto: 'Nada. Eu hein...', effect: { preguica: 2, compaixao: -1 } },
    ],
  },
  {
    id: 'o10',
    texto: 'Seu maior desconforto é:',
    opcoes: [
      { texto: 'Caos e falta de direção.', effect: { ordem: 2 } },
      { texto: 'Ficar preso a rotinas e regras.', effect: { ordem: -2 } },
      { texto: 'Ver alguém sofrendo sem poder ajudar.', effect: { compaixao: 2 } },
      { texto: 'Perder uma vantagem para outra pessoa.', effect: { ambicao: 2 } },
    ],
  },
  {
    id: 'o11',
    texto: 'Você ama a humanidade?',
    opcoes: [
      { texto: 'Sim, e faço o que posso para protegê-la.', effect: { compaixao: 2, coragem: 1 } },
      { texto: 'Não, mas respeito seu direito de existir.', effect: { compaixao: 1, ordem: 1 } },
      { texto: 'Não, e quero que todos sumam.', effect: { compaixao: -2, preguica: 1 } },
      { texto: 'Eles não se importam comigo.', effect: { compaixao: -1, preguica: 1 } },
    ],
  },
];
