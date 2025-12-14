import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTheme } from '../../context/ThemeContext';
import * as THREE from 'three';

// --- GEOMETRIES ---
function Shapes({ count = 8 }) { // Reduced count for performance
  const shapes = useMemo(() => {
    return new Array(count).fill(0).map(() => ({
      position: [
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 20
      ],
      rotationSpeed: [
        (Math.random() - 0.5) * 0.005, // Slower rotation
        (Math.random() - 0.5) * 0.005
      ],
      geometryType: Math.floor(Math.random() * 4),
      scale: Math.random() * 0.5 + 0.5,
      speed: Math.random() * 0.3 + 0.2, // Slower speed
      baseY: (Math.random() - 0.5) * 40
    }));
  }, [count]);

  return (
    <group>
      {shapes.map((s, i) => (
        <Shape key={i} {...s} />
      ))}
    </group>
  );
}

function Shape({ position, rotationSpeed, geometryType, scale, speed, baseY }) {
  const mesh = useRef();
  
  useFrame((state) => {
    if (!mesh.current) return;
    const time = state.clock.getElapsedTime();
    
    mesh.current.rotation.x += rotationSpeed[0];
    mesh.current.rotation.y += rotationSpeed[1];
    
    // Floating
    mesh.current.position.y = baseY + Math.sin(time * speed) * 1;

    // Mouse Parallax - access pointer from state - DAMPED heavily
    const { x, y } = state.pointer;
    mesh.current.position.x += (x * 2 - mesh.current.position.x) * 0.01;
    mesh.current.position.y += (y * 2 - mesh.current.position.y) * 0.01;
  });

  const Geometry = [
    THREE.IcosahedronGeometry,
    THREE.BoxGeometry,
    THREE.OctahedronGeometry,
    THREE.TetrahedronGeometry
  ][geometryType];

  return (
    <mesh ref={mesh} position={position} scale={[scale, scale, scale]}>
      <primitive object={new Geometry(1, 0)} attach="geometry" />
      <meshBasicMaterial 
        color="#3b82f6" 
        wireframe 
        transparent 
        opacity={0.15} 
      />
    </mesh>
  );
}

// --- PARTICLES (LOGIN) ---
function NetworkParticles({ count = 80 }) {
  const points = useRef();
  const linesGeometry = useRef();

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        pos[i * 3] = (Math.random() - 0.5) * 50;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 50;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 50;

        const type = Math.floor(Math.random() * 3);
        col[i * 3] = type === 0 ? 1 : 0;
        col[i * 3 + 1] = type === 1 ? 1 : 0;
        col[i * 3 + 2] = type === 2 ? 1 : 0;
    }
    return [pos, col];
  }, [count]);

  useFrame((state) => {
    if (!points.current) return;
    
    // Rotate particles
    points.current.rotation.y += 0.0005; 
    const { x, y } = state.pointer;
    points.current.rotation.x += (-y * 0.2 - points.current.rotation.x) * 0.05;
    points.current.rotation.y += (x * 0.05) * 0.1;

    // Update Lines if geometry exists
    if (linesGeometry.current) {
        // We need world positions of points to draw lines accurately if points mesh is rotating?
        // Actually, if we put lines INSIDE the points mesh (as a child) or apply same rotation, easy.
        // But points are in a <points> object. Lines in <lineSegments>.
        // Let's just create a ref for the group and rotate the GROUP.
    }
  });

  return (
    <group>
        <points ref={points}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={count}
                    array={colors}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial size={0.5} vertexColors transparent opacity={0.6} sizeAttenuation={true} />
        </points>
        <Lines points={points} count={count} positions={positions} />
    </group>
  );
}

function Lines({ points, count, positions }) {
    const ref = useRef();
    
    useFrame(() => {
        if (!points.current || !ref.current) return;
        
        // Match rotation of points
        ref.current.rotation.copy(points.current.rotation);

        // Update collisions/connections
        // We need to check distances. Since positions are static inside the mesh (only mesh rotates),
        // we can check the static positions array.
        // BUT, if we want them to move individually later, we'd need more complex logic.
        // For now, static constellation rotating is fine (match original code logic mostly).
        // Original code updated positions based on mouse? No, just rotation.
        // Wait, original logic: 
        // particlesMesh.rotation.y += ...
        // updateLines() -> checks distances.
        // Since relative positions don't change, lines are static too relative to the mesh!
        // So we calculate lines ONCE. 
        // UNLESS pulse effect changes position?
        // Original code: `sizes[i] = ...` (scale changes). Positions only set initially.
        // So lines are STATIC relative to particles.
        // We can generate lines once in useMemo!
    });

    const linesData = useMemo(() => {
        const linePos = [];
        const connectDistance = 12; // Adjusted for our scale
        
        for (let i = 0; i < count; i++) {
            const x1 = positions[i * 3];
            const y1 = positions[i * 3 + 1];
            const z1 = positions[i * 3 + 2];

            for (let j = i + 1; j < count; j++) {
                const x2 = positions[j * 3];
                const y2 = positions[j * 3 + 1];
                const z2 = positions[j * 3 + 2];

                const dist = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2 + (z1 - z2) ** 2);

                if (dist < connectDistance) {
                    linePos.push(x1, y1, z1);
                    linePos.push(x2, y2, z2);
                }
            }
        }
        return new Float32Array(linePos);
    }, [positions, count]);

    return (
        <lineSegments ref={ref}>
            <bufferGeometry>
                <bufferAttribute 
                    attach="attributes-position" 
                    count={linesData.length / 3} 
                    array={linesData} 
                    itemSize={3} 
                />
            </bufferGeometry>
            <lineBasicMaterial color="#94a3b8" transparent opacity={0.15} />
        </lineSegments>
    )
}

function SceneContent({ variant }) {
    if (variant === 'network') return <NetworkParticles />;
    return <Shapes />;
}

// New component to handle Theme changes inside Canvas
function ThemeHandler({ theme }) {
  const { scene } = useThree();
  useEffect(() => {
    const fogColor = theme === 'dark' ? '#020617' : '#f0f4f8';
    scene.fog = new THREE.Fog(fogColor, 10, 50);
  }, [theme, scene]);
  return null;
}

export default function Background3D({ variant = 'default' }) {
    const { theme } = useTheme();

    return (
        <div className="fixed inset-0 -z-10 pointer-events-none transition-colors duration-500 bg-slate-50 dark:bg-slate-950">
            {/* Added dpr prop to limit pixel ratio for performance on high-res screens */}
            <Canvas camera={{ position: [0, 0, 20], fov: 75 }} gl={{ alpha: true, antialias: false }} dpr={[1, 1.5]}>
                <ThemeHandler theme={theme} />
                <SceneContent variant={variant} />
            </Canvas>
        </div>
    );
}
