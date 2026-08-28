// Usa import.meta.glob para carregar apenas as imagens que já existem em
// src/assets/imagens/{deuses,orgs}. Isso permite referenciar o caminho
// esperado nos dados (gods.js / orgs.js) sem quebrar o build quando o
// arquivo ainda não foi adicionado — o slug simplesmente não aparece no mapa
// e o componente EntityImage cai no placeholder visual.
const godImageModules = import.meta.glob('../assets/imagens/deuses/*.{png,jpg,jpeg,webp,svg}', {
  eager: true,
  import: 'default',
});
const orgImageModules = import.meta.glob('../assets/imagens/orgs/*.{png,jpg,jpeg,webp,svg}', {
  eager: true,
  import: 'default',
});

function buildSlugMap(modules) {
  const map = {};
  for (const path in modules) {
    const filename = path.split('/').pop();
    const slug = filename.replace(/\.[^./]+$/, '');
    map[slug] = modules[path];
  }
  return map;
}

export const godImageMap = buildSlugMap(godImageModules);
export const orgImageMap = buildSlugMap(orgImageModules);
