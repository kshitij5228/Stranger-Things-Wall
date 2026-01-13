import { ref, push, onChildAdded, remove, set } from 'firebase/database';
import { db } from '../firebase'; // Use main firebase.js with App Check
import { 
  letterRateLimiter, 
  minuteRateLimiter, 
  isValidSessionId, 
  isValidLetter 
} from '../utils/security';

// Use database from main firebase.js (includes App Check)
const database = db;

/**
 * Send a letter signal to a specific session
 * SECURED: With rate limiting and validation
 * @param {string} sessionId - The unique session ID
 * @param {string} letter - The letter that was clicked
 */
export async function sendLetter(sessionId, letter) {
  // Validate session ID
  if (!isValidSessionId(sessionId)) {
    throw new Error('Invalid session ID');
  }
  
  // Validate letter (must be single A-Z)
  if (!isValidLetter(letter)) {
    throw new Error('Invalid letter');
  }
  
  // Check rate limits
  if (!letterRateLimiter.canMakeRequest()) {
    throw new Error('Too fast! Slow down.');
  }
  
  if (!minuteRateLimiter.canMakeRequest()) {
    throw new Error('Rate limit exceeded. Try again in a minute.');
  }
  
  const sessionRef = ref(database, `sessions/${sessionId}/letters`);
  console.log('📤 Sending letter:', letter, 'to session:', sessionId);
  console.log('📍 Database ref:', sessionRef.toString());
  
  try {
    const result = await push(sessionRef, {
      letter: letter.toUpperCase(), // Ensure uppercase
      timestamp: Date.now()
    });
    console.log('✅ Letter sent successfully! Key:', result.key);
  } catch (error) {
    console.error('❌ PUSH FAILED:', error.message);
    console.error('❌ Full error:', error);
    throw error;
  }
}

/**
 * Listen for letter signals on a specific session
 * SECURED: With validation
 * @param {string} sessionId - The unique session ID
 * @param {function} onLetter - Callback when a letter is received
 * @returns {function} Unsubscribe function
 */
export function listenForLetters(sessionId, onLetter) {
  // Validate session ID
  if (!isValidSessionId(sessionId)) {
    console.error('❌ Invalid session ID:', sessionId);
    return () => {};
  }
  
  console.log('👂 Listening for letters on session:', sessionId);
  console.log('📍 Database path:', `sessions/${sessionId}/letters`);
  console.log('🔥 Database object:', database);
  
  const sessionRef = ref(database, `sessions/${sessionId}/letters`);
  console.log('📌 Session ref created:', sessionRef.toString());
  
  const unsubscribe = onChildAdded(sessionRef, (snapshot) => {
    console.log('🎉 onChildAdded FIRED!');
    const data = snapshot.val();
    console.log('📥 Received data:', data);
    if (data && isValidLetter(data.letter)) {
      console.log('✅ Valid letter received:', data.letter);
      onLetter(data.letter);
      // Remove the letter after receiving (one-time glow)
      remove(snapshot.ref);
    }
  }, (error) => {
    console.error('❌ Firebase listener error:', error);
  });
  
  return unsubscribe;
}

/**
 * Initialize a session (optional - creates session entry)
 * SECURED: With validation
 * @param {string} sessionId - The unique session ID
 */
export async function initSession(sessionId) {
  if (!isValidSessionId(sessionId)) {
    throw new Error('Invalid session ID');
  }
  
  const sessionRef = ref(database, `sessions/${sessionId}`);
  await set(sessionRef, {
    createdAt: Date.now(),
    active: true
  });
}

export { database };
