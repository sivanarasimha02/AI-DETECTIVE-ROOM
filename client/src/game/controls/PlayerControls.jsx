import React, { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const CAMERA_PRESETS = {
  overview: { pos: [0, 2.2, 3.2], target: [0, 1.2, 0] },
  desk: { pos: [0, 1.8, 1.4], target: [0, 0.7, 0] },
  corkboard: { pos: [0, 2.1, -1.2], target: [0, 2.1, -2.9] },
  terminal: { pos: [-1.4, 1.3, -0.6], target: [-2.4, 0.9, -1.2] },
  cabinet: { pos: [1.3, 1.5, -0.8], target: [2.4, 1.0, -1.6] },
  verdict: { pos: [-1.3, 1.3, 0.5], target: [-2.3, 0.9, 1.1] },
};

export default function PlayerControls({ activeView = 'overview' }) {
  const controlsRef = useRef();
  const { camera } = useThree();

  const targetPos = useRef(new THREE.Vector3(...CAMERA_PRESETS.overview.pos));
  const targetLook = useRef(new THREE.Vector3(...CAMERA_PRESETS.overview.target));

  useEffect(() => {
    const preset = CAMERA_PRESETS[activeView] || CAMERA_PRESETS.overview;
    targetPos.current.set(...preset.pos);
    targetLook.current.set(...preset.target);
  }, [activeView]);

  useFrame((state, delta) => {
    if (controlsRef.current) {
      // Smooth lerp camera position to selected station
      camera.position.lerp(targetPos.current, 0.08);
      controlsRef.current.target.lerp(targetLook.current, 0.08);
      controlsRef.current.update();
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.05}
      maxPolarAngle={Math.PI / 2 - 0.05}
      minDistance={0.8}
      maxDistance={4.5}
      makeDefault
    />
  );
}

