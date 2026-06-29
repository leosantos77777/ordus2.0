import React from 'react';
import { CreatorProjectConfig, BrazilianArchitecturalStyle, RoofType, FacadeMaterial } from '../types';

interface ModelProps {
  config: CreatorProjectConfig;
}

// 1. DYNAMIC COLOR AND MATERIAL UTILITIES
export function getMaterialProperties(material?: FacadeMaterial, defaultColor = '#E2E8F0') {
  switch (material) {
    case 'concreto':
      return { color: '#8A94A0', roughness: 0.7, metalness: 0.1 };
    case 'madeira_ripada':
      return { color: '#A06A42', roughness: 0.85, metalness: 0.05 };
    case 'pedra':
      return { color: '#6B7280', roughness: 0.9, metalness: 0.01 };
    case 'tijolo':
      return { color: '#B45309', roughness: 0.85, metalness: 0.01 };
    case 'reboco':
    default:
      return { color: defaultColor, roughness: 0.55, metalness: 0.05 };
  }
}

// 2. LAND COMPONENT: BRAZILIAN PLOT, STREET, SIDEWALK, FRONT WALL, GARDEN, POOL
export function BrazilianLand({ config }: ModelProps) {
  const lotWidth = Math.max(5, Math.min(30, config.lotWidth));
  const lotLength = Math.max(12, Math.min(60, config.lotLength));
  const frontSetback = Math.max(0, Math.min(15, config.frontSetback ?? 5));
  
  // Base materials list
  const grassMat = { color: '#3B6E32', roughness: 0.9 }; // beautiful green grass
  const pavementMat = { color: '#4B5563', roughness: 0.8 }; // driveway pavement
  const curbMat = { color: '#94A3B8', roughness: 0.7 }; // sidewalk curb
  const sidewalkMat = { color: '#CBD5E1', roughness: 0.85 }; // modern light gray sidewalk
  const streetMat = { color: '#111827', roughness: 0.9 }; // dark asphalt

  // Pool styling
  const poolWidth = Math.min(lotWidth * 0.6, 3.5);
  const poolLength = Math.min(lotLength * 0.25, 6);
  // Position pool relative to the back of the lot
  const poolZ = -lotLength / 2 + poolLength / 2 + 1.5;

  return (
    <group>
      {/* 2.1 BASE GROUND / LAWN */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[lotWidth, lotLength]} />
        <meshStandardMaterial {...grassMat} />
      </mesh>

      {/* 2.2 LOT BOUNDARIES WIREFRAME - ARCHITECT STYLE */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.005, 0]}>
        <planeGeometry args={[lotWidth + 0.1, lotLength + 0.1]} />
        <meshBasicMaterial color="#C29047" wireframe />
      </mesh>

      {/* 2.3 STREET & SIDEWALK (Very Brazilian setup) */}
      {/* Sidewalk (Calçada) - placed right in front of the lot */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.005, lotLength / 2 + 1.5]} receiveShadow>
        <planeGeometry args={[lotWidth, 3]} />
        <meshStandardMaterial {...sidewalkMat} />
      </mesh>

      {/* Sidewalk curb (Guia/Meio-fio) */}
      <mesh position={[0, 0.08, lotLength / 2 + 3]} castShadow receiveShadow>
        <boxGeometry args={[lotWidth, 0.16, 0.12]} />
        <meshStandardMaterial {...curbMat} />
      </mesh>

      {/* Street (Rua) - beyond sidewalk */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, lotLength / 2 + 6]} receiveShadow>
        <planeGeometry args={[lotWidth * 2, 6]} />
        <meshStandardMaterial {...streetMat} />
      </mesh>

      {/* White traffic lane lines on asphalt */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.015, lotLength / 2 + 6]}>
        <planeGeometry args={[lotWidth * 2, 0.12]} />
        <meshBasicMaterial color="#FFFFFF" opacity={0.6} transparent />
      </mesh>

      {/* 2.4 DRIVEWAY / GARAGE FLOOR PAVEMENT */}
      {config.parkingSpaces > 0 && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[lotWidth / 4, 0.005, lotLength / 2 - frontSetback / 2]} receiveShadow>
          <planeGeometry args={[Math.min(lotWidth * 0.45, 4.5), frontSetback]} />
          <meshStandardMaterial {...pavementMat} />
        </mesh>
      )}

      {/* 2.5 FRONT GARDEN DECORATIONS (if enabled) */}
      {config.gardenFrontal && (
        <group position={[-lotWidth / 4, 0, lotLength / 2 - frontSetback / 2]}>
          {/* Garden grass patch */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]} receiveShadow>
            <planeGeometry args={[Math.min(lotWidth * 0.4, 4), frontSetback * 0.8]} />
            <meshStandardMaterial color="#22C55E" roughness={0.9} />
          </mesh>
          {/* Symmetrical Brazilian bushes/palms */}
          <group position={[0, 0, -frontSetback * 0.1]}>
            {/* Trunk */}
            <mesh position={[0, 0.4, 0]} castShadow>
              <cylinderGeometry args={[0.05, 0.06, 0.8]} />
              <meshStandardMaterial color="#78350F" />
            </mesh>
            {/* Palm leaves */}
            <mesh position={[0, 0.9, 0]} castShadow>
              <sphereGeometry args={[0.3, 8, 8]} scale={[1.8, 0.3, 1.8]} />
              <meshStandardMaterial color="#166534" roughness={0.8} />
            </mesh>
          </group>
        </group>
      )}

      {/* 2.6 REAR POOL (if enabled) */}
      {config.pool && (
        <group position={[0, 0, poolZ]}>
          {/* Pool deck stone border */}
          <mesh position={[0, 0.01, 0]} receiveShadow castShadow>
            <boxGeometry args={[poolWidth + 0.6, 0.05, poolLength + 0.6]} />
            <meshStandardMaterial color="#E2E8F0" roughness={0.5} />
          </mesh>
          {/* Pool Water Body */}
          <mesh position={[0, 0.02, 0]}>
            <boxGeometry args={[poolWidth, 0.04, poolLength]} />
            <meshStandardMaterial color="#0EA5E9" roughness={0.1} metalness={0.9} transparent opacity={0.7} />
          </mesh>
        </group>
      )}

      {/* 2.7 ENTIRE LOT WALLS (Except frontage, which is configured below) */}
      {/* Left Wall */}
      <mesh position={[-lotWidth / 2, 0.8, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.12, 1.6, lotLength]} />
        <meshStandardMaterial color="#94A3B8" roughness={0.8} />
      </mesh>
      {/* Right Wall */}
      <mesh position={[lotWidth / 2, 0.8, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.12, 1.6, lotLength]} />
        <meshStandardMaterial color="#94A3B8" roughness={0.8} />
      </mesh>
      {/* Back Wall */}
      <mesh position={[0, 0.8, -lotLength / 2]} castShadow receiveShadow>
        <boxGeometry args={[lotWidth, 1.6, 0.12]} />
        <meshStandardMaterial color="#94A3B8" roughness={0.8} />
      </mesh>

      {/* 2.8 FRONT WALL & GATE SYSTEM (Muro Frontal opcional) */}
      {config.wallFrontal && (
        <group position={[0, 0, lotLength / 2]}>
          {/* Masonry parts on both sides */}
          <mesh position={[-lotWidth * 0.32, 0.8, 0]} castShadow receiveShadow>
            <boxGeometry args={[lotWidth * 0.36, 1.6, 0.15]} />
            <meshStandardMaterial color="#475569" roughness={0.6} />
          </mesh>
          <mesh position={[lotWidth * 0.42, 0.8, 0]} castShadow receiveShadow>
            <boxGeometry args={[lotWidth * 0.16, 1.6, 0.15]} />
            <meshStandardMaterial color="#475569" roughness={0.6} />
          </mesh>

          {/* Pedestrian door (Portão Social) */}
          <mesh position={[lotWidth * 0.28, 0.9, 0]} castShadow>
            <boxGeometry args={[1.0, 1.8, 0.04]} />
            <meshStandardMaterial color={config.materials.trimColor} roughness={0.5} />
          </mesh>

          {/* Garage gate (Portão de Garagem sliding design) */}
          <mesh position={[-lotWidth * 0.02, 0.82, 0]} castShadow>
            <boxGeometry args={[lotWidth * 0.4, 1.45, 0.03]} />
            <meshStandardMaterial color={config.materials.trimColor} metalness={0.7} roughness={0.3} />
          </mesh>
        </group>
      )}
    </group>
  );
}

