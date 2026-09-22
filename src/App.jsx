import React, { useState } from 'react';
import { EmergencyProvider, useEmergency } from './context/EmergencyContext';
import { AmbulanceModule } from './components/AmbulanceModule';
import { DoctorInjuryModule } from './components/DoctorInjuryModule';
import { BloodAvailabilityModule } from './components/BloodAvailabilityModule';
import { BedAvailabilityModule } from './components/BedAvailabilityModule';
import { PlanBFailoverModal } from './components/PlanBFailoverModal';
import { Activity, Bell, MapPin, Ambulance, Hospital, Droplet, Shield } from 'lucide-react';

const MainApp = () => {
  const {
    activeModule, setActiveModule,
    setSosModalOpen, setPartnerModalOpen,
    bookingToast
  } = useEmergency();

  return (
    <div className="app-frame">
      
      {/* Header / Navbar */}
      <header className="navbar">
        <div className="brand" onClick={() => setActiveModule('ambulance')}>
          <div className="brand-icon">
            <Activity size={28} />
          </div>
          <span className="brand-name">Sahay</span>
        </div>

        <ul className="nav-links">
          <li><span className="nav-link" onClick={() => setActiveModule('ambulance')}>Home</span></li>
          <li><span className="nav-link" onClick={() => setActiveModule('bed')}>About</span></li>
          <li><span className="nav-link" onClick={() => setActiveModule('blood')}>Impact</span></li>
          <li><span className="nav-link" onClick={() => setActiveModule('doctor')}>Contact</span></li>
        </ul>

        <button className="btn-emergency-top" onClick={() => setSosModalOpen(true)}>
          Emergency SOS
        </button>
      </header>

      {/* Hero Section */}
      <section className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="dark-text">Right Care.</span>
            <span className="red-text">Faster Lives.</span>
          </h1>

          <p className="hero-subtitle">
            An emergency connection platform connecting citizens, ambulances, hospitals and critical resources in real time.
          </p>

          <div className="hero-actions">
            <button className="action-card-red" onClick={() => setSosModalOpen(true)}>
              <div className="icon-box">
                <Bell size={20} />
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.05rem' }}>Emergency SOS</div>
                <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>For real time</div>
              </div>
            </button>

            <button className="action-card-cream" onClick={() => setPartnerModalOpen(true)}>
              <MapPin size={20} />
              <span>Hospital / Partner Login</span>
            </button>
          </div>
        </div>

        <div className="hero-bg-image"></div>

        <div className="hero-right-overlay">
          <h3>People<br/>Resources<br/>Together<br/>For Every Life</h3>
        </div>
      </section>

      {/* 4 Feature Cards */}
      <section className="features-grid">
        
        {/* Card 1: Ambulance Coordination */}
        <div
          className={`feature-card ${activeModule === 'ambulance' ? 'active' : ''}`}
          onClick={() => setActiveModule('ambulance')}
        >
          <div className="feature-icon-wrapper">
            <Ambulance size={24} />
          </div>
          <div className="feature-title">
            Ambulance<br/>Coordination
          </div>
        </div>

        {/* Card 2: Hospital Availability */}
        <div
          className={`feature-card ${activeModule === 'bed' ? 'active' : ''}`}
          onClick={() => setActiveModule('bed')}
        >
          <div className="feature-icon-wrapper">
            <Hospital size={24} />
          </div>
          <div className="feature-title">
            Hospital<br/>Availability
          </div>
        </div>

        {/* Card 3: Blood Resource Network */}
        <div
          className={`feature-card ${activeModule === 'blood' ? 'active' : ''}`}
          onClick={() => setActiveModule('blood')}
        >
          <div className="feature-icon-wrapper">
            <Droplet size={24} />
          </div>
          <div className="feature-title">
            Blood Resource<br/>Network
          </div>
        </div>

        {/* Card 4: Smart Rescue Planning */}
        <div
          className={`feature-card ${activeModule === 'doctor' ? 'active' : ''}`}
          onClick={() => setActiveModule('doctor')}
        >
          <div className="feature-icon-wrapper">
            <Shield size={24} />
          </div>
          <div className="feature-title">
            Smart Rescue<br/>Planning
          </div>
        </div>

      </section>

      {/* Module Content Section */}
      <section className="module-content-section">
        {activeModule === 'ambulance' && <AmbulanceModule />}
        {activeModule === 'doctor' && <DoctorInjuryModule />}
        {activeModule === 'blood' && <BloodAvailabilityModule />}
        {activeModule === 'bed' && <BedAvailabilityModule />}
      </section>

      {/* Plan B Modal */}
      <PlanBFailoverModal />

      {/* Toast Notification */}
      {bookingToast && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 120,
          background: 'var(--text-dark)',
          color: 'white',
          padding: '14px 22px',
          borderRadius: '14px',
          boxShadow: 'var(--shadow-app)',
          fontWeight: 600,
          fontSize: '0.9rem'
        }}>
          {bookingToast.message}
        </div>
      )}

    </div>
  );
};

export default function App() {
  return (
    <EmergencyProvider>
      <MainApp />
    </EmergencyProvider>
  );
}
