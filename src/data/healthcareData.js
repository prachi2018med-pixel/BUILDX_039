// Comprehensive Mock Data for SAHAY Emergency Healthcare Platform

export const INITIAL_HOSPITALS = [
  {
    id: 'hosp-1',
    name: 'Apex Super Specialty Hospital',
    address: 'Ring Road, Sector 4, Metro Area',
    distanceKm: 2.4,
    phone: '+91 98765 43210',
    emergencyHotline: '108',
    beds: {
      icuVentilator: { total: 20, available: 3 },
      traumaEmergency: { total: 30, available: 5 },
      oxygenGeneral: { total: 100, available: 22 },
      pediatricIcu: { total: 15, available: 0 }
    },
    bloodBank: {
      'A+': 12, 'A-': 0, 'B+': 18, 'B-': 2, 'AB+': 8, 'AB-': 0, 'O+': 25, 'O-': 0
    },
    ambulances: [
      { id: 'amb-101', type: 'ICU / Advanced Life Support (ALS)', driver: 'Rajesh Kumar', phone: '+91 98111 22334', etaMins: 7, distanceKm: 1.8, status: 'AVAILABLE', equip: ['Ventilator', 'Defibrillator', 'Oxygen Cylinders'] },
      { id: 'amb-102', type: 'Basic Life Support (BLS)', driver: 'Amit Singh', phone: '+91 98111 55667', etaMins: 12, distanceKm: 3.5, status: 'AVAILABLE', equip: ['Stretcher', 'Basic First Aid', 'O2 Mask'] }
    ]
  },
  {
    id: 'hosp-2',
    name: 'City Trauma & General Hospital',
    address: 'Central Avenue, Near Bus Terminal',
    distanceKm: 4.8,
    phone: '+91 98222 33445',
    emergencyHotline: '102',
    beds: {
      icuVentilator: { total: 15, available: 0 }, // Full for testing failover!
      traumaEmergency: { total: 25, available: 2 },
      oxygenGeneral: { total: 80, available: 14 },
      pediatricIcu: { total: 10, available: 4 }
    },
    bloodBank: {
      'A+': 5, 'A-': 0, 'B+': 10, 'B-': 0, 'AB+': 3, 'AB-': 0, 'O+': 15, 'O-': 0
    },
    ambulances: [
      { id: 'amb-201', type: 'ICU / Advanced Life Support (ALS)', driver: 'Suresh Patel', phone: '+91 98333 44556', etaMins: 15, distanceKm: 5.1, status: 'BUSY', equip: ['Ventilator', 'ECG Monitor'] },
      { id: 'amb-202', type: 'Patient Transport Ambulance', driver: 'Vikas Roy', phone: '+91 98333 77889', etaMins: 10, distanceKm: 4.2, status: 'AVAILABLE', equip: ['Wheelchair', 'Stretcher'] }
    ]
  },
  {
    id: 'hosp-3',
    name: 'St. Jude Emergency Care Center',
    address: 'Green Park Extension, Outer Bypass',
    distanceKm: 8.5,
    phone: '+91 98444 55667',
    emergencyHotline: '+91 11 4455 6677',
    beds: {
      icuVentilator: { total: 35, available: 12 },
      traumaEmergency: { total: 40, available: 18 },
      oxygenGeneral: { total: 150, available: 45 },
      pediatricIcu: { total: 20, available: 8 }
    },
    bloodBank: {
      'A+': 30, 'A-': 5, 'B+': 28, 'B-': 6, 'AB+': 14, 'AB-': 4, 'O+': 40, 'O-': 8
    },
    ambulances: [
      { id: 'amb-301', type: 'ICU / Advanced Life Support (ALS)', driver: 'Manoj Verma', phone: '+91 98555 66778', etaMins: 18, distanceKm: 8.2, status: 'AVAILABLE', equip: ['Ventilator', 'Infusion Pump', 'AED'] },
      { id: 'amb-302', type: 'Neonatal Emergency Transport', driver: 'Deepak Sharma', phone: '+91 98555 99001', etaMins: 20, distanceKm: 8.7, status: 'AVAILABLE', equip: ['Incubator', 'O2 Ventilator'] }
    ]
  }
];

export const INJURY_CATEGORIES = [
  { id: 'head_trauma', name: 'Head & Brain Trauma', icon: 'Brain', specialty: 'Neurosurgeon / Trauma Specialist' },
  { id: 'cardiac_arrest', name: 'Cardiac Arrest / Chest Pain', icon: 'HeartPulse', specialty: 'Interventional Cardiologist' },
  { id: 'complex_fracture', name: 'Bone Fracture / Polytrauma', icon: 'Bone', specialty: 'Orthopedic Trauma Surgeon' },
  { id: 'severe_burns', name: 'Third-Degree Burns / Chemical', icon: 'Flame', specialty: 'Burn Specialist / Plastic Surgeon' },
  { id: 'respiratory_failure', name: 'Acute Respiratory Distress', icon: 'Lungs', specialty: 'Pulmonologist / Critical Care Specialist' },
  { id: 'snake_poison', name: 'Snake Bite / Acute Poisoning', icon: 'ShieldAlert', specialty: 'Toxicologist / Emergency Physician' }
];

