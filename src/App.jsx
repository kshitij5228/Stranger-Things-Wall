import { Routes, Route } from 'react-router-dom'
import OverworldWall from './worlds/overworld/OverworldWall'
import UpsideDownWall from './worlds/upsideDown/UpsideDownWall'

/**
 * App Component
 * 
 * Routing Structure:
 * /           → Upside Down Wall (Sender) - Dark, creepy theme
 * /wall/:id   → Real World Wall (Receiver) - Warm, hopeful theme
 */
function App() {
  return (
    <Routes>
      {/* First page: Upside Down (sender) */}
      <Route path="/" element={<UpsideDownWall />} />

      {/* Receiver wall: Overworld */}
      <Route path="/wall/:sessionId" element={<OverworldWall />} />
    </Routes>
  )
}

export default App
