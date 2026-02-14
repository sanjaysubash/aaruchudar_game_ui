"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Html, useGLTF, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { Suspense, useMemo, useRef } from "react";
import { OrbitControls } from "@react-three/drei";

function Sun({ mobile }: { mobile?: boolean }) {
  // Keep sun centered at origin and enhance visuals
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/jar_brain.glb");
  const pulseRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.1;
    // Subtle pulsing for the sun
    const t = performance.now() * 0.001;
    const s = 1 + Math.sin(t * 2) * 0.03;
    if (pulseRef.current) pulseRef.current.scale.setScalar(s);
    if (glowRef.current) {
      const mat = glowRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.18 + (Math.sin(t * 2) + 1) * 0.06;
    }
  });

  const coreZ = mobile ? -0.6 : -0.8;
  const coreScale = mobile ? 0.48 : 0.4;

  return (
    <group ref={group}>
      {/* Core model */}
      <primitive object={scene} scale={coreScale} position={[0, 0, coreZ]} />

      {/* Soft emissive core */}
      <mesh ref={pulseRef} position={[0, 0, coreZ]}>
        <sphereGeometry args={[mobile ? 0.42 : 0.35, 32, 32]} />
        <meshStandardMaterial emissive={new THREE.Color("#ffcc77")} emissiveIntensity={1.2} color={new THREE.Color("#ffea9a")} transparent opacity={0.6} />
      </mesh>

      {/* Outer glow halo with additive blending */}
      <mesh ref={glowRef} position={[0, 0, coreZ]}>
        <sphereGeometry args={[mobile ? 0.62 : 0.55, 32, 32]} />
        <meshBasicMaterial color={new THREE.Color("#ffd27a")} transparent opacity={0.24} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} />
      </mesh>

      {/* Sparkling particles around the sun */}
      <Sparkles count={mobile ? 32 : 40} scale={[mobile ? 1.4 : 1.6, mobile ? 1.4 : 1.6, mobile ? 1.4 : 1.6]} size={2.5} speed={0.5} color="#ffd27a" opacity={0.65} position={[0, 0, coreZ]} />
    </group>
  );
}

function OrbitTrack({ radius, opacity = 0.35 }: { radius: number; opacity?: number }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -1.2]}>
      <torusGeometry args={[radius, 0.02, 16, 160]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={opacity} />
    </mesh>
  );
}

function Planet({ radius = 1.6, speed = 0.2, scale = 0.32, phase = 0, color = "#7aa2ff" }: { radius?: number; speed?: number; scale?: number; phase?: number; color?: string }) {
  const ref = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/brain_hologram.glb");
  // Tint the planet by cloning materials and applying the color
  const tinted = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((obj: any) => {
      if (obj.isMesh && obj.material) {
        obj.material = obj.material.clone();
        if (obj.material.color) obj.material.color = new THREE.Color(color);
        if (obj.material.emissive) obj.material.emissive = new THREE.Color(color).multiplyScalar(0.15);
      }
    });
    return clone;
  }, [scene, color]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed + phase;
    if (ref.current) {
      ref.current.position.x = Math.cos(t) * radius;
      ref.current.position.z = Math.sin(t) * radius - 1.2;
      ref.current.rotation.y += 0.18 * 0.016;
    }
  });
  return (
    <group ref={ref}>
      <primitive object={tinted} scale={scale} />
    </group>
  );
}

export default function SolarBackground() {
  const isMobile = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(max-width: 640px)").matches;

  const planets = useMemo(() => [
    { radius: isMobile ? 1.6 : 1.8, speed: 0.26, scale: isMobile ? 0.22 : 0.24, phase: 0, color: "#7aa2ff" },
    { radius: isMobile ? 2.2 : 2.4, speed: 0.22, scale: isMobile ? 0.24 : 0.26, phase: Math.PI / 3, color: "#ff7ab6" },
    { radius: isMobile ? 2.8 : 3.0, speed: 0.2, scale: isMobile ? 0.26 : 0.28, phase: (2 * Math.PI) / 3, color: "#7affc0" },
    { radius: isMobile ? 3.4 : 3.6, speed: 0.18, scale: isMobile ? 0.28 : 0.3, phase: Math.PI, color: "#ffd27a" },
    { radius: isMobile ? 4.0 : 4.2, speed: 0.16, scale: isMobile ? 0.3 : 0.32, phase: (4 * Math.PI) / 3, color: "#a77aff" },
    { radius: isMobile ? 4.6 : 4.8, speed: 0.14, scale: isMobile ? 0.32 : 0.34, phase: (5 * Math.PI) / 3, color: "#ff9e7a" },
  ], [isMobile]);

  const cameraPosition: [number, number, number] = isMobile ? [0, 0, 9.5] : [0, 0, 11];
  const cameraFov = isMobile ? 68 : 70;

  return (
    <div className="fixed inset-0 -z-10 pointer-events-auto">
      <Canvas dpr={[1, 2]} camera={{ position: cameraPosition, fov: cameraFov }} gl={{ antialias: true, alpha: true }}>
        <Suspense fallback={<Html center><div style={{ opacity: 0 }} /></Html>}>
          {/* Slightly warmer lighting near the sun */}
          <ambientLight intensity={0.6} />
          <directionalLight position={[3, 3, 2]} intensity={0.9} />
          <pointLight position={[0, 0, isMobile ? -0.6 : -0.8]} intensity={1.5} distance={10} decay={2} color={new THREE.Color("#ffd27a")} />
          {/* Centered sun */}
          <Sun mobile={isMobile} />

          {/* Orbit tracks (white lines) */}
          {planets.map((p, i) => (
            <OrbitTrack key={`track-${i}`} radius={p.radius} opacity={0.28} />
          ))}

          {/* Colorful planets following tracks */}
          {planets.map((p, i) => (
            <Planet key={`planet-${i}`} radius={p.radius} speed={p.speed} scale={p.scale} phase={p.phase} color={p.color as string} />
          ))}

          {/* User rotation controls; zoom/pan off for background */}
          <OrbitControls enableZoom={!isMobile} enablePan={false} enableDamping dampingFactor={0.06} rotateSpeed={0.4} minDistance={isMobile ? undefined : 8} maxDistance={isMobile ? undefined : 14} />

          <Environment preset="city" />
        </Suspense>
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black/70" />
    </div>
  );
}

// Preload models
// @ts-expect-error
useGLTF.preload("/jar_brain.glb");
// @ts-expect-error
useGLTF.preload("/brain_hologram.glb");