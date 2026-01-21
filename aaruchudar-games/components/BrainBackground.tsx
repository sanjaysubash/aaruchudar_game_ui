"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Environment, Html, useGLTF } from "@react-three/drei";
import { Suspense, useRef } from "react";

function BrainModel() {
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.15; // gentle spin
    }
  });
  const { scene } = useGLTF("/brain_hologram.glb");
  return (
    <group ref={group}>
      <primitive
        object={scene}
        scale={1.2}
        rotation={[0, Math.PI * 0.15, 0]}
        position={[0, -0.6, -2]}
      />
    </group>
  );
}

export default function BrainBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 3.2], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense
          fallback={
            <Html center>
              <div style={{ opacity: 0 }} />
            </Html>
          }
        >
          <ambientLight intensity={0.35} />
          <directionalLight position={[2, 2, 2]} intensity={0.8} />
          <BrainModel />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/80" />
    </div>
  );
}

// @ts-ignore
useGLTF.preload("/brain_hologram.glb");