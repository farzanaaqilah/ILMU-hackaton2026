import React from 'react';

export const MainHome: React.FC = () => {
  return (
    <div style={styles.page}>
      {/* ─── SECTION 1: HERO / LANDING PAGE ─── */}
      <section style={styles.heroSection}>
        <div style={styles.heroOverlay}>
          <div style={styles.heroBadge}>✨ Fresh From The Oven Every Morning</div>
          <h1 style={styles.heroTitle}>
            amirul Bakes, <br />
            <span style={{ color: '#d97706' }}>Baked with Love.</span>
          </h1>
          <p style={styles.heroSubtitle}>
            Handcrafted sourdough, golden flaky croissants, and delicate pastries baked fresh daily using traditional fermentation methods and organic grains.
          </p>
          <div style={styles.heroButtonGroup}>
            <a href="#features" style={styles.btnPrimary}>Explore Menu</a>
            <a href="#testimony" style={styles.btnSecondary}>Read Reviews</a>
          </div>

          {/* Quick highlights bar */}
          <div style={styles.heroStats}>
            <div>
              <span style={styles.statNumber}>100%</span>
              <span style={styles.statLabel}>Organic Flour</span>
            </div>
            <div style={styles.statDivider} />
            <div>
              <span style={styles.statNumber}>36 hrs</span>
              <span style={styles.statLabel}>Slow Ferment</span>
            </div>
            <div style={styles.statDivider} />
            <div>
              <span style={styles.statNumber}>05:00 AM</span>
              <span style={styles.statLabel}>Daily First Bake</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: FEATURES / WHAT MAKES US SPECIAL ─── */}
      <section id="features" style={styles.featuresSection}>
        <div style={styles.container}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionTag}>OUR CRAFT</span>
            <h2 style={styles.sectionTitle}>Why Choose Our Bakery?</h2>
            <p style={styles.sectionDesc}>
              We don't take shortcuts. Every single loaf and pastry tells a story of patience, passion, and premium ingredients.
            </p>
          </div>

          <div style={styles.grid3}>
            <div style={styles.featureCard}>
              <div style={styles.iconWrapper}>🌾</div>
              <h3 style={styles.cardTitle}>Stone-Milled Organic Flour</h3>
              <p style={styles.cardText}>
                Locally sourced unbleached wheat milled slowly to keep all natural nutrients, aroma, and rich flavor intact.
              </p>
            </div>

            <div style={styles.featureCard}>
              <div style={styles.iconWrapper}>🥐</div>
              <h3 style={styles.cardTitle}>Pure Normandy Butter</h3>
              <p style={styles.cardText}>
                Layered meticulously by hand to achieve feather-light, crispy laminations and unforgettable flaky textures.
              </p>
            </div>

            <div style={styles.featureCard}>
              <div style={styles.iconWrapper}>⏰</div>
              <h3 style={styles.cardTitle}>abccccccc</h3>
              <p style={styles.cardText}>
                Naturally fermented using our 12-year-old sourdough starter, yielding tender crumb, easier digestion, and complex taste.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: TESTIMONY / CUSTOMER REVIEWS ─── */}
      <section id="testimony" style={styles.testimonySection}>
        <div style={styles.container}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionTag}>COMMUNITY LOVE</span>
            <h2 style={styles.sectionTitle}>What Our Patrons Say</h2>
            <p style={styles.sectionDesc}>
              Hear from our regular morning coffee-and-pastry lovers and sourdough enthusiasts.
            </p>
          </div>

          <div style={styles.grid3}>
            <div style={styles.testimonialCard}>
              <div style={styles.stars}>★★★★★</div>
              <p style={styles.testimonialQuote}>
                "The almond croissant here ruined all other bakeries for me. Perfectly balanced sweetness with the crispest layers imaginable."
              </p>
              <div style={styles.userProfile}>
                <div style={styles.avatar}>SA</div>
                <div>
                  <h4 style={styles.userName}>Sarah Adams</h4>
                  <p style={styles.userRole}>Pastry Enthusiast</p>
                </div>
              </div>
            </div>

            <div style={styles.testimonialCard}>
              <div style={styles.stars}>★★★★★</div>
              <p style={styles.testimonialQuote}>
                "Their country sourdough has the perfect crust and an airy, chewy crumb. I pick up two loaves every single Saturday morning without fail."
              </p>
              <div style={styles.userProfile}>
                <div style={styles.avatar}>MK</div>
                <div>
                  <h4 style={styles.userName}>Marcus Kim</h4>
                  <p style={styles.userRole}>Home Chef & Local Resident</p>
                </div>
              </div>
            </div>

            <div style={styles.testimonialCard}>
              <div style={styles.stars}>★★★★★</div>
              <p style={styles.testimonialQuote}>
                "Not only are the cinnamon buns heavenly, but walking in smells like absolute comfort. The staff treat everyone like family."
              </p>
              <div style={styles.userProfile}>
                <div style={styles.avatar}>EL</div>
                <div>
                  <h4 style={styles.userName}>Elena Lopez</h4>
                  <p style={styles.userRole}>Coffee & Brunch Lover</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MainHome;

