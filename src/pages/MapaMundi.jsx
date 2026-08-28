import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaMinus, FaPlus } from 'react-icons/fa6';
import MapMarker from '../components/MapMarker';
import MapDetailPanel from '../components/MapDetailPanel';
import MapResultSidebar from '../components/MapResultSidebar';
import { MAP_LOCATIONS } from '../data/mapLocations';
import { mapImage } from '../lib/mapImage';
import { SOCIAL_LINKS } from '../data/socialLinks';
import { useResults } from '../context/ResultsContext';
import patternBrick from '../assets/imagens/backgrounds/pattern-tile-brick.png';

const MIN_ZOOM = 1;
const MAX_ZOOM = 4;
const ZOOM_STEP = 1.35;

const navLinkClass =
  'text-xs uppercase tracking-[0.2em] text-fdd-cream-dark underline decoration-fdd-gold-dark underline-offset-4 transition hover:text-fdd-gold-light';

function clampNum(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

// baseRect é o tamanho (em px) da imagem já encaixada inteira no container,
// tipo object-fit: contain — zoom=1 mostra o mapa completo, sem cortar nada.
function computeFitRect(container, natural) {
  if (!container || !natural?.width || !natural?.height) return null;
  const containerRatio = container.offsetWidth / container.offsetHeight;
  const imageRatio = natural.width / natural.height;
  if (imageRatio > containerRatio) {
    const width = container.offsetWidth;
    return { width, height: width / imageRatio };
  }
  const height = container.offsetHeight;
  return { width: height * imageRatio, height };
}

function clampPan(p, zoom, container, baseRect) {
  if (!container || !baseRect) return { x: 0, y: 0 };
  const maxX = Math.max(0, (baseRect.width * zoom - container.offsetWidth) / 2);
  const maxY = Math.max(0, (baseRect.height * zoom - container.offsetHeight) / 2);
  return { x: clampNum(p.x, -maxX, maxX), y: clampNum(p.y, -maxY, maxY) };
}

function pointerPosition(e) {
  const point = e.touches?.[0] ?? e;
  return { x: point.clientX, y: point.clientY };
}

function touchDistance(touches) {
  const [a, b] = touches;
  return Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
}

export default function MapaMundi() {
  const { godResult } = useResults();
  const [activeLocation, setActiveLocation] = useState(null);
  const [zoom, setZoom] = useState(MIN_ZOOM);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [imgNatural, setImgNatural] = useState(null);
  const [baseRect, setBaseRect] = useState(null);
  const dragStart = useRef({ x: 0, y: 0, posX: 0, posY: 0 });
  const pinchStart = useRef(null);
  const containerRef = useRef(null);
  const imgRef = useRef(null);

  const handleImageReady = useCallback(() => {
    const img = imgRef.current;
    if (!img || !img.naturalWidth) return;
    setImgNatural({ width: img.naturalWidth, height: img.naturalHeight });
  }, []);

  useEffect(() => {
    if (imgRef.current?.complete) handleImageReady();
  }, [handleImageReady]);

  const recomputeBaseRect = useCallback(() => {
    setBaseRect(computeFitRect(containerRef.current, imgNatural));
  }, [imgNatural]);

  useEffect(() => {
    recomputeBaseRect();
    window.addEventListener('resize', recomputeBaseRect);
    return () => window.removeEventListener('resize', recomputeBaseRect);
  }, [recomputeBaseRect]);

  const zoomBy = useCallback(
    (factor) => {
      setZoom((z) => {
        const next = clampNum(z * factor, MIN_ZOOM, MAX_ZOOM);
        setPos((p) => clampPan(p, next, containerRef.current, baseRect));
        return next;
      });
    },
    [baseRect],
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return undefined;
    const onWheel = (e) => {
      e.preventDefault();
      zoomBy(e.deltaY < 0 ? ZOOM_STEP : 1 / ZOOM_STEP);
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [zoomBy]);

  const handleDragStart = useCallback(
    (e) => {
      if (e.touches?.length === 2) {
        pinchStart.current = { distance: touchDistance(e.touches), zoom };
        return;
      }
      const point = pointerPosition(e);
      setDragging(true);
      dragStart.current = { x: point.x, y: point.y, posX: pos.x, posY: pos.y };
    },
    [pos, zoom],
  );

  const handleDragMove = useCallback(
    (e) => {
      if (e.touches?.length === 2 && pinchStart.current) {
        const distance = touchDistance(e.touches);
        const factor = distance / pinchStart.current.distance;
        const next = clampNum(pinchStart.current.zoom * factor, MIN_ZOOM, MAX_ZOOM);
        setZoom(next);
        setPos((p) => clampPan(p, next, containerRef.current, baseRect));
        return;
      }
      if (!dragging) return;
      const point = pointerPosition(e);
      const dx = point.x - dragStart.current.x;
      const dy = point.y - dragStart.current.y;
      setPos(
        clampPan(
          { x: dragStart.current.posX + dx, y: dragStart.current.posY + dy },
          zoom,
          containerRef.current,
          baseRect,
        ),
      );
    },
    [dragging, zoom, baseRect],
  );

  const handleDragEnd = useCallback((e) => {
    if (!e?.touches || e.touches.length < 2) pinchStart.current = null;
    if (!e?.touches || e.touches.length === 0) setDragging(false);
  }, []);

  return createPortal(
    <div className="fixed inset-0 z-40 flex flex-col" style={{ background: 'var(--color-fdd-bg-deep)' }}>
      {/* Mesma textura decorativa do Layout (pattern-tile-brick), repetida atrás do mapa */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.05]"
        style={{ backgroundImage: `url(${patternBrick})`, backgroundRepeat: 'repeat', backgroundSize: '160px' }}
      />

      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex items-center justify-between gap-4 border-b border-fdd-gold-dark/30 bg-fdd-bg-deep/95 px-4 py-3 sm:px-6"
      >
        <Link
          to="/"
          viewTransition
          className="flex shrink-0 items-center gap-2 rounded-full border border-fdd-gold-dark/40 px-3 py-1.5 text-xs uppercase tracking-[0.2em] text-fdd-cream-dark transition hover:border-fdd-gold hover:text-fdd-gold-light"
        >
          <FaArrowLeft className="h-3 w-3" />
          <span className="hidden sm:inline">Voltar</span>
        </Link>
        <div className="text-center">
          <p className="font-display text-base leading-none text-fdd-cream sm:text-lg">Mapa Mundi</p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.3em] text-fdd-gold-light">
            Território de Lua Nova
          </p>
        </div>
        <div className="w-[68px] shrink-0 sm:w-[92px]" aria-hidden="true" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        ref={containerRef}
        className="relative flex-1 touch-none select-none overflow-hidden active:cursor-grabbing sm:cursor-grab"
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
      >
        <div
          className="absolute left-1/2 top-1/2"
          style={{
            width: baseRect ? `${baseRect.width}px` : '100%',
            height: baseRect ? `${baseRect.height}px` : '100%',
            transform: `translate(-50%, -50%) translate(${pos.x}px, ${pos.y}px) scale(${zoom})`,
            transitionDuration: dragging || pinchStart.current ? '0ms' : '200ms',
            transitionProperty: 'transform',
            transitionTimingFunction: 'ease-out',
          }}
        >
          {mapImage ? (
            <img
              ref={imgRef}
              src={mapImage}
              onLoad={handleImageReady}
              alt="Mapa do território de Lua Nova"
              className="pointer-events-none absolute inset-0 h-full w-full select-none object-contain"
              draggable={false}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-fdd-bg-light to-fdd-bg-deep">
              <span className="font-display text-sm uppercase tracking-[0.3em] text-fdd-gold-light">
                Mapa em preparação
              </span>
            </div>
          )}
          {MAP_LOCATIONS.map((loc) => (
            <MapMarker
              key={loc.id}
              location={loc}
              onOpen={setActiveLocation}
              isActive={activeLocation?.id === loc.id}
              zoom={zoom}
            />
          ))}
        </div>

        <MapResultSidebar godResult={godResult} />

        <div className="absolute bottom-6 right-6 z-20 flex flex-col overflow-hidden rounded-xl border border-fdd-gold-dark/40 bg-fdd-bg-deep/90 shadow-lg">
          <button
            type="button"
            onClick={() => zoomBy(ZOOM_STEP)}
            disabled={zoom >= MAX_ZOOM}
            aria-label="Aumentar zoom"
            className="flex h-10 w-10 items-center justify-center text-fdd-cream transition hover:bg-fdd-gold/10 hover:text-fdd-gold-light disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-fdd-cream"
          >
            <FaPlus className="h-3.5 w-3.5" />
          </button>
          <div className="h-px bg-fdd-gold-dark/30" />
          <button
            type="button"
            onClick={() => zoomBy(1 / ZOOM_STEP)}
            disabled={zoom <= MIN_ZOOM}
            aria-label="Diminuir zoom"
            className="flex h-10 w-10 items-center justify-center text-fdd-cream transition hover:bg-fdd-gold/10 hover:text-fdd-gold-light disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-fdd-cream"
          >
            <FaMinus className="h-3.5 w-3.5" />
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-fdd-gold-dark/30 bg-fdd-bg-deep/95 px-4 py-3 sm:justify-between sm:px-6">
        <Link to="/resultado" viewTransition className={navLinkClass}>
          ← Voltar
        </Link>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <Link to="/quiz/deuses" className={navLinkClass}>
            Quiz: Deuses
          </Link>
          <Link to="/quiz/organizacoes" className={navLinkClass}>
            Quiz: Organizações
          </Link>
        </div>
        <a
          href={SOCIAL_LINKS.fastplay}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border-2 border-fdd-gold-dark bg-fdd-gold px-5 py-2 font-display text-xs uppercase tracking-wide text-fdd-ink transition hover:bg-fdd-gold-light"
        >
          Adquirir Fastplay
        </a>
      </motion.div>

      <MapDetailPanel location={activeLocation} onClose={() => setActiveLocation(null)} />

      <div
        className={`fixed inset-0 z-[45] transition-opacity duration-300 ${
          activeLocation ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setActiveLocation(null)}
        style={{ background: 'rgba(0,0,0,0.25)' }}
      />
    </div>,
    document.body,
  );
}
