// src/pages/AuthPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/button';

export const AuthPage: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [role, setRole] = useState<'Doctor' | 'Nurse' | 'Admin'>('Doctor');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    // Ready for live backend fetch/auth call or immediate routing for the demo
    navigate('/dashboard');
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>{isSignUp ? 'Hospital Staff Sign Up' : 'Clinical Portal Login'}</h2>
        <p className="subtitle">Enter your credentials to manage live patients and alerts</p>

        <form onSubmit={handleAuth}>
          {isSignUp && (
            <div className="form-group">
              <label>Staff Role</label>
              <select value={role} onChange={(e) => setRole(e.target.value as any)}>
                <option value="Doctor">Doctor / Specialist</option>
                <option value="Nurse">Staff Nurse</option>
                <option value="Admin">Administrator</option>
              </select>
            </div>
          )}

          <div className="form-group">
            <label>Staff Email</label>
            <input
              type="email"
              required
              placeholder="staff@hospital.org"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div style={{ marginTop: '1.5rem' }}>
            <Button type="submit">
              {isSignUp ? 'Create Account' : 'Sign In'}
            </Button>
          </div>
        </form>

        <p className="toggle-prompt">
          {isSignUp ? 'Already have an account?' : 'Need to register a staff account?'}
          <button type="button" onClick={() => setIsSignUp(!isSignUp)} className="link-btn">
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
};