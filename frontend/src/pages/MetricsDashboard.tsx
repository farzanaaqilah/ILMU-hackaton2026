import React, { useState } from 'react';
import Button from '../components/button';
import type { SideEffectReport } from '../types/patient';

export const MetricsDashboard: React.FC = () => {
  // Empty by default for live insertion
  const [reports, setReports] = useState<SideEffectReport[]>([]);
  
  // Live simulation input states (for testing/demoing symptom reports live)
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

  // Live computed metrics
  const totalReports = reports.length;
  const criticalCount = reports.filter((r) => r.severity === 'Critical' || r.severity === 'High').length;

  return (
    <div className="metrics-page">
      <header className="page-header">
        <div>
          <h1>Medicine & Side-Effect Metrics</h1>
          <p>Real-time surveillance calculated live from patient Telegram AI reports</p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>+ Log Live Side-Effect</Button>
      </header>

      {/* Dynamic Summary Stats */}
      <div className="metrics-grid">
        <div className="metric-box">
          <span className="label">Total Reports Logged</span>
          <span className="value">{totalReports}</span>
        </div>
        <div className="metric-box">
          <span className="label">High / Critical Alerts</span>
          <span className="value alert">{criticalCount}</span>
        </div>
        <div className="metric-box">
          <span className="label">Live System Status</span>
          <span className="value ok">Active & Listening</span>
        </div>
      </div>

      {/* Live Table or Empty State */}
      <section className="feed-card">
        <h3>Live Incoming Symptom Reports</h3>
        {reports.length === 0 ? (
          <div className="empty-state">
            <p>No side-effects reported yet. Click <strong>"+ Log Live Side-Effect"</strong> or submit via Telegram bot to view real-time data.</p>
          </div>
        ) : (
          <table className="live-table">
            <thead>
              <tr>
                <th>Severity</th>
                <th>Patient</th>
                <th>Medication</th>
                <th>Symptom</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((r) => (
                <tr key={r.id}>
                  <td><span className={`badge ${r.severity.toLowerCase()}`}>{r.severity}</span></td>
                  <td><strong>{r.patientName}</strong></td>
                  <td>{r.medicationName}</td>
                  <td>{r.symptom}</td>
                  <td>{r.reportedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* Modal to quickly insert live side-effects during demo */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-body" onClick={(e) => e.stopPropagation()}>
            <h3>Log Side-Effect Report</h3>
            <form onSubmit={handleAddLiveReport}>
              <input 
                type="text" 
                placeholder="Patient Name" 
                required 
                value={newReport.patientName} 
                onChange={(e) => setNewReport({ ...newReport, patientName: e.target.value })} 
              />
              <input 
                type="text" 
                placeholder="Medication Name (e.g. Lisinopril 10mg)" 
                required 
                value={newReport.medicationName} 
                onChange={(e) => setNewReport({ ...newReport, medicationName: e.target.value })} 
              />
              <input 
                type="text" 
                placeholder="Symptom Description (e.g. Dizziness & rash)" 
                required 
                value={newReport.symptom} 
                onChange={(e) => setNewReport({ ...newReport, symptom: e.target.value })} 
              />
              <select 
                value={newReport.severity} 
                onChange={(e) => setNewReport({ ...newReport, severity: e.target.value as any })}
              >
                <option value="Low">Low Severity</option>
                <option value="Medium">Medium Severity</option>
                <option value="High">High Severity</option>
                <option value="Critical">Critical Severity</option>
              </select>
              <div style={{ marginTop: '1rem' }}>
                <Button type="submit">Submit Report</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};