import React, { useState } from 'react';
import { Html } from '@react-three/drei';

export function RoomStructure() {
  return (
    <group>
      {/* Floor - Dark mahogany parquet / carpet */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#1a1512" roughness={0.7} metalness={0.1} />
      </mesh>

      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 4, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#0c0e14" roughness={0.9} />
      </mesh>

      {/* Back Wall (Holds Corkboard) */}
      <mesh position={[0, 2, -3]} receiveShadow>
        <planeGeometry args={[10, 4]} />
        <meshStandardMaterial color="#141923" roughness={0.8} />
      </mesh>

      {/* Front Wall */}
      <mesh position={[0, 2, 3]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[10, 4]} />
        <meshStandardMaterial color="#11151f" roughness={0.8} />
      </mesh>

      {/* Left Wall (Near Terminal) */}
      <mesh position={[-3.5, 2, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[10, 4]} />
        <meshStandardMaterial color="#131722" roughness={0.8} />
      </mesh>

      {/* Right Wall (Holds Window) */}
      <mesh position={[3.5, 2, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[10, 4]} />
        <meshStandardMaterial color="#141824" roughness={0.8} />
      </mesh>

      {/* Rain Window Pane */}
      <mesh position={[3.45, 2.3, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[3, 2]} />
        <meshStandardMaterial color="#1e293b" transparent opacity={0.6} roughness={0.1} />
      </mesh>
    </group>
  );
}

// Interactive Prop Component with hover glow and label
export function InteractiveProp({
  id,
  name,
  evidenceCode,
  position,
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
  onSelect,
  children,
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <group
      position={position}
      rotation={rotation}
      scale={scale}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect({ id, name, evidenceCode });
      }}
    >
      {children}

      {/* Interactive Floating Hover Prompt */}
      {hovered && (
        <Html position={[0, 0.8, 0]} center distanceFactor={8} pointerEvents="none">
          <div className="bg-black/90 border border-amber-500/80 px-3 py-1.5 rounded-lg shadow-xl shadow-amber-500/20 text-center whitespace-nowrap animate-bounce">
            <div className="text-[10px] uppercase font-mono tracking-widest text-amber-400 font-bold">
              [Click or E to Inspect]
            </div>
            <div className="text-xs font-semibold text-white">{name}</div>
            {evidenceCode && (
              <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1 rounded font-mono">
                {evidenceCode}
              </span>
            )}
          </div>
        </Html>
      )}
    </group>
  );
}

// 1. Central Detective Desk & Incident Dossier
export function DetectiveDesk({ onSelect }) {
  return (
    <InteractiveProp
      id="desk_files"
      name="Crime Scene Dossier & Photographs"
      evidenceCode="E-01"
      position={[0, 0.7, 0]}
      onSelect={onSelect}
    >
      {/* Table Top */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.2, 0.1, 1.2]} />
        <meshStandardMaterial color="#3e2723" roughness={0.4} />
      </mesh>

      {/* 4 Desk Legs */}
      <mesh position={[-1.0, -0.35, -0.5]} castShadow>
        <boxGeometry args={[0.1, 0.7, 0.1]} />
        <meshStandardMaterial color="#2d1c19" />
      </mesh>
      <mesh position={[1.0, -0.35, -0.5]} castShadow>
        <boxGeometry args={[0.1, 0.7, 0.1]} />
        <meshStandardMaterial color="#2d1c19" />
      </mesh>
      <mesh position={[-1.0, -0.35, 0.5]} castShadow>
        <boxGeometry args={[0.1, 0.7, 0.1]} />
        <meshStandardMaterial color="#2d1c19" />
      </mesh>
      <mesh position={[1.0, -0.35, 0.5]} castShadow>
        <boxGeometry args={[0.1, 0.7, 0.1]} />
        <meshStandardMaterial color="#2d1c19" />
      </mesh>

      {/* Case Folders / Dossier on Desk */}
      <mesh position={[-0.4, 0.07, 0.1]} rotation={[0, 0.15, 0]} castShadow>
        <boxGeometry args={[0.45, 0.03, 0.35]} />
        <meshStandardMaterial color="#d4a373" roughness={0.6} />
      </mesh>

      {/* Crime Scene Photo Prints */}
      <mesh position={[0.2, 0.06, 0.05]} rotation={[-Math.PI / 2, 0, 0.1]}>
        <planeGeometry args={[0.25, 0.2]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.3} />
      </mesh>

      {/* Banker's Brass/Green Lamp */}
      <group position={[0.8, 0.25, -0.35]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.08, 0.1, 0.03, 16]} />
          <meshStandardMaterial color="#d97706" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.15, 0]} castShadow>
          <cylinderGeometry args={[0.015, 0.015, 0.3, 8]} />
          <meshStandardMaterial color="#d97706" metalness={0.8} />
        </mesh>
        <mesh position={[0, 0.25, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.06, 0.06, 0.24, 16, 1, false, 0, Math.PI]} />
          <meshStandardMaterial color="#166534" roughness={0.3} />
        </mesh>
      </group>
    </InteractiveProp>
  );
}

