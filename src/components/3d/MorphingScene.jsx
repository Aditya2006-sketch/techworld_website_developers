import { useRef, useState, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Float, Text, MeshDistortMaterial, Sphere, useTexture } from '@react-three/drei'
import * as THREE from 'three'

// Animated DNA/orbit rings for "going online" phase
function OrbitRings({ phase }) {
  const group = useRef()
  const ring1 = useRef()
  const ring2 = useRef()
  const ring3 = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (group.current) {
      group.current.rotation.y = t * 0.2
    }
    if (ring1.current) ring1.current.rotation.z = t * 0.5
    if (ring2.current) ring2.current.rotation.x = t * 0.4
    if (ring3.current) ring3.current.rotation.y = t * 0.3
  })

  return (
    <group ref={group} visible={phase >= 2} scale={phase >= 2 ? 1 : 0}>
      <mesh ref={ring1}>
        <torusGeometry args={[1.8, 0.03, 8, 64]} />
        <meshStandardMaterial color="#8b5cf6" transparent opacity={0.6} />
      </mesh>
      <mesh ref={ring2} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.5, 0.02, 8, 64]} />
        <meshStandardMaterial color="#a78bfa" transparent opacity={0.5} />
      </mesh>
      <mesh ref={ring3} rotation={[Math.PI / 6, Math.PI / 4, 0]}>
        <torusGeometry args={[2.1, 0.025, 8, 64]} />
        <meshStandardMaterial color="#c4b5fd" transparent opacity={0.4} />
      </mesh>
    </group>
  )
}

// Customer icons flying in
function FlyingCustomers({ phase }) {
  const customers = useRef([])
  const count = 8
  const angles = Array.from({ length: count }, (_, i) => (i / count) * Math.PI * 2)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    customers.current.forEach((mesh, i) => {
      if (!mesh) return
      const angle = angles[i] + t * 0.4
      const r = 2.2 + Math.sin(t + i) * 0.3
      mesh.position.x = Math.cos(angle) * r
      mesh.position.z = Math.sin(angle) * r * 0.5
      mesh.position.y = Math.sin(t * 0.7 + i * 0.8) * 0.4 + 0.3
      mesh.rotation.y = -angle + Math.PI
    })
  })

  return (
    <group visible={phase >= 3}>
      {angles.map((_, i) => (
        <group key={i} ref={(el) => (customers.current[i] = el)}>
          {/* Body */}
          <mesh position={[0, -0.06, 0]}>
            <cylinderGeometry args={[0.07, 0.1, 0.18, 8]} />
            <meshStandardMaterial color={i % 2 === 0 ? '#8b5cf6' : '#f59e0b'} />
          </mesh>
          {/* Head */}
          <mesh position={[0, 0.1, 0]}>
            <sphereGeometry args={[0.09, 12, 12]} />
            <meshStandardMaterial color="#fbbf24" />
          </mesh>
        </group>
      ))}
    </group>
  )
}

// Growth bars
function GrowthBars({ phase }) {
  const bars = [0.2, 0.4, 0.35, 0.6, 0.55, 0.8, 1.0]
  const refs = useRef([])

  useFrame((state) => {
    refs.current.forEach((bar, i) => {
      if (!bar) return
      const targetH = phase >= 4 ? bars[i] * 1.4 : 0
      bar.scale.y = THREE.MathUtils.lerp(bar.scale.y, targetH, 0.05)
      bar.position.y = bar.scale.y * 0.35
    })
  })

  return (
    <group position={[0, -0.8, 0]}>
      {bars.map((h, i) => (
        <mesh
          key={i}
          ref={(el) => (refs.current[i] = el)}
          position={[-0.9 + i * 0.3, 0, 0]}
          scale={[1, 0.01, 1]}
        >
          <boxGeometry args={[0.2, 0.7, 0.15]} />
          <meshStandardMaterial
            color={i === bars.length - 1 ? '#7c3aed' : '#a78bfa'}
            emissive={i === bars.length - 1 ? '#5b21b6' : '#8b5cf6'}
            emissiveIntensity={0.4}
          />
        </mesh>
      ))}
      {/* Base */}
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[2.6, 0.04, 0.3]} />
        <meshStandardMaterial color="#e9d5ff" />
      </mesh>
    </group>
  )
}

// Central sphere that morphs
function CentralSphere({ phase }) {
  const meshRef = useRef()
  const colors = ['#f59e0b', '#3b82f6', '#06b6d4', '#10b981', '#7c3aed']

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
  })

  const color = colors[Math.min(phase, colors.length - 1)]

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.6, 32, 32]} />
      <MeshDistortMaterial
        color={color}
        roughness={0.1}
        metalness={0.3}
        distort={0.35}
        speed={3}
        transparent
        opacity={0.9}
      />
    </mesh>
  )
}

// Floating particles around scene
function Particles({ count = 40 }) {
  const meshRef = useRef()
  const positions = useRef(
    Array.from({ length: count }, () => [
      (Math.random() - 0.5) * 8,
      (Math.random() - 0.5) * 5,
      (Math.random() - 0.5) * 4,
    ])
  )
  const speeds = useRef(Array.from({ length: count }, () => Math.random() * 0.5 + 0.2))

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.elapsedTime
    const posAttr = meshRef.current.geometry.attributes.position

    positions.current.forEach((pos, i) => {
      posAttr.setXYZ(
        i,
        pos[0] + Math.sin(time * speeds.current[i] + i) * 0.3,
        pos[1] + Math.cos(time * speeds.current[i] * 0.7 + i) * 0.2,
        pos[2] + Math.sin(time * speeds.current[i] * 0.5 + i * 2) * 0.15
      )
    })
    posAttr.needsUpdate = true
  })

  const posArray = new Float32Array(positions.current.flat())

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={posArray}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#a78bfa"
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  )
}

export default function MorphingScene({ phase = 0 }) {
  const { viewport } = useThree()
  const scale = Math.min(viewport.width / 8, 1.1)

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow />
      <pointLight position={[-4, 3, 2]} intensity={0.6} color="#8b5cf6" />
      <pointLight position={[4, -2, -2]} intensity={0.4} color="#f59e0b" />

      <group scale={scale}>
        <Particles count={30} />
        <CentralSphere phase={phase} />
        <OrbitRings phase={phase} />
        <FlyingCustomers phase={phase} />
        <GrowthBars phase={phase} />
      </group>
    </>
  )
}
