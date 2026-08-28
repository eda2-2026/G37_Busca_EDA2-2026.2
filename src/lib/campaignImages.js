// Mesmo padrão de import.meta.glob usado em assetImages.js e mapImage.js:
// resolve os assets da landing (retratos dos heróis, arte do Zeus, textura
// de fundo do templo, artes dos locais) pelo nome do arquivo, sem quebrar o
// build enquanto eles ainda não existirem em src/assets/imagens/campanha/.
//
// Convenção de nomes esperados nessa pasta:
//   - {heroId}.png       -> retrato de cada herói de CAMPAIGN_HEROES
//   - zeus-hero.png      -> arte do Zeus no hero da landing (fundo transparente)
//   - templo-fundo.jpg   -> textura de fundo (hero + seção de locais)
//   - centro.png / mercado.png / escola.png -> arte dos cards de locais
const campaignModules = import.meta.glob(
  '../assets/imagens/campanha/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}',
  { eager: true, import: 'default' },
);

function buildSlugMap(modules) {
  const map = {};
  for (const path in modules) {
    const filename = path.split('/').pop();
    const slug = filename.replace(/\.[^./]+$/, '');
    map[slug] = modules[path];
  }
  return map;
}

export const campaignImageMap = buildSlugMap(campaignModules);
