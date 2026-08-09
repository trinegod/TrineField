"use client";

import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef, useState, type MutableRefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

type MotionState = {
  progress: number;
  pointerX: number;
  pointerY: number;
};

const SCENE_POSITIONS = {
  x: [2.2, -1.85, 1.65, -1.55, 1.8, -1.25, 0.15],
  y: [0.25, -0.05, 0.18, -0.28, 0.18, -0.08, 0],
  scale: [1, 0.78, 1.08, 0.84, 1.04, 0.76, 0.92],
};

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return reduced;
}

function interpolateKeyframes(values: number[], progress: number) {
  const scaled = THREE.MathUtils.clamp(progress, 0, 0.9999) * (values.length - 1);
  const index = Math.floor(scaled);
  return THREE.MathUtils.lerp(values[index], values[index + 1], scaled - index);
}

function EnvironmentRelief({ motion }: { motion: MutableRefObject<MotionState> }) {
  const mesh = useRef<THREE.Mesh>(null);
  const [colorMap, alphaMap, depthMap] = useLoader(THREE.TextureLoader, [
    "/cinematic/trine-environment.webp",
    "/cinematic/trine-alpha.webp",
    "/cinematic/trine-depth.webp",
  ]);

  useEffect(() => {
    colorMap.colorSpace = THREE.SRGBColorSpace;
    colorMap.anisotropy = 4;
    alphaMap.colorSpace = THREE.NoColorSpace;
    depthMap.colorSpace = THREE.NoColorSpace;
  }, [alphaMap, colorMap, depthMap]);

  useFrame((_, delta) => {
    if (!mesh.current) return;
    const ease = 1 - Math.exp(-delta * 2.4);
    mesh.current.position.x = THREE.MathUtils.lerp(mesh.current.position.x, 0.7 + motion.current.pointerX * 0.16, ease);
    mesh.current.position.y = THREE.MathUtils.lerp(mesh.current.position.y, motion.current.pointerY * 0.1 - motion.current.progress * 0.18, ease);
    mesh.current.rotation.y = THREE.MathUtils.lerp(mesh.current.rotation.y, motion.current.pointerX * 0.025, ease);
    mesh.current.rotation.x = THREE.MathUtils.lerp(mesh.current.rotation.x, -motion.current.pointerY * 0.018, ease);
  });

  return (
    <mesh ref={mesh} position={[0.7, 0, -4.6]}>
      <planeGeometry args={[12, 6.75, 128, 72]} />
      <meshStandardMaterial
        map={colorMap}
        alphaMap={alphaMap}
        displacementMap={depthMap}
        displacementScale={0.34}
        displacementBias={-0.12}
        transparent
        opacity={0.72}
        roughness={0.92}
        metalness={0.08}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}

function Beam({ length, position, rotation }: { length: number; position: [number, number, number]; rotation: number }) {
  return (
    <mesh position={position} rotation={[0, 0, rotation]} castShadow>
      <boxGeometry args={[length, 0.075, 0.13]} />
      <meshPhysicalMaterial
        color="#171a15"
        emissive="#8cac43"
        emissiveIntensity={0.045}
        metalness={0.88}
        roughness={0.21}
        clearcoat={0.72}
        clearcoatRoughness={0.2}
      />
    </mesh>
  );
}

function ParticleField({ motion }: { motion: MutableRefObject<MotionState> }) {
  const points = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const values = new Float32Array(180 * 3);
    for (let index = 0; index < 180; index += 1) {
      const angle = index * 2.3999632297;
      const radius = 1.4 + ((index * 37) % 100) / 21;
      values[index * 3] = Math.cos(angle) * radius;
      values[index * 3 + 1] = Math.sin(angle) * radius * 0.62;
      values[index * 3 + 2] = -0.8 - ((index * 17) % 80) / 20;
    }
    return values;
  }, []);

  useFrame((_, delta) => {
    if (!points.current) return;
    points.current.rotation.z += delta * 0.012;
    points.current.rotation.y = motion.current.pointerX * 0.035 + motion.current.progress * 0.18;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#c8f36a" size={0.014} transparent opacity={0.25} sizeAttenuation depthWrite={false} />
    </points>
  );
}

