import React from 'react';

export default function RoomLighting() {
  return (
    <>
      {/* Ambient moody base lighting (midnight blue noir) */}
      <ambientLight intensity={0.5} color="#1e293b" />

      {/* Main warm desk lamp light */}
      <pointLight
        position={[0, 2.0, 0]}
        intensity={2.8}
        distance={7}
        color="#fbbf24"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Corkboard spotlight */}
      <spotLight
        position={[0, 3.2, -1.0]}
        target-position={[0, 1.8, -2.9]}
        angle={0.6}
        penumbra={0.7}
        intensity={3.5}
        color="#fef3c7"
      />

      {/* Security Terminal cool cyan glow */}
      <pointLight
        position={[-2.2, 1.2, -1.5]}
        intensity={1.2}
        distance={4}
        color="#06b6d4"
      />

      {/* Window moon / rain backlight */}
      <directionalLight
        position={[4, 3, 2]}
        intensity={0.6}
        color="#60a5fa"
      />
    </>
  );
}

