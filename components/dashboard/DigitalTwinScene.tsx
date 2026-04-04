'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
    OrbitControls, PerspectiveCamera, Float, Html,
    Stars, Sky, Environment, ContactShadows,
    useHelper
} from '@react-three/drei';
import * as THREE from 'three';
import { Activity, Thermometer, Droplets } from 'lucide-react';

const TERRAIN_SIZE = 30;
const CROP_COUNT = 1500;

function SensorNode({ position, label, value, icon: Icon, color }: { position: [number, number, number], label: string, value: string, icon: any, color: string }) {
    return (
        <group position={position}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <mesh castShadow>
                    <sphereGeometry args={[0.15, 16, 16]} />
                    <meshStandardMaterial color={color} emissive={color} emissiveIntensity={4} />
                </mesh>
                <mesh scale={1.8}>
                    <sphereGeometry args={[0.16, 16, 16]} />
                    <meshBasicMaterial color={color} transparent opacity={0.1} wireframe />
                </mesh>
            </Float>

            <Html distanceFactor={10} position={[0, 0.6, 0]}>
                <div className="flex flex-col items-center pointer-events-none select-none">
                    <div className="bg-black/90 backdrop-blur-xl border border-white/10 p-2 rounded-lg flex items-center gap-2 min-w-[120px] shadow-2xl">
                        <div className="p-1.5 rounded bg-white/5 border border-white/5">
                            <Icon className="w-3.5 h-3.5" style={{ color }} />
                        </div>
                        <div>
                            <div className="text-[7px] uppercase font-bold tracking-[0.2em] text-white/40 leading-none mb-1">{label}</div>
                            <div className="text-xs font-mono font-black text-white tracking-wider">{value}</div>
                        </div>
                    </div>
                    <div className="w-[1px] h-6 bg-gradient-to-t from-transparent via-white/20 to-white/40 mt-1" />
                </div>
            </Html>
        </group>
    );
}

function getTerrainHeight(x: number, y: number) {
    return Math.sin(x * 0.4) * Math.cos(y * 0.4) * 0.8 +
        Math.sin(x * 1.5 + y * 1.2) * 0.2;
}

function Crops() {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const tempObject = useMemo(() => new THREE.Object3D(), []);

    useFrame((state) => {
        if (!meshRef.current) return;
        const time = state.clock.getElapsedTime();
        for (let i = 0; i < CROP_COUNT; i++) {
            meshRef.current.getMatrixAt(i, tempObject.matrix);
            tempObject.matrix.decompose(tempObject.position, tempObject.quaternion, tempObject.scale);
            tempObject.rotation.x = Math.sin(time + tempObject.position.x * 2) * 0.08;
            tempObject.rotation.z = Math.cos(time + tempObject.position.z * 1.5) * 0.08;
            tempObject.updateMatrix();
            meshRef.current.setMatrixAt(i, tempObject.matrix);
        }
        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    useFrame((_, delta) => {
        if (meshRef.current && meshRef.current.count > 0) {
            let index = 0;
            const rowSpacing = 1.2;
            const plantSpacing = 0.6;

            for (let x = -TERRAIN_SIZE / 2 + 5; x < TERRAIN_SIZE / 2 - 5; x += rowSpacing) {
                for (let z = -TERRAIN_SIZE / 2 + 2; z < TERRAIN_SIZE / 2 - 2; z += plantSpacing) {
                    if (index >= CROP_COUNT) break;

                    const finalX = x + (Math.random() - 0.5) * 0.05;
                    const finalZ = z + (Math.random() - 0.5) * 0.05;
                    const y = getTerrainHeight(finalX, finalZ);

                    tempObject.position.set(finalX, y, finalZ);
                    tempObject.rotation.y = Math.random() * Math.PI;
                    tempObject.scale.set(0.4, 0.7 + Math.random() * 0.4, 0.4);
                    tempObject.updateMatrix();
                    meshRef.current.setMatrixAt(index++, tempObject.matrix);
                }
            }
            meshRef.current.instanceMatrix.needsUpdate = true;
        }
    }, -1);

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, CROP_COUNT]} castShadow>
            <coneGeometry args={[0.15, 1, 4]} />
            <meshStandardMaterial
                color="#10b981"
                emissive="#064e3b"
                emissiveIntensity={2}
                roughness={0.5}
            />
        </instancedMesh>
    );
}

