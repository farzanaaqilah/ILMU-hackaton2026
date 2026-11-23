import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/button';

export const MainHome: React.FC = () => {
  const [showAd, setShowAd] = useState(true);

  return (
    <div style={styles.page}>
      {/* ─── 1. TOP SPONSORED / PUBLIC HEALTH AD BANNER ─── */}
      {showAd && (
        <aside style={styles.adBanner}>
          <div style={styles.adBadge}>PUBLIC HEALTH ALERT & SPONSOR</div>
          <p style={styles.adText}>
            <strong>Community Vaccine Drive:</strong> Free flu & health screening available at partnering hospital clinics this week.
          </p>
          <a href="#learn-more" style={styles.adLink}>Learn More &rarr;</a>
          <button 
            onClick={() => setShowAd(false)} 
            style={styles.closeAdBtn}
            title="Dismiss ad"
          >
            &times;
          </button>
        </aside>
      )}

      {/* ─── 2. HERO / VALUE PROPOSITION SECTION ─── */}
      <section style={styles.heroSection}>
        <div style={styles.heroBadge}>🏥 Smart Healthcare & AI Surveillance</div>
        
        <h1 style={styles.heroTitle}>
          MedGuardian AI, <br />
          <span style={{ color: '#0284c7' }}>Patient Care Beyond Hospital Walls.</span>
        </h1>
        
        <p style={styles.heroSubtitle}>
          Real-time adverse medicine surveillance, automated Telegram AI companion onboarding, 
          and seamless clinical follow-up scheduling.
        </p>

        {/* Action Buttons using your new Button component */}
        <div style={styles.heroButtonGroup}>
          <Link to="/auth" style={{ textDecoration: 'none' }}>
            <Button>Hospital Portal Login</Button>
          </Link>
          <Link to="/patients" style={{ textDecoration: 'none' }}>
            <Button>Register Patient (Live Demo)</Button>
          </Link>
        </div>

        {/* Quick Highlights / Metrics Bar */}
        <div style={styles.heroStats}>
          <div>
            <span style={styles.statNumber}>24/7</span>
            <span style={styles.statLabel}>Telegram AI Bot</span>
          </div>
          <div style={styles.statDivider} />
          <div>
            <span style={styles.statNumber}>Instant</span>
            <span style={styles.statLabel}>Side-Effect Alerts</span>
          </div>
          <div style={styles.statDivider} />
          <div>
            <span style={styles.statNumber}>1-Click</span>
            <span style={styles.statLabel}>QR Patient Onboard</span>
          </div>
        </div>
      </section>

      {/* ─── 3. SYSTEM PILLARS / FEATURES SECTION ─── */}
      <section style={styles.featuresSection}>
        <div style={styles.sectionHeader}>
          <span style={styles.sectionTag}>CORE CAPABILITIES</span>
          <h2 style={styles.sectionTitle}>Designed for Doctors, Nurses & Patients</h2>
          <p style={styles.sectionDesc}>
            Connect clinical monitoring with daily patient self-reporting through AI automation.
          </p>
        </div>

        <div style={styles.featuresGrid}>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>🤖</div>
            <h3>Telegram AI Guardian</h3>
            <p>Scan a single QR code to link a patient to our autonomous bot for daily dosage tracking and symptom chats.</p>
          </div>
          
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>📊</div>
            <h3>Live Safety Dashboard</h3>
            <p>Monitors high-risk medication adverse reactions in real time with automated severity categorization.</p>
          </div>

          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>📋</div>
            <h3>Appointment Summaries</h3>
            <p>Intuitive card layout to review pending check-ins, medication logs, and patient consultation readiness.</p>
          </div>
        </div>
      </section>

      {/* ─── 4. BOTTOM SPONSOR DISPLAY AD CARD ─── */}
      <section style={styles.bottomAdCard}>
        <div style={styles.bottomAdContent}>
          <span style={styles.bottomAdTag}>PARTNER SPONSOR</span>
          <h3 style={{ margin: '8px 0 4px', color: '#0f172a' }}>Pharmacy Express Doorstep Delivery</h3>
          <p style={{ margin: 0, color: '#475569', fontSize: '0.95rem' }}>
            Instant prescription validation & cold-chain delivery for discharged hospital patients.
          </p>
        </div>
        <Link to="/dashboard" style={{ textDecoration: 'none' }}>
          <Button>View Pharmacy Network</Button>
        </Link>
      </section>
    </div>
  );
};

