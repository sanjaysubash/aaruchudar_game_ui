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

function SceneModel({ rotate = false, scale = 1.4, offsetY = 0 }: { rotate?: boolean; scale?: number; offsetY?: number }) {
  const url = useMemo(() => new URL("./brain_hologram.glb", import.meta.url).href, []);
  const { scene } = useGLTF(url);
  const groupRef = useRef<any>();

  // Slow breathing scale + optional slow rotation for background mode
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const speed = getCssVarNumber("--r3f-speed", 0.6);
    const s = 1 + Math.sin(t * speed * 0.12) * 0.01;
    if (groupRef.current) {
      groupRef.current.scale.set(s * scale, s * scale, s * scale);
      groupRef.current.position.y = offsetY;
      if (rotate) groupRef.current.rotation.y += delta * 0.15 * speed;
    }
  });

  return (
    <group ref={groupRef} dispose={null}>
      <primitive object={scene} />
    </group>
  );
}

export default function BrainJarCanvas({
  variant = "panel",
  className,
  cameraPosition,
  fov,
  modelScale,
  offsetY,
  interactive,
  enableZoom,
  autoRotate,
  zoomSpeed,
}: {
  variant?: "panel" | "background";
  className?: string;
  cameraPosition?: [number, number, number];
  fov?: number;
  modelScale?: number;
  offsetY?: number;
  interactive?: boolean;
  enableZoom?: boolean;
  autoRotate?: boolean;
  zoomSpeed?: number;
}) {
  const brightness = getCssVarNumber("--r3f-brightness", 0.75);
  const speed = getCssVarNumber("--r3f-speed", 0.6);
  const isMobile = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(max-width: 640px)").matches;

  if (variant === "background") {
    const camPos = cameraPosition ?? (isMobile ? [2.2, 1.7, 2.6] : [2.0, 1.6, 2.2]);
    const theFov = fov ?? 45;
    const scale = modelScale ?? 1.3;
    const y = offsetY ?? 0.06; // slight lift for better centering
    const isInteractive = !!interactive;

    return (
      <div className={(isInteractive ? "pointer-events-auto " : "pointer-events-none ") + "absolute inset-0 -z-10 " + (className ?? "")}> 
        <Canvas camera={{ position: camPos as any, fov: theFov }} dpr={[1, 2]} gl={{ alpha: true }}>
          {/* transparent canvas for background layering */}
          <ambientLight intensity={0.35 * brightness} />
          <directionalLight position={[3, 5, 2]} intensity={0.5 * brightness} />
          <Suspense fallback={null}>
            <SceneModel rotate scale={scale} offsetY={y} />
          </Suspense>
          {isInteractive && (
            <OrbitControls
              enableZoom={enableZoom ?? !isMobile}
              zoomSpeed={zoomSpeed ?? 1.5}
              enablePan={false}
              enableDamping
              dampingFactor={0.06}
              autoRotate={autoRotate ?? true}
              autoRotateSpeed={0.18 * speed}
              minPolarAngle={Math.PI / 3.2}
              maxPolarAngle={Math.PI / 1.8}
              minDistance={isMobile ? undefined : 1.6}
              maxDistance={isMobile ? undefined : 3.2}
            />
          )}
        </Canvas>
      </div>
    );
  }

  // panel (default) variant
  const camPos = cameraPosition ?? (isMobile ? [1.8, 1.5, 2.1] : [1.6, 1.4, 1.8]);
  const theFov = fov ?? 45;
  const scale = modelScale ?? 1.35;
  const y = offsetY ?? 0.06;

  return (
    <div className={"relative w-full h-[420px] md:h-[540px] panel " + (className ?? "") }>
      <Canvas camera={{ position: camPos as any, fov: theFov }} dpr={[1, 2]}>
        <color attach="background" args={["#05070A"]} />
        <ambientLight intensity={0.35 * brightness} />
        <directionalLight position={[3, 5, 2]} intensity={0.5 * brightness} />
        <Suspense fallback={null}>
          <SceneModel scale={scale} offsetY={y} />
        </Suspense>
        <OrbitControls
          enableZoom={enableZoom ?? !isMobile}
          zoomSpeed={zoomSpeed ?? 1.6}
          enablePan={false}
          enableDamping
          dampingFactor={0.06}
          autoRotate={autoRotate ?? true}
          autoRotateSpeed={0.2 * speed}
          minPolarAngle={Math.PI / 3.2}
          maxPolarAngle={Math.PI / 1.8}
          minDistance={isMobile ? undefined : 1.4}
          maxDistance={isMobile ? undefined : 3.0}
        />
      </Canvas>
    </div>
  );
}

// Preload
useGLTF.preload(new URL("./brain_hologram.glb", import.meta.url).href);
