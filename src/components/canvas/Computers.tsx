import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import * as THREE from 'three';

import CanvasLoader from "../Loader";

interface ComputersProps {
  isMobile: boolean;
  onModelReady: () => void;
}

const Computers = ({ isMobile, onModelReady }: ComputersProps) => {
  const computer = useGLTF('./gaming_desktop_pc/scene.gltf');
  console.log('3D model loaded successfully:', computer);

  useEffect(() => {
    console.log('Computer scene effect triggered:', computer?.scene);
    if (computer?.scene) {
      console.log('Setting up 3D model shadows and calling onModelReady');
      computer.scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      // Call onModelReady immediately
      console.log('Calling onModelReady callback');
      onModelReady();
    }
  }, [computer?.scene, onModelReady]);

  return (
    <>
      <ambientLight intensity={0.3} />
      <hemisphereLight intensity={0.15} groundColor="black" />
      <spotLight 
        position={[-20, 50, 10]} 
        angle={0.12} 
        penumbra={1} 
        intensity={1} 
        castShadow 
        shadow-mapSize={1024} 
      />
      <pointLight intensity={1} />
      
      <primitive 
        object={computer.scene} 
        scale={isMobile ? 0.6 : 0.8} 
        position={isMobile ? [0, -1.5, -2.2] : [0, -2.5, -1.5]} 
        rotation={[-0.01, -0.2, -0.1]} 
      />
    </>
  );
};

interface ComputersCanvasProps {
  onModelReady: () => void;
}

const ComputersCanvas = ({ onModelReady }: ComputersCanvasProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas 
      frameloop="demand" 
      shadows 
      camera={{ position: [28, 3, 5], fov: 25 }} 
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls 
          enableZoom={false} 
          maxPolarAngle={Math.PI / 2} 
          minPolarAngle={Math.PI / 2} 
        />
        <Computers isMobile={isMobile} onModelReady={onModelReady} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
