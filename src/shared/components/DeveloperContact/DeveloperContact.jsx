import React, { useState } from 'react'
import { User, X, Mail, MapPin, Github, Linkedin } from 'lucide-react'
import './DeveloperContact.css'

const developerInfo = {
  name: "Kshitij Nakod",
  title: "Engineering Student",
  bio: "Created this Stranger Things wall experience. Click letters in the Upside Down to send messages that light up in the Overworld!",
  email: "nakod.kshitij5228@gmail.com",
  location: "India",
  github: "https://github.com/kshitij5228",
  linkedin: "https://linkedin.com/in/kshitij-nakod-3293bb299",
  imageUrl: "https://github.com/kshitij5228.png",
}

export default function DeveloperContact({ variant = 'dark' }) {
  const [isOpen, setIsOpen] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText(developerInfo.email)
  }

  return (
    <>
      {/* Trigger Button */}
      <button 
        className={`dev-contact-btn dev-contact-btn--${variant}`}
        onClick={() => setIsOpen(true)}
        title="Developer Info"
      >
        <User size={18} />
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="dev-modal-overlay" onClick={() => setIsOpen(false)}>
          <div className={`dev-modal dev-modal--${variant}`} onClick={e => e.stopPropagation()}>
            {/* Close Button */}
            <button className="dev-modal-close" onClick={() => setIsOpen(false)}>
              <X size={20} />
            </button>

            {/* Header */}
            <div className="dev-modal-header">
              <img 
                src={developerInfo.imageUrl} 
                alt={developerInfo.name}
                className="dev-avatar"
              />
              <div className="dev-info">
                <h2 className="dev-name">{developerInfo.name}</h2>
                <p className="dev-title">{developerInfo.title}</p>
              </div>
            </div>

            {/* Bio */}
            <p className="dev-bio">{developerInfo.bio}</p>

            {/* Contact Info */}
            <div className="dev-contact-section">
              <div className="dev-contact-item">
                <Mail size={16} />
                <span>{developerInfo.email}</span>
                <button className="dev-copy-btn" onClick={copyEmail}>Copy</button>
              </div>
              <div className="dev-contact-item">
                <MapPin size={16} />
                <span>{developerInfo.location}</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="dev-social-links">
              {developerInfo.github && (
                <a href={developerInfo.github} target="_blank" rel="noopener noreferrer" className="dev-social-btn">
                  <Github size={16} />
                  GitHub
                </a>
              )}
              {developerInfo.linkedin && (
                <a href={developerInfo.linkedin} target="_blank" rel="noopener noreferrer" className="dev-social-btn">
                  <Linkedin size={16} />
                  LinkedIn
                </a>
              )}
            </div>

            {/* Email Button */}
            <a href={`mailto:${developerInfo.email}`} className="dev-email-btn">
              <Mail size={16} />
              Send Email
            </a>
          </div>
        </div>
      )}
    </>
  )
}
