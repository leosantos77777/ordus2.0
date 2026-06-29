import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Grid } from '@react-three/drei';
import { CreatorProjectConfig, ViewMode } from '../types';
import { BrazilianLand, BrazilianHouse } from './BrazilianHouseModel';
import { ShieldAlert, Layers, Cpu, Compass, Ruler } from 'lucide-react';

interface ThreeProjectSceneProps {
  config: CreatorProjectConfig;
}

// 1. DYNAMIC CAMERA CONTROLLER RESPONDING TO BR VIEWMODES
function CameraController({ viewMode, controlsRef }: { viewMode?: ViewMode; controlsRef: React.MutableRefObject<any> }) {
  const { camera } = useThree();

  useEffect(() => {
    if (!camera) return;

    if (viewMode === 'top') {
      camera.position.set(0, 18, 0.1); // subtle Z offset to prevent gimbal lock
      camera.lookAt(0, 0, 0);
      if (controlsRef.current) {
        controlsRef.current.target.set(0, 0, 0);
        controlsRef.current.update();
      }
    } else if (viewMode === 'facade') {
      camera.position.set(0, 2.2, 16);
      camera.lookAt(0, 2.2, 0);
      if (controlsRef.current) {
        controlsRef.current.target.set(0, 2, 0);
        controlsRef.current.update();
      }
    } else {
      camera.position.set(13, 9, 13);
      camera.lookAt(0, 1.2, 0);
      if (controlsRef.current) {
        controlsRef.current.target.set(0, 1.2, 0);
        controlsRef.current.update();
      }
    }
  }, [viewMode, camera, controlsRef]);

  return null;
}