function TrineSculpture({ motion, reduced }: { motion: MutableRefObject<MotionState>; reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const glow = useRef<THREE.Mesh>(null);
  const limeLight = useRef<THREE.PointLight>(null);
  const { size } = useThree();

  useFrame((state, delta) => {
    if (!group.current || !core.current || !glow.current || !limeLight.current) return;
    const progress = reduced ? 0 : motion.current.progress;
    const ease = 1 - Math.exp(-delta * 3.2);
    const mobile = size.width < 720;
    const targetX = mobile ? 0.92 - progress * 0.74 : interpolateKeyframes(SCENE_POSITIONS.x, progress);
    const targetY = mobile ? 1.2 - progress * 1.15 : interpolateKeyframes(SCENE_POSITIONS.y, progress);
    const targetScale = (mobile ? 0.46 : 0.74) * interpolateKeyframes(SCENE_POSITIONS.scale, progress);

    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, targetX + motion.current.pointerX * 0.12, ease);
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, targetY - motion.current.pointerY * 0.08, ease);
    group.current.scale.setScalar(THREE.MathUtils.lerp(group.current.scale.x, targetScale, ease));
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, (reduced ? -0.12 : progress * Math.PI * 2.35) + motion.current.pointerX * 0.16, ease);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -0.08 + Math.sin(progress * Math.PI * 4) * 0.16 - motion.current.pointerY * 0.08, ease);
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, Math.sin(progress * Math.PI * 3) * 0.1, ease);

    const time = reduced ? 0 : state.clock.elapsedTime;
    core.current.rotation.y = time * 0.55 + progress * Math.PI;
    core.current.rotation.x = time * 0.32;
    const pulse = reduced ? 1 : 1 + Math.sin(time * 1.7) * 0.08;
    core.current.scale.setScalar(pulse);
    glow.current.scale.setScalar(1.7 + Math.sin(time * 1.3) * 0.11);
    limeLight.current.intensity = 7 + Math.sin(time * 1.5) * 1.1 + progress * 3;
  });

  return (
    <group ref={group} position={[2.2, 0.25, 0]} scale={0.74}>
      <Beam length={3.1} position={[0, -1.05, 0]} rotation={0} />
      <Beam length={3.11} position={[-0.775, 0.3, 0]} rotation={1.049} />
      <Beam length={3.11} position={[0.775, 0.3, 0]} rotation={-1.049} />

      <mesh position={[0, 0.02, 0.08]}>
        <ringGeometry args={[0.58, 0.592, 3]} />
        <meshBasicMaterial color="#c8f36a" transparent opacity={0.18} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>

      <mesh ref={core} position={[0, 0.02, 0.22]} castShadow>
        <octahedronGeometry args={[0.18, 1]} />
        <meshPhysicalMaterial
          color="#c8f36a"
          emissive="#c8f36a"
          emissiveIntensity={3.2}
          metalness={0.18}
          roughness={0.16}
          clearcoat={1}
        />
      </mesh>
      <mesh ref={glow} position={[0, 0.02, 0.19]}>
        <octahedronGeometry args={[0.23, 1]} />
        <meshBasicMaterial
          color="#c8f36a"
          transparent
          opacity={0.085}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <pointLight ref={limeLight} position={[0, 0.05, 1]} color="#c8f36a" intensity={7} distance={7} decay={2} />
    </group>
  );
}

function Scene({ motion, reduced }: { motion: MutableRefObject<MotionState>; reduced: boolean }) {
  return (
    <>
      <fog attach="fog" args={["#080908", 7.5, 18]} />
      <ambientLight intensity={0.2} color="#f2f3ec" />
      <directionalLight position={[-4, 5, 6]} intensity={2.25} color="#f2f3ec" castShadow />
      <spotLight position={[5, 2, 4]} intensity={18} angle={0.34} penumbra={0.8} color="#c8f36a" distance={15} />
      <pointLight position={[-4, -2, 1]} intensity={1.2} color="#384623" distance={12} />
      <Suspense fallback={null}>
        <EnvironmentRelief motion={motion} />
      </Suspense>
      <ParticleField motion={motion} />
      <TrineSculpture motion={motion} reduced={reduced} />
    </>
  );
}

export default function CinematicStage() {
  const reduced = useReducedMotion();
  const motion = useRef<MotionState>({ progress: 0, pointerX: 0, pointerY: 0 });

  useEffect(() => {
    document.documentElement.dataset.cinematic = "ready";
    gsap.registerPlugin(ScrollTrigger);

    const syncProgress = (progress: number) => {
      motion.current.progress = progress;
      document.documentElement.style.setProperty("--cinematic-progress", progress.toFixed(4));
    };

    const trigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => syncProgress(self.progress),
    });

    const onPointerMove = (event: PointerEvent) => {
      motion.current.pointerX = (event.clientX / window.innerWidth) * 2 - 1;
      motion.current.pointerY = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    syncProgress(trigger.progress);

    return () => {
      trigger.kill();
      window.removeEventListener("pointermove", onPointerMove);
      delete document.documentElement.dataset.cinematic;
      document.documentElement.style.removeProperty("--cinematic-progress");
    };
  }, []);

  return (
    <div className="cinematic-stage" aria-hidden="true">
      <div className="cinematic-stage__fallback" />
      <Canvas
        className="cinematic-stage__canvas"
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 8], fov: 34, near: 0.1, far: 40 }}
        frameloop={reduced ? "demand" : "always"}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          gl.setClearColor("#080908", 0);
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 0.88;
          gl.outputColorSpace = THREE.SRGBColorSpace;
        }}
      >
        <Scene motion={motion} reduced={reduced} />
      </Canvas>
      <div className="cinematic-hud">
        <span>TRINE / DEPTH SYSTEM</span>
        <i><b /></i>
        <span>01—07</span>
      </div>
      <div className="cinematic-vignette" />
    </div>
  );
}
