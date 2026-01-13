import React from 'react'
import './Layer5AmbientShadow.css'

export default function Layer5AmbientShadow() {
  return (
    <div className="ud-layer ud-ambientShadow" aria-hidden="true">
      <div className="ud-shadowVignette" />
      <div className="ud-shadowCorners" />
    </div>
  )
}
