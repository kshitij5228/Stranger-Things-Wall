import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import LayerCanvas from '../../shared/components/LayerCanvas'
import VolumeToggle from '../../shared/components/VolumeToggle/VolumeToggle'
import DeveloperContact from '../../shared/components/DeveloperContact/DeveloperContact'
import './overworld.css'

import Layer1WallTexture from './layers/Layer1WallTexture/Layer1WallTexture'
import Layer2Alphabet from './layers/Layer2Alphabet/Layer2Alphabet'
import Layer3FairyLights from './layers/Layer3FairyLights/Layer3FairyLights'
import Layer5AmbientShadow from './layers/Layer5AmbientShadow/Layer5AmbientShadow'
import { listenForLetters } from '../../firebase/firebaseService'
import { registerPresence, listenToPresence } from '../../firebase/presenceService'

// Duration for each letter glow (matches CSS animation)
const GLOW_DURATION = 2000
// Gap between letters when multiple are queued (prevents rush feeling)
const LETTER_GAP = 500

// Sound effect generator using Web Audio API
// Creates a soft, gentle bell/chime sound
function createLightSound() {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const now = audioContext.currentTime
    
    // Master gain
    const masterGain = audioContext.createGain()
    masterGain.gain.setValueAtTime(0.2, now)
    masterGain.connect(audioContext.destination)
    
    // Soft bell - lower, warmer tone
    const bell = audioContext.createOscillator()
    const bellGain = audioContext.createGain()
    
    bell.type = 'sine'
    bell.frequency.setValueAtTime(440, now) // A4 - soft warm tone
    
    // Soft attack, long decay like a real bell
    bellGain.gain.setValueAtTime(0, now)
    bellGain.gain.linearRampToValueAtTime(0.4, now + 0.02) // Soft attack
    bellGain.gain.exponentialRampToValueAtTime(0.001, now + 1.2) // Gentle decay
    
    bell.connect(bellGain)
    bellGain.connect(masterGain)
    
    bell.start(now)
    bell.stop(now + 1.2)
    
    // Cleanup
    setTimeout(() => {
      audioContext.close()
    }, 1500)
  } catch (e) {
    console.log('Audio not supported')
  }
}

export default function OverworldWall() {
  const { sessionId } = useParams()
  const [glowingLetter, setGlowingLetter] = useState(null)
  const audioRef = useRef(null)
  const [isMuted, setIsMuted] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState('waiting') // 'waiting' | 'connected' | 'disconnected'
  
  // Queue system for letters
  const letterQueueRef = useRef([])
  const isProcessingRef = useRef(false)
  const glowTimeoutRef = useRef(null)

  useEffect(() => {
    // Try to autoplay, if blocked wait for user interaction
    const playAudio = () => {
      if (audioRef.current) {
        audioRef.current.volume = 0.3
        audioRef.current.play().catch(() => {
          document.addEventListener('click', () => {
            audioRef.current?.play()
          }, { once: true })
        })
      }
    }
    playAudio()
  }, [])

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted
      setIsMuted(!isMuted)
    }
  }

  // Process the letter queue - show each letter for full duration
  const processQueue = useCallback(() => {
    // If already processing or queue is empty, do nothing
    if (isProcessingRef.current || letterQueueRef.current.length === 0) {
      return
    }
    
    isProcessingRef.current = true
    
    // Get the next letter from queue
    const nextLetter = letterQueueRef.current.shift()
    console.log(`Processing letter: ${nextLetter}, remaining in queue: ${letterQueueRef.current.length}`)
    
    // Play sound effect (independent of mute state)
    createLightSound()
    
    // Set the glowing letter
    setGlowingLetter(nextLetter)
    
    // After full glow duration, turn off and process next
    glowTimeoutRef.current = setTimeout(() => {
      setGlowingLetter(null)
      glowTimeoutRef.current = null
      
      // Add small gap before next letter (if queue has more)
      if (letterQueueRef.current.length > 0) {
        setTimeout(() => {
          isProcessingRef.current = false
          processQueue()
        }, LETTER_GAP)
      } else {
        isProcessingRef.current = false
      }
    }, GLOW_DURATION)
  }, [])

  useEffect(() => {
    if (!sessionId) return

    // Listen for letters from Upside Down
    const unsubscribe = listenForLetters(sessionId, (letter) => {
      console.log(`Received letter: ${letter}`)
      
      // Add letter to queue
      letterQueueRef.current.push(letter)
      
      // Start processing if not already
      processQueue()
    })

    return () => {
      // Cleanup listener on unmount
      if (typeof unsubscribe === 'function') {
        unsubscribe()
      }
      // Clear timeout on unmount
      if (glowTimeoutRef.current) {
        clearTimeout(glowTimeoutRef.current)
      }
      // Clear queue
      letterQueueRef.current = []
      isProcessingRef.current = false
    }
  }, [sessionId, processQueue])

  // Register our presence and listen to Upside Down's presence
  useEffect(() => {
    if (!sessionId) {
      setConnectionStatus('waiting')
      return
    }

    // Register Overworld as online
    const cleanupPresence = registerPresence(sessionId, 'overworld')
    
    // Listen to Upside Down's presence
    const cleanupListener = listenToPresence(sessionId, 'upsideDown', (status) => {
      console.log('Upside Down status:', status)
      setConnectionStatus(status)
    })

    return () => {
      cleanupPresence()
      cleanupListener()
    }
  }, [sessionId])

  return (
    <div className="ow-page">
      <audio ref={audioRef} src="/audio/overworld.mp3" loop />
      <div className="ow-volumeWrapper">
        <VolumeToggle 
          isMuted={isMuted} 
          onToggle={toggleMute} 
          size={36} 
          variant="warm" 
        />
      </div>
      <DeveloperContact variant="warm" />
      <LayerCanvas className="ow-canvas">
        <Layer1WallTexture />
        <Layer2Alphabet />
        <Layer3FairyLights glowingLetter={glowingLetter} />
        <Layer5AmbientShadow />
      </LayerCanvas>
      
      {/* Connection status */}
      <div className="ow-statusBar">
        <div className="ow-statusLeft">
          <div className="ow-connectionStatus">
            <span className={`ow-statusDot ow-statusDot--${connectionStatus}`} />
            <span className="ow-statusText">
              {connectionStatus === 'connected' ? 'Connected' : 
               connectionStatus === 'waiting' ? 'Waiting...' : 'Disconnected'}
            </span>
          </div>
          <span className="ow-waitingHint">
            {connectionStatus === 'connected' 
              ? 'Upside Down is connected! Waiting for message...' 
              : connectionStatus === 'waiting'
              ? 'Waiting for Upside Down to connect...'
              : 'Upside Down disconnected'}
          </span>
        </div>
      </div>
      
      {/* Switch to Upside Down */}
      <Link to="/" className="ow-switchBtn" title="Go to Upside Down">
        Enter Upside Down
      </Link>
    </div>
  )
}