// 2. STYLISH INTERACTIVE 2D ARCHITECTURAL BLUEPRINT (FALLBACK & TOGGLE ACTION)
function Interactive2DBlueprint({ config }: { config: CreatorProjectConfig }) {
  const lotW = Math.max(5, Math.min(30, config.lotWidth || 10));
  const lotL = Math.max(12, Math.min(60, config.lotLength || 25));
  const buildA = config.builtArea || 75;
  const setback = config.frontSetback ?? 5;

  return (
    <div className="w-full h-full bg-[#070D14] p-6 flex flex-col justify-between text-slate-400 font-mono select-none relative animate-fade-in" id="blueprint-panel-2d">
      
      {/* Blueprint Header */}
      <div className="flex justify-between items-start border-b border-slate-800 pb-3">
        <div>
          <span className="text-[10px] text-[#C29047] font-bold tracking-wider">ÓRDUS ENGENHARIA • DEPARTAMENTO TÉCNICO</span>
          <h4 className="text-white text-xs sm:text-sm font-bold uppercase tracking-tight mt-0.5">
            Planta Conceitual de Zoneamento & Implantação
          </h4>
        </div>
        <div className="text-right text-[9px] text-slate-500">
          <span>ESCALA: ESQUEMÁTICA</span>
          <span className="block">NBR 6492</span>
        </div>
      </div>

      {/* SVG Blueprint Canvas Stage */}
      <div className="flex-1 my-4 flex items-center justify-center min-h-[220px]">
        <svg 
          viewBox="0 0 200 320" 
          className="w-full max-w-[280px] h-full max-h-[300px]"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background Grid Pattern */}
          <defs>
            <pattern id="blueprint-grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#1E293B" strokeWidth="0.4" />
            </pattern>
          </defs>
          <rect width="200" height="320" fill="url(#blueprint-grid)" className="stroke-slate-800" strokeWidth="1" />

          {/* Terrain Boundary Line (Lote) */}
          <rect 
            x="20" 
            y="30" 
            width="160" 
            height="260" 
            fill="none" 
            stroke="#C29047" 
            strokeWidth="1.2" 
            strokeDasharray="4,2" 
          />

          {/* Dimension Cotas - Lot Width (Largura) */}
          <line x1="20" y1="20" x2="180" y2="20" stroke="#C29047" strokeWidth="0.8" />
          <line x1="20" y1="17" x2="20" y2="23" stroke="#C29047" strokeWidth="0.8" />
          <line x1="180" y1="17" x2="180" y2="23" stroke="#C29047" strokeWidth="0.8" />
          <text x="100" y="15" fill="#C29047" fontSize="8" textAnchor="middle" fontWeight="bold">
            {lotW.toFixed(1)}m (Largura)
          </text>

          {/* Dimension Cotas - Lot Length (Comprimento) */}
          <line x1="10" y1="30" x2="10" y2="290" stroke="#C29047" strokeWidth="0.8" />
          <line x1="7" y1="30" x2="13" y2="30" stroke="#C29047" strokeWidth="0.8" />
          <line x1="7" y1="290" x2="13" y2="290" stroke="#C29047" strokeWidth="0.8" />
          <text x="5" y="165" fill="#C29047" fontSize="8" textAnchor="middle" fontWeight="bold" transform="rotate(-90 5 165)">
            {lotL.toFixed(1)}m (Comprimento)
          </text>

          {/* Recuo Frontal Limit Guideline */}
          {setback > 0 && (
            <>
              <line x1="20" y1={30 + setback * 4} x2="180" y2={30 + setback * 4} stroke="#e2e8f0" strokeWidth="0.5" strokeDasharray="2,2" opacity="0.35" />
              <text x="100" y={26 + setback * 4} fill="#64748b" fontSize="6" textAnchor="middle">
                RECUO LEGAL: {setback.toFixed(1)}m
              </text>
            </>
          )}

          {/* Front Wall (Muro Frontal) */}
          {config.wallFrontal && (
            <line x1="20" y1="290" x2="180" y2="290" stroke="#94a3b8" strokeWidth="2.5" />
          )}

          {/* Front Garden (Jardim Frontal) */}
          {config.gardenFrontal && (
            <rect x="25" y={290 - setback * 3.5} width="150" height={setback * 3} fill="#10B981" fillOpacity="0.12" rx="3" />
          )}

          {/* Main House Box Block */}
          <rect 
            x="30" 
            y={50 + setback * 2} 
            width="140" 
            height={160 - setback * 2.5} 
            fill="#0F172A" 
            fillOpacity="0.8" 
            stroke="#38BDF8" 
            strokeWidth="1.5" 
            rx="4"
          />
          <text x="100" y={110 + setback * 1} fill="#e2e8f0" fontSize="9" fontWeight="bold" textAnchor="middle">
            EDIFICAÇÃO: {buildA} m²
          </text>
          <text x="100" y={122 + setback * 1} fill="#38BDF8" fontSize="7" textAnchor="middle">
            {config.style.replace('_', ' ').toUpperCase()}
          </text>

          {/* Covered Garage Box */}
          {config.parkingSpaces > 0 && (
            <rect 
              x="35" 
              y={180 + setback * 1.5} 
              width="50" 
              height="35" 
              fill="#1e293b" 
              stroke="#64748b" 
              strokeWidth="0.8" 
              rx="2" 
            />
          )}

          {/* Backyard Pool */}
          {config.pool && (
            <rect 
              x="120" 
              y="40" 
              width="45" 
              height="28" 
              fill="#0ea5e9" 
              fillOpacity="0.25" 
              stroke="#0ea5e9" 
              strokeWidth="1" 
              rx="3" 
            />
          )}

          {/* Gourmet Grill Area */}
          {config.gourmetArea && (
            <rect 
              x="40" 
              y="40" 
              width="35" 
              height="25" 
              fill="#f59e0b" 
              fillOpacity="0.15" 
              stroke="#f59e0b" 
              strokeWidth="0.8" 
              rx="2" 
            />
          )}
        </svg>
      </div>

      {/* Blueprint Footer */}
      <div className="border-t border-slate-800/80 pt-2 flex justify-between text-[10px] text-slate-500">
        <div className="flex gap-4">
          <span>🛌 {config.bedrooms ?? 2} Dormitórios</span>
          <span>🛁 {config.bathrooms ?? 2} WC</span>
        </div>
        <div>
          <span className="text-[#C29047] font-bold">✓ Implantação Válida</span>
        </div>
      </div>

    </div>
  );
}

