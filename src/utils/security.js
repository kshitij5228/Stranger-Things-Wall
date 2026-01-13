// Security utilities for the app

/**
 * Rate limiter - Prevents spam/abuse
 */
class RateLimiter {
  constructor(maxRequests = 10, windowMs = 1000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
    this.requests = [];
  }

  canMakeRequest() {
    const now = Date.now();
    // Remove old requests outside the window
    this.requests = this.requests.filter(time => now - time < this.windowMs);
    
    if (this.requests.length >= this.maxRequests) {
      return false;
    }
    
    this.requests.push(now);
    return true;
  }

  getRemainingTime() {
    if (this.requests.length === 0) return 0;
    const oldest = this.requests[0];
    return Math.max(0, this.windowMs - (Date.now() - oldest));
  }
}

// Global rate limiter: Max 10 letters per second
export const letterRateLimiter = new RateLimiter(10, 1000);

// Strict rate limiter: Max 60 letters per minute (anti-spam)
export const minuteRateLimiter = new RateLimiter(60, 60000);

/**
 * Validate session ID format
 */
export function isValidSessionId(sessionId) {
  if (!sessionId || typeof sessionId !== 'string') return false;
  // Only allow alphanumeric and hyphens, 8-50 chars
  const sessionRegex = /^[a-zA-Z0-9-]{8,50}$/;
  return sessionRegex.test(sessionId);
}

/**
 * Validate letter input
 */
export function isValidLetter(letter) {
  if (!letter || typeof letter !== 'string') return false;
  // Only single uppercase A-Z
  return /^[A-Z]$/.test(letter);
}

/**
 * Sanitize string to prevent XSS
 */
export function sanitizeString(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

/**
 * Generate secure session ID
 */
export function generateSecureSessionId() {
  // Use crypto API for secure random generation
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback with more entropy
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array, b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Check if running in suspicious environment
 */
export function detectTampering() {
  const warnings = [];
  
  // Check if dev tools might be open (not foolproof but deters casual attempts)
  const devToolsOpen = /./;
  devToolsOpen.toString = function() {
    warnings.push('DevTools detected');
  };
  
  // Check for common automation tools
  if (navigator.webdriver) {
    warnings.push('Automation detected');
  }
  
  // Check for modified prototype
  if (Array.prototype.hasOwnProperty('customProp')) {
    warnings.push('Prototype tampering detected');
  }
  
  return warnings;
}

/**
 * Freeze critical objects to prevent tampering
 */
export function hardenRuntime() {
  // Freeze important globals
  if (typeof Object.freeze === 'function') {
    try {
      // Prevent prototype pollution
      Object.freeze(Object.prototype);
      Object.freeze(Array.prototype);
      Object.freeze(Function.prototype);
    } catch (e) {
      // Some environments don't allow this
    }
  }
}

/**
 * Content Security Policy meta tag generator
 */
export function getCSPMeta() {
  return `
    default-src 'self';
    script-src 'self' 'unsafe-inline' https://apis.google.com;
    style-src 'self' 'unsafe-inline';
    img-src 'self' data: https: blob:;
    font-src 'self';
    connect-src 'self' https://*.firebaseio.com https://*.googleapis.com wss://*.firebaseio.com;
    frame-src 'none';
    object-src 'none';
    base-uri 'self';
  `.replace(/\s+/g, ' ').trim();
}
