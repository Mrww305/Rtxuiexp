// Interactive Macro Fabric Weave Engine
// Simulates real interlacing of warp & weft threads with tension, yarn twist, colorways, and zoom
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Eye, RotateCw, ZoomIn, ZoomOut, Sliders, Play, Pause, Sparkles, HelpCircle } from 'lucide-react';

export type WeavePattern = 'plain' | 'twill' | 'satin' | 'basket' | 'ripstop';

interface WeaveCanvasProps {
  initialPattern?: WeavePattern;
  initialWarpColor?: string;
  initialWeftColor?: string;
  allowCustomization?: boolean;
}

export const InteractiveWeaveCanvas: React.FC<WeaveCanvasProps> = ({
  initialPattern = 'twill',
  initialWarpColor = '#1C2D42', // Classic indigo raw warp
  initialWeftColor = '#E7E5E4', // Natural ecru weft
  allowCustomization = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [pattern, setPattern] = useState<WeavePattern>(initialPattern);
  const [warpColor, setWarpColor] = useState<string>(initialWarpColor);
  const [weftColor, setWeftColor] = useState<string>(initialWeftColor);
  const [zoom, setZoom] = useState<number>(36); // Thread thickness / pitch in pixels
  const [threadTension, setThreadTension] = useState<number>(0.85); // 0 to 1
  const [isAnimating, setIsAnimating] = useState<boolean>(true);
  const [hasMicroFibers, setHasMicroFibers] = useState<boolean>(true);
  const [showKeyboardHelp, setShowKeyboardHelp] = useState<boolean>(false);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setReducedMotion(true);
      setIsAnimating(false);
    }
  }, []);

  // Keyboard navigation for accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case '+':
      case '=':
        e.preventDefault();
        setZoom(prev => Math.min(prev + 4, 60));
        break;
      case '-':
      case '_':
        e.preventDefault();
        setZoom(prev => Math.max(prev - 4, 18));
        break;
      case ' ':
        e.preventDefault();
        setIsAnimating(prev => !prev);
        break;
      case '1':
        setPattern('plain');
        break;
      case '2':
        setPattern('twill');
        break;
      case '3':
        setPattern('satin');
        break;
      case '4':
        setPattern('basket');
        break;
      case '5':
        setPattern('ripstop');
        break;
    }
  };

  // Check whether at coordinate (x, y) in weave grid, warp is OVER weft
  const isWarpOver = useCallback((x: number, y: number, currentPattern: WeavePattern): boolean => {
    switch (currentPattern) {
      case 'plain':
        // 1/1 plain weave: alternate
        return (x + y) % 2 === 0;
      case 'twill':
        // 2/2 twill: 2 over, 2 under staggered
        return ((x + y) % 4 === 0) || ((x + y) % 4 === 1);
      case 'satin':
        // 4/1 satin weave: long floats, step 2
        return (x * 2 + y) % 5 !== 0;
      case 'basket':
        // 2/2 basket weave: paired yarns
        return (Math.floor(x / 2) + Math.floor(y / 2)) % 2 === 0;
      case 'ripstop': {
        // Reinforced grid every 6 threads, plain weave inside
        const isGridWarp = x % 6 === 0;
        const isGridWeft = y % 6 === 0;
        if (isGridWarp && isGridWeft) return (x + y) % 2 === 0;
        if (isGridWarp) return true;
        if (isGridWeft) return false;
        return (x + y) % 2 === 0;
      }
      default:
        return (x + y) % 2 === 0;
    }
  }, []);

  // Main rendering loop with canvas 2D context
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const render = () => {
      if (!canvas) return;
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      // Background shadow under the weave
      ctx.fillStyle = '#1c1917';
      ctx.fillRect(0, 0, width, height);

      const pitch = zoom; // distance between thread centers
      const threadWidth = pitch * (0.65 + threadTension * 0.25);
      const cols = Math.ceil(width / pitch) + 2;
      const rows = Math.ceil(height / pitch) + 2;

      // Subtle breathing wave offset if animating
      const wave = isAnimating && !reducedMotion ? Math.sin(time * 0.03) * 2 : 0;

      // Draw each intersection
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const cx = c * pitch;
          const cy = r * pitch;
          const warpOver = isWarpOver(c, r, pattern);

          const isRipWarp = pattern === 'ripstop' && c % 6 === 0;
          const isRipWeft = pattern === 'ripstop' && r % 6 === 0;

          const currentThreadWidth = isRipWarp || isRipWeft ? threadWidth * 1.3 : threadWidth;

          // Helper to draw horizontal thread (weft)
          const drawWeft = () => {
            const grad = ctx.createLinearGradient(0, cy - currentThreadWidth / 2, 0, cy + currentThreadWidth / 2);
            grad.addColorStop(0, adjustColor(weftColor, -30));
            grad.addColorStop(0.3, adjustColor(weftColor, 15));
            grad.addColorStop(0.5, weftColor);
            grad.addColorStop(0.8, adjustColor(weftColor, -10));
            grad.addColorStop(1, adjustColor(weftColor, -40));

            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.roundRect(cx - pitch / 2, cy - currentThreadWidth / 2, pitch, currentThreadWidth, currentThreadWidth * 0.2);
            ctx.fill();

            // Thread twist / fiber striations
            if (hasMicroFibers && zoom >= 28) {
              ctx.strokeStyle = 'rgba(0, 0, 0, 0.15)';
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(cx - pitch / 2, cy - currentThreadWidth * 0.25);
              ctx.lineTo(cx + pitch / 2, cy - currentThreadWidth * 0.2);
              ctx.stroke();
            }
          };

          // Helper to draw vertical thread (warp)
          const drawWarp = () => {
            const grad = ctx.createLinearGradient(cx - currentThreadWidth / 2, 0, cx + currentThreadWidth / 2, 0);
            grad.addColorStop(0, adjustColor(warpColor, -35));
            grad.addColorStop(0.3, adjustColor(warpColor, 20));
            grad.addColorStop(0.5, warpColor);
            grad.addColorStop(0.8, adjustColor(warpColor, -15));
            grad.addColorStop(1, adjustColor(warpColor, -45));

            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.roundRect(cx - currentThreadWidth / 2, cy - pitch / 2 + wave, currentThreadWidth, pitch, currentThreadWidth * 0.2);
            ctx.fill();

            // Contact shadow when warp crosses over
            ctx.fillStyle = 'rgba(0, 0, 0, 0.22)';
            ctx.fillRect(cx - currentThreadWidth / 2, cy - pitch / 2 + wave, currentThreadWidth, 3);
            ctx.fillRect(cx - currentThreadWidth / 2, cy + pitch / 2 - 3 + wave, currentThreadWidth, 3);

            // Thread twist / fiber striations
            if (hasMicroFibers && zoom >= 28) {
              ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(cx - currentThreadWidth * 0.2, cy - pitch / 2);
              ctx.lineTo(cx - currentThreadWidth * 0.25, cy + pitch / 2);
              ctx.stroke();
            }
          };

          if (warpOver) {
            drawWeft();
            drawWarp();
          } else {
            drawWarp();
            drawWeft();
          }
        }
      }

      time += 1;
      if (isAnimating && !reducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [zoom, pattern, warpColor, weftColor, threadTension, isAnimating, hasMicroFibers, reducedMotion, isWarpOver]);

  // Handle ResizeObserver
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.scale(dpr, dpr);
        }
      }
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={containerRef}
      id="macro-weave-explorer"
      className="relative w-full h-[480px] md:h-[560px] bg-stone-950 rounded-2xl overflow-hidden border border-stone-800 shadow-2xl flex flex-col justify-between"
      tabIndex={0}
      role="region"
      aria-label={`Interactive 3D Macro Fabric Weave Simulation, currently displaying ${pattern} weave with ${warpColor} warp and ${weftColor} weft.`}
      onKeyDown={handleKeyDown}
    >
      {/* Visual Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block cursor-grab active:cursor-grabbing focus:outline-none"
        aria-hidden="true"
      />

      {/* Top Floating Overlay Controls */}
      <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        <div className="flex items-center gap-2 bg-stone-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-stone-700 text-stone-200 text-xs font-mono tracking-wide pointer-events-auto shadow-lg">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
          <span>MICRO-WEAVE OPTICAL INSPECTOR</span>
          <span className="text-stone-500">|</span>
          <span className="uppercase text-amber-400 font-semibold">{pattern}</span>
          <span className="text-stone-400">({Math.round(zoom * 2.5)}x Zoom)</span>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={() => setShowKeyboardHelp(!showKeyboardHelp)}
            className="p-2 rounded-lg bg-stone-900/80 hover:bg-stone-800 text-stone-300 border border-stone-700 hover:text-white transition-colors text-xs flex items-center gap-1.5"
            aria-label="Toggle keyboard shortcuts instructions"
            title="Keyboard shortcuts"
          >
            <HelpCircle className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Shortcuts</span>
          </button>

          <button
            onClick={() => setIsAnimating(!isAnimating)}
            className="p-2 rounded-lg bg-stone-900/80 hover:bg-stone-800 text-stone-300 border border-stone-700 hover:text-white transition-colors text-xs flex items-center gap-1.5"
            aria-label={isAnimating ? 'Pause loom tension motion' : 'Play loom tension motion'}
          >
            {isAnimating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-emerald-400" />}
            <span className="hidden sm:inline">{isAnimating ? 'Freeze' : 'Live Tension'}</span>
          </button>
        </div>
      </div>

      {/* Keyboard Shortcuts Overlay Modal */}
      {showKeyboardHelp && (
        <div className="absolute inset-4 z-20 bg-stone-950/95 backdrop-blur-md rounded-xl p-6 border border-stone-700 text-stone-200 overflow-y-auto">
          <div className="flex items-center justify-between mb-4 border-b border-stone-800 pb-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-2">
              <HelpCircle className="w-4 h-4" /> Keyboard Navigation & Controls
            </h4>
            <button
              onClick={() => setShowKeyboardHelp(false)}
              className="px-2.5 py-1 text-xs bg-stone-800 hover:bg-stone-700 rounded text-stone-300"
            >
              Close
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="bg-stone-900 p-2.5 rounded border border-stone-800">
              <span className="font-mono text-amber-400 font-bold mr-2">[+] / [-]</span>
              <span>Zoom In / Out magnification (thread pitch)</span>
            </div>
            <div className="bg-stone-900 p-2.5 rounded border border-stone-800">
              <span className="font-mono text-amber-400 font-bold mr-2">[Space]</span>
              <span>Toggle subtle loom tension simulation</span>
            </div>
            <div className="bg-stone-900 p-2.5 rounded border border-stone-800">
              <span className="font-mono text-amber-400 font-bold mr-2">[1] - [5]</span>
              <span>Switch Weave (1: Plain, 2: Twill, 3: Satin, 4: Basket, 5: Ripstop)</span>
            </div>
            <div className="bg-stone-900 p-2.5 rounded border border-stone-800">
              <span className="font-mono text-amber-400 font-bold mr-2">[Tab]</span>
              <span>Move focus to color selectors and pattern chips</span>
            </div>
          </div>
          <p className="mt-4 text-xs text-stone-400 leading-relaxed">
            This real-time shader illustrates high-precision yarn interlacing according to standard international weaving drafts. All controls adhere to WCAG 2.2 accessible interaction standards.
          </p>
        </div>
      )}

      {/* Bottom Floating Control Bar */}
      {allowCustomization && (
        <div className="p-4 bg-stone-900/90 backdrop-blur-md border-t border-stone-800/80 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 z-10">
          {/* Weave Pattern Selectors */}
          <div className="flex flex-wrap items-center gap-1.5" role="radiogroup" aria-label="Weave structure draft selection">
            {(['plain', 'twill', 'satin', 'basket', 'ripstop'] as WeavePattern[]).map((p) => (
              <button
                key={p}
                role="radio"
                aria-checked={pattern === p}
                onClick={() => setPattern(p)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium uppercase tracking-wider transition-all min-h-[40px] flex items-center justify-center ${
                  pattern === p
                    ? 'bg-amber-600 text-white shadow-md ring-2 ring-amber-400/40 font-semibold'
                    : 'bg-stone-800/80 text-stone-300 hover:bg-stone-700 hover:text-white'
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Color & Fiber Sliders */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Warp Color Swatch Picker */}
            <div className="flex items-center gap-1.5 text-xs text-stone-300">
              <label htmlFor="warp-color-picker" className="text-stone-400 font-mono text-[11px]">Warp:</label>
              <input
                id="warp-color-picker"
                type="color"
                value={warpColor}
                onChange={(e) => setWarpColor(e.target.value)}
                className="w-7 h-7 rounded border border-stone-700 cursor-pointer bg-transparent"
                title="Change vertical Warp yarn color"
                aria-label="Change vertical Warp yarn color"
              />
            </div>

            {/* Weft Color Swatch Picker */}
            <div className="flex items-center gap-1.5 text-xs text-stone-300">
              <label htmlFor="weft-color-picker" className="text-stone-400 font-mono text-[11px]">Weft:</label>
              <input
                id="weft-color-picker"
                type="color"
                value={weftColor}
                onChange={(e) => setWeftColor(e.target.value)}
                className="w-7 h-7 rounded border border-stone-700 cursor-pointer bg-transparent"
                title="Change horizontal Weft yarn color"
                aria-label="Change horizontal Weft yarn color"
              />
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center gap-1 bg-stone-800 rounded-lg p-1 border border-stone-700">
              <button
                onClick={() => setZoom(prev => Math.max(prev - 4, 18))}
                className="p-1.5 rounded hover:bg-stone-700 text-stone-300 hover:text-white"
                aria-label="Zoom out weave magnification"
                title="Zoom out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-[11px] font-mono text-stone-400 px-1">{zoom}px</span>
              <button
                onClick={() => setZoom(prev => Math.min(prev + 4, 56))}
                className="p-1.5 rounded hover:bg-stone-700 text-stone-300 hover:text-white"
                aria-label="Zoom in weave magnification"
                title="Zoom in"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Microfiber fuzz toggle */}
            <button
              onClick={() => setHasMicroFibers(!hasMicroFibers)}
              className={`p-2 rounded-lg text-xs font-mono flex items-center gap-1 transition-colors border min-h-[40px] ${
                hasMicroFibers
                  ? 'bg-amber-950/40 text-amber-300 border-amber-800/60'
                  : 'bg-stone-800 text-stone-400 border-stone-700 hover:text-white'
              }`}
              aria-label="Toggle microscopic yarn fiber hairiness"
              title="Microfiber striation"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Micro-Fibers</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Lighten/Darken color utility for shading thread cylinders
function adjustColor(hex: string, amount: number): string {
  let color = hex.replace('#', '');
  if (color.length === 3) {
    color = color.split('').map(c => c + c).join('');
  }
  const num = parseInt(color, 16);
  if (isNaN(num)) return hex;

  let r = (num >> 16) + amount;
  let g = ((num >> 8) & 0x00FF) + amount;
  let b = (num & 0x0000FF) + amount;

  r = Math.min(255, Math.max(0, r));
  g = Math.min(255, Math.max(0, g));
  b = Math.min(255, Math.max(0, b));

  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}
