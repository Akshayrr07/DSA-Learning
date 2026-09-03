import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Mail, Lock, Loader2, KeyRound, User as UserIcon } from 'lucide-react';

interface AuthModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  isStandalone?: boolean;
}

export const AuthModal: React.FC<AuthModalProps> = ({ 
  isOpen = true, 
  onClose, 
  isStandalone = false 
}) => {
  const { login, register } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Clear state when modal toggles
  useEffect(() => {
    setError('');
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  }, [isSignUp, isOpen]);

  if (!isOpen && !isStandalone) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validations
    if (!email || !password) {
      setError('Please fill in all fields.');
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError('Please enter a valid email address.');
      setLoading(false);
      return;
    }

    if (isSignUp) {
      if (!username.trim()) {
        setError('Please enter a username.');
        setLoading(false);
        return;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters.');
        setLoading(false);
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        setLoading(false);
        return;
      }
    }

    try {
      const result = isSignUp 
        ? await register(email, password, username)
        : await login(email, password);

      if (result.success) {
        if (onClose) onClose();
      } else {
        setError(result.error || 'Authentication failed. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const cardContent = (
    <div className="auth-card glass-panel" onClick={(e) => e.stopPropagation()}>
      {/* Close Button */}
      {!isStandalone && onClose && (
        <button className="auth-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>
      )}

      {/* Header Tabs */}
      <div className="auth-tabs">
        <button 
          type="button"
          className={`auth-tab ${!isSignUp ? 'active' : ''}`}
          onClick={() => setIsSignUp(false)}
        >
          Sign In
        </button>
        <button 
          type="button"
          className={`auth-tab ${isSignUp ? 'active' : ''}`}
          onClick={() => setIsSignUp(true)}
        >
          Sign Up
        </button>
      </div>

      {/* Title / Subtitle */}
      <div className="auth-header">
        <h2>{isSignUp ? 'Create Account' : 'Welcome Back'}</h2>
        <p>{isSignUp ? 'Start tracking your DSA learning progress' : 'Log in to access your learning dashboard'}</p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="auth-error-alert">
          <span>{error}</span>
        </div>
      )}

      {/* Auth Form */}
      <form onSubmit={handleSubmit} className="auth-form">
        {isSignUp && (
          <div className="auth-input-group animate-slide-down">
            <label htmlFor="auth-username">Username / Display Name</label>
            <div className="auth-input-wrapper">
              <UserIcon size={16} className="auth-input-icon" />
              <input 
                id="auth-username"
                type="text"
                placeholder="e.g. Akshay"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required={isSignUp}
                disabled={loading}
              />
            </div>
          </div>
        )}

        <div className="auth-input-group">
          <label htmlFor="auth-email">Email Address</label>
          <div className="auth-input-wrapper">
            <Mail size={16} className="auth-input-icon" />
            <input 
              id="auth-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>
        </div>

        <div className="auth-input-group">
          <label htmlFor="auth-password">Password</label>
          <div className="auth-input-wrapper">
            <Lock size={16} className="auth-input-icon" />
            <input 
              id="auth-password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>
        </div>

        {isSignUp && (
          <div className="auth-input-group animate-slide-down">
            <label htmlFor="auth-confirm-password">Confirm Password</label>
            <div className="auth-input-wrapper">
              <KeyRound size={16} className="auth-input-icon" />
              <input 
                id="auth-confirm-password"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required={isSignUp}
                disabled={loading}
              />
            </div>
          </div>
        )}

        <button 
          type="submit" 
          className="btn btn-primary auth-submit-btn" 
          disabled={loading}
        >
          {loading ? (
            <span className="auth-spinner-wrapper">
              <Loader2 size={16} className="auth-spinner" /> Processing...
            </span>
          ) : (
            isSignUp ? 'Create Account' : 'Sign In'
          )}
        </button>
      </form>

      <div className="auth-footer">
        {isSignUp ? (
          <p>Already have an account? <span onClick={() => setIsSignUp(false)}>Sign In</span></p>
        ) : (
          <p>New to DSA? <span onClick={() => setIsSignUp(true)}>Create an account</span></p>
        )}
      </div>
    </div>
  );

  if (isStandalone) {
    return cardContent;
  }

  return (
    <div className="auth-overlay" onClick={onClose}>
      {cardContent}
    </div>
  );
};
