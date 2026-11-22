import React from 'react';
import Button from '../components/button';

const medicines = [
  { name: 'Vitamin D', detail: '1 tablet · After breakfast', time: '8:00 AM', status: 'Taken' },
  { name: 'Blood pressure medicine', detail: '1 tablet · With water', time: '1:00 PM', status: 'Upcoming' },
  { name: 'Evening medicine', detail: '1 capsule · After dinner', time: '8:00 PM', status: 'Upcoming' },
];

export const MainHome: React.FC = () => {
  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <a href="#" style={styles.brand}>
          <span style={styles.brandIcon}>✚</span>
          <span>Medi<span style={styles.brandAccent}>Care</span></span>
        </a>
        <nav style={styles.nav}>
          <a href="#overview" style={styles.navLink}>Overview</a>
          <a href="#medicines" style={styles.navLink}>My Medicines</a>
          <a href="#assistant" style={styles.navLink}>AI Assistant</a>
        </nav>
        <div style={styles.profile}>
          <div style={styles.avatar}>JD</div>
          <span style={styles.profileName}>Jamie Davis</span>
        </div>
      </header>

      <main style={styles.main}>
        <section id="overview" style={styles.welcome}>
          <div>
            <p style={styles.eyebrow}>PATIENT DASHBOARD</p>
            <h1 style={styles.title}>Good morning, Jamie 👋</h1>
            <p style={styles.subtitle}>Here’s your medication plan for today.</p>
          </div>
          <div style={styles.dateBadge}>Your health, one day at a time</div>
        </section>

        <section style={styles.statsGrid} aria-label="Medication summary">
          <div style={styles.statCard}>
            <div style={styles.statIcon}>💊</div>
            <p style={styles.statLabel}>Medicines today</p>
            <p style={styles.statValue}>3 <span style={styles.statNote}>scheduled</span></p>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statIcon}>✅</div>
            <p style={styles.statLabel}>Taken today</p>
            <p style={styles.statValue}>1 <span style={styles.statNote}>of 3 doses</span></p>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statIcon}>⏰</div>
            <p style={styles.statLabel}>Next reminder</p>
            <p style={styles.statValue}>1:00 <span style={styles.statNote}>PM</span></p>
          </div>
        </section>

        <div style={styles.contentGrid}>
          <section id="medicines" style={styles.panel}>
            <div style={styles.panelHeading}>
              <div>
                <h2 style={styles.panelTitle}>Today’s medications</h2>
                <p style={styles.panelSubtitle}>Keep track of your daily doses.</p>
              </div>
              <a href="#medicines" style={styles.textLink}>View schedule →</a>
            </div>

            <div style={styles.medicineList}>
              {medicines.map((medicine) => (
                <article key={medicine.name} style={styles.medicineRow}>
                  <div style={styles.medicineIcon}>💊</div>
                  <div style={styles.medicineInfo}>
                    <h3 style={styles.medicineName}>{medicine.name}</h3>
                    <p style={styles.medicineDetail}>{medicine.detail}</p>
                  </div>
                  <div style={styles.medicineTime}>{medicine.time}</div>
                  <span
                    style={{
                      ...styles.status,
                      ...(medicine.status === 'Taken' ? styles.takenStatus : styles.upcomingStatus),
                    }}
                  >
                    {medicine.status}
                  </span>
                </article>
              ))}
            </div>
          </section>

          <aside id="assistant" style={styles.assistantCard}>
            <div style={styles.assistantIcon}>✦</div>
            <p style={styles.assistantLabel}>AI MEDICATION ASSISTANT</p>
            <h2 style={styles.assistantTitle}>A little reminder for you</h2>
            <p style={styles.assistantText}>
              Have you taken your blood pressure medicine today?
            </p>
            <div style={styles.assistantPrompt}>
              Your next scheduled dose is at <strong>1:00 PM</strong>. Remember to follow
              the instructions provided by your healthcare professional.
            </div>
            <div style={styles.assistantActions}>
              <button type="button" style={styles.primaryButton}>Yes, I have</button>
              <button type="button" style={styles.secondaryButton}>Not yet</button>
            </div>
          </aside>
        </div>

        <section style={styles.progressPanel}>
          <div>
            <p style={styles.eyebrow}>DAILY PROGRESS</p>
            <h2 style={styles.progressTitle}>You’re building a healthy routine</h2>
            <p style={styles.panelSubtitle}>You’ve completed 1 of your 3 scheduled doses today.</p>
          </div>
          <div style={styles.progressWrap}>
            <div style={styles.progressTrack}>
              <div style={styles.progressFill} />
            </div>
            <span style={styles.progressPercent}>33%</span>
          </div>
        </section>

        <footer style={styles.footer}>
          This dashboard is for medication organization and reminders. For medical advice,
          consult your healthcare professional.
        </footer>
      </main>
    </div>
  );
};

