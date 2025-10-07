import { OrbitControls } from "@react-three/drei";
import { useGLTF } from "@react-three/drei";
import { useRef, useEffect } from "react";
import * as THREE from "three";

export default function Experience() {
  const { scene, materials } = useGLTF("./controller.glb");

  useEffect(() => {
    window.controllerMaterials = materials;
  }, [materials]);

  return (
    <>
      <OrbitControls
        makeDefault
        target={[0, 0, 0]}
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={(3 * Math.PI) / 4}
      />

      <directionalLight
        position={[0, 3, 5]}
        intensity={4.8}
        color="#e6f0ff"
        castShadow
        shadow-normalBias={0.05}
      />

      <pointLight position={[-2, 2, 2]} intensity={1.2} color="#d4eaff" />

      <pointLight position={[0, 2, -3]} intensity={1.5} color="#e0f2ff" />

      <ambientLight intensity={0.8} color="#f3f8ff" />

      <primitive
        object={scene}
        scale={4}
        rotation={[Math.PI / 2.2, Math.PI - 0.25, -0.1]}
        position={[0, -1, -1.2]}
      />
    </>
  );
}
