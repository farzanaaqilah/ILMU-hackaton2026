import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import Button from './button';

export const AppHeader: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  const navigate = useNavigate();
  const location = useLocation();
  const isAuthPage = location.pathname === '/auth';

  // Listen for login/logout changes dynamically across the app
  useEffect(() => {
    const handleAuthChange = () => {
      setIsAuthenticated(localStorage.getItem('isAuthenticated') === 'true');
    };

    window.addEventListener('storage', handleAuthChange);
    window.addEventListener('authChange', handleAuthChange);

    return () => {
      window.removeEventListener('storage', handleAuthChange);
      window.removeEventListener('authChange', handleAuthChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    window.dispatchEvent(new Event('authChange'));
    navigate('/');
  };

  return (
    <header style={styles.header}>
      <div style={styles.inner}>
        {/* Brand Logo */}
        <Link to="/" style={styles.brand}>
          <div style={styles.logoIcon}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L3 7V12C3 17.52 6.84 22.74 12 24C17.16 22.74 21 17.52 21 12V7L12 2Z" fill="url(#brandGrad)" />
              <path d="M11 11H8V13H11V16H13V13H16V11H13V8H11V11Z" fill="#ffffff" />
              <defs>
                <linearGradient id="brandGrad" x1="3" y1="2" x2="21" y2="24" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#0f766e" />
                  <stop offset="1" stopColor="#0d9488" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div style={styles.brandText}>
            <span style={styles.brandTitle}>MedGuardian</span>
            <span style={styles.brandBadge}>AI CLINICAL</span>
          </div>
        </Link>

        {/* Navigation links (Only 'Overview' for visitors; Protected links appear ONLY when authenticated) */}
        {!isAuthPage && (
          <nav style={styles.nav}>
            <NavLink 
              to="/" 
              style={({ isActive }) => ({
                ...styles.link,
                ...(isActive ? styles.activeLink : {})
              })}
            >
              Overview
            </NavLink>

            {isAuthenticated && (
              <>
                <NavLink 
                  to="/patients" 
                  style={({ isActive }) => ({
                    ...styles.link,
                    ...(isActive ? styles.activeLink : {})
                  })}
                >
                  Patient Directory
                </NavLink>
                <NavLink 
                  to="/dashboard" 
                  style={({ isActive }) => ({
                    ...styles.link,
                    ...(isActive ? styles.activeLink : {})
                  })}
                >
                  Safety Metrics
                </NavLink>
                <NavLink 
                  to="/appointments" 
                  style={({ isActive }) => ({
                    ...styles.link,
                    ...(isActive ? styles.activeLink : {})
                  })}
                >
                  Appointments
                </NavLink>
              </>
            )}
          </nav>
        )}

        {/* Right CTA Group */}
        <div style={styles.rightGroup}>
          <div style={styles.statusIndicator}>
            <span style={styles.pulseDot} />
            <span style={styles.statusText}>AI Bot Online</span>
          </div>

          {!isAuthPage && (
            isAuthenticated ? (
              <Button 
                variant="secondary" 
                onClick={handleLogout}
                style={{ borderColor: '#fca5a5', color: '#dc2626' }}
              >
                Logout
              </Button>
            ) : (
              <Link to="/auth" style={{ textDecoration: 'none' }}>
                <Button variant="secondary">Staff Portal</Button>
              </Link>
            )
          )}
        </div>
      </div>
    </header>
  );
};

const styles: Record<string, React.CSSProperties> = {
  header: {
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    borderBottom: '1px solid #e2e8f0',
    position: 'sticky',
    top: 0,
    zIndex: 90,
  },
  inner: {
    maxWidth: '1240px',
    margin: '0 auto',
    padding: '14px 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '20px',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    textDecoration: 'none',
  },
  logoIcon: {
    width: '36px',
    height: '36px',
    borderRadius: '10px',
    backgroundColor: '#f0fdfa',
    border: '1px solid #ccfbf1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 1px 3px rgba(13, 148, 136, 0.1)',
  },
  brandText: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  brandTitle: {
    fontSize: '1.05rem',
    fontWeight: '800',
    letterSpacing: '-0.02em',
    color: '#0f172a',
    fontFamily: '"Plus Jakarta Sans", sans-serif',
  },
  brandBadge: {
    fontSize: '0.68rem',
    fontWeight: '700',
    letterSpacing: '0.04em',
    color: '#0f766e',
    backgroundColor: '#ccfbf1',
    padding: '2px 7px',
    borderRadius: '6px',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  link: {
    color: '#475569',
    textDecoration: 'none',
    fontWeight: '500',
    fontSize: '0.875rem',
    padding: '8px 14px',
    borderRadius: '8px',
    transition: 'all 150ms ease',
  },
  activeLink: {
    color: '#0f766e',
    backgroundColor: '#f0fdfa',
    fontWeight: '600',
  },
  rightGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  statusIndicator: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '6px 12px',
    backgroundColor: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '20px',
  },
  pulseDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#10b981',
    boxShadow: '0 0 0 2px rgba(16, 185, 129, 0.2)',
  },
  statusText: {
    fontSize: '0.78rem',
    fontWeight: '600',
    color: '#334155',
  },
};

export default AppHeader;