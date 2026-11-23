import React, { useState } from 'react';
import Button from '../components/button';
import AppHeader from '../components/AppHeader';
import type { Patient } from '../types/patient';

export const PatientsManagement: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatientForQR, setSelectedPatientForQR] = useState<Patient | null>(null);

  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    gender: 'Male' as const,
    phone: '',
    telegramUsername: '',
    diagnosis: '',
    medication: '',
    dosage: '',
  });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const newMrn = `MRN-${Date.now().toString().slice(-5)}`;
    const newPatient: Patient = {
      id: Date.now().toString(),
      mrn: newMrn,
      fullName: formData.fullName,
      age: Number(formData.age),
      gender: formData.gender,
      phone: formData.phone,
      telegramUsername: formData.telegramUsername || undefined,
      telegramBotConnected: false,
      diagnosis: formData.diagnosis,
      medications: formData.medication
        ? [{ id: Date.now().toString(), name: formData.medication, dosage: formData.dosage, frequency: 'Daily' }]
        : [],
      registeredAt: new Date().toISOString().split('T')[0],
    };

    setPatients((prev) => [newPatient, ...prev]);
    setSelectedPatientForQR(newPatient);

    setFormData({
      fullName: '',
      age: '',
      gender: 'Male',
      phone: '',
      telegramUsername: '',
      diagnosis: '',
      medication: '',
      dosage: '',
    });
  };

  return (
    <div style={styles.page}>
      <AppHeader />

      <main style={styles.container}>
        {/* Title & Stats */}
        <div style={styles.pageHeader}>
          <div>
            <h1 style={styles.title}>Patient Intake & Telegram AI Bot Link</h1>
            <p style={styles.subtitle}>
              Register discharged patients and pair them with the Telegram AI Bot for daily home recovery monitoring.
            </p>
          </div>
          <div style={styles.headerStats}>
            <div style={styles.headerStatBox}>
              <span style={styles.statNum}>{patients.length}</span>
              <span style={styles.statLabel}>Enrolled Patients</span>
            </div>
          </div>
        </div>

        <div style={styles.layoutGrid}>
          {/* Intake Form */}
          <section style={styles.card}>
            <div style={styles.cardHeader}>
              <h2 style={styles.cardTitle}>New Patient Registration</h2>
              <span style={styles.cardBadge}>STEP 1: INTAKE</span>
            </div>

            <form onSubmit={handleRegister} style={styles.form}>
              <div style={styles.formGrid}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Patient Full Name *</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Ahmad Faiz" 
                    required 
                    value={formData.fullName} 
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} 
                    style={styles.input}
                  />
                </div>

                <div style={styles.formRowDouble}>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Age *</label>
                    <input 
                      type="number" 
                      placeholder="e.g. 48" 
                      required 
                      value={formData.age} 
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })} 
                      style={styles.input}
                    />
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Gender *</label>
                    <select 
                      value={formData.gender} 
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                      style={styles.select}
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Phone Number *</label>
                  <input 
                    type="tel" 
                    placeholder="e.g. +6012-3456789" 
                    required 
                    value={formData.phone} 
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })} 
                    style={styles.input}
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Telegram Handle (Optional)</label>
                  <input 
                    type="text" 
                    placeholder="e.g. @username" 
                    value={formData.telegramUsername} 
                    onChange={(e) => setFormData({ ...formData, telegramUsername: e.target.value })} 
                    style={styles.input}
                  />
                </div>

                <div style={styles.inputGroupFull}>
                  <label style={styles.label}>Clinical Diagnosis / Ward Note *</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Post-angioplasty recovery & Hypertension Stage 2" 
                    required 
                    value={formData.diagnosis} 
                    onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })} 
                    style={styles.input}
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Prescribed Medication</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Clopidogrel" 
                    value={formData.medication} 
                    onChange={(e) => setFormData({ ...formData, medication: e.target.value })} 
                    style={styles.input}
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Dosage Regimen</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 75mg once daily after meal" 
                    value={formData.dosage} 
                    onChange={(e) => setFormData({ ...formData, dosage: e.target.value })} 
                    style={styles.input}
                  />
                </div>
              </div>

              <div style={styles.formFooter}>
                <Button type="submit" variant="primary" style={{ padding: '12px 24px' }}>
                  Register & Generate Bot QR &rarr;
                </Button>
              </div>
            </form>
          </section>

          {/* Directory Table */}
          <section style={styles.card}>
            <div style={styles.cardHeader}>
              <h2 style={styles.cardTitle}>Live Patient Directory</h2>
              <span style={styles.countBadge}>{patients.length} Registered</span>
            </div>

            {patients.length === 0 ? (
              <div style={styles.emptyState}>
                <div style={styles.emptyIcon}>📋</div>
                <h3 style={styles.emptyTitle}>No patients registered in this session</h3>
                <p style={styles.emptyText}>
                  Use the registration form on the left to add a patient and generate their personalized Telegram AI pairing code.
                </p>
              </div>
            ) : (
              <div style={styles.tableWrapper}>
                <table style={styles.table}>
                  <thead>
                    <tr style={styles.thRow}>
                      <th style={styles.th}>MRN</th>
                      <th style={styles.th}>Patient</th>
                      <th style={styles.th}>Diagnosis</th>
                      <th style={styles.th}>Medication</th>
                      <th style={styles.th}>Bot Link</th>
                      <th style={styles.th}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patients.map((p) => (
                      <tr key={p.id} style={styles.tr}>
                        <td style={styles.td}>
                          <span style={styles.mrnTag}>{p.mrn}</span>
                        </td>
                        <td style={styles.td}>
                          <div style={{ fontWeight: '600', color: '#0f172a' }}>{p.fullName}</div>
                          <div style={{ fontSize: '0.78rem', color: '#64748b' }}>{p.age}y &bull; {p.gender}</div>
                        </td>
                        <td style={styles.td}>{p.diagnosis}</td>
                        <td style={styles.td}>
                          {p.medications.length > 0 ? (
                            p.medications.map((m) => (
                              <span key={m.id} style={styles.medPill}>
                                {m.name} ({m.dosage})
                              </span>
                            ))
                          ) : (
                            <span style={{ color: '#94a3b8' }}>None logged</span>
                          )}
                        </td>
                        <td style={styles.td}>
                          <span style={styles.botStatusBadge}>
                            <span style={styles.onlineDot} /> Ready to Pair
                          </span>
                        </td>
                        <td style={styles.td}>
                          <Button 
                            variant="secondary" 
                            style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                            onClick={() => setSelectedPatientForQR(p)}
                          >
                            Open QR
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>

        {/* Modal: QR Code */}
        {selectedPatientForQR && (
          <div style={styles.modalOverlay} onClick={() => setSelectedPatientForQR(null)}>
            <div style={styles.modalBox} onClick={(e) => e.stopPropagation()}>
              <div style={styles.modalTop}>
                <div>
                  <span style={styles.modalSub}>TELEGRAM AI ONBOARDING</span>
                  <h3 style={styles.modalHeading}>{selectedPatientForQR.fullName}</h3>
                  <p style={styles.modalDesc}>MRN: <strong>{selectedPatientForQR.mrn}</strong></p>
                </div>
                <button onClick={() => setSelectedPatientForQR(null)} style={styles.closeBtn}>&times;</button>
              </div>

              <div style={styles.qrArea}>
                <div style={styles.qrCard}>
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https://t.me/HealthGuardianBot?start=${selectedPatientForQR.mrn}`}
                    alt="Telegram Bot QR"
                    style={{ width: '180px', height: '180px', display: 'block' }}
                  />
                </div>
                <p style={styles.qrInstructions}>
                  Instruct the patient to scan this code using their phone camera or Telegram to immediately activate daily checks.
                </p>
              </div>

              <div style={styles.modalBottom}>
                <a
                  href={`https://t.me/HealthGuardianBot?start=${selectedPatientForQR.mrn}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{ textDecoration: 'none' }}
                >
                  <Button variant="primary">Launch Bot Link 🚀</Button>
                </a>
                <Button variant="secondary" onClick={() => setSelectedPatientForQR(null)}>
                  Dismiss
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export const PatientManagement = PatientsManagement;
export default PatientsManagement;

const styles: Record<string, React.CSSProperties> = {
  page: {
    backgroundColor: '#f8fafc',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  container: {
    maxWidth: '1240px',
    margin: '0 auto',
    padding: '36px 24px 60px',
    width: '100%',
  },
  pageHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '32px',
    flexWrap: 'wrap',
    gap: '20px',
  },
  title: {
    fontFamily: '"Plus Jakarta Sans", sans-serif',
    fontSize: '2rem',
    fontWeight: '800',
    color: '#0f172a',
    margin: '0 0 6px',
    letterSpacing: '-0.02em',
  },
  subtitle: {
    fontSize: '0.95rem',
    color: '#64748b',
    margin: 0,
    maxWidth: '680px',
  },
  headerStats: {
    display: 'flex',
    gap: '12px',
  },
  headerStatBox: {
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '12px 20px',
    textAlign: 'center',
    boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)',
  },
  statNum: {
    display: 'block',
    fontSize: '1.4rem',
    fontWeight: '800',
    color: '#0f766e',
    fontFamily: '"Plus Jakarta Sans", sans-serif',
  },
  statLabel: {
    fontSize: '0.72rem',
    fontWeight: '600',
    color: '#64748b',
    textTransform: 'uppercase',
  },
  layoutGrid: {
    display: 'grid',
    gridTemplateColumns: '420px 1fr',
    gap: '28px',
    alignItems: 'flex-start',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 2px 4px rgba(15, 23, 42, 0.03)',
    padding: '28px',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    paddingBottom: '14px',
    borderBottom: '1px solid #f1f5f9',
  },
  cardTitle: {
    fontFamily: '"Plus Jakarta Sans", sans-serif',
    fontSize: '1.15rem',
    fontWeight: '700',
    color: '#0f172a',
    margin: 0,
  },
  cardBadge: {
    fontSize: '0.68rem',
    fontWeight: '800',
    color: '#0f766e',
    backgroundColor: '#f0fdfa',
    border: '1px solid #ccfbf1',
    padding: '2px 8px',
    borderRadius: '12px',
  },
  countBadge: {
    fontSize: '0.78rem',
    fontWeight: '600',
    color: '#475569',
    backgroundColor: '#f1f5f9',
    padding: '3px 8px',
    borderRadius: '6px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  formGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  formRowDouble: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  inputGroupFull: {
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
    fontSize: '0.88rem',
    outline: 'none',
    backgroundColor: '#ffffff',
    color: '#0f172a',
    transition: 'border-color 150ms ease',
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
  },
  formFooter: {
    marginTop: '10px',
  },
  emptyState: {
    padding: '50px 20px',
    textAlign: 'center',
    color: '#64748b',
  },
  emptyIcon: {
    fontSize: '2.5rem',
    marginBottom: '10px',
  },
  emptyTitle: {
    fontSize: '1rem',
    fontWeight: '700',
    color: '#0f172a',
    margin: '0 0 6px',
  },
  emptyText: {
    fontSize: '0.88rem',
    maxWidth: '360px',
    margin: '0 auto',
    lineHeight: 1.5,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
    fontSize: '0.88rem',
  },
  thRow: {
    borderBottom: '1px solid #e2e8f0',
  },
  th: {
    padding: '12px 14px',
    fontSize: '0.72rem',
    fontWeight: '700',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
  },
  tr: {
    borderBottom: '1px solid #f1f5f9',
  },
  td: {
    padding: '14px',
    color: '#334155',
    verticalAlign: 'middle',
  },
  mrnTag: {
    fontFamily: 'monospace',
    fontWeight: '700',
    backgroundColor: '#f1f5f9',
    color: '#0f766e',
    padding: '3px 6px',
    borderRadius: '4px',
    fontSize: '0.8rem',
  },
  medPill: {
    display: 'inline-block',
    backgroundColor: '#eff6ff',
    color: '#1d4ed8',
    padding: '2px 8px',
    borderRadius: '12px',
    fontSize: '0.75rem',
    fontWeight: '600',
  },
  botStatusBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    backgroundColor: '#f0fdfa',
    color: '#0f766e',
    padding: '3px 8px',
    borderRadius: '20px',
    fontSize: '0.75rem',
    fontWeight: '600',
  },
  onlineDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: '#10b981',
  },
  modalOverlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modalBox: {
    backgroundColor: '#ffffff',
    borderRadius: '20px',
    padding: '32px',
    width: '90%',
    maxWidth: '440px',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  },
  modalTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '20px',
  },
  modalSub: {
    fontSize: '0.7rem',
    fontWeight: '800',
    letterSpacing: '0.06em',
    color: '#0f766e',
  },
  modalHeading: {
    fontFamily: '"Plus Jakarta Sans", sans-serif',
    fontSize: '1.4rem',
    fontWeight: '800',
    color: '#0f172a',
    margin: '4px 0 2px',
  },
  modalDesc: {
    fontSize: '0.88rem',
    color: '#64748b',
    margin: 0,
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    fontSize: '1.4rem',
    color: '#64748b',
    cursor: 'pointer',
  },
  qrArea: {
    textAlign: 'center',
    padding: '16px 0',
  },
  qrCard: {
    display: 'inline-block',
    padding: '16px',
    borderRadius: '16px',
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
  },
  qrInstructions: {
    fontSize: '0.84rem',
    color: '#64748b',
    marginTop: '16px',
    lineHeight: 1.5,
  },
  modalBottom: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'center',
    marginTop: '20px',
  },
};
