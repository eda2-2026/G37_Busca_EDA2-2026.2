import { motion } from 'framer-motion';
import { CAMPAIGN_HEROES } from '../../data/campaignHeroes';
import { campaignImageMap } from '../../lib/campaignImages';
import { staggerContainer, fadeUp } from '../../lib/motionVariants';
import HeroCard from './HeroCard';

export default function CampaignHeroesSection() {
  const logoSrc = campaignImageMap.LogoRender;

  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <motion.div
        className="flex justify-center"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.6 }}
      >
        {logoSrc ? (
          <img src={logoSrc} alt="Filhos do Destino: Heróis" className="h-auto max-h-28 w-auto" />
        ) : (
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-fdd-gold-light">Filhos do Destino</p>
            <h2 className="mt-3 font-display text-3xl text-fdd-cream sm:text-4xl">Heróis</h2>
          </div>
        )}
        <h2 className="sr-only">Filhos do Destino: Heróis</h2>
      </motion.div>

      {/* Fileira lado a lado: grid numa linha só a partir de sm, scroll-snap horizontal antes disso */}
      <motion.div
        className="-mx-4 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:grid sm:grid-cols-6 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {CAMPAIGN_HEROES.map((hero) => (
          <motion.div key={hero.id} variants={fadeUp} className="w-36 shrink-0 snap-start sm:w-auto">
            <HeroCard hero={hero} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
