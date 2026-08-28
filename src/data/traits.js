export const TRAITS = [
  'coragem',
  'sabedoria',
  'ordem',
  'astucia',
  'compaixao',
  'ambicao',
  'preguica',
  'confianca',
];

export const TRAIT_LABELS = {
  coragem: 'Coragem',
  sabedoria: 'Sabedoria',
  ordem: 'Ordem',
  astucia: 'Astúcia',
  compaixao: 'Compaixão',
  ambicao: 'Ambição',
  preguica: 'Preguiça',
  confianca: 'Confiança',
};

export function emptyTraitVector() {
  return Object.fromEntries(TRAITS.map((trait) => [trait, 0]));
}
