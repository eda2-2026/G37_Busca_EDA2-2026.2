import { motion } from 'framer-motion';
import { MAP_LOCATIONS } from '../../data/mapLocations';
import { campaignImageMap } from '../../lib/campaignImages';
import { staggerContainer, fadeUp } from '../../lib/motionVariants';

// Reaproveita o mesmo lore de src/data/mapLocations.js (usado no Mapa Mundi)
// em vez de duplicar texto — Centro, Mercado e Escola já existem lá.
const FEATURED_IDS = ['centro', 'mercado', 'escola'];
const FEATURED_LOCATIONS = FEATURED_IDS.map((id) => MAP_LOCATIONS.find((loc) => loc.id === id)).filter(Boolean);

// Mercado é o ponto de encontro dos filhos de Hermes (ver mapLocations.js),
// então usa o retrato de Hermes que já existe em imagens/campanha.
const LOCATION_IMAGE_OVERRIDES = { mercado: 'hermes' };

function LocationCard({ location }) {
  const image = campaignImageMap[LOCATION_IMAGE_OVERRIDES[location.id] ?? location.id];

  return (
    <motion.div
      variants={fadeUp}
      className="overflow-hidden rounded-2xl border border-fdd-gold-dark/30 bg-fdd-bg-deep/60"
    >
      <div className="aspect-[4/3] w-full bg-gradient-to-br from-fdd-bg-light to-fdd-bg-deep">
        {image && <img src={image} alt={location.nome} className="h-full w-full object-cover" />}
      </div>
      <div className="p-6">
        <p className="text-[10px] uppercase tracking-[0.25em] text-fdd-gold-light">{location.tag}</p>
        <h3 className="mt-2 font-display text-xl text-fdd-cream">{location.nome}</h3>
        <p className="mt-3 text-sm leading-relaxed text-fdd-cream-dark">{location.conteudo}</p>
      </div>
    </motion.div>
  );
}

export default function LocationsSection() {
  const temploSrc = campaignImageMap.temploBackground;

  return (
    <section className="relative overflow-hidden py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={
          temploSrc
            ? { backgroundImage: `url(${temploSrc})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.12 }
            : undefined
        }
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 40%, var(--color-fdd-bg-deep) 100%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          className="text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
        >
          <p className="text-xs uppercase tracking-[0.4em] text-fdd-gold-light">Território</p>
          <h2 className="mt-3 font-display text-3xl text-fdd-cream sm:text-4xl">Locais</h2>
        </motion.div>

        <motion.div
          className="mt-12 grid gap-6 sm:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {FEATURED_LOCATIONS.map((location) => (
            <LocationCard key={location.id} location={location} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
