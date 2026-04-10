import { Canvas } from '@react-three/fiber';
import { ContactShadows, Environment, Float, OrbitControls, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

function HoodieModel() {
  return (
    <group position={[-0.9, 0.15, 0]}>
      <RoundedBox args={[0.68, 0.72, 0.34]} radius={0.06} smoothness={4} castShadow>
        <meshStandardMaterial color="#1a1a1c" metalness={0.2} roughness={0.72} />
      </RoundedBox>

      <RoundedBox args={[0.18, 0.18, 0.18]} radius={0.05} position={[0, 0.44, 0]} castShadow>
        <meshStandardMaterial color="#18181a" metalness={0.16} roughness={0.78} />
      </RoundedBox>

      <RoundedBox args={[0.2, 0.58, 0.22]} radius={0.06} position={[-0.46, 0.06, 0]} rotation={[0, 0, 0.22]} castShadow>
        <meshStandardMaterial color="#171719" metalness={0.2} roughness={0.75} />
      </RoundedBox>

      <RoundedBox args={[0.2, 0.58, 0.22]} radius={0.06} position={[0.46, 0.06, 0]} rotation={[0, 0, -0.22]} castShadow>
        <meshStandardMaterial color="#171719" metalness={0.2} roughness={0.75} />
      </RoundedBox>

      <mesh position={[0, -0.24, 0.18]} rotation={[1.5, 0, 0]} castShadow>
        <torusGeometry args={[0.12, 0.012, 18, 40]} />
        <meshStandardMaterial color="#09090a" metalness={0.15} roughness={0.9} />
      </mesh>

      <mesh position={[0, 0.1, 0.18]} castShadow>
        <cylinderGeometry args={[0.006, 0.006, 0.2, 16]} />
        <meshStandardMaterial color="#2b2b2e" metalness={0.65} roughness={0.32} />
      </mesh>
    </group>
  );
}

function SweatpantsModel() {
  return (
    <group position={[1.05, -0.12, 0]}>
      <RoundedBox args={[0.22, 0.95, 0.22]} radius={0.05} position={[-0.16, -0.08, 0]} castShadow>
        <meshStandardMaterial color="#202022" metalness={0.15} roughness={0.82} />
      </RoundedBox>

      <RoundedBox args={[0.22, 0.95, 0.22]} radius={0.05} position={[0.16, -0.08, 0]} castShadow>
        <meshStandardMaterial color="#1f1f21" metalness={0.15} roughness={0.82} />
      </RoundedBox>

      <RoundedBox args={[0.44, 0.24, 0.26]} radius={0.07} position={[0, 0.38, 0]} castShadow>
        <meshStandardMaterial color="#18181a" metalness={0.2} roughness={0.75} />
      </RoundedBox>

      <mesh position={[0, 0.49, 0]} castShadow>
        <torusGeometry args={[0.2, 0.015, 18, 48]} />
        <meshStandardMaterial color="#111113" metalness={0.2} roughness={0.9} />
      </mesh>

      <mesh position={[0.03, 0.44, 0.13]} castShadow>
        <cylinderGeometry args={[0.006, 0.006, 0.23, 16]} />
        <meshStandardMaterial color="#2b2b2e" metalness={0.65} roughness={0.32} />
      </mesh>

      <mesh position={[-0.03, 0.44, 0.13]} castShadow>
        <cylinderGeometry args={[0.006, 0.006, 0.23, 16]} />
        <meshStandardMaterial color="#2b2b2e" metalness={0.65} roughness={0.32} />
      </mesh>
    </group>
  );
}

function DimensionsGuide() {
  return (
    <group>
      <line>
        <bufferGeometry
          attach="geometry"
          onUpdate={(geometry) => {
            geometry.setFromPoints([
              new THREE.Vector3(-1.5, -0.95, 0.5),
              new THREE.Vector3(-1.5, 0.95, 0.5)
            ]);
          }}
        />
        <lineBasicMaterial color="#656570" />
      </line>
      <line>
        <bufferGeometry
          attach="geometry"
          onUpdate={(geometry) => {
            geometry.setFromPoints([
              new THREE.Vector3(0.55, -1.02, 0.5),
              new THREE.Vector3(1.55, -1.02, 0.5)
            ]);
          }}
        />
        <lineBasicMaterial color="#656570" />
      </line>
    </group>
  );
}

function ProductScene() {
  return (
    <Canvas shadows camera={{ position: [0, 0.58, 3.2], fov: 38 }}>
      <color attach="background" args={['#0b0b0d']} />
      <fog attach="fog" args={['#0b0b0d', 4.5, 9]} />

      <ambientLight intensity={0.55} />
      <directionalLight position={[2.5, 3, 2]} intensity={1.4} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
      <spotLight position={[-1.5, 2.5, 2.5]} intensity={0.7} angle={0.38} penumbra={0.8} color="#8a8a94" />

      <Float rotationIntensity={0.12} floatIntensity={0.3} speed={1.5}>
        <HoodieModel />
      </Float>
      <Float rotationIntensity={0.1} floatIntensity={0.27} speed={1.3}>
        <SweatpantsModel />
      </Float>

      <ContactShadows position={[0, -1.03, 0]} opacity={0.55} width={5} height={3} blur={2.3} far={2.4} />
      <DimensionsGuide />
      <Environment preset="warehouse" />
      <OrbitControls enablePan={false} maxDistance={4.6} minDistance={2.3} maxPolarAngle={Math.PI / 1.8} minPolarAngle={Math.PI / 3.2} />
    </Canvas>
  );
}

const sizes = [
  { item: 'Hoodie length', cm: '68 cm', inches: '26.8 in' },
  { item: 'Hoodie chest width', cm: '58 cm', inches: '22.8 in' },
  { item: 'Sweatpants outseam', cm: '102 cm', inches: '40.1 in' },
  { item: 'Sweatpants waist', cm: '74–94 cm', inches: '29.1–37 in' }
];

export default function App() {
  return (
    <main className="page">
      <header className="topbar">
        <div className="logo">SWAY FIT</div>
        <nav>
          <a href="#collection">Collection</a>
          <a href="#sizing">Sizing</a>
          <a href="#deploy">Deploy</a>
        </nav>
      </header>

      <section className="hero" id="collection">
        <div className="hero-copy">
          <p className="eyebrow">Limited Edition Studio Drop</p>
          <h1>Minimal luxury streetwear with true-to-life 3D proportions.</h1>
          <p>
            Inspired by Sway Maverick&apos;s monochrome aesthetic: clean typography, dramatic contrast, and immersive product focus.
          </p>
        </div>
        <div className="hero-canvas">
          <ProductScene />
        </div>
      </section>

      <section className="details" id="sizing">
        <h2>Realistic garment sizing guide</h2>
        <div className="size-grid">
          {sizes.map((size) => (
            <article key={size.item} className="size-card">
              <h3>{size.item}</h3>
              <p>{size.cm}</p>
              <span>{size.inches}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="deploy" id="deploy">
        <h2>Deploy to Vercel</h2>
        <ol>
          <li>Push this repository to GitHub.</li>
          <li>In Vercel, click <strong>Add New → Project</strong> and import the repo.</li>
          <li>Framework preset: <strong>Vite</strong>. Build command: <code>npm run build</code>. Output: <code>dist</code>.</li>
          <li>Deploy and attach your custom domain.</li>
        </ol>
      </section>
    </main>
  );
}
