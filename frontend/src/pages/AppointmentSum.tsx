import React, { useState } from 'react';
import Button from '../components/button';
import AppHeader from '../components/AppHeader';
import type { Appointment } from '../types/patient';

export const AppointmentSum: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [formData, setFormData] = useState({
    patientName: '',
    mrn: '',
    dateTime: '',
    department: 'General Outpatient',
    primaryComplaint: '',
  });

  const handleCreateAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    const newApt: Appointment = {
      id: Date.now().toString(),
      patientId: `P-${Date.now().toString().slice(-4)}`,
      patientName: formData.patientName,
      mrn: formData.mrn || `MRN-${Date.now().toString().slice(-4)}`,
      dateTime: formData.dateTime || 'Today, 2:30 PM',
      department: formData.department,
      status: 'Confirmed',
      primaryComplaint: formData.primaryComplaint,
    };
    setAppointments((prev) => [newApt, ...prev]);
    setShowScheduleModal(false);
    setFormData({ patientName: '', mrn: '', dateTime: '', department: 'General Outpatient', primaryComplaint: '' });
  };

  const updateStatus = (id: string, newStatus: Appointment['status']) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status: newStatus } : apt))
    );
  };

  return (
    <div style={styles.page}>
      <AppHeader />

      <main style={styles.container}>
        <div style={styles.pageHeader}>
          <div>
            <h1 style={styles.title}>Clinical Appointment Summaries</h1>
            <p style={styles.subtitle}>
              Manage scheduled consultation cards, review AI Bot check-in notes, and process outpatient arrivals.
            </p>
          </div>
          <div>
            <Button variant="primary" onClick={() => setShowScheduleModal(true)}>
              + Schedule Consultation
            </Button>
          </div>
        </div>

        {appointments.length === 0 ? (
          <div style={styles.emptyContainer}>
            <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>📅</div>
            <h3 style={styles.emptyTitle}>No Consultations Scheduled</h3>
            <p style={styles.emptyText}>
              Your live schedule is currently clear. Click <strong>"+ Schedule Consultation"</strong> to create a new appointment card live.
            </p>
          </div>
        ) : (
          <div style={styles.cardsGrid}>
            {appointments.map((apt) => {
              const isDone = apt.status === 'Completed';
              return (
                <div key={apt.id} style={styles.card}>
                  <div style={styles.cardHeader}>
                    <span style={styles.mrnTag}>{apt.mrn}</span>
                    <span style={{
                      ...styles.statusPill,
                      backgroundColor: isDone ? '#ecfdf5' : '#eff6ff',
                      color: isDone ? '#065f46' : '#1d4ed8',
                      borderColor: isDone ? '#a7f3d0' : '#bfdbfe',
                    }}>
                      {apt.status}
                    </span>
                  </div>

                  <h3 style={styles.patientName}>{apt.patientName}</h3>
                  <div style={styles.deptBadge}>{apt.department}</div>

                  <div style={styles.detailsBox}>
                    <div style={styles.detailRow}>
                      <span style={styles.detailLabel}>Scheduled:</span>
                      <span style={styles.detailValue}>{apt.dateTime}</span>
                    </div>
                    <div style={styles.detailRow}>
                      <span style={styles.detailLabel}>Chief Concern:</span>
                      <span style={styles.detailValue}>{apt.primaryComplaint}</span>
                    </div>
                  </div>

                  <div style={styles.cardFooter}>
                    {!isDone ? (
                      <Button variant="primary" onClick={() => updateStatus(apt.id, 'Completed')} style={{ width: '100%' }}>
                        Check In Patient &rarr;
                      </Button>
                    ) : (
                      <div style={styles.completedBadge}>
                        ✓ Patient Checked In
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Modal */}
        {showScheduleModal && (
          <div style={styles.modalOverlay} onClick={() => setShowScheduleModal(false)}>
            <div style={styles.modalBox} onClick={(e) => e.stopPropagation()}>
              <h3 style={styles.modalTitle}>Schedule Consultation</h3>
              <p style={styles.modalSub}>Book a live follow-up slot for outpatient medication evaluation.</p>

              <form onSubmit={handleCreateAppointment} style={styles.modalForm}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Patient Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ahmad Faiz"
                    value={formData.patientName}
                    onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                    style={styles.input}
                  />
                </div>

                <div style={styles.formRow}>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>MRN Code</label>
                    <input
                      type="text"
                      placeholder="e.g. MRN-20941"
                      value={formData.mrn}
                      onChange={(e) => setFormData({ ...formData, mrn: e.target.value })}
                      style={styles.input}
                    />
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Slot / Time</label>
                    <input
                      type="text"
                      placeholder="e.g. Today, 3:30 PM"
                      value={formData.dateTime}
                      onChange={(e) => setFormData({ ...formData, dateTime: e.target.value })}
                      style={styles.input}
                    />
                  </div>
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Clinical Department</label>
                  <input
                    type="text"
                    placeholder="e.g. Cardiology, Endocrinology"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    style={styles.input}
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Primary Complaint / Evaluation Goal *</label>
                  <textarea
                    required
                    placeholder="e.g. Routine blood pressure check and beta-blocker tolerance review"
                    value={formData.primaryComplaint}
                    onChange={(e) => setFormData({ ...formData, primaryComplaint: e.target.value })}
                    style={{ ...styles.input, height: '70px', resize: 'vertical' }}
                  />
                </div>

                <div style={styles.modalActions}>
                  <Button type="submit" variant="primary">Confirm Appointment</Button>
                  <Button type="button" variant="secondary" onClick={() => setShowScheduleModal(false)}>Cancel</Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

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
  emptyContainer: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    border: '1px solid #e2e8f0',
    padding: '60px 24px',
    textAlign: 'center',
    color: '#64748b',
    boxShadow: '0 2px 4px rgba(15, 23, 42, 0.03)',
  },
  emptyTitle: {
    fontSize: '1.1rem',
    fontWeight: '700',
    color: '#0f172a',
    margin: '0 0 6px',
  },
  emptyText: {
    fontSize: '0.88rem',
    maxWidth: '420px',
    margin: '0 auto',
    lineHeight: 1.5,
  },
  cardsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
    gap: '24px',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    border: '1px solid #e2e8f0',
    padding: '24px',
    boxShadow: '0 2px 4px rgba(15, 23, 42, 0.03)',
    display: 'flex',
    flexDirection: 'column',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '14px',
  },
  mrnTag: {
    fontFamily: 'monospace',
    fontWeight: '700',
    backgroundColor: '#f1f5f9',
    color: '#0f766e',
    padding: '3px 8px',
    borderRadius: '4px',
    fontSize: '0.78rem',
  },
  statusPill: {
    fontSize: '0.72rem',
    fontWeight: '700',
    padding: '3px 9px',
    borderRadius: '20px',
    border: '1px solid transparent',
  },
  patientName: {
    fontFamily: '"Plus Jakarta Sans", sans-serif',
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#0f172a',
    margin: '0 0 4px',
  },
  deptBadge: {
    fontSize: '0.82rem',
    color: '#64748b',
    marginBottom: '16px',
  },
  detailsBox: {
    backgroundColor: '#f8fafc',
    borderRadius: '10px',
    padding: '14px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginBottom: '20px',
    flexGrow: 1,
  },
  detailRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    fontSize: '0.85rem',
  },
  detailLabel: {
    color: '#64748b',
    fontSize: '0.75rem',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  detailValue: {
    color: '#1e293b',
    fontWeight: '500',
  },
  cardFooter: {
    marginTop: 'auto',
  },
  completedBadge: {
    backgroundColor: '#ecfdf5',
    color: '#065f46',
    border: '1px solid #a7f3d0',
    borderRadius: '8px',
    padding: '10px',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: '0.86rem',
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
    maxWidth: '460px',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  },
  modalTitle: {
    fontFamily: '"Plus Jakarta Sans", sans-serif',
    fontSize: '1.3rem',
    fontWeight: '800',
    color: '#0f172a',
    margin: '0 0 4px',
  },
  modalSub: {
    fontSize: '0.85rem',
    color: '#64748b',
    margin: '0 0 20px',
  },
  modalForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
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
    fontSize: '0.88rem',
    outline: 'none',
    backgroundColor: '#ffffff',
  },
  modalActions: {
    display: 'flex',
    gap: '10px',
    marginTop: '12px',
  },
};

export default AppointmentSum;
