import React, { useState, useRef, useEffect } from 'react'
import LayerCanvas from '../../shared/components/LayerCanvas'
import VolumeToggle from '../../shared/components/VolumeToggle/VolumeToggle'
import DeveloperContact from '../../shared/components/DeveloperContact/DeveloperContact'
import Layer1WallTexture from './layers/Layer1WallTexture/Layer1WallTexture'
import Layer2Alphabet from './layers/Layer2Alphabet/Layer2Alphabet'
import Layer3Particles from './layers/Layer3Particles/Layer3Particles'
import Layer5AmbientShadow from './layers/Layer5AmbientShadow/Layer5AmbientShadow'
import { sendLetter } from '../../firebase/firebaseService'
import { registerPresence, listenToPresence } from '../../firebase/presenceService'
import { generateSecureSessionId } from '../../utils/security'
import './upsideDown.css'

export default function UpsideDownWall() {
  const audioRef = useRef(null)
  const [isMuted, setIsMuted] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState('waiting') // 'waiting' | 'connected' | 'disconnected'

  // State variables
  const [shareLink, setShareLink] = useState('')
  const [copyStatus, setCopyStatus] = useState('')
  const [sessionId, setSessionId] = useState(null)
  const [showHint, setShowHint] = useState(false)
  const [isFading, setIsFading] = useState(false)

  // Register our presence and listen to Overworld's presence
  useEffect(() => {
    if (!sessionId) {
      setConnectionStatus('waiting')
      return
    }

    // Register Upside Down as online
    const cleanupPresence = registerPresence(sessionId, 'upsideDown')

    // Listen to Overworld's presence
    const cleanupListener = listenToPresence(sessionId, 'overworld', (status) => {
      console.log('Overworld status:', status)
      setConnectionStatus(status)
    })

    return () => {
      cleanupPresence()
      cleanupListener()
    }
  }, [sessionId])

  useEffect(() => {
    // Try to autoplay, if blocked wait for user interaction
    const playAudio = () => {
      if (audioRef.current) {
        audioRef.current.volume = 0.3
        audioRef.current.play().catch(() => {
          // Autoplay blocked, will play on first click
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

  const onGetLink = async () => {
    const newSessionId = generateSecureSessionId()
    setSessionId(newSessionId)

    const nextLink = `${window.location.origin}/Stranger-Things-Wall/wall/${newSessionId}`
    setShareLink(nextLink)
    setCopyStatus('')
    setShowHint(true)

    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(nextLink)
        setCopyStatus('Copied!')
      } else {
        setCopyStatus('Copy manually')
      }
    } catch {
      setCopyStatus('Copy manually')
    }

    // Start fade after 5 seconds, then hide
    setTimeout(() => {
      setIsFading(true)
    }, 5000)

    setTimeout(() => {
      setShowHint(false)
      setCopyStatus('')
      setIsFading(false)
    }, 6000)
  }

  const handleLetterClick = async (letter) => {
    if (sessionId) {
      try {
        await sendLetter(sessionId, letter)
        console.log(`Sent letter: ${letter} to session: ${sessionId}`)
      } catch (error) {
        console.error('Failed to send letter:', error)
      }
    }
  }

  return (
    <div className="ud-page">
      <audio ref={audioRef} src={`${import.meta.env.BASE_URL}audio/upside-down.mp3`} loop />
      <div className="ud-volumeWrapper">
        <VolumeToggle
          isMuted={isMuted}
          onToggle={toggleMute}
          size={36}
          variant="dark"
        />
      </div>
      <DeveloperContact variant="dark" />
      <LayerCanvas className="ud-canvas">
        <Layer1WallTexture />
        <Layer2Alphabet onLetterClick={handleLetterClick} sessionId={sessionId} />
        <Layer3Particles />
        <Layer5AmbientShadow />
      </LayerCanvas>

      {/* Connection status - only show when session is active */}
      {sessionId && (
        <div className="ud-statusBar">
          <div className="ud-connectionStatus">
            <span className={`ud-statusDot ud-statusDot--${connectionStatus}`} />
            <span className="ud-statusText">
              {connectionStatus === 'connected' ? 'Overworld Connected' :
                connectionStatus === 'waiting' ? 'Waiting for Overworld...' : 'Overworld Disconnected'}
            </span>
          </div>
        </div>
      )}

      <div className="ud-bottomBar">
        <div className={`ud-messagesWrapper ${!showHint && !copyStatus ? 'ud-collapsed' : ''}`}>
          <div className="ud-messagesInner">
            {showHint && <span className={`ud-activeHint ${isFading ? 'ud-fadeOut' : ''}`}>Click letters to send!</span>}
            {copyStatus && <span className={`ud-copyStatus ${isFading ? 'ud-fadeOut' : ''}`} aria-live="polite">{copyStatus}</span>}
          </div>
        </div>
        <button className="ud-getLinkBtn" type="button" onClick={onGetLink}>
          {sessionId ? 'New Link' : 'Get Link'}
        </button>
        {shareLink ? (
          <div className="ud-linkContainer">
            <a className="ud-shareLink" href={shareLink} target="_blank" rel="noreferrer">
              {shareLink}
            </a>
          </div>
        ) : (
          <span className="ud-shareHint">Generate a link to connect with Overworld</span>
        )}
      </div>
    </div>
  )
}