function FarmBuildings() {
    return (
        <group>
            {/* Main Barn */}
            <group position={[-6, 0, 5]} rotation={[0, Math.PI / 4, 0]}>
                <mesh castShadow position={[0, 1.5, 0]}>
                    <boxGeometry args={[4, 3, 5]} />
                    <meshStandardMaterial color="#ee1111" emissive="#440000" roughness={0.4} />
                </mesh>
                {/* Architectural Cross-beams */}
                <group position={[0, 1.5, 2.51]}>
                    <mesh><boxGeometry args={[3.8, 0.1, 0.05]} /><meshStandardMaterial color="#fff" /></mesh>
                    <mesh rotation={[0, 0, Math.PI / 4]}><boxGeometry args={[4, 0.1, 0.02]} /><meshStandardMaterial color="#fff" /></mesh>
                    <mesh rotation={[0, 0, -Math.PI / 4]}><boxGeometry args={[4, 0.1, 0.02]} /><meshStandardMaterial color="#fff" /></mesh>
                </group>
                <mesh castShadow position={[0, 3.5, 0]}>
                    <coneGeometry args={[3.5, 2, 4]} />
                    <meshStandardMaterial color="#222" roughness={0.2} metalness={0.8} />
                </mesh>
                {/* Windows */}
                <mesh position={[2.01, 1.5, 0]}>
                    <planeGeometry args={[1, 1]} />
                    <meshStandardMaterial color="#0ea5e9" emissive="#0ea5e9" emissiveIntensity={2} />
                </mesh>
            </group>

            {/* High-Tech Silo */}
            <group position={[-10, 0, 8]}>
                <mesh castShadow position={[0, 3, 0]}>
                    <cylinderGeometry args={[1, 1, 6, 32]} />
                    <meshStandardMaterial color="#d1d5db" metalness={1} roughness={0.1} />
                </mesh>
                <mesh castShadow position={[0, 6.2, 0]}>
                    <sphereGeometry args={[1, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
                    <meshStandardMaterial color="#9ca3af" metalness={1} roughness={0.1} />
                </mesh>
                {/* Glowing rings */}
                <mesh position={[0, 4, 0]} rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[1.05, 0.05, 16, 100]} />
                    <meshStandardMaterial color="#0ea5e9" emissive="#0ea5e9" emissiveIntensity={5} />
                </mesh>
            </group>

            {/* Logic Tank */}
            <group position={[10, 0, -5]}>
                <mesh castShadow position={[0, 2, 0]}>
                    <cylinderGeometry args={[1.5, 1.5, 4, 32]} />
                    <meshStandardMaterial color="#1e293b" metalness={0.5} roughness={0.3} />
                </mesh>
                <mesh position={[0, 4.1, 0]}>
                    <cylinderGeometry args={[1.6, 1.6, 0.2, 32]} />
                    <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={2} />
                </mesh>
            </group>
        </group>
    );
}

function Irrigation() {
    return (
        <group position={[10, 0.1, 10]}>
            <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <circleGeometry args={[4, 32]} />
                <meshStandardMaterial color="#1e3a8a" metalness={0.9} roughness={0.1} transparent opacity={0.8} />
            </mesh>
            <ContactShadows resolution={512} scale={10} blur={3} opacity={0.4} far={1} color="#000" />
        </group>
    );
}

function Fence() {
    const segments = 12;
    const spacing = 2.5;
    return (
        <group position={[0, 0, 0]}>
            {/* North Fence */}
            {Array.from({ length: segments }).map((_, i) => (
                <group key={`n-${i}`} position={[(i - segments / 2) * spacing, 0.5, 12]}>
                    <mesh castShadow><boxGeometry args={[0.2, 1, 0.2]} /><meshStandardMaterial color="#3d2b1f" /></mesh>
                    <mesh castShadow position={[0, 0.2, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.05, 0.05, spacing]} /><meshStandardMaterial color="#3d2b1f" /></mesh>
                </group>
            ))}
            {/* South Fence */}
            {Array.from({ length: segments }).map((_, i) => (
                <group key={`s-${i}`} position={[(i - segments / 2) * spacing, 0.5, -12]}>
                    <mesh castShadow><boxGeometry args={[0.2, 1, 0.2]} /><meshStandardMaterial color="#3d2b1f" /></mesh>
                    <mesh castShadow position={[0, 0.2, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.05, 0.05, spacing]} /><meshStandardMaterial color="#3d2b1f" /></mesh>
                </group>
            ))}
        </group>
    );
}

function Trees() {
    const treePositions = [[-12, 10], [-10, 12], [12, -10], [10, -12], [-8, -12], [13, 8]];
    return (
        <group>
            {treePositions.map(([x, z], i) => (
                <group key={i} position={[x, 0, z]}>
                    <mesh castShadow position={[0, 1, 0]}><cylinderGeometry args={[0.2, 0.3, 2]} /><meshStandardMaterial color="#3d2b1f" /></mesh>
                    <mesh castShadow position={[0, 2.5, 0]}><coneGeometry args={[1, 2, 8]} /><meshStandardMaterial color="#064e3b" /></mesh>
                    <mesh castShadow position={[0, 3.5, 0]} scale={0.7}><coneGeometry args={[1, 2, 8]} /><meshStandardMaterial color="#065f46" /></mesh>
                </group>
            ))}
        </group>
    );
}

function Tractor() {
    return (
        <group position={[3, 0.4, 4]} rotation={[0, -Math.PI / 6, 0]}>
            {/* Main Body */}
            <mesh castShadow><boxGeometry args={[1.5, 1, 2.5]} /><meshStandardMaterial color="#166534" /></mesh>
            <mesh castShadow position={[0, 1, 0.5]}><boxGeometry args={[1.2, 1.2, 1.2]} /><meshStandardMaterial color="#166534" /></mesh>
            {/* Wheels */}
            <mesh castShadow position={[0.8, -0.2, 0.8]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.6, 0.6, 0.4, 16]} /><meshStandardMaterial color="#111" /></mesh>
            <mesh castShadow position={[-0.8, -0.2, 0.8]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.6, 0.6, 0.4, 16]} /><meshStandardMaterial color="#111" /></mesh>
            <mesh castShadow position={[0.6, -0.4, -0.8]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.4, 0.4, 0.3, 16]} /><meshStandardMaterial color="#111" /></mesh>
            <mesh castShadow position={[-0.6, -0.4, -0.8]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.4, 0.4, 0.3, 16]} /><meshStandardMaterial color="#111" /></mesh>
            {/* Cabin */}
            <mesh position={[0, 1.8, 0.5]}><boxGeometry args={[1, 0.8, 1]} /><meshStandardMaterial color="#0ea5e9" transparent opacity={0.4} /></mesh>
        </group>
    );
}