// 2. Investigation Corkboard (Holds E-03 Witness Statement & Clues)
export function InvestigationCorkboard({ onSelect }) {
  return (
    <InteractiveProp
      id="corkboard"
      name="Investigation Corkboard & Suspect Profiles"
      evidenceCode="E-03"
      position={[0, 2.1, -2.9]}
      onSelect={onSelect}
    >
      {/* Board Wooden Frame */}
      <mesh castShadow>
        <boxGeometry args={[3.2, 1.8, 0.08]} />
        <meshStandardMaterial color="#5c3d2e" roughness={0.7} />
      </mesh>

      {/* Cork Texture Surface */}
      <mesh position={[0, 0, 0.05]}>
        <boxGeometry args={[3.0, 1.6, 0.02]} />
        <meshStandardMaterial color="#b08968" roughness={0.9} />
      </mesh>

      {/* Pinned Suspect Photos & Newspaper Clips */}
      <mesh position={[-0.9, 0.3, 0.07]} rotation={[0, 0, 0.05]}>
        <planeGeometry args={[0.4, 0.45]} />
        <meshStandardMaterial color="#f8fafc" />
      </mesh>
      <mesh position={[0.9, 0.3, 0.07]} rotation={[0, 0, -0.04]}>
        <planeGeometry args={[0.4, 0.45]} />
        <meshStandardMaterial color="#f8fafc" />
      </mesh>
      <mesh position={[0, 0.35, 0.07]}>
        <planeGeometry args={[0.45, 0.5]} />
        <meshStandardMaterial color="#fef08a" />
      </mesh>
      <mesh position={[-0.4, -0.3, 0.07]} rotation={[0, 0, 0.1]}>
        <planeGeometry args={[0.5, 0.3]} />
        <meshStandardMaterial color="#e2e8f0" />
      </mesh>
      <mesh position={[0.5, -0.3, 0.07]} rotation={[0, 0, -0.08]}>
        <planeGeometry args={[0.5, 0.3]} />
        <meshStandardMaterial color="#fed7aa" />
      </mesh>

      {/* Iconic Red String Connectors */}
      <mesh position={[0, 0.1, 0.08]} rotation={[0, 0, 0.6]}>
        <cylinderGeometry args={[0.004, 0.004, 1.2]} />
        <meshBasicMaterial color="#ef4444" />
      </mesh>
      <mesh position={[0.4, 0.0, 0.08]} rotation={[0, 0, -0.7]}>
        <cylinderGeometry args={[0.004, 0.004, 1.1]} />
        <meshBasicMaterial color="#ef4444" />
      </mesh>
    </InteractiveProp>
  );
}

