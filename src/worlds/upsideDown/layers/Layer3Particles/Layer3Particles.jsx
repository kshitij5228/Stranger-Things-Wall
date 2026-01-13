import React from 'react'
import './Layer3Particles.css'

// Generate random particles
const PARTICLE_COUNT = 60

const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 2 + Math.random() * 6,
  duration: 15 + Math.random() * 25,
  delay: Math.random() * 20,
  opacity: 0.2 + Math.random() * 0.4,
  drift: -30 + Math.random() * 60, // horizontal drift
}))

export default function Layer3Particles() {
  return (
    <div className="ud-layer ud-particles" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="ud-particle"
          style={{
            '--x': `${p.x}%`,
            '--y': `${p.y}%`,
            '--size': `${p.size}px`,
            '--duration': `${p.duration}s`,
            '--delay': `${p.delay}s`,
            '--opacity': p.opacity,
            '--drift': `${p.drift}px`,
          }}
        />
      ))}
    </div>
  )
}
