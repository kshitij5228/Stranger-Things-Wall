import { ref, onValue, set, onDisconnect, serverTimestamp } from 'firebase/database'
import { db } from '../firebase'

/**
 * Register presence for a user in a session
 * @param {string} sessionId - The session ID
 * @param {string} userType - Either 'upsideDown' or 'overworld'
 * @returns {function} Cleanup function
 */
export function registerPresence(sessionId, userType) {
  if (!sessionId) return () => {}
  
  const presenceRef = ref(db, `sessions/${sessionId}/presence/${userType}`)
  const connectedRef = ref(db, '.info/connected')
  
  const unsubscribe = onValue(connectedRef, (snapshot) => {
    if (snapshot.val() === true) {
      // We're connected to Firebase
      // Set our presence to online
      set(presenceRef, {
        online: true,
        lastSeen: serverTimestamp()
      })
      
      // When we disconnect, set presence to offline
      onDisconnect(presenceRef).set({
        online: false,
        lastSeen: serverTimestamp()
      })
    }
  })
  
  // Cleanup function
  return () => {
    unsubscribe()
    // Set offline when component unmounts
    set(presenceRef, {
      online: false,
      lastSeen: serverTimestamp()
    })
  }
}

/**
 * Listen to the other user's presence in a session
 * @param {string} sessionId - The session ID
 * @param {string} otherUserType - The other user type to listen to ('upsideDown' or 'overworld')
 * @param {function} onStatusChange - Callback with status ('connected' | 'disconnected' | 'waiting')
 * @returns {function} Cleanup function
 */
export function listenToPresence(sessionId, otherUserType, onStatusChange) {
  if (!sessionId) {
    onStatusChange('waiting')
    return () => {}
  }
  
  const presenceRef = ref(db, `sessions/${sessionId}/presence/${otherUserType}`)
  
  const unsubscribe = onValue(presenceRef, (snapshot) => {
    const data = snapshot.val()
    console.log(`${otherUserType} presence:`, data)
    
    if (data && data.online === true) {
      onStatusChange('connected')
    } else {
      onStatusChange('disconnected')
    }
  }, (error) => {
    console.error('Presence listener error:', error)
    onStatusChange('disconnected')
  })
  
  return unsubscribe
}