// 3. Security Terminal (Holds E-02 Electronic Door Logs)
export function SecurityTerminal({ onSelect }) {
  return (
    <InteractiveProp
      id="terminal"
      name="Security Network Terminal"
      evidenceCode="E-02"
      position={[-2.4, 0.8, -1.2]}
      rotation={[0, Math.PI / 4, 0]}
      onSelect={onSelect}
    >
      {/* Side Desk */}
      <mesh position={[0, -0.35, 0]} castShadow>
        <boxGeometry args={[1.2, 0.7, 0.8]} />
        <meshStandardMaterial color="#2d3748" roughness={0.6} />
      </mesh>

      {/* Retro Computer CRT Monitor */}
      <mesh position={[0, 0.25, 0]} castShadow>
        <boxGeometry args={[0.55, 0.45, 0.45]} />
        <meshStandardMaterial color="#1a202c" roughness={0.5} />
      </mesh>

      {/* Screen Glowing Cyan with Security Logs */}
      <mesh position={[0, 0.25, 0.23]}>
        <planeGeometry args={[0.45, 0.35]} />
        <meshStandardMaterial color="#06b6d4" emissive="#0891b2" emissiveIntensity={0.6} />
      </mesh>

      {/* Keyboard */}
      <mesh position={[0, 0.03, 0.25]} rotation={[-0.1, 0, 0]}>
        <boxGeometry args={[0.4, 0.03, 0.15]} />
        <meshStandardMaterial color="#2d3748" />
      </mesh>
    </InteractiveProp>
  );
}

// 4. Archive Filing Cabinet (Holds E-05 Staff Schedule & E-06 Locker Log)
export function FilingCabinet({ onSelect }) {
  return (
    <InteractiveProp
      id="filing_cabinet"
      name="Archive Filing Cabinet & HR Records"
      evidenceCode="E-05"
      position={[2.4, 0.9, -1.6]}
      rotation={[0, -Math.PI / 6, 0]}
      onSelect={onSelect}
    >
      {/* Tall Steel Cabinet */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.8, 1.8, 0.7]} />
        <meshStandardMaterial color="#334155" roughness={0.4} metalness={0.6} />
      </mesh>

      {/* 4 Drawer Panels & Handles */}
      {[-0.6, -0.2, 0.2, 0.6].map((y, idx) => (
        <group key={idx} position={[0, y, 0.36]}>
          <mesh>
            <boxGeometry args={[0.72, 0.35, 0.02]} />
            <meshStandardMaterial color="#475569" roughness={0.4} metalness={0.7} />
          </mesh>
          <mesh position={[0, 0, 0.03]}>
            <boxGeometry args={[0.15, 0.02, 0.02]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.9} />
          </mesh>
        </group>
      ))}
    </InteractiveProp>
  );
}

// 5. Forensic Sensor Table (Holds E-04 Display Sensor Report)
export function ForensicStation({ onSelect }) {
  return (
    <InteractiveProp
      id="sensor_station"
      name="Forensic Analysis Table"
      evidenceCode="E-04"
      position={[2.3, 0.7, 1.0]}
      rotation={[0, -Math.PI / 3, 0]}
      onSelect={onSelect}
    >
      <mesh castShadow>
        <boxGeometry args={[1.1, 0.7, 0.7]} />
        <meshStandardMaterial color="#1f2937" roughness={0.5} />
      </mesh>
      {/* Glowing Forensic Sensor Diagnostic Report */}
      <mesh position={[0, 0.36, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.3, 0.4]} />
        <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={0.4} />
      </mesh>
    </InteractiveProp>
  );
}

// 6. Verdict & Indictment Dispatch Station
export function VerdictStation({ onSelect }) {
  return (
    <InteractiveProp
      id="safe_verdict"
      name="Indictment & Verdict Station"
      evidenceCode={null}
      position={[-2.3, 0.8, 1.1]}
      rotation={[0, Math.PI / 3, 0]}
      onSelect={onSelect}
    >
      <mesh castShadow>
        <boxGeometry args={[1.0, 0.7, 0.7]} />
        <meshStandardMaterial color="#1e1e24" roughness={0.5} />
      </mesh>
      {/* Typewriter / Dispatch Briefcase */}
      <mesh position={[0, 0.42, 0]} castShadow>
        <boxGeometry args={[0.4, 0.12, 0.35]} />
        <meshStandardMaterial color="#b45309" roughness={0.3} metalness={0.4} />
      </mesh>
    </InteractiveProp>
  );
}

