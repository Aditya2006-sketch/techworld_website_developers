import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Sphere, Box, Cylinder, Torus } from '@react-three/drei'
import * as THREE from 'three'

// Store building
function StoreMesh({ position = [0, 0, 0] }) {
  const group = useRef()

  useFrame((state) => {
    if (!group.current) return
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.15
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.05
  })

  return (
    <group ref={group} position={position}>
      {/* Building body */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[1.4, 1.2, 0.8]} />
        <meshStandardMaterial color="#f8f5ff" roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Roof */}
      <mesh position={[0, 0.85, 0]} castShadow>
        <boxGeometry args={[1.6, 0.3, 1.0]} />
        <meshStandardMaterial color="#7c3aed" roughness={0.4} />
      </mesh>

      {/* Awning */}
      <mesh position={[0, 0.2, 0.52]} castShadow>
        <boxGeometry args={[1.3, 0.1, 0.4]} />
        <meshStandardMaterial color="#a78bfa" roughness={0.3} />
      </mesh>

      {/* Door */}
      <mesh position={[0, -0.25, 0.41]}>
        <boxGeometry args={[0.35, 0.7, 0.02]} />
        <meshStandardMaterial color="#7c3aed" roughness={0.5} />
      </mesh>

      {/* Windows */}
      <mesh position={[-0.45, 0.1, 0.41]}>
        <boxGeometry args={[0.3, 0.35, 0.02]} />
        <meshStandardMaterial color="#ddd6fe" roughness={0.1} metalness={0.3} transparent opacity={0.8} />
      </mesh>
      <mesh position={[0.45, 0.1, 0.41]}>
        <boxGeometry args={[0.3, 0.35, 0.02]} />
        <meshStandardMaterial color="#ddd6fe" roughness={0.1} metalness={0.3} transparent opacity={0.8} />
      </mesh>

      {/* Sign */}
      <mesh position={[0, 0.55, 0.42]}>
        <boxGeometry args={[0.8, 0.18, 0.02]} />
        <meshStandardMaterial color="#4c1d95" roughness={0.5} />
      </mesh>

      {/* Ground platform */}
      <mesh position={[0, -0.7, 0]} receiveShadow>
        <cylinderGeometry args={[1.0, 1.1, 0.12, 32]} />
        <meshStandardMaterial color="#ede9fe" roughness={0.6} />
      </mesh>

      {/* Floating sparkles */}
      {[-0.7, 0.7].map((x, i) => (
        <FloatingParticle key={i} position={[x, 0.8 + i * 0.2, 0.3]} delay={i * 1.5} />
      ))}
    </group>
  )
}

function FloatingParticle({ position, delay = 0 }) {
  const mesh = useRef()

  useFrame((state) => {
    if (!mesh.current) return
    mesh.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5 + delay) * 0.15
    mesh.current.rotation.z = state.clock.elapsedTime * 2 + delay
    mesh.current.scale.setScalar(0.8 + Math.sin(state.clock.elapsedTime * 2 + delay) * 0.2)
  })

  return (
    <mesh ref={mesh} position={position}>
      <octahedronGeometry args={[0.06, 0]} />
      <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.5} />
    </mesh>
  )
}

// Phone/Website model
function PhoneMesh({ position = [2, 0, 0], visible = true }) {
  const group = useRef()

  useFrame((state) => {
    if (!group.current) return
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4 + 1) * 0.2
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.9 + 0.5) * 0.08
  })

  return (
    <group ref={group} position={position} visible={visible}>
      {/* Phone body */}
      <mesh castShadow>
        <boxGeometry args={[0.55, 1.0, 0.08]} />
        <meshStandardMaterial color="#1a0a2e" roughness={0.2} metalness={0.8} />
      </mesh>

      {/* Screen */}
      <mesh position={[0, 0, 0.045]}>
        <boxGeometry args={[0.48, 0.88, 0.01]} />
        <meshStandardMaterial color="#7c3aed" emissive="#5b21b6" emissiveIntensity={0.4} roughness={0.1} />
      </mesh>

      {/* Screen content lines */}
      {[-0.25, -0.1, 0.05, 0.2].map((y, i) => (
        <mesh key={i} position={[0, y, 0.056]}>
          <boxGeometry args={[0.3 - i * 0.05, 0.04, 0.001]} />
          <meshStandardMaterial color="#ddd6fe" emissive="#ddd6fe" emissiveIntensity={0.3} />
        </mesh>
      ))}

      {/* Home button */}
      <mesh position={[0, -0.48, 0.046]}>
        <cylinderGeometry args={[0.04, 0.04, 0.01, 16]} />
        <meshStandardMaterial color="#4c1d95" />
      </mesh>

      {/* Notch */}
      <mesh position={[0, 0.42, 0.046]}>
        <boxGeometry args={[0.18, 0.04, 0.001]} />
        <meshStandardMaterial color="#0f0a1e" />
      </mesh>
    </group>
  )
}

