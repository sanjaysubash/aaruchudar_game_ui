// @ts-nocheck
"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import React, { Suspense, useMemo, useRef } from "react";

function getCssVarNumber(name: string, fallback: number) {
  if (typeof window === "undefined") return fallback;
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const n = parseFloat(v);
  return Number.isFinite(n) ? n : fallback;
}

function SceneModel() {
  const url = useMemo(() => new URL("./brain_hologram.glb", import.meta.url).href, []);
  const { scene } = useGLTF(url);
  const groupRef = useRef<any>();

  // Slow breathing scale only
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const speed = getCssVarNumber("--r3f-speed", 0.6);
    const s = 1 + Math.sin(t * speed * 0.12) * 0.01;
    if (groupRef.current) groupRef.current.scale.set(s, s, s);
  });

  return (
    <group ref={groupRef} dispose={null}>
      <primitive object={scene} scale={[1.6, 1.6, 1.6]} />
    </group>
  );
}

export default function BrainJarCanvas() {
  const brightness = getCssVarNumber("--r3f-brightness", 0.75);
  const speed = getCssVarNumber("--r3f-speed", 0.6);
  return (
    <div className="relative w-full h-[420px] md:h-[520px] panel">
      <Canvas camera={{ position: [1.4, 1.2, 1.6], fov: 45 }} dpr={[1, 2]}>
        <color attach="background" args={["#05070A"]} />
        <ambientLight intensity={0.35 * brightness} />
        <directionalLight position={[3, 5, 2]} intensity={0.5 * brightness} />
        <Suspense fallback={null}>
          <SceneModel />
        </Suspense>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableDamping
          dampingFactor={0.06}
          autoRotate
          autoRotateSpeed={0.25 * speed}
          minPolarAngle={Math.PI / 3.2}
          maxPolarAngle={Math.PI / 1.8}
        />
      </Canvas>
    </div>
  );
}

// Preload
useGLTF.preload(new URL("./brain_hologram.glb", import.meta.url).href);
