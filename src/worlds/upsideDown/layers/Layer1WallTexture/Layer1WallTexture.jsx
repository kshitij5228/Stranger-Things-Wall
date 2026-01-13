import React from 'react'
import './Layer1WallTexture.css'
import wallImg from './erag.png'

export default function Layer1WallTexture() {
  return (
    <div className="ud-layer ud-wallTexture">
      <img
        className="ud-wallImg"
        src={wallImg}
        alt=""
        draggable={false}
      />
    </div>
  )
}