export default MainHome;

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#f5f8fc',
    color: '#1e293b',
    fontFamily: "'Segoe UI', Roboto, Helvetica, sans-serif",
  },
  header: {
    minHeight: '72px',
    padding: '0 6%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '24px',
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #e8edf4',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    color: '#183b56',
    fontSize: '1.25rem',
    fontWeight: 800,
    textDecoration: 'none',
  },
  brandIcon: {
    display: 'grid',
    placeItems: 'center',
    width: '34px',
    height: '34px',
    borderRadius: '10px',
    backgroundColor: '#e5f4f1',
    color: '#138a72',
  },
  brandAccent: { color: '#138a72' },
  nav: { display: 'flex', gap: '28px' },
  navLink: { color: '#64748b', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600 },
  profile: { display: 'flex', alignItems: 'center', gap: '10px' },
  avatar: {
    display: 'grid',
    placeItems: 'center',
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: '#dcefeb',
    color: '#137a68',
    fontSize: '0.8rem',
    fontWeight: 700,
  },
  profileName: { fontSize: '0.9rem', fontWeight: 600 },
  main: { maxWidth: '1180px', margin: '0 auto', padding: '42px 24px' },
  welcome: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '20px',
    marginBottom: '28px',
  },
  eyebrow: {
    margin: '0 0 8px',
    color: '#138a72',
    fontSize: '0.75rem',
    fontWeight: 800,
    letterSpacing: '0.12em',
  },
  title: { margin: 0, color: '#183b56', fontSize: '2rem' },
  subtitle: { margin: '8px 0 0', color: '#64748b' },
  dateBadge: {
    padding: '10px 16px',
    border: '1px solid #dce8e7',
    borderRadius: '999px',
    backgroundColor: '#ffffff',
    color: '#52716e',
    fontSize: '0.85rem',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
    gap: '18px',
    marginBottom: '22px',
  },
  statCard: {
    padding: '20px',
    border: '1px solid #e8edf4',
    borderRadius: '14px',
    backgroundColor: '#ffffff',
  },
  statIcon: { fontSize: '1.4rem' },
  statLabel: { margin: '14px 0 5px', color: '#64748b', fontSize: '0.88rem' },
  statValue: { margin: 0, color: '#183b56', fontSize: '1.6rem', fontWeight: 750 },
  statNote: { color: '#64748b', fontSize: '0.85rem', fontWeight: 500 },
  contentGrid: {
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1.6fr) minmax(280px, 1fr)',
    alignItems: 'start',
    gap: '22px',
  },
  panel: {
    padding: '24px',
    border: '1px solid #e8edf4',
    borderRadius: '14px',
    backgroundColor: '#ffffff',
  },
  panelHeading: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '18px',
  },
  panelTitle: { margin: 0, color: '#183b56', fontSize: '1.15rem' },
  panelSubtitle: { margin: '6px 0 0', color: '#718096', fontSize: '0.88rem' },
  textLink: { color: '#138a72', fontSize: '0.85rem', fontWeight: 700, textDecoration: 'none' },
  medicineList: { display: 'grid', gap: '10px' },
  medicineRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '14px 0',
    borderTop: '1px solid #edf1f5',
  },
  medicineIcon: {
    display: 'grid',
    placeItems: 'center',
    width: '42px',
    height: '42px',
    flexShrink: 0,
    borderRadius: '12px',
    backgroundColor: '#f0f6ff',
  },
  medicineInfo: { flex: 1 },
  medicineName: { margin: 0, color: '#26384a', fontSize: '0.95rem' },
  medicineDetail: { margin: '5px 0 0', color: '#718096', fontSize: '0.8rem' },
  medicineTime: { color: '#475569', fontSize: '0.85rem', fontWeight: 600 },
  status: { padding: '5px 9px', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700 },
  takenStatus: { backgroundColor: '#e5f5ee', color: '#18835d' },
  upcomingStatus: { backgroundColor: '#fff5df', color: '#a66b08' },
  assistantCard: {
    padding: '24px',
    borderRadius: '14px',
    background: 'linear-gradient(145deg, #eaf7f4, #f3f8ff)',
  },
  assistantIcon: {
    display: 'grid',
    placeItems: 'center',
    width: '40px',
    height: '40px',
    borderRadius: '12px',
    backgroundColor: '#ffffff',
    color: '#138a72',
    fontSize: '1.3rem',
  },
  assistantLabel: {
    margin: '18px 0 8px',
    color: '#138a72',
    fontSize: '0.7rem',
    fontWeight: 800,
    letterSpacing: '0.1em',
  },
  assistantTitle: { margin: 0, color: '#183b56', fontSize: '1.2rem' },
  assistantText: { margin: '14px 0', color: '#334155', lineHeight: 1.5 },
  assistantPrompt: {
    padding: '12px',
    borderRadius: '10px',
    backgroundColor: 'rgba(255,255,255,0.75)',
    color: '#526477',
    fontSize: '0.82rem',
    lineHeight: 1.55,
  },
  assistantActions: { display: 'flex', gap: '10px', marginTop: '16px' },
  primaryButton: {
    padding: '10px 14px',
    border: 0,
    borderRadius: '8px',
    backgroundColor: '#138a72',
    color: '#ffffff',
    fontWeight: 700,
    cursor: 'pointer',
  },
  secondaryButton: {
    padding: '10px 14px',
    border: '1px solid #b9d8d1',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    color: '#287666',
    fontWeight: 700,
    cursor: 'pointer',
  },
  progressPanel: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '24px',
    marginTop: '22px',
    padding: '22px 24px',
    border: '1px solid #e8edf4',
    borderRadius: '14px',
    backgroundColor: '#ffffff',
  },
  progressTitle: { margin: 0, color: '#183b56', fontSize: '1.05rem' },
  progressWrap: { display: 'flex', alignItems: 'center', gap: '12px', width: 'min(320px, 40%)' },
  progressTrack: { height: '9px', flex: 1, overflow: 'hidden', borderRadius: '99px', backgroundColor: '#e8eef2' },
  progressFill: { width: '33%', height: '100%', borderRadius: '99px', backgroundColor: '#20a486' },
  progressPercent: { color: '#52716e', fontSize: '0.85rem', fontWeight: 700 },
  footer: { marginTop: '24px', color: '#8190a0', fontSize: '0.78rem', textAlign: 'center' },
};