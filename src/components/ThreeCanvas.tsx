"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function ThreeCanvas() {
  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      {/* 3D Canvas to overlay on top of website */}
      <Canvas
        camera={{ position: [0, 2, 5], fov: 60 }}
        style={{
          position: "absolute", // Overlay on top of other content
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          
          zIndex: 10, // Ensure it's on top
        }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[2, 2, 2]} intensity={1} />
        <Suspense fallback={null}>
          <Robot />
        </Suspense>
        <OrbitControls enableZoom />
      </Canvas>

      {/* Your website content */}
      <div style={{ position: "relative", zIndex: 5, padding: "20px" }}>
        <h1>Your Website Content Goes Here</h1>
        <p>
          This is your website's content, which will be shown under the 3D
          scene.
        </p>
        {/* Other content */}
      </div>
    </div>
  );
}

function Robot() {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/robot.glb"); // Load your .glb model
  const [hovered, setHovered] = useState(false);

  // Continuous rotation animation
  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.5; // Rotate around the Y-axis
    }
  });

  return (
    <primitive
      ref={group}
      object={scene}
      scale={0.8}
      position={[0, -1, 0]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => {}}
    />
  );
}