// Growth graph
function GrowthGraph({ position = [-2, 0, 0] }) {
  const group = useRef()
  const bars = [0.3, 0.5, 0.4, 0.7, 0.6, 0.9, 1.0]

  useFrame((state) => {
    if (!group.current) return
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.35 + 2) * 0.15
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.7 + 1) * 0.06
  })

  return (
    <group ref={group} position={position}>
      {/* Base card */}
      <mesh castShadow>
        <boxGeometry args={[1.6, 1.0, 0.1]} />
        <meshStandardMaterial color="white" roughness={0.4} />
      </mesh>

      {/* Bars */}
      {bars.map((h, i) => (
        <mesh key={i} position={[-0.6 + i * 0.2, -0.2 + h * 0.25, 0.07]}>
          <boxGeometry args={[0.12, h * 0.5, 0.04]} />
          <meshStandardMaterial
            color={i === bars.length - 1 ? '#7c3aed' : '#a78bfa'}
            emissive={i === bars.length - 1 ? '#5b21b6' : '#8b5cf6'}
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}

      {/* Arrow up indicator */}
      <mesh position={[0.5, 0.25, 0.07]}>
        <coneGeometry args={[0.08, 0.15, 3]} />
        <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.5} />
      </mesh>

      {/* % label platform */}
      <mesh position={[0, 0.32, 0.07]}>
        <boxGeometry args={[0.5, 0.15, 0.02]} />
        <meshStandardMaterial color="#4c1d95" emissive="#4c1d95" emissiveIntensity={0.2} />
      </mesh>
    </group>
  )
}

// Floating customer icons
function CustomerIcon({ position, delay = 0 }) {
  const mesh = useRef()

  useFrame((state) => {
    if (!mesh.current) return
    mesh.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.2 + delay) * 0.12
    mesh.current.rotation.y = state.clock.elapsedTime * 0.8 + delay
  })

  return (
    <group ref={mesh} position={position}>
      {/* Body */}
      <mesh position={[0, -0.08, 0]}>
        <cylinderGeometry args={[0.08, 0.12, 0.2, 8]} />
        <meshStandardMaterial color="#8b5cf6" roughness={0.3} />
      </mesh>
      {/* Head */}
      <mesh position={[0, 0.1, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#fbbf24" roughness={0.3} />
      </mesh>
    </group>
  )
}

// Main 3D scene
export default function StoreScene() {
  const { viewport } = useThree()
  const scale = Math.min(viewport.width / 8, 1)

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.7} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[-5, 3, -2]} intensity={0.5} color="#8b5cf6" />
      <pointLight position={[5, 2, 2]} intensity={0.4} color="#a78bfa" />

      {/* Background glow sphere */}
      <mesh position={[0, 0, -3]} scale={scale}>
        <sphereGeometry args={[3, 32, 32]} />
        <MeshDistortMaterial
          color="#f5f3ff"
          transparent
          opacity={0.15}
          distort={0.3}
          speed={2}
        />
      </mesh>

      {/* Main store */}
      <group scale={scale}>
        <StoreMesh position={[0, 0.2, 0]} />
        <PhoneMesh position={[1.8, 0.1, 0]} />
        <GrowthGraph position={[-1.9, 0.1, 0]} />

        {/* Customers */}
        <CustomerIcon position={[0.8, 1.2, 0.3]} delay={0} />
        <CustomerIcon position={[-0.5, 1.4, 0.2]} delay={1.2} />
        <CustomerIcon position={[0.2, 1.5, -0.2]} delay={2.4} />

        {/* Connecting arc particles */}
        {Array.from({ length: 6 }).map((_, i) => (
          <FloatingOrb key={i} index={i} />
        ))}
      </group>
    </>
  )
}

function FloatingOrb({ index }) {
  const mesh = useRef()
  const speed = 0.5 + index * 0.15
  const radius = 1.5 + (index % 3) * 0.4
  const offset = (index / 6) * Math.PI * 2

  useFrame((state) => {
    if (!mesh.current) return
    const t = state.clock.elapsedTime * speed + offset
    mesh.current.position.x = Math.cos(t) * radius * 0.6
    mesh.current.position.y = Math.sin(t * 0.7) * 0.4 + 0.3
    mesh.current.position.z = Math.sin(t) * radius * 0.3
  })

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[0.04 + (index % 3) * 0.015, 8, 8]} />
      <meshStandardMaterial
        color={index % 2 === 0 ? '#a78bfa' : '#f59e0b'}
        emissive={index % 2 === 0 ? '#8b5cf6' : '#f59e0b'}
        emissiveIntensity={0.8}
        transparent
        opacity={0.8}
      />
    </mesh>
  )
}
