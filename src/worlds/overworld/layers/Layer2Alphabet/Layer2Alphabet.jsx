import React from 'react'
import './Layer2Alphabet.css'

// Positioned to exactly match the Stranger Things reference wall.
// x/y are percentages within the full viewport.
const LETTERS = [
  // Row 1: A B C D E F G H (centered)
  { c: 'A', x: 18, y: 26, r: -5, s: 1.0 },
  { c: 'B', x: 26, y: 26, r: 6, s: 1.0 },
  { c: 'C', x: 34, y: 27, r: -4, s: 1.0 },
  { c: 'D', x: 42, y: 26, r: 5, s: 1.0 },
  { c: 'E', x: 50, y: 27, r: -6, s: 1.0 },
  { c: 'F', x: 58, y: 26, r: 4, s: 1.0 },
  { c: 'G', x: 66, y: 27, r: -5, s: 1.0 },
  { c: 'H', x: 74, y: 26, r: 7, s: 1.0 },

  // Row 2: I J K L M N O P Q (evenly spaced)
  { c: 'I', x: 8, y: 50, r: -4, s: 1.0 },
  { c: 'J', x: 18, y: 50, r: 5, s: 1.0 },
  { c: 'K', x: 28, y: 51, r: -6, s: 1.0 },
  { c: 'L', x: 38, y: 50, r: 7, s: 1.0 },
  { c: 'M', x: 48, y: 51, r: -4, s: 1.0 },
  { c: 'N', x: 58, y: 50, r: 5, s: 1.0 },
  { c: 'O', x: 68, y: 51, r: -5, s: 1.0 },
  { c: 'P', x: 78, y: 50, r: 6, s: 1.0 },
  { c: 'Q', x: 88, y: 51, r: 8, s: 1.0 },

  // Row 3: R S T U V W X Y Z (evenly spaced)
  { c: 'R', x: 12, y: 72, r: -6, s: 1.0 },
  { c: 'S', x: 21, y: 72, r: 5, s: 1.0 },
  { c: 'T', x: 30, y: 73, r: -4, s: 1.0 },
  { c: 'U', x: 39, y: 72, r: 6, s: 1.0 },
  { c: 'V', x: 48, y: 73, r: -7, s: 1.0 },
  { c: 'W', x: 57, y: 72, r: 5, s: 1.0 },
  { c: 'X', x: 66, y: 73, r: -5, s: 1.0 },
  { c: 'Y', x: 75, y: 72, r: 6, s: 1.0 },
  { c: 'Z', x: 84, y: 73, r: -4, s: 1.0 },
]

export default function Layer2Alphabet() {
  return (
    <div className="ow-layer ow-alphabet" aria-hidden="true">
      {/* SVG filter for rough painted texture */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="roughPaint">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>
      
      <div className="ow-alphabetStage">
        {LETTERS.map(({ c, x, y, r, s }) => (
          <span
            key={c}
            className="ow-letter"
            style={{
              '--x': `${x}%`,
              '--y': `${y}%`,
              '--r': `${r}deg`,
              '--s': s ? String(s) : '1',
            }}
          >
            {c}
          </span>
        ))}
      </div>
    </div>
  )
}
