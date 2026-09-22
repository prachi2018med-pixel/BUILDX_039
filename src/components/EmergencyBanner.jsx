import React from 'react';
import { useEmergency } from '../context/EmergencyContext';
import { PhoneCall, ShieldAlert, X, AlertTriangle, Activity, Ambulance, Stethoscope, Droplet, BedDouble } from 'lucide-react';

export const EmergencyBanner = () => {
  const { sosModalOpen, setSosModalOpen, showToast, hospitals } = useEmergency();

  // Quick stats computation
  const totalAmbulances = hospitals.reduce((acc, h) => acc + h.ambulances.length, 0);
  const totalBeds = hospitals.reduce((acc, h) => acc + h.beds.icuVentilator.available + h.beds.traumaEmergency.available, 0);

  const handleSosSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const patientName = formData.get('patientName');
    const location = formData.get('location');
    const emergencyType = formData.get('emergencyType');

    showToast(`🚨 SOS DISPATCHED for ${patientName} at ${location} (${emergencyType})! Nearest 108 Ambulance notified!`, 'emergency');
    setSosModalOpen(false);
  };

  return (
    <>
      {/* Live Status Stats Bar */}
      <div style={{
        background: 'var(--bg-surface)',
        borderBottom: '1px solid var(--border-color)',
        padding: '8px 0',
        fontSize: '0.85rem'
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: 'var(--success)' }}>
              <Activity size={16} /> SAHAY Live Network Online
            </span>
            <span style={{ color: 'var(--text-muted)' }}>|</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-main)' }}>
              <Ambulance size={14} style={{ color: 'var(--primary)' }} /> <strong>{totalAmbulances}</strong> Ambulances Active
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-main)' }}>
              <BedDouble size={14} style={{ color: 'var(--warning)' }} /> <strong>{totalBeds}</strong> Emergency ICU Beds Free
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ color: 'var(--emergency)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <PhoneCall size={14} /> National Helpline: 108 / 102
            </span>
          </div>
        </div>
      </div>

      {/* SOS Modal Dialog */}
      {sosModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 90,
          background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div className="glass-card" style={{
            maxWidth: '520px',
            width: '100%',
            background: 'var(--bg-surface)',
            border: '2px solid var(--emergency)',
            borderRadius: '20px',
            padding: '28px',
            position: 'relative'
          }}>
            <button
              onClick={() => setSosModalOpen(false)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'var(--bg-primary)',
                border: '1px solid var(--border-color)',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--text-muted)'
              }}
            >
              <X size={18} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: 'var(--emergency-light)',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--emergency)'
              }}>
                <ShieldAlert size={24} className="sos-pulse" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, color: 'var(--emergency)' }}>
                  1-Tap SOS Emergency Dispatch
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
                  Immediate Priority Dispatch to 108 Command Center
                </p>
              </div>
            </div>

            <form onSubmit={handleSosSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                  Patient Name / Caller Name *
                </label>
                <input
                  type="text"
                  name="patientName"
                  required
                  placeholder="e.g. Ramesh Sharma"
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-primary)',
                    color: 'var(--text-main)',
                    fontFamily: 'inherit'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                  Emergency Type *
                </label>
                <select
                  name="emergencyType"
                  required
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-primary)',
                    color: 'var(--text-main)',
                    fontFamily: 'inherit'
                  }}
                >
                  <option value="Road Accident & Trauma">Road Accident & Trauma</option>
                  <option value="Heart Attack / Severe Chest Pain">Heart Attack / Severe Chest Pain</option>
                  <option value="Acute Respiratory Distress">Acute Respiratory Distress</option>
                  <option value="Severe Blood Loss / Bleeding">Severe Blood Loss / Bleeding</option>
                  <option value="Poisoning / Snake Bite">Poisoning / Snake Bite</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                  Current Pickup Location / Landmark *
                </label>
                <input
                  type="text"
                  name="location"
                  required
                  placeholder="e.g. Near Metro Gate 3, Sector 15"
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-primary)',
                    color: 'var(--text-main)',
                    fontFamily: 'inherit'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                  Contact Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="+91 98765 43210"
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-primary)',
                    color: 'var(--text-main)',
                    fontFamily: 'inherit'
                  }}
                />
              </div>

              <button type="submit" className="btn btn-emergency" style={{ padding: '12px', marginTop: '6px' }}>
                <PhoneCall size={18} /> CONFIRM SOS DISPATCH NOW
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