// Clean styling object matching your project's aesthetic
const styles: Record<string, React.CSSProperties> = {
  page: {
    fontFamily: '"Rubik", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    backgroundColor: '#f8fafc',
    minHeight: '100vh',
    color: '#0f172a',
  },
  /* Top Ad */
  adBanner: {
    backgroundColor: '#e0f2fe',
    borderBottom: '1px solid #bae6fd',
    padding: '10px 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    position: 'relative',
    fontSize: '0.9rem',
    color: '#0369a1',
  },
  adBadge: {
    backgroundColor: '#0284c7',
    color: '#ffffff',
    fontSize: '0.75rem',
    fontWeight: '700',
    padding: '3px 8px',
    borderRadius: '4px',
    letterSpacing: '0.5px',
  },
  adText: {
    margin: 0,
  },
  adLink: {
    color: '#0369a1',
    fontWeight: '700',
    textDecoration: 'underline',
  },
  closeAdBtn: {
    background: 'none',
    border: 'none',
    fontSize: '1.25rem',
    cursor: 'pointer',
    color: '#0369a1',
    marginLeft: '12px',
  },

  /* Hero */
  heroSection: {
    textAlign: 'center',
    padding: '60px 24px 40px',
    maxWidth: '900px',
    margin: '0 auto',
  },
  heroBadge: {
    display: 'inline-block',
    backgroundColor: '#e2e8f0',
    color: '#334155',
    padding: '6px 14px',
    borderRadius: '9999px',
    fontSize: '0.85rem',
    fontWeight: '600',
    marginBottom: '20px',
  },
  heroTitle: {
    fontSize: '2.8rem',
    fontWeight: '800',
    lineHeight: 1.2,
    marginBottom: '20px',
    color: '#0f172a',
  },
  heroSubtitle: {
    fontSize: '1.15rem',
    color: '#475569',
    marginBottom: '36px',
    maxWidth: '680px',
    marginInline: 'auto',
    lineHeight: 1.6,
  },
  heroButtonGroup: {
    display: 'flex',
    gap: '16px',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: '48px',
  },
  heroStats: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '36px',
    paddingTop: '28px',
    borderTop: '1px solid #e2e8f0',
  },
  statNumber: {
    display: 'block',
    fontSize: '1.5rem',
    fontWeight: '800',
    color: '#0284c7',
  },
  statLabel: {
    fontSize: '0.8rem',
    color: '#64748b',
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  statDivider: {
    width: '1px',
    height: '32px',
    backgroundColor: '#cbd5e1',
  },

  /* Features */
  featuresSection: {
    padding: '40px 24px 60px',
    maxWidth: '1100px',
    margin: '0 auto',
  },
  sectionHeader: {
    textAlign: 'center',
    marginBottom: '36px',
  },
  sectionTag: {
    color: '#0284c7',
    fontSize: '0.85rem',
    fontWeight: '700',
    letterSpacing: '1px',
  },
  sectionTitle: {
    fontSize: '2rem',
    fontWeight: '800',
    margin: '8px 0',
  },
  sectionDesc: {
    color: '#64748b',
    fontSize: '1rem',
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px',
  },
  featureCard: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '28px 24px',
    boxShadow: '0 4px 14px rgba(0,0,0,0.04)',
    border: '1px solid #f1f5f9',
  },
  featureIcon: {
    fontSize: '2rem',
    marginBottom: '12px',
  },

  /* Bottom Ad Card */
  bottomAdCard: {
    maxWidth: '1100px',
    margin: '0 auto 60px',
    backgroundColor: '#ffffff',
    border: '2px dashed #93c5fd',
    borderRadius: '16px',
    padding: '24px 32px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '16px',
  },
  bottomAdContent: {
    flex: '1 1 300px',
  },
  bottomAdTag: {
    backgroundColor: '#fef3c7',
    color: '#b45309',
    fontSize: '0.75rem',
    fontWeight: '700',
    padding: '2px 8px',
    borderRadius: '4px',
  },
};

export default MainHome;