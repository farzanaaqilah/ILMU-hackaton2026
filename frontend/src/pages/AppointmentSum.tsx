import React, { useState } from 'react';
import Button from '../components/button';
import type { Appointment } from '../types/patient';

export const AppointmentSum: React.FC = () => {
  // Empty state: ready for live demo insertions
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
    <div style={styles.container}>
      <header style={styles.header}>
        <div>
          <h1 style={styles.title}>Appointment Summary Cards</h1>
          <p style={styles.subtitle}>Live schedule tracking, consultation check-ins, and doctor review cards</p>
        </div>
        <Button onClick={() => setShowScheduleModal(true)}>+ Schedule Appointment</Button>
      </header>

      {appointments.length === 0 ? (
        <div style={styles.emptyState}>
          <p>No scheduled appointments yet. Click <strong>"+ Schedule Appointment"</strong> to create one live.</p>
        </div>
      ) : (
        <div style={styles.cardsGrid}>
          {appointments.map((apt) => (
            <div key={apt.id} style={styles.card}>
              <div style={styles.cardHeader}>
                <span style={styles.mrnBadge}>{apt.mrn}</span>
                <span style={{
                  ...styles.statusPill,
                  backgroundColor: apt.status === 'Completed' ? '#dcfce7' : '#e0f2fe',
                  color: apt.status === 'Completed' ? '#15803d' : '#0369a1',
                }}>
                  {apt.status}
                </span>
              </div>

              <h3 style={styles.patientName}>{apt.patientName}</h3>
              <p style={styles.deptLabel}>{apt.department}</p>

              <div style={styles.detailsBox}>
                <p style={{ margin: '4px 0' }}><strong>Scheduled:</strong> {apt.dateTime}</p>
                <p style={{ margin: '4px 0' }}><strong>Complaint:</strong> {apt.primaryComplaint}</p>
              </div>

              <div style={styles.cardFooter}>
                {apt.status !== 'Completed' ? (
                  <Button onClick={() => updateStatus(apt.id, 'Completed')}>
                    Check In Patient
                  </Button>
                ) : (
                  <span style={styles.checkedInText}>✅ Checked In</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showScheduleModal && (
        <div style={styles.modalOverlay} onClick={() => setShowScheduleModal(false)}>
          <div style={styles.modalBody} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ marginTop: 0 }}>Schedule Live Appointment</h3>
            <form onSubmit={handleCreateAppointment} style={styles.modalForm}>
              <input 
                type="text" 
                placeholder="Patient Name *" 
                required 
                value={formData.patientName} 
                onChange={(e) => setFormData({ ...formData, patientName: e.target.value })} 
                style={styles.modalInput}
              />
              <input 
                type="text" 
                placeholder="MRN (e.g. MRN-10023)" 
                value={formData.mrn} 
                onChange={(e) => setFormData({ ...formData, mrn: e.target.value })} 
                style={styles.modalInput}
              />
              <input 
                type="text" 
                placeholder="Date & Time (e.g. Today, 3:00 PM)" 
                value={formData.dateTime} 
                onChange={(e) => setFormData({ ...formData, dateTime: e.target.value })} 
                style={styles.modalInput}
              />
              <input 
                type="text" 
                placeholder="Department (e.g. Cardiology, Outpatient)" 
                value={formData.department} 
                onChange={(e) => setFormData({ ...formData, department: e.target.value })} 
                style={styles.modalInput}
              />
              <textarea 
                placeholder="Primary Complaint / Reason for visit" 
                required 
                value={formData.primaryComplaint} 
                onChange={(e) => setFormData({ ...formData, primaryComplaint: e.target.value })} 
                style={{ ...styles.modalInput, height: '80px' }}
              />
              <div style={{ marginTop: '10px' }}>
                <Button type="submit">Confirm & Add Card</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    fontFamily: '"Rubik", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    padding: '36px 24px',
    maxWidth: '1200px',
    margin: '0 auto',
    minHeight: '100vh',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '32px',
    flexWrap: 'wrap',
    gap: '16px',
  },
  title: {
    fontSize: '2rem',
    fontWeight: '800',
    color: '#0f172a',
    margin: '0 0 6px',
  },
  subtitle: {
    fontSize: '0.95rem',
    color: '#64748b',
    margin: 0,
  },
  emptyState: {
    backgroundColor: '#ffffff',
    padding: '60px 24px',
    borderRadius: '16px',
    textAlign: 'center',
    border: '2px dashed #cbd5e1',
    color: '#64748b',
  },
  cardsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '24px',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '24px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
  },
  mrnBadge: {
    backgroundColor: '#f1f5f9',
    padding: '4px 8px',
    borderRadius: '6px',
    fontSize: '0.8rem',
    fontWeight: '700',
    color: '#334155',
  },
  statusPill: {
    padding: '4px 10px',
    borderRadius: '9999px',
    fontSize: '0.75rem',
    fontWeight: '700',
  },
  patientName: {
    fontSize: '1.25rem',
    fontWeight: '700',
    margin: '0 0 4px',
    color: '#0f172a',
  },
  deptLabel: {
    fontSize: '0.85rem',
    color: '#64748b',
    margin: '0 0 16px',
  },
  detailsBox: {
    backgroundColor: '#f8fafc',
    padding: '12px',
    borderRadius: '8px',
    fontSize: '0.88rem',
    color: '#334155',
    marginBottom: '16px',
  },
  cardFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  checkedInText: {
    color: '#16a34a',
    fontWeight: '700',
    fontSize: '0.9rem',
  },
  modalOverlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalBody: {
    backgroundColor: '#ffffff',
    borderRadius: '20px',
    padding: '30px',
    width: '90%',
    maxWidth: '460px',
    boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
  },
  modalForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  modalInput: {
    padding: '10px 14px',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    fontFamily: 'inherit',
    fontSize: '0.9rem',
  },
};

export default AppointmentSum;
