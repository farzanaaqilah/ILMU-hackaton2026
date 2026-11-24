import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
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

  // Password visibility states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

      // Set authenticated state in localStorage & dispatch event to update AppHeader
      localStorage.setItem('isAuthenticated', 'true');
      window.dispatchEvent(new Event('authChange'));

      // Redirect staff to dashboard
      navigate('/dashboard');
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

      {/* Embedded CSS for responsive breakpoint handling without duplicate style objects */}
      <style>{`
        .auth-split-wrapper {
          display: grid;
          grid-template-columns: 42% 58%;
          width: 100%;
          max-width: 1120px;
          background-color: #ffffff;
          border-radius: 24px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 20px 40px -15px rgba(15, 23, 42, 0.07), 0 0 0 1px rgba(15, 23, 42, 0.02);
          overflow: hidden;
        }

        @media (max-width: 900px) {
          .auth-split-wrapper {
            grid-template-columns: 1fr;
            border-radius: 16px;
          }
        }
      `}</style>

      <main style={styles.main}>
        <div className="auth-split-wrapper">
          
          {/* ─── LEFT PANEL (42%): Hospital Ads & Health Campaigns ─── */}
          <section style={styles.leftPanel}>
            <div style={styles.leftContent}>
              <div style={styles.campaignBadge}>
                <span style={styles.pulseDot} />
                <span>HEALTH CAMPAIGN & ADVISORY</span>
              </div>

              <h2 style={styles.leftHeading}>
                Outpatient Surveillance Protocol 2026
              </h2>

              <p style={styles.leftSubtitle}>
                Continuous medication safety monitoring connecting hospital care with real-time patient home recovery.
              </p>

              {/* Campaign / Ad Feature Cards */}
              <div style={styles.adCardsContainer}>
                {/* Ad Card 1: 24/7 Autonomous Telegram AI Bot */}
                <div style={styles.adCard}>
                  <div style={styles.adIconBox}>🤖</div>
                  <div>
                    <span style={styles.adCardPill}>LIVE PROTOCOL</span>
                    <h3 style={styles.adCardTitle}>24/7 Autonomous Telegram AI Bot</h3>
                    <p style={styles.adCardText}>
                      Enables discharged patients to log daily doses, report mild-to-critical side effects, and receive triage support with zero mobile app installation.
                    </p>
                  </div>
                </div>

                {/* Ad Card 2: Health Campaign Notice */}
                <div style={styles.adCard}>
                  <div style={styles.adIconBox}>🛡️</div>
                  <div>
                    <span style={styles.adCardPill}>CLINICAL NOTICE</span>
                    <h3 style={styles.adCardTitle}>Early Reaction Interception</h3>
                    <p style={styles.adCardText}>
                      Real-time algorithm classifies incoming symptoms by risk severity, alerting attending physicians to dangerous drug-drug interactions within 2 seconds.
                    </p>
                  </div>
                </div>

                {/* Ad Card 3: Sponsored Pharmacy Network */}
                <div style={styles.adCardHighlight}>
                  <div style={styles.sponsorTopRow}>
                    <span style={styles.sponsorTag}>SPONSORED HEALTHCARE PARTNER</span>
                    <span style={styles.sponsorBadge}>ExpressMed</span>
                  </div>
                  <h4 style={styles.sponsorTitle}>Hospital-to-Home Pharmacy Delivery</h4>
                  <p style={styles.sponsorText}>
                    Cold-chain verified doorstep medication fulfilment for cardiovascular and chronic care patients.
                  </p>
                </div>
              </div>
            </div>

            <div style={styles.leftFooter}>
              <span>&copy; {new Date().getFullYear()} MedGuardian Clinical AI Systems</span>
              <span>Workstation Enclave</span>
            </div>
          </section>

          {/* ─── RIGHT PANEL (58%): Staff Clinical Portal ─── */}
          <section style={styles.rightPanel}>
            <div style={styles.formContainer}>
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
                    {/* Row 1: Full Name & Medical ID */}
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

                    {/* Row 2: Role & Department */}
                    <div style={styles.formRow}>
                      <div style={styles.inputGroup}>
                        <label style={styles.label}>Role *</label>
                        <select
                          value={role}
                          onChange={(e) => setRole(e.target.value as any)}
                          style={styles.select}
                        >
                          <option value="Doctor">Doctor / Specialist</option>
                          <option value="Nurse">Staff Nurse</option>
                          <option value="Pharmacist">Clinical Pharmacist</option>
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
                          <option value="General Medicine">General Medicine</option>
                          <option value="Emergency">Emergency</option>
                        </select>
                      </div>
                    </div>
                  </>
                )}

                {/* Work Email Address */}
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

                {/* Password / Confirm Password Rows */}
                {isSignUp ? (
                  <div style={styles.formRow}>
                    <div style={styles.inputGroup}>
                      <label style={styles.label}>Password *</label>
                      <div style={styles.passwordWrapper}>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          placeholder="••••••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          style={styles.passwordInput}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          style={styles.eyeBtn}
                          title={showPassword ? 'Hide password' : 'Show password'}
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                          {showPassword ? (
                            <EyeOff size={18} color="#0f766e" />
                          ) : (
                            <Eye size={18} color="#64748b" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div style={styles.inputGroup}>
                      <label style={styles.label}>Confirm Password *</label>
                      <div style={styles.passwordWrapper}>
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          required
                          placeholder="••••••••••••"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          style={styles.passwordInput}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          style={styles.eyeBtn}
                          title={showConfirmPassword ? 'Hide password' : 'Show password'}
                          aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                        >
                          {showConfirmPassword ? (
                            <EyeOff size={18} color="#0f766e" />
                          ) : (
                            <Eye size={18} color="#64748b" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Password *</label>
                    <div style={styles.passwordWrapper}>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        placeholder="••••••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={styles.passwordInput}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        style={styles.eyeBtn}
                        title={showPassword ? 'Hide password' : 'Show password'}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? (
                          <EyeOff size={18} color="#0f766e" />
                        ) : (
                          <Eye size={18} color="#64748b" />
                        )}
                      </button>
                    </div>
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

              {/* Demo Fast-Fill Box */}
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
          </section>

        </div>
      </main>
    </div>
  );
};

export default AuthPage;

const styles: Record<string, React.CSSProperties> = {
  container: {
    backgroundColor: '#f8fafc',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  main: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '36px 20px',
  },

  /* Left Panel (42% Desktop) */
  leftPanel: {
    background: 'linear-gradient(155deg, #0f766e 0%, #115e59 50%, #134e4a 100%)',
    color: '#ffffff',
    padding: '44px 36px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
  },
  leftContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  campaignBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: 'rgba(255, 255, 255, 0.14)',
    backdropFilter: 'blur(8px)',
    padding: '5px 12px',
    borderRadius: '20px',
    fontSize: '0.72rem',
    fontWeight: '800',
    letterSpacing: '0.06em',
    marginBottom: '20px',
    alignSelf: 'flex-start',
  },
  pulseDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: '#34d399',
    boxShadow: '0 0 0 2px rgba(52, 211, 153, 0.3)',
  },
  leftHeading: {
    fontFamily: '"Plus Jakarta Sans", sans-serif',
    fontSize: '1.85rem',
    fontWeight: '800',
    lineHeight: 1.25,
    letterSpacing: '-0.02em',
    color: '#ffffff',
    margin: '0 0 12px',
  },
  leftSubtitle: {
    fontSize: '0.92rem',
    lineHeight: 1.55,
    color: '#ccfbf1',
    margin: '0 0 28px',
  },
  adCardsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  adCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    borderRadius: '14px',
    padding: '16px 18px',
    display: 'flex',
    gap: '14px',
    alignItems: 'flex-start',
  },
  adIconBox: {
    fontSize: '1.25rem',
    width: '38px',
    height: '38px',
    borderRadius: '10px',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  adCardPill: {
    display: 'inline-block',
    fontSize: '0.65rem',
    fontWeight: '800',
    letterSpacing: '0.06em',
    color: '#99f6e4',
    marginBottom: '4px',
  },
  adCardTitle: {
    fontSize: '0.92rem',
    fontWeight: '700',
    color: '#ffffff',
    margin: '0 0 4px',
  },
  adCardText: {
    fontSize: '0.8rem',
    color: '#ccfbf1',
    lineHeight: 1.45,
    margin: 0,
  },
  adCardHighlight: {
    backgroundColor: '#ffffff',
    borderRadius: '14px',
    padding: '16px 18px',
    color: '#0f172a',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
  },
  sponsorTopRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '6px',
  },
  sponsorTag: {
    fontSize: '0.65rem',
    fontWeight: '800',
    letterSpacing: '0.04em',
    color: '#0f766e',
  },
  sponsorBadge: {
    fontSize: '0.7rem',
    fontWeight: '700',
    backgroundColor: '#f0fdfa',
    color: '#0f766e',
    padding: '2px 6px',
    borderRadius: '4px',
    border: '1px solid #ccfbf1',
  },
  sponsorTitle: {
    fontSize: '0.9rem',
    fontWeight: '800',
    color: '#0f172a',
    margin: '0 0 4px',
  },
  sponsorText: {
    fontSize: '0.78rem',
    color: '#475569',
    lineHeight: 1.4,
    margin: 0,
  },
  leftFooter: {
    fontSize: '0.74rem',
    color: '#99f6e4',
    paddingTop: '20px',
    borderTop: '1px solid rgba(255, 255, 255, 0.12)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '28px',
  },

  /* Right Panel (58% Desktop) */
  rightPanel: {
    padding: '44px 40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    boxSizing: 'border-box',
  },
  formContainer: {
    width: '100%',
    maxWidth: '460px',
  },
  header: {
    textAlign: 'left',
    marginBottom: '20px',
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
    display: 'inline-block',
  },
  title: {
    fontFamily: '"Plus Jakarta Sans", sans-serif',
    fontSize: '1.65rem',
    fontWeight: '800',
    color: '#0f172a',
    margin: '8px 0 6px',
    letterSpacing: '-0.02em',
  },
  subtitle: {
    fontSize: '0.86rem',
    color: '#64748b',
    margin: 0,
    lineHeight: 1.45,
  },
  tabContainer: {
    display: 'flex',
    backgroundColor: '#f1f5f9',
    borderRadius: '10px',
    padding: '4px',
    marginBottom: '20px',
  },
  tabBtn: {
    flex: 1,
    padding: '8px 14px',
    border: 'none',
    backgroundColor: 'transparent',
    fontWeight: '600',
    fontSize: '0.85rem',
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
    gap: '14px',
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
    width: '100%',
    boxSizing: 'border-box',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    minWidth: 0,
    boxSizing: 'border-box',
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
    fontSize: '0.88rem',
    outline: 'none',
    backgroundColor: '#ffffff',
    color: '#0f172a',
    transition: 'border-color 150ms ease',
    width: '100%',
    boxSizing: 'border-box',
  },
  select: {
    padding: '10px 12px',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    fontSize: '0.88rem',
    outline: 'none',
    backgroundColor: '#ffffff',
    color: '#0f172a',
    cursor: 'pointer',
    width: '100%',
    boxSizing: 'border-box',
  },

  /* Password wrapper & eye icon button */
  passwordWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    boxSizing: 'border-box',
  },
  passwordInput: {
    padding: '10px 38px 10px 12px',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    fontSize: '0.88rem',
    outline: 'none',
    backgroundColor: '#ffffff',
    color: '#0f172a',
    transition: 'border-color 150ms ease',
    width: '100%',
    boxSizing: 'border-box',
  },
  eyeBtn: {
    position: 'absolute',
    right: '10px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4px',
    outline: 'none',
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
    fontWeight: '500',
  },
  demoBar: {
    marginTop: '16px',
    padding: '10px 14px',
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
    marginTop: '18px',
    fontSize: '0.74rem',
    color: '#94a3b8',
    textAlign: 'center',
  },
};