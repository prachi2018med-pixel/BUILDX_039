import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_HOSPITALS, DOCTORS_DATABASE, REGIONAL_BLOOD_BANKS } from '../data/healthcareData';

const EmergencyContext = createContext();

export const EmergencyProvider = ({ children }) => {
  const [hospitals, setHospitals] = useState(INITIAL_HOSPITALS);
  const [doctors, setDoctors] = useState(DOCTORS_DATABASE);
  const [bloodBanks, setBloodBanks] = useState(REGIONAL_BLOOD_BANKS);
  const [activeModule, setActiveModule] = useState('ambulance');
  const [darkMode, setDarkMode] = useState(true);

  // Plan B Emergency Failover State
  const [planBActive, setPlanBActive] = useState(false);
  const [planBDetails, setPlanBDetails] = useState({
    triggerReason: '',
    missingResource: '',
    targetFacility: '',
    recommendedOptions: []
  });

  // Emergency SOS modal state
  const [sosModalOpen, setSosModalOpen] = useState(false);
  const [bookingToast, setBookingToast] = useState(null);

  // Sync dark mode class with <html> element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Trigger Plan B manually or programmatically when resource unavailable
  const triggerPlanB = ({ reason, missingResource, facilityName = 'Current Location' }) => {
    // Generate intelligent backup recommendations
    let recommendations = [];

    if (missingResource.toLowerCase().includes('blood')) {
      // Recommend blood banks with positive inventory
      const group = missingResource.split(' ')[0] || 'O-';
      recommendations = bloodBanks
        .filter(bb => (bb.inventory[group] || 0) > 0)
        .map(bb => ({
          type: 'BLOOD_BANK',
          name: bb.name,
          distance: `${bb.distanceKm} km`,
          phone: bb.phone,
          helpline: bb.helpline,
          availableUnits: `${bb.inventory[group] || 0} units available`
        }));
    } else if (missingResource.toLowerCase().includes('bed') || missingResource.toLowerCase().includes('icu')) {
      // Recommend backup hospitals with open ICU/Ventilator beds
      recommendations = hospitals
        .filter(h => h.beds.icuVentilator.available > 0 || h.beds.traumaEmergency.available > 0)
        .map(h => ({
          type: 'HOSPITAL_BACKUP',
          name: h.name,
          distance: `${h.distanceKm} km`,
          phone: h.phone,
          availableUnits: `ICU Beds: ${h.beds.icuVentilator.available} free | Trauma: ${h.beds.traumaEmergency.available} free`
        }));
    } else if (missingResource.toLowerCase().includes('doctor')) {
      // Recommend secondary hospital duty emergency doctors
      recommendations = doctors
        .filter(d => d.status === 'AVAILABLE')
        .map(d => ({
          type: 'DOCTOR_BACKUP',
          name: `${d.name} (${d.specialtyName})`,
          distance: `${d.hospitalName}`,
          phone: d.contact,
          availableUnits: 'On Duty & Available'
        }));
    } else {
      // Generic emergency backup
      recommendations = hospitals.map(h => ({
        type: 'HOSPITAL_BACKUP',
        name: h.name,
        distance: `${h.distanceKm} km`,
        phone: h.phone,
        availableUnits: `Emergency Phone: ${h.emergencyHotline}`
      }));
    }

    setPlanBDetails({
      triggerReason: reason,
      missingResource,
      targetFacility: facilityName,
      recommendedOptions: recommendations
    });
    setPlanBActive(true);
  };

  const closePlanB = () => {
    setPlanBActive(false);
  };

  const showToast = (message, type = 'info') => {
    setBookingToast({ message, type });
    setTimeout(() => {
      setBookingToast(null);
    }, 4000);
  };

  return (
    <EmergencyContext.Provider value={{
      hospitals,
      doctors,
      bloodBanks,
      activeModule,
      setActiveModule,
      darkMode,
      setDarkMode,
      planBActive,
      planBDetails,
      triggerPlanB,
      closePlanB,
      sosModalOpen,
      setSosModalOpen,
      bookingToast,
      showToast
    }}>
      {children}
    </EmergencyContext.Provider>
  );
};

export const useEmergency = () => useContext(EmergencyContext);
