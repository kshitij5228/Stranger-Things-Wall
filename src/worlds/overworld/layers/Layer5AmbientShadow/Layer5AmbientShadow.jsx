import React from 'react'
import './Layer5AmbientShadow.css'

export default function Layer5AmbientShadow() {
  return (
    <div className="ow-layer ow-ambientShadow" aria-hidden="true">
      <div className="ow-shadowVignette" />
      <div className="ow-shadowCorners" />
    </div>
  )
}
