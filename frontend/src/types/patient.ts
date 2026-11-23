export type Gender = 'Male' | 'Female' | 'Other';
export type RiskLevel = 'Low' | 'Medium' | 'High' | 'Critical';
export type AppointmentStatus = 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled';

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
}

export interface SideEffectReport {
  id: string;
  patientId: string;
  patientName: string;
  medicationName: string;
  symptom: string;
  severity: RiskLevel;
  reportedAt: string;
}

export interface Patient {
  id: string;
  mrn: string; // Medical Record Number
  fullName: string;
  age: number;
  gender: Gender;
  phone: string;
  telegramUsername?: string;
  telegramBotConnected: boolean;
  diagnosis: string;
  medications: Medication[];
  registeredAt: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  mrn: string;
  dateTime: string;
  department: string;
  status: AppointmentStatus;
  primaryComplaint: string;
  notes?: string;
}