function DirtPathways() {
    return (
        <group>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]} receiveShadow>
                <planeGeometry args={[2, 30]} />
                <meshStandardMaterial color="#2d1e12" roughness={1} />
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]} receiveShadow>
                <planeGeometry args={[30, 2]} />
                <meshStandardMaterial color="#2d1e12" roughness={1} />
            </mesh>
        </group>
    );
}

function Terrain() {
    const points = useMemo(() => {
        const segments = 128;
        const geometry = new THREE.PlaneGeometry(TERRAIN_SIZE, TERRAIN_SIZE, segments, segments);
        const pos = geometry.attributes.position;
        for (let i = 0; i < pos.count; i++) {
            const x = pos.getX(i);
            const y = pos.getY(i);
            pos.setZ(i, getTerrainHeight(x, y));
        }
        geometry.computeVertexNormals();
        return geometry;
    }, []);

    return (
        <group rotation={[-Math.PI / 2, 0, 0]}>
            <mesh geometry={points} receiveShadow>
                <meshStandardMaterial
                    color="#4d3424"
                    roughness={0.8}
                    metalness={0.1}
                />
            </mesh>

            <mesh geometry={points} position={[0, 0, 0.02]}>
                <meshStandardMaterial
                    color="#0ea5e9"
                    emissive="#0ea5e9"
                    emissiveIntensity={0.5}
                    transparent
                    opacity={0.2}
                    wireframe
                />
            </mesh>

            <gridHelper args={[TERRAIN_SIZE, 30, '#1e293b', '#0f172a']} position={[0, 0, -0.5]} rotation={[Math.PI / 2, 0, 0]} />
        </group>
    );
}

