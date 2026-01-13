import React from 'react'

/**
 * LayerCanvas
 * A simple wrapper that stacks children as absolute layers.
 * We'll plug each layer component into this later.
 */
export default function LayerCanvas({ className = '', children }) {
  return (
    <div className={className} style={{ position: 'relative', width: '100%', height: '100%' }}>
      {children}
    </div>
  )
}