// 3. REACT RUNTIME ERROR BOUNDARY
class ThreeErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.warn("WebGL / Three.js canvas fail handled gracefully:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// 4. MAIN 3D AND BLUEPRINT RENDERING SYSTEM
export default function ThreeProjectScene({ config }: ThreeProjectSceneProps) {
  const controlsRef = useRef<any>(null);
  const [viewType, setViewType] = useState<'3D' | '2D'>('3D');

  // Default fallback values for lot dimensions to prevent crashes during typing
  const lotWidth = Math.max(5, Math.min(30, config.lotWidth || 10));
  const lotLength = Math.max(12, Math.min(60, config.lotLength || 25));

  return (
    <div className="w-full h-full relative group flex flex-col" id="three-scene-canvas-wrapper">
      
      {/* VIEW TYPE SELECTOR OVERLAY */}
      <div className="absolute top-4 right-4 z-20 flex gap-1 bg-slate-950/85 backdrop-blur-md p-1 rounded-xl border border-slate-800 pointer-events-auto">
        <button
          type="button"
          onClick={() => setViewType('3D')}
          className={`px-2 py-1 rounded-lg text-[9px] font-mono font-bold uppercase transition cursor-pointer ${
            viewType === '3D' 
              ? 'bg-[#C29047] text-slate-950' 
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Vista 3D
        </button>
        <button
          type="button"
          onClick={() => setViewType('2D')}
          className={`px-2 py-1 rounded-lg text-[9px] font-mono font-bold uppercase transition cursor-pointer ${
            viewType === '2D' 
              ? 'bg-[#C29047] text-slate-950' 
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Planta 2D
        </button>
      </div>

      {viewType === '2D' ? (
        <Interactive2DBlueprint config={config} />
      ) : (
        <ThreeErrorBoundary 
          fallback={<Interactive2DBlueprint config={config} />}
        >
          {/* 3D RENDERING WORKSPACE */}
          <div className="flex-1 w-full h-full min-h-0 relative">
            <Canvas 
              shadows 
              camera={{ position: [13, 9, 13], fov: 42 }}
              gl={{ preserveDrawingBuffer: true, antialias: true }}
            >
              {/* Background */}
              <color attach="background" args={['#070D14']} />
              
              {/* Soft atmospheric ambient light */}
              <ambientLight intensity={0.65} color="#F8FAFC" />
              
              {/* Intense sun direct light casting real architectural shadows */}
              <directionalLight
                castShadow
                position={[12, 18, 10]}
                intensity={1.35}
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-bias={-0.00015}
              />

              {/* Secondary sky reflection fill light */}
              <directionalLight
                position={[-12, 8, -12]}
                intensity={0.4}
                color="#38BDF8"
              />

              {/* Ground reflectance accent */}
              <directionalLight
                position={[0, -10, 0]}
                intensity={0.15}
                color="#A78BFA"
              />

              {/* System Brazilian Architectural Model components */}
              <BrazilianLand config={config} />
              <BrazilianHouse config={config} />

              {/* Camera responsiveness and controls */}
              <CameraController viewMode={config.viewMode} controlsRef={controlsRef} />

              <OrbitControls 
                ref={controlsRef}
                enableDamping 
                dampingFactor={0.08}
                minDistance={4}
                maxDistance={45}
                maxPolarAngle={Math.PI / 2.02} // enforce block from sliding below street level
                makeDefault
              />

              {/* Technical architectural grid overlay */}
              <Grid
                position={[0, -0.015, 0]}
                args={[lotWidth * 2, lotLength * 2]}
                cellSize={1.0}
                cellThickness={0.9}
                cellColor="#1E293B"
                sectionSize={5.0}
                sectionThickness={1.2}
                sectionColor="#C29047"
                fadeDistance={40}
                infiniteGrid={false}
              />
            </Canvas>
          </div>

          {/* View legend */}
          <div className="absolute bottom-4 left-4 bg-slate-950/80 backdrop-blur-md rounded-xl px-3 py-1.5 border border-slate-800 text-[10px] font-mono text-slate-400 pointer-events-none select-none flex items-center gap-1.5 z-10">
            <span className="w-2 h-2 rounded-full bg-[#C29047] animate-pulse" />
            <span>🖱️ Arraste para orbitar • 🔍 Zoom para detalhar • Câmera: {config.viewMode ? config.viewMode.toUpperCase() : 'PERSPECTIVA'}</span>
          </div>
        </ThreeErrorBoundary>
      )}
    </div>
  );
}
