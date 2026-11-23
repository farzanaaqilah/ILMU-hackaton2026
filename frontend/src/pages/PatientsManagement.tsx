import React, { useState } from 'react';
import Button from '../components/button';
import type { Patient } from '../types/patient';

export const PatientManagement: React.FC = () => {
  // Empty state: ready for live user input during demo
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatientForQR, setSelectedPatientForQR] = useState<Patient | null>(null);

  // Form inputs
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
    setSelectedPatientForQR(newPatient); // Immediately show Telegram Bot QR modal

    // Reset form
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
    <div className="patient-mgmt-page">
      <header className="page-header">
        <h1>Patient Intake & Telegram AI Bot Link</h1>
        <p>Register patients live and link them to the Telegram Bot for autonomous daily check-ins</p>
      </header>

      {/* Live Registration Form */}
      <section className="form-card">
        <h3>Patient Registration Form</h3>
        <form onSubmit={handleRegister}>
          <div className="form-grid">
            <input 
              type="text" 
              placeholder="Full Name *" 
              required 
              value={formData.fullName} 
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} 
            />
            <input 
              type="number" 
              placeholder="Age *" 
              required 
              value={formData.age} 
              onChange={(e) => setFormData({ ...formData, age: e.target.value })} 
            />
            <select 
              value={formData.gender} 
              onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <input 
              type="tel" 
              placeholder="Phone Number *" 
              required 
              value={formData.phone} 
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })} 
            />
            <input 
              type="text" 
              placeholder="Telegram Handle (@user) [Optional]" 
              value={formData.telegramUsername} 
              onChange={(e) => setFormData({ ...formData, telegramUsername: e.target.value })} 
            />
            <input 
              type="text" 
              placeholder="Diagnosis / Condition *" 
              required 
              value={formData.diagnosis} 
              onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })} 
            />
            <input 
              type="text" 
              placeholder="Prescribed Medication" 
              value={formData.medication} 
              onChange={(e) => setFormData({ ...formData, medication: e.target.value })} 
            />
            <input 
              type="text" 
              placeholder="Dosage (e.g. 10mg twice daily)" 
              value={formData.dosage} 
              onChange={(e) => setFormData({ ...formData, dosage: e.target.value })} 
            />
          </div>
          <div style={{ marginTop: '1.25rem' }}>
            <Button type="submit">Register Patient & Generate Bot QR</Button>
          </div>
        </form>
      </section>

      {/* Live Directory List */}
      <section className="table-card">
        <h3>Live Patient Directory ({patients.length})</h3>
        {patients.length === 0 ? (
          <div className="empty-state">
            <p>No patients registered yet. Fill in the intake form above to add a patient in real time.</p>
          </div>
        ) : (
          <table className="live-table">
            <thead>
              <tr>
                <th>MRN</th>
                <th>Name</th>
                <th>Diagnosis</th>
                <th>Medication</th>
                <th>Telegram AI Bot</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((p) => (
                <tr key={p.id}>
                  <td><code>{p.mrn}</code></td>
                  <td>{p.fullName} ({p.age}y, {p.gender})</td>
                  <td>{p.diagnosis}</td>
                  <td>{p.medications.map((m) => `${m.name} (${m.dosage})`).join(', ') || 'None'}</td>
                  <td>
                    {p.telegramBotConnected ? (
                      <span className="badge-bot online">🟢 Active</span>
                    ) : (
                      <span className="badge-bot pending">🟡 Scan to Link</span>
                    )}
                  </td>
                  <td>
                    <button className="action-btn" onClick={() => setSelectedPatientForQR(p)}>
                      Open Bot QR
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* Telegram AI Bot QR Modal */}
      {selectedPatientForQR && (
        <div className="modal-overlay" onClick={() => setSelectedPatientForQR(null)}>
          <div className="modal-body" onClick={(e) => e.stopPropagation()}>
            <h3>Telegram AI Bot Onboarding</h3>
            <p>Patient: <strong>{selectedPatientForQR.fullName}</strong> ({selectedPatientForQR.mrn})</p>
            
            {/* Dynamic QR code generated with patient's MRN */}
            <div className="qr-box">
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https://t.me/HealthGuardianBot?start=${selectedPatientForQR.mrn}`} 
                alt="Telegram Bot QR" 
              />
            </div>

            <div className="modal-actions">
              <a 
                href={`https://t.me/HealthGuardianBot?start=${selectedPatientForQR.mrn}`} 
                target="_blank" 
                rel="noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <Button>Start Bot in Telegram 🚀</Button>
              </a>
              <button className="close-btn" onClick={() => setSelectedPatientForQR(null)}>Done</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};