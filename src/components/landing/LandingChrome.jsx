import { Link } from 'react-router-dom';
import SocialIcons from '../SocialIcons';
import GreekKeyStrip from '../GreekKeyStrip';
import { SOCIAL_LINKS } from '../../data/socialLinks';

const navLinkClass =
  'text-xs uppercase tracking-[0.2em] text-fdd-cream-dark transition hover:text-fdd-gold-light';

/**
 * Header e footer da landing compartilham a mesma estrutura (logo, nav,
 * redes sociais + CTA), então vivem num único componente parametrizado.
 * "Adquirir Fastplay" ainda não tem destino — aparece travado (sem rota,
 * sem hover).
 */
export default function LandingChrome({ as: As = 'header', sticky = false, credits = null }) {
  return (
    <As className={sticky ? 'sticky top-0 z-40' : 'relative z-10'}>
      <div className="bg-fdd-bg-deep/95">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <Link to="/" className="shrink-0">
            <p className="font-display text-lg tracking-[0.15em] text-fdd-gold-light fdd-glow-text sm:text-xl">
              FILHOS DO DESTINO
            </p>
          </Link>

          <nav className="flex items-center gap-6">
            <Link to="/quizes" className={navLinkClass}>
              Quiz
            </Link>
            <Link to="/mapa" className={navLinkClass}>
              Mapa Mundi
            </Link>
            <Link to="/profecias" className={navLinkClass}>
              Profecias
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <SocialIcons />
            <a
                      href={SOCIAL_LINKS.fastplay}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border-2 border-fdd-gold-dark bg-fdd-gold px-5 py-2 font-display text-xs uppercase tracking-wide text-fdd-ink transition hover:bg-fdd-gold-light"
                    >
                      Adquirir Fastplay
                    </a>
          </div>
        </div>
      </div>
      <GreekKeyStrip />
      {credits && (
        <p className="bg-fdd-bg-deep px-6 py-4 text-center text-xs text-fdd-cream-dark/70">{credits}</p>
      )}
    </As>
  );
}
