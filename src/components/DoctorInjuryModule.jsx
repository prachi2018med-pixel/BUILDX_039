import React, { useState } from 'react';
import { useEmergency } from '../context/EmergencyContext';
import { INJURY_CATEGORIES } from '../data/healthcareData';
import { Stethoscope, UserCheck, Clock, PhoneCall, AlertTriangle, Star, Activity, Brain, HeartPulse, Bone, Flame, Wind, ShieldAlert } from 'lucide-react';

export const DoctorInjuryModule = () => {
  const { doctors, triggerPlanB, showToast } = useEmergency();
  const [selectedInjuryId, setSelectedInjuryId] = useState('head_trauma');

  // Map icon names to Lucide icons
  const iconMap = {
    Brain,
    HeartPulse,
    Bone,
    Flame,
    Lungs: Wind,
    ShieldAlert
  };

  const selectedCategory = INJURY_CATEGORIES.find(c => c.id === selectedInjuryId);

  const matchedDoctors = doctors.filter(d => d.specialtyId === selectedInjuryId);

  const handleBookDoctor = (doc) => {
    if (doc.status !== 'AVAILABLE') {
      triggerPlanB({
        reason: `${doc.name} is currently ${doc.status.replace('_', ' ')} at ${doc.hospitalName}.`,
        missingResource: `On-duty Doctor for ${selectedCategory.name}`,
        facilityName: doc.hospitalName
      });
      return;
    }

    showToast(`🩺 Emergency Consultation Confirmed with ${doc.name} at ${doc.hospitalName}! Direct contact: ${doc.contact}`, 'success');
  };

  return (
    <div style={{ padding: '24px 0' }}>
      
      {/* Module Title */}
      <div style={{ marginBottom: '24px' }}>
        <div className="badge badge-success" style={{ marginBottom: '6px' }}>
          <Stethoscope size={14} /> MODULE 2: DOCTOR AVAILABILITY BY INJURY TYPE
        </div>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, margin: 0 }}>
          Emergency Doctor & Trauma Specialist Finder
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
          Select the specific trauma condition or injury to find available on-duty specialists instantly.
        </p>
      </div>

      {/* Injury Category Picker Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
        gap: '12px',
        marginBottom: '28px'
      }}>
        {INJURY_CATEGORIES.map(cat => {
          const IconComp = iconMap[cat.icon] || Activity;
          const isSelected = selectedInjuryId === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => setSelectedInjuryId(cat.id)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                padding: '16px 12px',
                borderRadius: '16px',
                border: isSelected ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                background: isSelected ? 'var(--primary-light)' : 'var(--bg-surface)',
                color: isSelected ? 'var(--primary)' : 'var(--text-main)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: isSelected ? 'var(--shadow-md)' : 'none'
              }}
            >
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: isSelected ? 'var(--primary)' : 'var(--bg-primary)',
                color: isSelected ? 'white' : 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '8px'
              }}>
                <IconComp size={22} />
              </div>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, margin: 0 }}>{cat.name}</h4>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>{cat.specialty}</p>
            </button>
          );
        })}
      </div>

      {/* Doctors Grid Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0 }}>
          Specialists for: <span style={{ color: 'var(--primary)' }}>{selectedCategory.name}</span>
        </h3>

        {matchedDoctors.length === 0 && (
          <button
            className="btn btn-planb"
            onClick={() => triggerPlanB({
              reason: `No specialized doctors currently available on site for ${selectedCategory.name}.`,
              missingResource: `Trauma Specialist (${selectedCategory.name})`,
              facilityName: 'Selected Hospital Zone'
            })}
          >
            <AlertTriangle size={16} /> Trigger Plan B Specialist Failover
          </button>
        )}
      </div>

      {/* Doctor Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
        gap: '20px'
      }}>
        {matchedDoctors.map(doc => {
          const isAvailable = doc.status === 'AVAILABLE';

          return (
            <div key={doc.id} className="glass-card" style={{ padding: '20px' }}>
              
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>{doc.name}</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600, margin: '2px 0 0 0' }}>
                    {doc.qualification}
                  </p>
                </div>

                <span className={`badge ${isAvailable ? 'badge-success' : 'badge-warning'}`}>
                  {isAvailable ? 'ON DUTY / FREE' : doc.status.replace('_', ' ')}
                </span>
              </div>

              <div style={{
                background: 'var(--bg-primary)',
                borderRadius: '12px',
                padding: '12px',
                marginBottom: '16px',
                fontSize: '0.85rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px'
              }}>
                <div><strong>Specialty:</strong> {doc.specialtyName}</div>
                <div><strong>Hospital:</strong> {doc.hospitalName}</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>Experience: <strong>{doc.experienceYears} Years</strong></span>
                  <span style={{ color: '#f59e0b', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Star size={14} fill="#f59e0b" /> {doc.rating}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
                <a
                  href={`tel:${doc.contact}`}
                  className="btn btn-outline"
                  style={{ textDecoration: 'none', fontSize: '0.85rem', padding: '8px 12px' }}
                >
                  <PhoneCall size={14} /> Call Doctor
                </a>

                <button
                  onClick={() => handleBookDoctor(doc)}
                  className={`btn ${isAvailable ? 'btn-primary' : 'btn-planb'}`}
                  style={{ fontSize: '0.85rem', padding: '8px 14px' }}
                >
                  {isAvailable ? 'Consult Immediately' : 'Trigger Plan B'}
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
