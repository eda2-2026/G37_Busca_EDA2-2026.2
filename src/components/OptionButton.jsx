import CoinRing from './CoinRing';

export default function OptionButton({ index, texto, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative flex w-full items-center gap-4 rounded-2xl border-2 border-fdd-gold-dark/40 bg-fdd-cream-dark/40 p-3 text-left transition hover:border-fdd-gold hover:bg-fdd-gold/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-fdd-gold sm:aspect-square sm:w-40 sm:flex-col sm:items-center sm:justify-center sm:rounded-full sm:border-0 sm:bg-transparent sm:p-4 sm:text-center md:w-44"
    >
      <span className="relative hidden shrink-0 items-center justify-center text-fdd-gold-dark sm:flex sm:h-full sm:w-full">
        <CoinRing className="text-fdd-gold-dark transition group-hover:text-fdd-gold" />
        <span className="absolute inset-6 flex items-center justify-center text-xs font-medium leading-snug text-fdd-ink sm:text-sm">
          {texto}
        </span>
      </span>

      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-fdd-gold-dark font-display text-sm text-fdd-gold-dark group-hover:border-fdd-gold group-hover:text-fdd-gold sm:hidden">
        {index + 1}
      </span>
      <span className="text-sm font-medium leading-snug text-fdd-ink sm:hidden">{texto}</span>
    </button>
  );
}
