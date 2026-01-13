import React from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import './VolumeToggle.css'

export default function VolumeToggle({ 
  isMuted = false, 
  onToggle,
  size = 50,
  variant = 'dark' // 'dark' for upside-down, 'warm' for overworld
}) {
  return (
    <button
      onClick={onToggle}
      className={`volume-toggle volume-toggle--${variant} ${isMuted ? 'volume-toggle--muted' : ''}`}
      style={{ width: size, height: size }}
      aria-label={isMuted ? 'Unmute' : 'Mute'}
    >
      {/* Background Circle */}
      <div className="volume-toggle__bg">
        <div className="volume-toggle__inner-glow" />
      </div>

      {/* Pulse effect when playing */}
      {!isMuted && <div className="volume-toggle__pulse" />}

      {/* Icon Container */}
      <div className="volume-toggle__icons">
        <Volume2
          size={size * 0.5}
          className={`volume-toggle__icon volume-toggle__icon--on ${isMuted ? 'hidden' : ''}`}
          strokeWidth={2.5}
        />
        <VolumeX
          size={size * 0.5}
          className={`volume-toggle__icon volume-toggle__icon--off ${isMuted ? '' : 'hidden'}`}
          strokeWidth={2.5}
        />
      </div>

      {/* Shine effect */}
      <div className="volume-toggle__shine" />
      
      {/* Border */}
      <div className="volume-toggle__border" />
    </button>
  )
}
