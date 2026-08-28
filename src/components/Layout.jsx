import { Link } from 'react-router-dom';
import SocialIcons from './SocialIcons';
import patternBrick from '../assets/imagens/backgrounds/pattern-tile-brick.png';

export default function Layout({ children }) {
  return (
    <div className="fdd-backdrop flex flex-col">
      {/* Textura decorativa sutil por cima do fundo existente — não altera o gradiente/silhueta.
          pattern-tile-brick.png é gerado a partir de backgrounds/pattern-tile.png: duas cópias do
          ícone lado a lado (linha de cima) e duas deslocadas em meia largura (linha de baixo),
          formando um bloco 2x2 que, repetido, cria um padrão "tijolo" com desníveis entre linhas
          em vez de uma grade alinhada. Tamanho reduzido para caber ~4x mais ícones por coluna.
          Fácil de remover: apague este <div> e o import de patternBrick acima. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.05]"
        style={{ backgroundImage: `url(${patternBrick})`, backgroundRepeat: 'repeat', backgroundSize: '160px' }}
      />

      <header className="relative z-10 flex items-center justify-center px-6 py-8">
        <Link to="/quizes" className="text-center">
          <p className="font-display text-2xl tracking-[0.15em] text-fdd-gold-light fdd-glow-text sm:text-3xl">
            FILHOS DO DESTINO
          </p>
          <p className="mt-1 text-xs uppercase tracking-[0.4em] text-fdd-cream-dark">Quiz</p>
        </Link>
      </header>

      <main className="relative z-10 flex flex-1 flex-col px-4 pb-16 sm:px-6">{children}</main>

      <footer className="relative z-10 flex flex-col items-center gap-3 px-6 py-6">
        <SocialIcons />
        <p className="text-center text-xs text-fdd-cream-dark/70">
          Universo de Filhos do Destino — RPG de fantasia urbana grega.
        </p>
      </footer>
    </div>
  );
}