export default function DigitalTwinScene() {
    return (
        <div className="w-full h-full bg-black relative overflow-hidden rounded-xl border border-white/5">
            <Canvas
                shadows="basic"
                dpr={[1, 2]}
                gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
            >
                <Environment preset="city" />
                <fog attach="fog" args={['#000', 30, 60]} />

                <PerspectiveCamera makeDefault position={[22, 18, 22]} fov={35} />
                <OrbitControls
                    enableDamping
                    dampingFactor={0.05}
                    maxPolarAngle={Math.PI / 2.2}
                    minDistance={10}
                    maxDistance={45}
                    makeDefault
                />

                <ambientLight intensity={0.5} />
                <directionalLight
                    position={[15, 30, 15]}
                    intensity={2.5}
                    castShadow
                    shadow-mapSize={[2048, 2048]}
                />
                <pointLight position={[-15, 10, -15]} intensity={1} color="#0ea5e9" />

                <Terrain />
                <DirtPathways />
                <Crops />
                <Fence />
                <Trees />
                <Tractor />
                <FarmBuildings />
                <Irrigation />

                {/* Mock Sensors */}
                <SensorNode position={[4, 2, 6]} label="Soil Moisture" value="44.2%" icon={Droplets} color="#3b82f6" />
                <SensorNode position={[-8, 1.2, -4]} label="Field Health" value="OPTIMAL" icon={Activity} color="#10b981" />
                <SensorNode position={[6, 1.5, -10]} label="Pest Risk" value="LOW" icon={Activity} color="#f97316" />

                <ContactShadows resolution={1024} scale={50} blur={2.5} opacity={0.4} far={15} color="#000" />
            </Canvas>

            {/* HUD Overlays */}
            <div className="absolute top-4 left-4 p-4 bg-black/60 backdrop-blur-2xl border border-white/10 rounded-xl pointer-events-none shadow-2xl">
                <div className="flex items-center gap-3 mb-2">
                    <div className="relative">
                        <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-ping opacity-75" />
                        <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-blue-500" />
                    </div>
                    <span className="text-xs font-mono font-black text-blue-400 tracking-[0.2em] uppercase">Engine V4 Link</span>
                </div>
                <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-[9px] font-mono text-white/50">
                    <span>SATELLITE:</span> <span className="text-white/80">SENTINEL-2 ACTIVE</span>
                    <span>RESOLUTION:</span> <span className="text-white/80">0.5M/PRECISION</span>
                    <span>LATENCY:</span> <span className="text-emerald-400 uppercase font-bold">14ms</span>
                </div>
            </div>

            <div className="absolute bottom-6 right-6 flex items-center gap-4 text-white/20 text-[9px] font-mono select-none pointer-events-none uppercase tracking-[0.3em]">
                <span>PFTG Architecture</span>
                <span className="w-1 h-1 rounded-full bg-white/10" />
                <span>Salima High Fidelity Preview</span>
            </div>
        </div>
    );
}
