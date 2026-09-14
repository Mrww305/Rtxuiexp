// 360° interactive fabric close-up viewer with directional light grazing simulation
import React, { useState, useRef } from 'react';
import { Rotate3D, ZoomIn, ZoomOut, Sun, Compass } from 'lucide-react';

interface Fabric360ViewerProps {
  imageSrc: string;
  fabricName: string;
  weaveType: string;
}

export const Fabric360Viewer: React.FC<Fabric360ViewerProps> = ({
  imageSrc,
  fabricName,
  weaveType,
}) => {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [lightAngle, setLightAngle] = useState(45);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const startAngleRef = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    startXRef.current = e.clientX;
    startAngleRef.current = rotationAngle;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startXRef.current;
    setRotationAngle((startAngleRef.current + deltaX * 0.5) % 360);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      setIsDragging(true);
      startXRef.current = e.touches[0].clientX;
      startAngleRef.current = rotationAngle;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length === 0) return;
    const deltaX = e.touches[0].clientX - startXRef.current;
    setRotationAngle((startAngleRef.current + deltaX * 0.5) % 360);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setRotationAngle(prev => (prev - 15 + 360) % 360);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setRotationAngle(prev => (prev + 15) % 360);
    } else if (e.key === '+' || e.key === '=') {
      e.preventDefault();
      setZoomLevel(prev => Math.min(prev + 0.25, 2.5));
    } else if (e.key === '-' || e.key === '_') {
      e.preventDefault();
      setZoomLevel(prev => Math.max(prev - 0.25, 1));
    }
  };

  return (
    <div 
      className="relative bg-stone-950 rounded-xl overflow-hidden border border-stone-800 select-none shadow-xl"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label={`360 Degree Swatch Viewer for ${fabricName}. Use left and right arrow keys to rotate, plus and minus to zoom.`}
    >
      {/* Visual stage with simulated directional grazing light & 3D transformation */}
      <div 
        className="w-full h-80 sm:h-96 overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing relative"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
      >
        <div 
          className="relative transition-transform duration-75 w-72 h-72 sm:w-80 sm:h-80 rounded-xl shadow-2xl overflow-hidden"
          style={{
            transform: `scale(${zoomLevel}) rotate(${rotationAngle}deg)`,
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)'
          }}
        >
          <img 
            src={imageSrc} 
            alt={`High resolution textile swatch of ${fabricName}`}
            className="w-full h-full object-cover pointer-events-none"
            loading="lazy"
          />

          {/* Raking light gradient simulation */}
          <div 
            className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-50"
            style={{
              background: `linear-gradient(${lightAngle}deg, rgba(255,255,255,0.7) 0%, rgba(0,0,0,0.4) 100%)`
            }}
          />

          {/* Weave texture overlay */}
          <div className="absolute inset-0 weave-pattern-plain opacity-30 pointer-events-none" />
        </div>

        {/* Rotation indicator badge */}
        <div className="absolute top-3 left-3 bg-stone-900/90 text-stone-200 text-xs px-2.5 py-1 rounded-full border border-stone-700 flex items-center gap-1.5 font-mono">
          <Rotate3D className="w-3.5 h-3.5 text-amber-400" />
          <span>{Math.round((rotationAngle + 360) % 360)}° Grain Angle</span>
        </div>

        {/* Drag cue overlay */}
        <div className="absolute bottom-3 left-3 bg-stone-900/80 text-stone-300 text-[11px] px-2.5 py-1 rounded-md border border-stone-800">
          Drag horizontally or use ← / → keys
        </div>
      </div>

      {/* Viewer toolbar */}
      <div className="bg-stone-900/95 px-4 py-2.5 border-t border-stone-800 flex items-center justify-between gap-3 text-xs text-stone-300">
        <div className="flex items-center gap-2">
          <span className="font-medium text-stone-200">{weaveType} Spec</span>
          <span className="text-stone-600">|</span>
          <span className="text-stone-400 font-mono">{Math.round(zoomLevel * 100)}% scale</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Light angle rotator */}
          <button
            onClick={() => setLightAngle(prev => (prev + 45) % 360)}
            className="p-1.5 rounded hover:bg-stone-800 text-stone-300 hover:text-amber-400 flex items-center gap-1 transition-colors min-h-[36px]"
            title="Adjust raking light direction to inspect fabric luster & pile"
            aria-label="Adjust studio raking light direction"
          >
            <Sun className="w-4 h-4" />
            <span className="hidden sm:inline">Grazing Light</span>
          </button>

          {/* Zoom In/Out */}
          <div className="flex items-center gap-1 bg-stone-800 rounded p-0.5">
            <button
              onClick={() => setZoomLevel(prev => Math.max(prev - 0.25, 1))}
              disabled={zoomLevel <= 1}
              className="p-1 rounded hover:bg-stone-700 disabled:opacity-40"
              aria-label="Zoom out fabric"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoomLevel(prev => Math.min(prev + 0.25, 2.5))}
              disabled={zoomLevel >= 2.5}
              className="p-1 rounded hover:bg-stone-700 disabled:opacity-40"
              aria-label="Zoom in fabric"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
