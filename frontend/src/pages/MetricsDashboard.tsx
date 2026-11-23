import React, { useState } from 'react';
import Button from '../components/button';
import AppHeader from '../components/AppHeader';
import type { SideEffectReport } from '../types/patient';

export const MetricsDashboard: React.FC = () => {
  const [reports, setReports] = useState<SideEffectReport[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newReport, setNewReport] = useState({
    patientName: '',
    medicationName: '',
    symptom: '',
    severity: 'Medium' as const,
  });

  const handleAddLiveReport = (e: React.FormEvent) => {
    e.preventDefault();
    const created: SideEffectReport = {
      id: Date.now().toString(),
      patientId: `P-${Date.now().toString().slice(-4)}`,
      patientName: newReport.patientName,
      medicationName: newReport.medicationName,
      symptom: newReport.symptom,
      severity: newReport.severity,
      reportedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setReports((prev) => [created, ...prev]);
    setShowAddModal(false);
    setNewReport({ patientName: '', medicationName: '', symptom: '', severity: 'Medium' });
  };

  const totalReports = reports.length;
  const criticalCount = reports.filter((r) => r.severity === 'Critical' || r.severity === 'High').length;
  const normalCount = reports.filter((r) => r.severity === 'Low' || r.severity === 'Medium').length;

  return (
    <div style={styles.page}>
      <AppHeader />

      <main style={styles.container}>
        <div style={styles.pageHeader}>
          <div>
            <h1 style={styles.title}>Medication & Adverse Reaction Metrics</h1>
            <p style={styles.subtitle}>
              Live surveillance stream tracking AI-reported symptoms and triaged drug interactions from outpatient Telegram feeds.
            </p>
          </div>
          <div>
            <Button variant="primary" onClick={() => setShowAddModal(true)}>
              + Log Live Side-Effect
            </Button>
          </div>
        </div>

        {/* Dynamic Metrics Cards */}
        <div style={styles.metricsGrid}>
          <div style={styles.metricCard}>
            <span style={styles.metricLabel}>Total Telemetry Events</span>
            <div style={styles.metricValue}>{totalReports}</div>
            <span style={styles.metricSub}>Across registered outpatients</span>
          </div>

          <div style={styles.metricCard}>
            <span style={styles.metricLabel}>High & Critical Flags</span>
            <div style={{ ...styles.metricValue, color: criticalCount > 0 ? '#dc2626' : '#0f172a' }}>
              {criticalCount}
            </div>
            <span style={styles.metricSub}>Requiring physician attention</span>
          </div>

          <div style={styles.metricCard}>
            <span style={styles.metricLabel}>Mild / Monitored Reactions</span>
            <div style={styles.metricValue}>{normalCount}</div>
            <span style={styles.metricSub}>Symptom self-resolving profile</span>
          </div>

          <div style={styles.metricCard}>
            <span style={styles.metricLabel}>Surveillance Stream</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
              <span style={styles.livePulse} />
              <span style={{ fontWeight: '700', color: '#0f766e', fontSize: '1.1rem' }}>Active & Triaging</span>
            </div>
            <span style={styles.metricSub}>Connected to Telegram Webhook</span>
          </div>
        </div>

        {/* Feed Table */}
        <section style={styles.feedCard}>
          <div style={styles.feedHeader}>
            <h2 style={styles.feedTitle}>Real-time Adverse Event Stream</h2>
            <span style={styles.feedCount}>{reports.length} incoming alerts</span>
          </div>

          {reports.length === 0 ? (
            <div style={styles.emptyFeed}>
              <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>📊</div>
              <h3 style={styles.emptyTitle}>Surveillance Stream Idle</h3>
              <p style={styles.emptyText}>
                No adverse reactions logged in this session. Click <strong>"+ Log Live Side-Effect"</strong> above to simulate an incoming patient report during your demonstration.
              </p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={styles.table}>
                <thead>
                  <tr style={styles.thRow}>
                    <th style={styles.th}>Triage Severity</th>
                    <th style={styles.th}>Patient</th>
                    <th style={styles.th}>Medication</th>
                    <th style={styles.th}>Reported Symptom</th>
                    <th style={styles.th}>Time</th>
                    <th style={styles.th}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map((r) => {
                    const isSevere = r.severity === 'Critical' || r.severity === 'High';
                    return (
                      <tr key={r.id} style={styles.tr}>
                        <td style={styles.td}>
                          <span style={{
                            ...styles.severityBadge,
                            backgroundColor: isSevere ? '#fee2e2' : '#fef3c7',
                            color: isSevere ? '#991b1b' : '#92400e',
                            borderColor: isSevere ? '#fecaca' : '#fde68a',
                          }}>
                            {r.severity}
                          </span>
                        </td>
                        <td style={styles.td}>
                          <strong style={{ color: '#0f172a' }}>{r.patientName}</strong>
                          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{r.patientId}</div>
                        </td>
                        <td style={styles.td}>
                          <span style={styles.medTag}>{r.medicationName}</span>
                        </td>
                        <td style={styles.td}>{r.symptom}</td>
                        <td style={styles.td}>{r.reportedAt}</td>
                        <td style={styles.td}>
                          <span style={styles.reviewBadge}>Needs Review</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Modal: Log Side-Effect */}
        {showAddModal && (
          <div style={styles.modalOverlay} onClick={() => setShowAddModal(false)}>
            <div style={styles.modalBox} onClick={(e) => e.stopPropagation()}>
              <h3 style={styles.modalTitle}>Log Patient Adverse Reaction</h3>
              <p style={styles.modalSub}>Simulate or manually register an incoming Telegram AI symptom report.</p>

              <form onSubmit={handleAddLiveReport} style={styles.modalForm}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Patient Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ahmad Faiz"
                    value={newReport.patientName}
                    onChange={(e) => setNewReport({ ...newReport, patientName: e.target.value })}
                    style={styles.input}
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Prescribed Medication *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lisinopril 10mg"
                    value={newReport.medicationName}
                    onChange={(e) => setNewReport({ ...newReport, medicationName: e.target.value })}
                    style={styles.input}
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Reported Symptoms / Description *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Persistent dry cough and dizziness"
                    value={newReport.symptom}
                    onChange={(e) => setNewReport({ ...newReport, symptom: e.target.value })}
                    style={styles.input}
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>AI Triage Severity</label>
                  <select
                    value={newReport.severity}
                    onChange={(e) => setNewReport({ ...newReport, severity: e.target.value as any })}
                    style={styles.select}
                  >
                    <option value="Low">Low - Mild tolerance issue</option>
                    <option value="Medium">Medium - Notable discomfort</option>
                    <option value="High">High - Impairing daily activities</option>
                    <option value="Critical">Critical - Urgent clinical review</option>
                  </select>
                </div>

                <div style={styles.modalActions}>
                  <Button type="submit" variant="primary">Submit Event to Feed</Button>
                  <Button type="button" variant="secondary" onClick={() => setShowAddModal(false)}>Cancel</Button>
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
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '20px',
    marginBottom: '32px',
  },
  metricCard: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    border: '1px solid #e2e8f0',
    padding: '24px',
    boxShadow: '0 2px 4px rgba(15, 23, 42, 0.03)',
  },
  metricLabel: {
    fontSize: '0.75rem',
    fontWeight: '700',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
  },
  metricValue: {
    fontFamily: '"Plus Jakarta Sans", sans-serif',
    fontSize: '2.4rem',
    fontWeight: '800',
    color: '#0f172a',
    margin: '8px 0 4px',
  },
  metricSub: {
    fontSize: '0.8rem',
    color: '#94a3b8',
  },
  livePulse: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: '#10b981',
    boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.25)',
  },
  feedCard: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 2px 4px rgba(15, 23, 42, 0.03)',
    padding: '28px',
  },
  feedHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    paddingBottom: '14px',
    borderBottom: '1px solid #f1f5f9',
  },
  feedTitle: {
    fontFamily: '"Plus Jakarta Sans", sans-serif',
    fontSize: '1.15rem',
    fontWeight: '700',
    color: '#0f172a',
    margin: 0,
  },
  feedCount: {
    fontSize: '0.78rem',
    fontWeight: '600',
    color: '#475569',
    backgroundColor: '#f1f5f9',
    padding: '3px 8px',
    borderRadius: '6px',
  },
  emptyFeed: {
    padding: '60px 20px',
    textAlign: 'center',
    color: '#64748b',
  },
  emptyTitle: {
    fontSize: '1.05rem',
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
  severityBadge: {
    display: 'inline-block',
    padding: '2px 8px',
    borderRadius: '6px',
    fontSize: '0.75rem',
    fontWeight: '700',
    border: '1px solid transparent',
  },
  medTag: {
    backgroundColor: '#f1f5f9',
    color: '#0f172a',
    padding: '3px 8px',
    borderRadius: '6px',
    fontSize: '0.8rem',
    fontWeight: '600',
  },
  reviewBadge: {
    fontSize: '0.75rem',
    fontWeight: '600',
    color: '#0284c7',
    backgroundColor: '#e0f2fe',
    padding: '2px 8px',
    borderRadius: '12px',
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
  select: {
    padding: '10px 12px',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    fontSize: '0.88rem',
    outline: 'none',
    backgroundColor: '#ffffff',
    cursor: 'pointer',
  },
  modalActions: {
    display: 'flex',
    gap: '10px',
    marginTop: '12px',
  },
};

export default MetricsDashboard;