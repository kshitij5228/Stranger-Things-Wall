import React, { useState, useEffect } from 'react'
import './Layer3FairyLights.css'

// Christmas light colors - classic multicolor pattern
const LIGHT_COLORS = [
  '#ff3333', // red
  '#ffcc00', // yellow
  '#33cc33', // green
  '#3399ff', // blue
  '#ff66cc', // pink
  '#ff9933', // orange
]

// Letters in order - maps to light index
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

// Same positions as letters but ABOVE them - one light per letter
const LIGHTS = [
  // Row 1: A-H (above letters at y:26)
  { x: 18, y: 14, letter: 'A' },
  { x: 26, y: 14, letter: 'B' },
  { x: 34, y: 15, letter: 'C' },
  { x: 42, y: 14, letter: 'D' },
  { x: 50, y: 15, letter: 'E' },
  { x: 58, y: 14, letter: 'F' },
  { x: 66, y: 15, letter: 'G' },
  { x: 74, y: 14, letter: 'H' },

  // Row 2: I-Q (above letters at y:50)
  { x: 8, y: 38, letter: 'I' },
  { x: 18, y: 38, letter: 'J' },
  { x: 28, y: 39, letter: 'K' },
  { x: 38, y: 38, letter: 'L' },
  { x: 48, y: 39, letter: 'M' },
  { x: 58, y: 38, letter: 'N' },
  { x: 68, y: 39, letter: 'O' },
  { x: 78, y: 38, letter: 'P' },
  { x: 88, y: 39, letter: 'Q' },

  // Row 3: R-Z (above letters at y:72)
  { x: 12, y: 60, letter: 'R' },
  { x: 21, y: 60, letter: 'S' },
  { x: 30, y: 61, letter: 'T' },
  { x: 39, y: 60, letter: 'U' },
  { x: 48, y: 61, letter: 'V' },
  { x: 57, y: 60, letter: 'W' },
  { x: 66, y: 61, letter: 'X' },
  { x: 75, y: 60, letter: 'Y' },
  { x: 84, y: 61, letter: 'Z' },
]

export default function Layer3FairyLights({ glowingLetter }) {
  // Animation key to force re-render and restart CSS animations
  const [animationKey, setAnimationKey] = useState(0)
  
  // Update animation key whenever glowingLetter changes to a new letter
  useEffect(() => {
    if (glowingLetter) {
      setAnimationKey(prev => prev + 1)
    }
  }, [glowingLetter])

  return (
    <div className="ow-layer ow-fairyLights" aria-hidden="true">
      {/* Wire/string connecting the lights */}
      <svg className="ow-lightWires" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Row 1 wire */}
        <path
          d="M 5 14 Q 18 12 26 14 Q 34 16 42 14 Q 50 12 58 14 Q 66 16 74 14 Q 82 12 95 14"
          className="ow-wire"
        />
        {/* Row 2 wire */}
        <path
          d="M 0 38 Q 8 36 18 38 Q 28 40 38 38 Q 48 36 58 38 Q 68 40 78 38 Q 88 36 100 38"
          className="ow-wire"
        />
        {/* Row 3 wire */}
        <path
          d="M 5 60 Q 12 58 21 60 Q 30 62 39 60 Q 48 58 57 60 Q 66 62 75 60 Q 84 58 95 60"
          className="ow-wire"
        />
      </svg>

      {/* Light bulbs */}
      <div className="ow-lightsStage">
        {LIGHTS.map((light, i) => {
          const isGlowing = glowingLetter === light.letter
          return (
            <div
              key={`${light.letter}-${isGlowing ? animationKey : 'off'}`}
              className={`ow-lightBulb ${isGlowing ? 'ow-lightBulb--glowing' : ''}`}
              style={{
                '--x': `${light.x}%`,
                '--y': `${light.y}%`,
                '--color': LIGHT_COLORS[i % LIGHT_COLORS.length],
                '--delay': `${(i * 0.15)}s`,
              }}
            >
              <div className="ow-bulbGlow" />
              <div className="ow-bulbBody" />
            </div>
          )
        })}
      </div>
    </div>
  )
}