// 3. HOUSE MODEL: PARAMETRIC, COMPOSITE VOLUMES, STYLED ACCENTS
export function BrazilianHouse({ config }: ModelProps) {
  const lotWidth = Math.max(5, Math.min(30, config.lotWidth));
  const lotLength = Math.max(12, Math.min(60, config.lotLength));
  const frontSetback = Math.max(0, Math.min(15, config.frontSetback ?? 5));
  
  const floors = config.floors;
  
  // Calculations for base block size based on area and lot boundaries
  const totalFloorArea = config.builtArea / floors;
  
  // Brazilian structural proportions (ideal rectangular ratios)
  let houseWidth = Math.sqrt(totalFloorArea / 1.3);
  let houseLength = houseWidth * 1.3;

  // Fit inside lot constraints
  houseWidth = Math.max(3.8, Math.min(houseWidth, lotWidth - 2.0)); // 1m lateral setback
  houseLength = Math.max(5, Math.min(houseLength, lotLength - frontSetback - 3.5)); // leave back space

  const floorHeight = 2.8;

  // Displace house based on front setback and lateral corridor
  // Corridor lateral of 1.2m typical in Brazilian houses
  const posX = -(lotWidth / 2) + houseWidth / 2 + 1.2;
  const posZ = lotLength / 2 - frontSetback - houseLength / 2;

  // Colors & Highlight material matching specs
  const wallPaintColor = config.materials.wallColor;
  const highlightMatProps = getMaterialProperties(config.materials.highlightMaterial, wallPaintColor);
  const trimColor = config.materials.trimColor;
  const glassMatProps = { color: '#0EA5E9', transparent: true, opacity: 0.35, roughness: 0.1, metalness: 0.95 };

  return (
    <group position={[posX, 0, posZ]}>
      
      {/* 3.1 BASE FOUNDATION (Viga Baldrame / Radier) */}
      <mesh position={[0, 0.08, 0]} receiveShadow castShadow>
        <boxGeometry args={[houseWidth + 0.2, 0.16, houseLength + 0.2]} />
        <meshStandardMaterial color="#475569" roughness={0.8} />
      </mesh>

      {/* 3.2 GROUND LEVEL VOLUME COMPOST (Pavimento Térreo) */}
      {/* Volume A: Social Block (Frontal section) */}
      <mesh position={[0, floorHeight / 2 + 0.16, houseLength / 4]} castShadow receiveShadow>
        <boxGeometry args={[houseWidth, floorHeight, houseLength / 2]} />
        <meshStandardMaterial color={wallPaintColor} roughness={0.65} />
      </mesh>

      {/* Volume B: Intimate Block (Rear section, styled as Highlight material like Concrete or Wood clad ripado) */}
      <mesh position={[0, floorHeight / 2 + 0.16, -houseLength / 4]} castShadow receiveShadow>
        <boxGeometry args={[houseWidth * 0.95, floorHeight, houseLength / 2]} />
        <meshStandardMaterial {...highlightMatProps} />
      </mesh>

      {/* 3.3 DOORS & WINDOWS (GROUND LEVEL) */}
      {/* Large Pivoting Front Entrance Door (Porta Pivotante com painel de madeira) */}
      <group position={[houseWidth / 4, floorHeight / 2 + 0.16, houseLength / 2 + 0.015]}>
        {/* Wood Panel pivot door */}
        <mesh castShadow>
          <boxGeometry args={[1.3, 2.3, 0.08]} />
          <meshStandardMaterial color="#5C3A21" roughness={0.8} />
        </mesh>
        {/* Sizable black handle pull bar (Puxador vertical preto) */}
        <mesh position={[0.5, 0, 0.06]}>
          <boxGeometry args={[0.04, 1.2, 0.03]} />
          <meshStandardMaterial color="#1E293B" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* Grand Double-height living social window (Pele de Vidro ou Esquadria) */}
      <group position={[-houseWidth / 4, floorHeight * 0.55 + 0.16, houseLength / 2 + 0.01]}>
        {/* Glass panes */}
        <mesh>
          <boxGeometry args={[houseWidth * 0.38, floorHeight * 0.65, 0.04]} />
          <meshStandardMaterial {...glassMatProps} />
        </mesh>
        {/* Horizontal & Vertical grid frame profiles */}
        <mesh>
          <boxGeometry args={[houseWidth * 0.39, floorHeight * 0.66, 0.05]} />
          <meshStandardMaterial color={trimColor} wireframe wireframeLinewidth={3} />
        </mesh>
      </group>

      {/* Corridor Side Windows (Janelas das suítes/quartos) */}
      <group position={[-houseWidth / 2 - 0.01, floorHeight * 0.6 + 0.16, -houseLength / 4]}>
        <mesh rotation={[0, Math.PI / 2, 0]} castShadow>
          <boxGeometry args={[2.0, 1.2, 0.04]} />
          <meshStandardMaterial {...glassMatProps} />
        </mesh>
        <mesh rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[2.02, 1.22, 0.05]} />
          <meshStandardMaterial color={trimColor} wireframe />
        </mesh>
      </group>


      {/* 3.4 UPPER LEVEL (Duplo Pavimento / Sobrado) */}
      {floors >= 2 && (
        <group position={[0, floorHeight + 0.16, 0]}>
          {/* Dividing slab (Laje do Pavimento Superior) */}
          <mesh position={[0, 0.04, 0]} receiveShadow castShadow>
            <boxGeometry args={[houseWidth + 0.3, 0.12, houseLength + 0.3]} />
            <meshStandardMaterial color={trimColor} roughness={0.6} />
          </mesh>

          {/* Upper level main masonry container box */}
          {/* Designed with Modern architectural cantilever projecting over the entrance */}
          <group position={[0, floorHeight / 2 + 0.1, -houseLength * 0.05]}>
            <mesh castShadow receiveShadow>
              <boxGeometry args={[houseWidth * 0.98, floorHeight, houseLength * 0.95]} />
              <meshStandardMaterial color={wallPaintColor} roughness={0.55} />
            </mesh>

            {/* Accent wood block cladding for bedroom master facade section */}
            <mesh position={[0, 0, houseLength * 0.2]} castShadow receiveShadow>
              <boxGeometry args={[houseWidth * 1.02, floorHeight * 0.95, houseLength * 0.25]} />
              <meshStandardMaterial {...getMaterialProperties('madeira_ripada')} />
            </mesh>

            {/* Upper levels large balcony window sliding panel */}
            <group position={[0, 0.1, houseLength * 0.325 + 0.01]}>
              <mesh castShadow>
                <boxGeometry args={[houseWidth * 0.6, floorHeight * 0.7, 0.04]} />
                <meshStandardMaterial {...glassMatProps} />
              </mesh>
              <mesh>
                <boxGeometry args={[houseWidth * 0.61, floorHeight * 0.71, 0.05]} />
                <meshStandardMaterial color={trimColor} wireframe />
              </mesh>
            </group>
          </group>

          {/* Elegantly framed glass Balcony/Guardrail guardas-corpos (Sacada) */}
          {config.balcony && (
            <group position={[0, 0.62, houseLength / 2 + 0.05]}>
              {/* Glass pane */}
              <mesh castShadow>
                <boxGeometry args={[houseWidth * 0.8, 1.0, 0.04]} />
                <meshStandardMaterial color="#BAE6FD" transparent opacity={0.4} roughness={0.01} />
              </mesh>
              {/* Top horizontal steel band handrail */}
              <mesh position={[0, 0.5, 0]}>
                <boxGeometry args={[houseWidth * 0.81, 0.06, 0.08]} />
                <meshStandardMaterial color={trimColor} roughness={0.3} />
              </mesh>
            </group>
          )}
        </group>
      )}


      {/* 3.5 DETAILED BRAZILIAN ROOF / COBERTURA */}
      <group position={[0, floorHeight * floors + (floors >= 2 ? 0.32 : 0.16), 0]}>
        
        {config.roofType === 'colonial' ? (
          /* COLONIAL PYRAMID GABLE WITH CLAY TILES (Telhas Coloniais com beiral) */
          <group>
            {/* Eaves (Beiral de madeira e forro do telhado extending 0.6m out) */}
            <mesh position={[0, 0.04, 0]} castShadow>
              <boxGeometry args={[houseWidth + 1.2, 0.08, houseLength + 1.2]} />
              <meshStandardMaterial color="#C29047" roughness={0.7} />
            </mesh>

            {/* Left pitch terracotta slope */}
            <mesh position={[-houseWidth / 4 - 0.2, 0.65, 0]} rotation={[0, 0, 0.25]} castShadow>
              <boxGeometry args={[houseWidth * 0.6 + 0.6, 0.1, houseLength + 1.3]} />
              <meshStandardMaterial color="#C25A3F" roughness={0.8} /> {/* Orange Clay Tile */}
            </mesh>

            {/* Right pitch terracotta slope */}
            <mesh position={[houseWidth / 4 + 0.2, 0.65, 0]} rotation={[0, 0, -0.25]} castShadow>
              <boxGeometry args={[houseWidth * 0.6 + 0.6, 0.1, houseLength + 1.3]} />
              <meshStandardMaterial color="#C25A3F" roughness={0.8} />
            </mesh>

            {/* Ridge cap tile strip (Cumeeira) */}
            <mesh position={[0, 1.12, 0]}>
              <boxGeometry args={[0.25, 0.12, houseLength + 1.35]} />
              <meshStandardMaterial color="#A94420" roughness={0.8} />
            </mesh>
          </group>

        ) : config.roofType === 'duas_aguas' ? (
          /* TRADITIONAL GABLE ROOF IN GRAY (Duas Águas modernizado) */
          <group>
            <mesh position={[0, 0.04, 0]} castShadow>
              <boxGeometry args={[houseWidth + 0.8, 0.06, houseLength + 0.8]} />
              <meshStandardMaterial color="#64748B" roughness={0.7} />
            </mesh>
            <mesh position={[-houseWidth / 4 - 0.1, 0.5, 0]} rotation={[0, 0, 0.2]} castShadow>
              <boxGeometry args={[houseWidth * 0.58 + 0.4, 0.09, houseLength + 0.9]} />
              <meshStandardMaterial color={config.materials.roofColor} roughness={0.5} />
            </mesh>
            <mesh position={[houseWidth / 4 + 0.1, 0.5, 0]} rotation={[0, 0, -0.2]} castShadow>
              <boxGeometry args={[houseWidth * 0.58 + 0.4, 0.09, houseLength + 0.9]} />
              <meshStandardMaterial color={config.materials.roofColor} roughness={0.5} />
            </mesh>
          </group>

        ) : config.roofType === 'platibanda' ? (
          /* HIGH VALUE MODERN PLATIBANDA (Muro de cobertura que esconde telhado plástico/zinco) */
          <group>
            {/* Flat concealed interior metal roof */}
            <mesh position={[0, 0.04, 0]} receiveShadow>
              <boxGeometry args={[houseWidth - 0.2, 0.08, houseLength - 0.2]} />
              <meshStandardMaterial color="#475569" roughness={0.6} />
            </mesh>
            {/* Surrounding Masonry Platibanda Parapet walls */}
            {/* Front Platibanda */}
            <mesh position={[0, 0.3, houseLength / 2 - 0.03]} castShadow>
              <boxGeometry args={[houseWidth, 0.6, 0.08]} />
              <meshStandardMaterial color={wallPaintColor} roughness={0.6} />
            </mesh>
            {/* Back Platibanda */}
            <mesh position={[0, 0.3, -houseLength / 2 + 0.03]} castShadow>
              <boxGeometry args={[houseWidth, 0.6, 0.08]} />
              <meshStandardMaterial color={wallPaintColor} roughness={0.6} />
            </mesh>
            {/* Left Platibanda */}
            <mesh position={[-houseWidth / 2 + 0.03, 0.3, 0]} castShadow>
              <boxGeometry args={[0.08, 0.6, houseLength]} />
              <meshStandardMaterial color={wallPaintColor} roughness={0.6} />
            </mesh>
            {/* Right Platibanda */}
            <mesh position={[houseWidth / 2 - 0.03, 0.3, 0]} castShadow>
              <boxGeometry args={[0.08, 0.6, houseLength]} />
              <meshStandardMaterial color={wallPaintColor} roughness={0.6} />
            </mesh>
            {/* Accent colored horizontal trim band on top of platibanda */}
            <mesh position={[0, 0.61, 0]}>
              <boxGeometry args={[houseWidth + 0.06, 0.05, houseLength + 0.06]} />
              <meshStandardMaterial color={trimColor} roughness={0.4} />
            </mesh>
          </group>

        ) : (
          /* EMBUTIDO MODERNO (Minimalist sleek cover border) */
          <group>
            <mesh position={[0, 0.1, 0]} castShadow>
              <boxGeometry args={[houseWidth + 0.1, 0.2, houseLength + 0.1]} />
              <meshStandardMaterial color={trimColor} roughness={0.3} />
            </mesh>
            <mesh position={[0, 0.21, 0]}>
              <boxGeometry args={[houseWidth * 0.95, 0.05, houseLength * 0.95]} />
              <meshStandardMaterial color={config.materials.roofColor} roughness={0.5} />
            </mesh>
          </group>
        )}
      </group>


      {/* 3.6 REAR VERANDA GOURMET AREA / WOODEN PERGOLA */}
      {config.gourmetArea && (
        <group position={[0, 0.08, -houseLength / 2 - 1.2]}>
          {/* Wooden floor deck */}
          <mesh position={[0, 0.02, 0]} receiveShadow castShadow>
            <boxGeometry args={[houseWidth * 0.8, 0.04, 2.4]} />
            <meshStandardMaterial color="#845D3D" roughness={0.9} />
          </mesh>

          {/* Wooden supporting structural pillars */}
          <group position={[0, 1.25, 0]}>
            {/* Pillars */}
            <mesh position={[-houseWidth * 0.38, 0, 1.1]} castShadow>
              <cylinderGeometry args={[0.04, 0.04, 2.5]} />
              <meshStandardMaterial color="#4A3422" roughness={0.8} />
            </mesh>
            <mesh position={[houseWidth * 0.38, 0, 1.1]} castShadow>
              <cylinderGeometry args={[0.04, 0.04, 2.5]} />
              <meshStandardMaterial color="#4A3422" roughness={0.8} />
            </mesh>
            <mesh position={[-houseWidth * 0.38, 0, -1.1]} castShadow>
              <cylinderGeometry args={[0.04, 0.04, 2.5]} />
              <meshStandardMaterial color="#4A3422" roughness={0.8} />
            </mesh>
            <mesh position={[houseWidth * 0.38, 0, -1.1]} castShadow>
              <cylinderGeometry args={[0.04, 0.04, 2.5]} />
              <meshStandardMaterial color="#4A3422" roughness={0.8} />
            </mesh>

            {/* Pergola Roof Slats */}
            {[-0.8, -0.4, 0.0, 0.4, 0.8].map((offset, idx) => (
              <mesh key={idx} position={[0, 1.26, offset * 2.2]} castShadow>
                <boxGeometry args={[houseWidth * 0.8, 0.05, 0.08]} />
                <meshStandardMaterial color="#4A3422" roughness={0.8} />
              </mesh>
            ))}
          </group>

          {/* Barbecue unit (Churrasqueira de tijolos) */}
          <mesh position={[houseWidth * 0.24, 0.8, -0.6]} castShadow>
            <boxGeometry args={[0.6, 1.5, 0.6]} />
            <meshStandardMaterial color="#B45309" roughness={0.85} /> {/* terracotta clay brick color */}
          </mesh>
          {/* Metallic barbecue exhaust duct (Chaminé preta) */}
          <mesh position={[houseWidth * 0.24, 1.9, -0.6]} castShadow>
            <cylinderGeometry args={[0.09, 0.09, 0.7]} />
            <meshStandardMaterial color="#1E293B" metalness={0.8} roughness={0.3} />
          </mesh>
        </group>
      )}


      {/* 3.7 INTEGRATED GARAGE ROOF SHELT (Carport) */}
      {config.parkingSpaces > 0 && (
        <group position={[houseWidth / 2 + 1.2, 0.08, houseLength / 4]}>
          {/* Canopy concrete roof slab */}
          <mesh position={[0, 2.4, 0]} castShadow receiveShadow>
            <boxGeometry args={[Math.min(lotWidth * 0.4, 4.2), 0.1, 5.0]} />
            <meshStandardMaterial color={config.materials.trimColor} roughness={0.4} />
          </mesh>

          {/* Steel supporting posts */}
          <mesh position={[Math.min(lotWidth * 0.4, 4.2) / 2 - 0.1, 1.15, 2.3]} castShadow>
            <cylinderGeometry args={[0.05, 0.05, 2.3]} />
            <meshStandardMaterial color="#1E293B" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[Math.min(lotWidth * 0.4, 4.2) / 2 - 0.1, 1.15, -2.3]} castShadow>
            <cylinderGeometry args={[0.05, 0.05, 2.3]} />
            <meshStandardMaterial color="#1E293B" metalness={0.8} roughness={0.2} />
          </mesh>
        </group>
      )}

    </group>
  );
}