// ─── STYLES (Modern Warm Artisan Theme) ───
const styles: Record<string, React.CSSProperties> = {
  page: {
    fontFamily: "'Segoe UI', Roboto, Helvetica, sans-serif",
    color: '#292524',
    backgroundColor: '#fffdf9',
    lineHeight: 1.6,
    margin: 0,
    padding: 0,
  },
  container: {
    maxWidth: '1120px',
    margin: '0 auto',
    padding: '0 24px',
  },

  /* Hero Section */
  heroSection: {
    background: 'linear-gradient(135deg, #fef3c7 0%, #fffbeb 50%, #fed7aa 100%)',
    padding: '90px 24px 80px',
    textAlign: 'center',
    position: 'relative',
    borderBottom: '1px solid #fde68a',
  },
  heroOverlay: {
    maxWidth: '780px',
    margin: '0 auto',
  },
  heroBadge: {
    display: 'inline-block',
    backgroundColor: '#fef08a',
    color: '#854d0e',
    fontSize: '0.875rem',
    fontWeight: '600',
    padding: '6px 16px',
    borderRadius: '9999px',
    marginBottom: '20px',
  },
  heroTitle: {
    fontSize: '3rem',
    fontWeight: '800',
    letterSpacing: '-0.025em',
    color: '#451a03',
    lineHeight: 1.15,
    margin: '0 0 20px',
  },
  heroSubtitle: {
    fontSize: '1.15rem',
    color: '#78350f',
    marginBottom: '36px',
    maxWidth: '640px',
    marginInline: 'auto',
  },
  heroButtonGroup: {
    display: 'flex',
    gap: '14px',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: '50px',
  },
  btnPrimary: {
    backgroundColor: '#b45309',
    color: '#ffffff',
    textDecoration: 'none',
    fontWeight: '600',
    padding: '12px 28px',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(180, 83, 9, 0.25)',
  },
  btnSecondary: {
    backgroundColor: 'transparent',
    color: '#78350f',
    textDecoration: 'none',
    fontWeight: '600',
    padding: '12px 28px',
    borderRadius: '8px',
    border: '2px solid #b45309',
  },
  heroStats: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '30px',
    marginTop: '20px',
    paddingTop: '30px',
    borderTop: '1px solid rgba(217, 119, 6, 0.2)',
  },
  statNumber: {
    display: 'block',
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#78350f',
  },
  statLabel: {
    fontSize: '0.8rem',
    color: '#92400e',
    textTransform: 'uppercase',
  },
  statDivider: {
    width: '1px',
    height: '32px',
    backgroundColor: '#fcd34d',
  },

  /* Common Headers */
  sectionHeader: {
    textAlign: 'center',
    marginBottom: '50px',
  },
  sectionTag: {
    color: '#b45309',
    fontSize: '0.85rem',
    fontWeight: '700',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
  },
  sectionTitle: {
    fontSize: '2.25rem',
    color: '#451a03',
    fontWeight: '700',
    margin: '8px 0 12px',
  },
  sectionDesc: {
    color: '#78716c',
    fontSize: '1.05rem',
    maxWidth: '560px',
    margin: '0 auto',
  },

  /* Grid Layout */
  grid3: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '28px',
  },

  /* Features Section */
  featuresSection: {
    padding: '90px 0',
    backgroundColor: '#ffffff',
  },
  featureCard: {
    backgroundColor: '#fffdfa',
    border: '1px solid #f5ebe0',
    borderRadius: '14px',
    padding: '32px 24px',
    textAlign: 'center',
  },
  iconWrapper: {
    fontSize: '2.5rem',
    marginBottom: '16px',
    lineHeight: 1,
  },
  cardTitle: {
    fontSize: '1.25rem',
    color: '#451a03',
    fontWeight: '700',
    marginBottom: '10px',
  },
  cardText: {
    color: '#78716c',
    fontSize: '0.95rem',
    margin: 0,
  },

  /* Testimony Section */
  testimonySection: {
    padding: '90px 0 100px',
    backgroundColor: '#faf6f0',
  },
  testimonialCard: {
    backgroundColor: '#ffffff',
    border: '1px solid #ede3d6',
    borderRadius: '14px',
    padding: '28px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.03)',
  },
  stars: {
    color: '#f59e0b',
    fontSize: '1.1rem',
    marginBottom: '14px',
    letterSpacing: '2px',
  },
  testimonialQuote: {
    color: '#44403c',
    fontSize: '0.95rem',
    fontStyle: 'italic',
    marginBottom: '20px',
  },
  userProfile: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  avatar: {
    width: '42px',
    height: '42px',
    borderRadius: '50%',
    backgroundColor: '#fde68a',
    color: '#78350f',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '700',
    fontSize: '0.9rem',
  },
  userName: {
    fontSize: '0.95rem',
    color: '#292524',
    fontWeight: '700',
    margin: 0,
  },
  userRole: {
    fontSize: '0.8rem',
    color: '#a8a29e',
    margin: 0,
  },
};