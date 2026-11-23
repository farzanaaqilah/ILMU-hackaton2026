import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../components/button';
import AppHeader from '../components/AppHeader';

export const AuthPage: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [role, setRole] = useState<'Doctor' | 'Nurse' | 'Pharmacist' | 'Admin'>('Doctor');
  const [fullName, setFullName] = useState('');
  const [staffId, setStaffId] = useState('');
  const [department, setDepartment] = useState('Cardiology');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (isSignUp && password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/patients');
    }, 500);
  };

  const fillDemoCredentials = (selectedRole: 'Doctor' | 'Nurse') => {
    setIsSignUp(false);
    if (selectedRole === 'Doctor') {
      setEmail('dr.sarah@hospital.med');
      setPassword('demo12345');
    } else {
      setEmail('nurse.amir@hospital.med');
      setPassword('demo12345');
    }
    setErrorMsg('');
  };

  return (
    <div style={styles.container}>
      <AppHeader />

      <main style={styles.main}>
        <div style={styles.card}>
          <div style={styles.header}>
            <span style={styles.badge}>HOSPITAL PORTAL</span>
            <h1 style={styles.title}>
              {isSignUp ? 'Staff Registration' : 'Clinical Sign In'}
            </h1>
            <p style={styles.subtitle}>
              {isSignUp
                ? 'Register credentials to access patient telemetry and telemetry records'
                : 'Sign in to monitor adverse reaction telemetry and patient check-ins'}
            </p>
          </div>

          {/* Mode Switcher */}
          <div style={styles.tabContainer}>
            <button
              type="button"
              onClick={() => { setIsSignUp(false); setErrorMsg(''); }}
              style={{
                ...styles.tabBtn,
                ...(isSignUp ? {} : styles.tabBtnActive),
              }}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setIsSignUp(true); setErrorMsg(''); }}
              style={{
                ...styles.tabBtn,
                ...(isSignUp ? styles.tabBtnActive : {}),
              }}
            >
              Register (Sign Up)
            </button>
          </div>

          {errorMsg && (
            <div style={styles.errorBox}>
              <span>⚠️</span>
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleAuth} style={styles.form}>
            {isSignUp && (
              <>
                <div style={styles.formRow}>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Sarah Tan"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      style={styles.input}
                    />
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Medical ID / License *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. MED-88219"
                      value={staffId}
                      onChange={(e) => setStaffId(e.target.value)}
                      style={styles.input}
                    />
                  </div>
                </div>

                <div style={styles.formRow}>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Role *</label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value as any)}
                      style={styles.select}
                    >
                      <option value="Doctor">Doctor / Specialist</option>
                      <option value="Nurse">Registered Nurse</option>
                      <option value="Pharmacist">Clinical Pharmacist</option>
                      <option value="Admin">Administrator</option>
                    </select>
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Department *</label>
                    <select
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      style={styles.select}
                    >
                      <option value="Cardiology">Cardiology</option>
                      <option value="General Outpatient">General Outpatient</option>
                      <option value="Endocrinology">Endocrinology</option>
                      <option value="Emergency & ICU">Emergency & ICU</option>
                      <option value="Pharmacy">Hospital Pharmacy</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            <div style={styles.inputGroup}>
              <label style={styles.label}>Work Email Address *</label>
              <input
                type="email"
                required
                placeholder="name@hospital.org"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Password *</label>
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
              />
            </div>

            {isSignUp && (
              <div style={styles.inputGroup}>
                <label style={styles.label}>Confirm Password *</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={styles.input}
                />
              </div>
            )}

            {!isSignUp && (
              <div style={styles.rowBetween}>
                <label style={styles.checkboxLabel}>
                  <input type="checkbox" defaultChecked /> Remember station
                </label>
                <span style={styles.mutedLink}>Reset password?</span>
              </div>
            )}

            <div style={{ marginTop: '8px' }}>
              <Button type="submit" variant="primary" disabled={isLoading} style={{ width: '100%', padding: '12px' }}>
                {isLoading ? 'Verifying Credentials...' : isSignUp ? 'Create Staff Profile' : 'Authenticate & Enter'}
              </Button>
            </div>
          </form>

          {/* Demo fast-fill */}
          {!isSignUp && (
            <div style={styles.demoBar}>
              <span style={styles.demoTitle}>Demo One-Click:</span>
              <div style={styles.demoActions}>
                <button
                  type="button"
                  onClick={() => fillDemoCredentials('Doctor')}
                  style={styles.demoBtn}
                >
                  Doctor Fill
                </button>
                <button
                  type="button"
                  onClick={() => fillDemoCredentials('Nurse')}
                  style={styles.demoBtn}
                >
                  Nurse Fill
                </button>
              </div>
            </div>
          )}

          <div style={styles.securityNote}>
            🔒 End-to-end encrypted hospital session. HIPAA & PDPA compliant.
          </div>
        </div>
      </main>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    backgroundColor: '#f8fafc',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  main: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 20px',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.05), 0 8px 10px -6px rgba(15, 23, 42, 0.02)',
    padding: '36px 32px',
    width: '100%',
    maxWidth: '480px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '24px',
  },
  badge: {
    fontSize: '0.68rem',
    fontWeight: '800',
    letterSpacing: '0.08em',
    color: '#0f766e',
    backgroundColor: '#f0fdfa',
    border: '1px solid #ccfbf1',
    padding: '3px 9px',
    borderRadius: '20px',
  },
  title: {
    fontFamily: '"Plus Jakarta Sans", sans-serif',
    fontSize: '1.65rem',
    fontWeight: '800',
    color: '#0f172a',
    margin: '10px 0 6px',
    letterSpacing: '-0.02em',
  },
  subtitle: {
    fontSize: '0.88rem',
    color: '#64748b',
    margin: 0,
    lineHeight: 1.5,
  },
  tabContainer: {
    display: 'flex',
    backgroundColor: '#f1f5f9',
    borderRadius: '10px',
    padding: '4px',
    marginBottom: '24px',
  },
  tabBtn: {
    flex: 1,
    padding: '8px 14px',
    border: 'none',
    backgroundColor: 'transparent',
    fontWeight: '600',
    fontSize: '0.86rem',
    color: '#64748b',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 150ms ease',
  },
  tabBtnActive: {
    backgroundColor: '#ffffff',
    color: '#0f172a',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
  },
  errorBox: {
    backgroundColor: '#fef2f2',
    border: '1px solid #fecaca',
    color: '#991b1b',
    padding: '10px 14px',
    borderRadius: '8px',
    fontSize: '0.84rem',
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '0.8rem',
    fontWeight: '600',
    color: '#334155',
  },
  input: {
    padding: '10px 12px',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    fontSize: '0.9rem',
    outline: 'none',
    backgroundColor: '#ffffff',
    color: '#0f172a',
    transition: 'border-color 150ms ease',
  },
  select: {
    padding: '10px 12px',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    fontSize: '0.9rem',
    outline: 'none',
    backgroundColor: '#ffffff',
    color: '#0f172a',
    cursor: 'pointer',
  },
  rowBetween: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '0.8rem',
    color: '#64748b',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    cursor: 'pointer',
  },
  mutedLink: {
    color: '#0f766e',
    cursor: 'pointer',
  },
  demoBar: {
    marginTop: '20px',
    padding: '12px 14px',
    backgroundColor: '#f8fafc',
    borderRadius: '10px',
    border: '1px dashed #cbd5e1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  demoTitle: {
    fontSize: '0.78rem',
    fontWeight: '600',
    color: '#64748b',
  },
  demoActions: {
    display: 'flex',
    gap: '8px',
  },
  demoBtn: {
    padding: '4px 10px',
    fontSize: '0.76rem',
    fontWeight: '600',
    backgroundColor: '#ffffff',
    color: '#0f766e',
    border: '1px solid #cbd5e1',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  securityNote: {
    marginTop: '20px',
    fontSize: '0.75rem',
    color: '#94a3b8',
    textAlign: 'center',
  },
};

export default AuthPage;