export const DOCTORS_DATABASE = [
  {
    id: 'doc-1',
    name: 'Dr. Vikramaditya Sen',
    qualification: 'MD, MCh (Neurosurgery)',
    specialtyId: 'head_trauma',
    specialtyName: 'Neurosurgeon & Trauma Specialist',
    hospitalId: 'hosp-1',
    hospitalName: 'Apex Super Specialty Hospital',
    experienceYears: 18,
    status: 'AVAILABLE',
    onDuty: true,
    contact: '+91 98999 11111',
    rating: 4.9
  },
  {
    id: 'doc-2',
    name: 'Dr. Ananya Deshmukh',
    qualification: 'MD (Cardiology), DM',
    specialtyId: 'cardiac_arrest',
    specialtyName: 'Interventional Cardiologist',
    hospitalId: 'hosp-1',
    hospitalName: 'Apex Super Specialty Hospital',
    experienceYears: 14,
    status: 'IN_SURGERY',
    onDuty: true,
    contact: '+91 98999 22222',
    rating: 4.8
  },
  {
    id: 'doc-3',
    name: 'Dr. Rajeshwar Rao',
    qualification: 'MS (Orthopedics), Fellow Trauma (UK)',
    specialtyId: 'complex_fracture',
    specialtyName: 'Orthopedic Trauma Surgeon',
    hospitalId: 'hosp-2',
    hospitalName: 'City Trauma & General Hospital',
    experienceYears: 16,
    status: 'AVAILABLE',
    onDuty: true,
    contact: '+91 98999 33333',
    rating: 4.7
  },
  {
    id: 'doc-4',
    name: 'Dr. Meera Nambiar',
    qualification: 'MD (Critical Care), Pulmonology',
    specialtyId: 'respiratory_failure',
    specialtyName: 'Pulmonologist / Critical Care Specialist',
    hospitalId: 'hosp-3',
    hospitalName: 'St. Jude Emergency Care Center',
    experienceYears: 12,
    status: 'AVAILABLE',
    onDuty: true,
    contact: '+91 98999 44444',
    rating: 4.9
  },
  {
    id: 'doc-5',
    name: 'Dr. Siddharth Kapoor',
    qualification: 'MS, MCh (Burn & Plastic Surgery)',
    specialtyId: 'severe_burns',
    specialtyName: 'Burn Specialist & Plastic Surgeon',
    hospitalId: 'hosp-3',
    hospitalName: 'St. Jude Emergency Care Center',
    experienceYears: 20,
    status: 'AVAILABLE',
    onDuty: true,
    contact: '+91 98999 55555',
    rating: 5.0
  },
  {
    id: 'doc-6',
    name: 'Dr. Priyanka Joshi',
    qualification: 'MD (Emergency Medicine & Toxicology)',
    specialtyId: 'snake_poison',
    specialtyName: 'Toxicologist & Emergency Physician',
    hospitalId: 'hosp-1',
    hospitalName: 'Apex Super Specialty Hospital',
    experienceYears: 10,
    status: 'AVAILABLE',
    onDuty: true,
    contact: '+91 98999 66666',
    rating: 4.8
  }
];

export const REGIONAL_BLOOD_BANKS = [
  {
    id: 'bb-1',
    name: 'Red Cross Central Regional Blood Bank',
    address: 'Civil Lines, Near Government Hospital',
    phone: '+91 11 2334 5566',
    helpline: '+91 98100 99887',
    distanceKm: 3.2,
    inventory: {
      'A+': 45, 'A-': 4, 'B+': 50, 'B-': 8, 'AB+': 20, 'AB-': 3, 'O+': 65, 'O-': 12
    },
    verifiedStatus: 'Verified 24x7 Government Facility'
  },
  {
    id: 'bb-2',
    name: 'Rotary LifeLine Blood Bank & Component Center',
    address: 'Institutional Area, Sector 12',
    phone: '+91 11 4155 7788',
    helpline: '+91 98200 44332',
    distanceKm: 6.5,
    inventory: {
      'A+': 22, 'A-': 2, 'B+': 30, 'B-': 4, 'AB+': 10, 'AB-': 1, 'O+': 35, 'O-': 5
    },
    verifiedStatus: '24x7 Component Separation Unit'
  },
  {
    id: 'bb-3',
    name: 'Sanjeevani Volunteer Blood Reserve',
    address: 'Community Center, West Colony',
    phone: '+91 98711 00998',
    helpline: '+91 98711 00999',
    distanceKm: 9.1,
    inventory: {
      'A+': 15, 'A-': 1, 'B+': 18, 'B-': 0, 'AB+': 5, 'AB-': 0, 'O+': 25, 'O-': 2
    },
    verifiedStatus: 'Emergency Donor Volunteer Network'
  }
];
