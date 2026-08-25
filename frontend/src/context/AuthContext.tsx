import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: number;
  email: string;
  username?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (email: string, password: string, username?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  fetchWithAuth: (url: string, options?: RequestInit) => Promise<Response>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Web Crypto PBKDF2 Helpers for Local Dev Fallback
async function hashPasswordLocal(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const saltHex = Array.from(salt).map(b => b.toString(16).padStart(2, '0')).join('');
  const pwUtf8 = new TextEncoder().encode(password);
  const keyMaterial = await crypto.subtle.importKey('raw', pwUtf8, { name: 'PBKDF2' }, false, ['deriveBits']);
  const derivedBits = await crypto.subtle.deriveBits({ name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' }, keyMaterial, 256);
  const hashHex = Array.from(new Uint8Array(derivedBits)).map(b => b.toString(16).padStart(2, '0')).join('');
  return `${saltHex}:${hashHex}`;
}

async function verifyPasswordLocal(password: string, storedHash: string): Promise<boolean> {
  try {
    const parts = storedHash.split(':');
    if (parts.length !== 2) return false;
    const [saltHex, originalHashHex] = parts;
    const salt = new Uint8Array(saltHex.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)));
    const pwUtf8 = new TextEncoder().encode(password);
    const keyMaterial = await crypto.subtle.importKey('raw', pwUtf8, { name: 'PBKDF2' }, false, ['deriveBits']);
    const derivedBits = await crypto.subtle.deriveBits({ name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' }, keyMaterial, 256);
    const hashHex = Array.from(new Uint8Array(derivedBits)).map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex === originalHashHex;
  } catch {
    return false;
  }
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Initialize and check current session
  useEffect(() => {
    const checkSession = async () => {
      const savedToken = localStorage.getItem('dsa_session_token');
      if (!savedToken) {
        setLoading(false);
        return;
      }

      // Check if this is a local fallback token
      if (savedToken.startsWith('local_token_')) {
        const cachedUserRaw = localStorage.getItem(`dsa_user_${savedToken}`);
        if (cachedUserRaw) {
          try {
            setUser(JSON.parse(cachedUserRaw));
            setToken(savedToken);
            setLoading(false);
            return;
          } catch (e) {
            console.error('Failed to parse cached user:', e);
          }
        }
      }

      try {
        const res = await fetch('/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${savedToken}`
          }
        });

        const contentType = res.headers.get('content-type');
        if (res.ok && contentType && contentType.includes('application/json')) {
          const data = await res.json();
          setUser(data.user);
          setToken(savedToken);
        } else if (res.status === 401) {
          localStorage.removeItem('dsa_session_token');
        } else {
          // If server is not running or returns HTML fallback
          const cachedUserRaw = localStorage.getItem(`dsa_user_${savedToken}`);
          if (cachedUserRaw) {
            setUser(JSON.parse(cachedUserRaw));
            setToken(savedToken);
          }
        }
      } catch (err) {
        console.warn('Session verification fallback to local cached user:', err);
        const cachedUserRaw = localStorage.getItem(`dsa_user_${savedToken}`);
        if (cachedUserRaw) {
          try {
            setUser(JSON.parse(cachedUserRaw));
            setToken(savedToken);
          } catch {
            localStorage.removeItem('dsa_session_token');
          }
        }
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
    const currentToken = token || localStorage.getItem('dsa_session_token');
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>)
    };

    if (currentToken) {
      headers['Authorization'] = `Bearer ${currentToken}`;
    }

    return fetch(url, {
      ...options,
      headers
    });
  };

  const login = async (email: string, password: string) => {
    const cleanEmail = email.toLowerCase().trim();

    // Step 1: Attempt remote edge API
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail, password })
      });

      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await res.json();

        if (res.ok) {
          setUser(data.user);
          setToken(data.token);
          localStorage.setItem('dsa_session_token', data.token);
          return { success: true };
        } else {
          return { success: false, error: data.error || 'Invalid email or password' };
        }
      }
    } catch (err) {
      console.warn('Remote login API unroutable, using local Web Crypto fallback:', err);
    }

    // Step 2: Fallback for local development environment
    try {
      const localUsersRaw = localStorage.getItem('dsa_local_users');
      const localUsers: Array<{ id: number; email: string; username?: string; passwordHash: string }> = localUsersRaw ? JSON.parse(localUsersRaw) : [];

      const foundUser = localUsers.find(u => u.email === cleanEmail);
      if (!foundUser) {
        return { success: false, error: 'Invalid email or password' };
      }

      const isValid = await verifyPasswordLocal(password, foundUser.passwordHash);
      if (!isValid) {
        return { success: false, error: 'Invalid email or password' };
      }

      const mockToken = `local_token_${foundUser.id}_${Date.now()}`;
      const userObj = { id: foundUser.id, email: foundUser.email, username: foundUser.username || foundUser.email.split('@')[0] };

      setUser(userObj);
      setToken(mockToken);
      localStorage.setItem('dsa_session_token', mockToken);
      localStorage.setItem(`dsa_user_${mockToken}`, JSON.stringify(userObj));
      return { success: true };
    } catch (e) {
      console.error('Local fallback login error:', e);
      return { success: false, error: 'Login failed. Please try again.' };
    }
  };

  const register = async (email: string, password: string, username?: string) => {
    const cleanEmail = email.toLowerCase().trim();
    const cleanUsername = username?.trim() || cleanEmail.split('@')[0];

    // Step 1: Attempt remote edge API
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail, password, username: cleanUsername })
      });

      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await res.json();

        if (res.ok) {
          setUser(data.user);
          setToken(data.token);
          localStorage.setItem('dsa_session_token', data.token);
          return { success: true };
        } else {
          return { success: false, error: data.error || 'Registration failed' };
        }
      }
    } catch (err) {
      console.warn('Remote register API unroutable, using local Web Crypto fallback:', err);
    }

    // Step 2: Fallback for local development environment
    try {
      const localUsersRaw = localStorage.getItem('dsa_local_users');
      const localUsers: Array<{ id: number; email: string; username?: string; passwordHash: string }> = localUsersRaw ? JSON.parse(localUsersRaw) : [];

      if (localUsers.some(u => u.email === cleanEmail)) {
        return { success: false, error: 'An account with this email already exists' };
      }

      const passwordHash = await hashPasswordLocal(password);
      const newUser = {
        id: Date.now(),
        email: cleanEmail,
        username: cleanUsername,
        passwordHash
      };

      localUsers.push(newUser);
      localStorage.setItem('dsa_local_users', JSON.stringify(localUsers));

      const mockToken = `local_token_${newUser.id}_${Date.now()}`;
      const userObj = { id: newUser.id, email: newUser.email, username: newUser.username };

      setUser(userObj);
      setToken(mockToken);
      localStorage.setItem('dsa_session_token', mockToken);
      localStorage.setItem(`dsa_user_${mockToken}`, JSON.stringify(userObj));
      return { success: true };
    } catch (e) {
      console.error('Local fallback registration error:', e);
      return { success: false, error: 'Registration failed. Please try again.' };
    }
  };

  const logout = () => {
    if (token) {
      localStorage.removeItem(`dsa_user_${token}`);
    }
    setUser(null);
    setToken(null);
    localStorage.removeItem('dsa_session_token');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, fetchWithAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
