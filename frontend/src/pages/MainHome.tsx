import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/button';
import AppHeader from '../components/AppHeader';

export const MainHome: React.FC = () => {
  const [showTopAlert, setShowTopAlert] = useState(true);

  return (
    <div style={styles.page}>
      <AppHeader />

      {/* ─── 1. TOP SPONSORED / PUBLIC HEALTH AD BANNER ─── */}
      {showTopAlert && (
        <aside style={styles.topAdBanner}>
          <div style={styles.adBannerInner}>
            <div style={styles.adBadge}>HOSPITAL NOTICE</div>
            <p style={styles.adText}>
              <strong>Public Health Advisory:</strong> Real-time post-discharge surveillance protocol is active across all outpatient wards.
            </p>
            <a href="#features" style={styles.adLink}>Learn More &rarr;</a>
            <button 
              onClick={() => setShowTopAlert(false)} 
              style={styles.closeAdBtn}
              title="Dismiss announcement"
            >
              &times;
            </button>
          </div>
        </aside>
      )}

      {/* ─── 2. HERO / VALUE PROPOSITION SECTION ─── */}
      <section style={styles.heroSection}>
        <div style={styles.heroPill}>
          <span style={styles.heroPillDot} />
          <span>Next-Generation Clinical Telemetry</span>
        </div>

        <h1 style={styles.heroTitle}>
          Continuous Patient Care & <br />
          <span style={styles.heroTitleGradient}>Medication Safety Intelligence</span>
        </h1>

        <p style={styles.heroSubtitle}>
          Eliminate post-discharge blindspots. MedGuardian AI connects physicians with patients through autonomous Telegram check-ins, early adverse drug reaction detection, and connected clinical workflows.
        </p>

        {/* CTA Group */}
        <div style={styles.heroButtonGroup}>
          <Link to="/patients" style={{ textDecoration: 'none' }}>
            <Button variant="primary" style={{ padding: '12px 24px', fontSize: '0.95rem' }}>
              Register Patient (Live Demo)
            </Button>
          </Link>
          <Link to="/dashboard" style={{ textDecoration: 'none' }}>
            <Button variant="secondary" style={{ padding: '12px 24px', fontSize: '0.95rem' }}>
              View Safety Metrics &rarr;
            </Button>
          </Link>
        </div>

        {/* Live System Metrics Bar */}
        <div style={styles.statsContainer}>
          <div style={styles.statItem}>
            <span style={styles.statNumber}>24/7</span>
            <span style={styles.statLabel}>Autonomous Bot Guard</span>
          </div>
          <div style={styles.statDivider} />
          <div style={styles.statItem}>
            <span style={styles.statNumber}>&lt; 2s</span>
            <span style={styles.statLabel}>Adverse Event Triaging</span>
          </div>
          <div style={styles.statDivider} />
          <div style={styles.statItem}>
            <span style={styles.statNumber}>1-Scan</span>
            <span style={styles.statLabel}>Instant QR Onboarding</span>
          </div>
          <div style={styles.statDivider} />
          <div style={styles.statItem}>
            <span style={styles.statNumber}>Zero</span>
            <span style={styles.statLabel}>App Install Required</span>
          </div>
        </div>
      </section>

      {/* ─── 3. CORE CAPABILITIES (3 PILLARS) ─── */}
      <section id="features" style={styles.sectionWrapper}>
        <div style={styles.sectionHeader}>
          <span style={styles.sectionTag}>SYSTEM ARCHITECTURE</span>
          <h2 style={styles.sectionTitle}>Precision Tools for Clinical Excellence</h2>
          <p style={styles.sectionDesc}>
            Built specifically to assist clinicians, reduce avoidable readmissions, and keep patients safely on therapy.
          </p>
        </div>

        <div style={styles.cardsGrid}>
          <div style={styles.featureCard}>
            <div style={styles.featureIconBox}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0f766e" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
            </div>
            <h3 style={styles.featureCardTitle}>Telegram AI Companion</h3>
            <p style={styles.featureCardText}>
              Patients interact naturally in their preferred chat app. The AI conducts empathetic daily dosage checks, answers medication queries, and records qualitative symptom descriptions.
            </p>
            <div style={styles.featureFooterLink}>
              <Link to="/patients" style={styles.linkAccent}>Explore Patient Intake &rarr;</Link>
            </div>
          </div>

          <div style={styles.featureCard}>
            <div style={styles.featureIconBox}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0f766e" strokeWidth="2">
                <path d="M18 20V10M12 20V4M6 20v-6"/>
              </svg>
            </div>
            <h3 style={styles.featureCardTitle}>Real-time Reaction Surveillance</h3>
            <p style={styles.featureCardText}>
              Symptoms flagged by the AI are triaged by clinical severity. High and critical adverse drug reactions automatically surface to hospital duty desks for immediate intervention.
            </p>
            <div style={styles.featureFooterLink}>
              <Link to="/dashboard" style={styles.linkAccent}>Open Surveillance Grid &rarr;</Link>
            </div>
          </div>

          <div style={styles.featureCard}>
            <div style={styles.featureIconBox}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0f766e" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
            </div>
            <h3 style={styles.featureCardTitle}>Connected Appointment Cards</h3>
            <p style={styles.featureCardText}>
              Physicians access live summaries combining current pharmaceutical regimens, adherence percentages, and AI bot consultation flags before the patient walks in.
            </p>
            <div style={styles.featureFooterLink}>
              <Link to="/appointments" style={styles.linkAccent}>View Consultation Schedule &rarr;</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4. THREE-STEP WORKFLOW ─── */}
      <section style={styles.workflowSection}>
        <div style={styles.sectionWrapper}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionTag}>SEAMLESS INTEGRATION</span>
            <h2 style={styles.sectionTitle}>How MedGuardian Operates</h2>
            <p style={styles.sectionDesc}>Zero friction for healthcare providers and effortless for recovering patients.</p>
          </div>

          <div style={styles.stepsGrid}>
            <div style={styles.stepCard}>
              <div style={styles.stepBadge}>01</div>
              <h4 style={styles.stepTitle}>Clinical Intake</h4>
              <p style={styles.stepText}>Staff registers patient details and assigns prescribed pharmaceuticals upon discharge.</p>
            </div>

            <div style={styles.stepCard}>
              <div style={styles.stepBadge}>02</div>
              <h4 style={styles.stepTitle}>Instant QR Pairing</h4>
              <p style={styles.stepText}>Patient scans their personalized QR code with their mobile device to launch the Telegram AI bot.</p>
            </div>

            <div style={styles.stepCard}>
              <div style={styles.stepBadge}>03</div>
              <h4 style={styles.stepTitle}>Active Surveillance</h4>
              <p style={styles.stepText}>Daily check-ins report telemetry back to the hospital metrics dashboard in real time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 5. PARTNER SPONSOR DISPLAY BANNER ─── */}
      <section style={styles.sponsorSection}>
        <div style={styles.sponsorCard}>
          <div style={styles.sponsorContent}>
            <div style={styles.sponsorBadge}>SPONSORED HEALTHCARE NETWORK</div>
            <h3 style={styles.sponsorTitle}>ExpressMed Healthcare Logistics & Pharmacy Fulfilment</h3>
            <p style={styles.sponsorText}>
              Ensure uninterrupted compliance with cold-chain verified doorstep delivery for hospital-discharged patients. Certified by national pharmaceutical boards.
            </p>
          </div>
          <div style={styles.sponsorAction}>
            <Link to="/patients" style={{ textDecoration: 'none' }}>
              <Button variant="dark">Explore Network</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 6. FOOTER ─── */}
      <footer style={styles.footer}>
        <div style={styles.footerInner}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ fontSize: '1.2rem' }}>🛡️</span>
              <strong style={{ color: '#0f172a', fontSize: '1rem', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                MedGuardian AI
              </strong>
            </div>
            <p style={styles.footerMuted}>
              Hospital-grade adverse drug reaction surveillance & automated patient companion system.
            </p>
          </div>
          <div style={styles.footerNav}>
            <Link to="/patients" style={styles.footerLink}>Patient Intake</Link>
            <Link to="/dashboard" style={styles.footerLink}>Safety Metrics</Link>
            <Link to="/appointments" style={styles.footerLink}>Appointments</Link>
            <Link to="/auth" style={styles.footerLink}>Staff Portal</Link>
          </div>
        </div>
        <div style={styles.footerBottom}>
          <span>&copy; {new Date().getFullYear()} MedGuardian Clinical Systems. Built for High-Impact Healthcare.</span>
        </div>
      </footer>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  page: {
    backgroundColor: '#f8fafc',
    minHeight: '100vh',
    color: '#0f172a',
    display: 'flex',
    flexDirection: 'column',
  },
  topAdBanner: {
    backgroundColor: '#f0fdfa',
    borderBottom: '1px solid #ccfbf1',
    padding: '10px 24px',
    color: '#115e59',
  },
  adBannerInner: {
    maxWidth: '1240px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    fontSize: '0.86rem',
    flexWrap: 'wrap',
  },
  adBadge: {
    backgroundColor: '#0f766e',
    color: '#ffffff',
    fontSize: '0.7rem',
    fontWeight: '700',
    padding: '2px 8px',
    borderRadius: '4px',
    letterSpacing: '0.04em',
  },
  adText: {
    margin: 0,
  },
  adLink: {
    color: '#0f766e',
    fontWeight: '700',
    textDecoration: 'underline',
  },
  closeAdBtn: {
    background: 'none',
    border: 'none',
    fontSize: '1.1rem',
    cursor: 'pointer',
    color: '#0f766e',
    marginLeft: '8px',
  },
  heroSection: {
    maxWidth: '960px',
    margin: '0 auto',
    textAlign: 'center',
    padding: '80px 24px 60px',
  },
  heroPill: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    padding: '6px 14px',
    borderRadius: '30px',
    fontSize: '0.82rem',
    fontWeight: '600',
    color: '#475569',
    marginBottom: '28px',
    boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)',
  },
  heroPillDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: '#0d9488',
  },
  heroTitle: {
    fontFamily: '"Plus Jakarta Sans", sans-serif',
    fontSize: '3.4rem',
    fontWeight: '800',
    lineHeight: 1.15,
    letterSpacing: '-0.03em',
    color: '#0f172a',
    marginBottom: '24px',
  },
  heroTitleGradient: {
    background: 'linear-gradient(135deg, #0f766e 0%, #0284c7 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  heroSubtitle: {
    fontSize: '1.15rem',
    color: '#475569',
    lineHeight: 1.65,
    maxWidth: '720px',
    margin: '0 auto 40px',
  },
  heroButtonGroup: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '14px',
    flexWrap: 'wrap',
    marginBottom: '60px',
  },
  statsContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '36px',
    padding: '24px 32px',
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 4px 6px -1px rgba(15, 23, 42, 0.05)',
    flexWrap: 'wrap',
  },
  statItem: {
    textAlign: 'center',
  },
  statNumber: {
    display: 'block',
    fontSize: '1.5rem',
    fontWeight: '800',
    color: '#0f172a',
    fontFamily: '"Plus Jakarta Sans", sans-serif',
  },
  statLabel: {
    fontSize: '0.75rem',
    fontWeight: '600',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
    marginTop: '2px',
  },
  statDivider: {
    width: '1px',
    height: '36px',
    backgroundColor: '#e2e8f0',
  },
  sectionWrapper: {
    maxWidth: '1240px',
    margin: '0 auto',
    padding: '70px 24px',
    width: '100%',
  },
  sectionHeader: {
    textAlign: 'center',
    marginBottom: '48px',
  },
  sectionTag: {
    fontSize: '0.75rem',
    fontWeight: '800',
    letterSpacing: '0.08em',
    color: '#0f766e',
    textTransform: 'uppercase',
  },
  sectionTitle: {
    fontFamily: '"Plus Jakarta Sans", sans-serif',
    fontSize: '2.2rem',
    fontWeight: '800',
    letterSpacing: '-0.02em',
    color: '#0f172a',
    margin: '10px 0 12px',
  },
  sectionDesc: {
    fontSize: '1.05rem',
    color: '#64748b',
    maxWidth: '620px',
    margin: '0 auto',
  },
  cardsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '28px',
  },
  featureCard: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '36px 32px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 2px 4px rgba(15, 23, 42, 0.03)',
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 200ms ease',
  },
  featureIconBox: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    backgroundColor: '#f0fdfa',
    border: '1px solid #ccfbf1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  featureCardTitle: {
    fontFamily: '"Plus Jakarta Sans", sans-serif',
    fontSize: '1.3rem',
    fontWeight: '700',
    color: '#0f172a',
    margin: '0 0 12px',
    letterSpacing: '-0.01em',
  },
  featureCardText: {
    fontSize: '0.95rem',
    color: '#475569',
    lineHeight: 1.6,
    margin: '0 0 24px',
    flexGrow: 1,
  },
  featureFooterLink: {
    marginTop: 'auto',
  },
  linkAccent: {
    color: '#0f766e',
    fontWeight: '600',
    fontSize: '0.88rem',
  },
  workflowSection: {
    backgroundColor: '#ffffff',
    borderTop: '1px solid #e2e8f0',
    borderBottom: '1px solid #e2e8f0',
  },
  stepsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px',
  },
  stepCard: {
    padding: '28px',
    borderRadius: '14px',
    backgroundColor: '#f8fafc',
    border: '1px solid #e2e8f0',
  },
  stepBadge: {
    fontSize: '1.8rem',
    fontWeight: '900',
    color: '#0d9488',
    fontFamily: '"Plus Jakarta Sans", sans-serif',
    marginBottom: '10px',
  },
  stepTitle: {
    fontSize: '1.15rem',
    fontWeight: '700',
    color: '#0f172a',
    margin: '0 0 8px',
  },
  stepText: {
    fontSize: '0.92rem',
    color: '#64748b',
    lineHeight: 1.55,
    margin: 0,
  },
  sponsorSection: {
    maxWidth: '1240px',
    margin: '0 auto',
    padding: '60px 24px',
    width: '100%',
  },
  sponsorCard: {
    backgroundColor: '#ffffff',
    borderRadius: '20px',
    padding: '36px 44px',
    border: '1px solid #cbd5e1',
    boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.05)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '24px',
    flexWrap: 'wrap',
  },
  sponsorContent: {
    flex: '1 1 400px',
  },
  sponsorBadge: {
    fontSize: '0.72rem',
    fontWeight: '800',
    letterSpacing: '0.06em',
    color: '#0f766e',
    textTransform: 'uppercase',
    marginBottom: '6px',
  },
  sponsorTitle: {
    fontFamily: '"Plus Jakarta Sans", sans-serif',
    fontSize: '1.4rem',
    fontWeight: '800',
    color: '#0f172a',
    margin: '0 0 8px',
  },
  sponsorText: {
    fontSize: '0.94rem',
    color: '#475569',
    lineHeight: 1.5,
    margin: 0,
  },
  sponsorAction: {
    flexShrink: 0,
  },
  footer: {
    backgroundColor: '#ffffff',
    borderTop: '1px solid #e2e8f0',
    padding: '48px 24px 32px',
    marginTop: 'auto',
  },
  footerInner: {
    maxWidth: '1240px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '24px',
    flexWrap: 'wrap',
    paddingBottom: '32px',
    borderBottom: '1px solid #f1f5f9',
  },
  footerMuted: {
    fontSize: '0.88rem',
    color: '#64748b',
    maxWidth: '360px',
    margin: 0,
  },
  footerNav: {
    display: 'flex',
    gap: '24px',
    flexWrap: 'wrap',
  },
  footerLink: {
    color: '#475569',
    fontSize: '0.88rem',
    fontWeight: '500',
  },
  footerBottom: {
    maxWidth: '1240px',
    margin: '24px auto 0',
    fontSize: '0.8rem',
    color: '#94a3b8',
    textAlign: 'center',
  },
};

export default MainHome;
