// Web Crypto API Helpers for Password Hashing (PBKDF2) and JWT (HMAC-SHA256)

// Base64URL encoding helpers
function base64url(arrayBuffer: ArrayBuffer): string {
  const bytes = new Uint8Array(arrayBuffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  const base64 = btoa(binary);
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64urlDecode(str: string): string {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  return atob(base64);
}

/**
 * Hash a password using PBKDF2 with a random salt.
 * Returns a string formatted as "saltHex:hashHex".
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const saltHex = Array.from(salt).map(b => b.toString(16).padStart(2, '0')).join('');
  
  const pwUtf8 = new TextEncoder().encode(password);
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    pwUtf8,
    { name: 'PBKDF2' },
    false,
    ['deriveBits']
  );
  
  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyMaterial,
    256 // 32 bytes hash
  );
  
  const hashHex = Array.from(new Uint8Array(derivedBits))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
    
  return `${saltHex}:${hashHex}`;
}

/**
 * Verify a password against a stored "saltHex:hashHex" string.
 */
export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  try {
    const parts = storedHash.split(':');
    if (parts.length !== 2) return false;
    const [saltHex, originalHashHex] = parts;
    
    const salt = new Uint8Array(
      saltHex.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16))
    );
    
    const pwUtf8 = new TextEncoder().encode(password);
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      pwUtf8,
      { name: 'PBKDF2' },
      false,
      ['deriveBits']
    );
    
    const derivedBits = await crypto.subtle.deriveBits(
      {
        name: 'PBKDF2',
        salt: salt,
        iterations: 100000,
        hash: 'SHA-256'
      },
      keyMaterial,
      256
    );
    
    const hashHex = Array.from(new Uint8Array(derivedBits))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
      
    return hashHex === originalHashHex;
  } catch (err) {
    console.error('Password verification error:', err);
    return false;
  }
}

/**
 * Create a signed HS256 JSON Web Token (JWT).
 */
export async function signJWT(payload: Record<string, any>, secret: string): Promise<string> {
  const header = { alg: 'HS256', typ: 'JWT' };
  
  const encoder = new TextEncoder();
  const encodedHeader = btoa(JSON.stringify(header))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  const encodedPayload = btoa(JSON.stringify(payload))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  
  const dataToSign = `${encodedHeader}.${encodedPayload}`;
  
  const secretKey = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  
  const signature = await crypto.subtle.sign(
    'HMAC',
    secretKey,
    encoder.encode(dataToSign)
  );
  
  const encodedSignature = base64url(signature);
  return `${dataToSign}.${encodedSignature}`;
}

/**
 * Verify and decode an HS256 JWT. Returns payload if valid, null otherwise.
 */
export async function verifyJWT(token: string, secret: string): Promise<Record<string, any> | null> {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    
    const [encodedHeader, encodedPayload, encodedSignature] = parts;
    const dataToVerify = `${encodedHeader}.${encodedPayload}`;
    
    const encoder = new TextEncoder();
    const secretKey = await crypto.subtle.importKey(
      'raw',
      encoder.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );
    
    const sigBytes = new Uint8Array(
      base64urlDecode(encodedSignature).split('').map(c => c.charCodeAt(0))
    );
    
    const isValid = await crypto.subtle.verify(
      'HMAC',
      secretKey,
      sigBytes,
      encoder.encode(dataToVerify)
    );
    
    if (!isValid) return null;
    
    const payload = JSON.parse(base64urlDecode(encodedPayload));
    
    // Check expiration (exp in seconds)
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) {
      return null;
    }
    
    return payload;
  } catch (err) {
    console.error('JWT verification error:', err);
    return null;
  }
}
