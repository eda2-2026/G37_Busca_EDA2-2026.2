import LandingChrome from '../components/landing/LandingChrome';
import HeroSection from '../components/landing/HeroSection';
import CampaignHeroesSection from '../components/landing/CampaignHeroesSection';
import LocationsSection from '../components/landing/LocationsSection';

export default function Landing() {
  return (
    <div className="fdd-backdrop flex flex-col">
      <LandingChrome as="header" sticky />

      <main className="relative z-10 flex-1">
        <HeroSection />
        <CampaignHeroesSection />
        <LocationsSection />
      </main>

      <LandingChrome
        as="footer"
        credits="Universo de Filhos do Destino — RPG de fantasia urbana grega."
      />
    </div>
  );
}
