// Mesma estratégia de import.meta.glob usada em assetImages.js: referencia o
// caminho do mapa (src/assets/imagens/backgrounds/map.*) sem quebrar o build
// caso o arquivo não exista — nesse caso `mapImage` fica undefined e a
// página cai no placeholder visual.
const mapImageModules = import.meta.glob('../assets/imagens/backgrounds/map.{png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
});

export const mapImage = Object.values(mapImageModules)[0];
