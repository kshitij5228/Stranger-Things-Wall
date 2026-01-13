import React from 'react'
import './Layer1WallTexture.css'
import wallTexture from './wall_texture.jpg'

export default function Layer1WallTexture() {
  return (
    <div
      className="ow-layer ow-wallTexture"
      style={{ backgroundImage: `url(${wallTexture})` }}
      aria-hidden="true"
    />
  )
}
