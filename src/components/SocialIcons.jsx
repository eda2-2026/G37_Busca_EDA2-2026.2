import { FaInstagram, FaTiktok, FaXTwitter, FaBookOpen } from 'react-icons/fa6';
import { SOCIAL_LINKS } from '../data/socialLinks';

const ICONS = [
  { key: 'instagram', href: SOCIAL_LINKS.instagram, label: 'Instagram', Icon: FaInstagram },
  { key: 'tiktok', href: SOCIAL_LINKS.tiktok, label: 'TikTok', Icon: FaTiktok },
  { key: 'twitter', href: SOCIAL_LINKS.twitter, label: 'Twitter / X', Icon: FaXTwitter },
  { key: 'livro', href: SOCIAL_LINKS.livro, label: 'Leia o livro', Icon: FaBookOpen },
];

/** Ícones de redes sociais exibidos no rodapé do site. Links em src/data/socialLinks.js. */
export default function SocialIcons() {
  return (
    <div className="flex items-center justify-center gap-3">
      {ICONS.map(({ key, href, label, Icon }) => (
        <a
          key={key}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          title={label}
          className="btn btn-circle btn-sm border-fdd-gold-dark/50 bg-transparent text-fdd-cream-dark transition hover:border-fdd-gold hover:bg-fdd-gold/10 hover:text-fdd-gold-light"
        >
          <Icon className="h-4 w-4" />
        </a>
      ))}
    </div>
  );
}
