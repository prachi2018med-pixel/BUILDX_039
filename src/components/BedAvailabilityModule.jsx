import React, { useState } from 'react';
import { useEmergency } from '../context/EmergencyContext';
import { BedDouble, PhoneCall, Building2, AlertTriangle, ShieldAlert, CheckCircle, Activity, Wind, HeartPulse } from 'lucide-react';

export const BedAvailabilityModule = () => {
  const { hospitals, triggerPlanB, showToast } = useEmergency();
  const [selectedBedType, setSelectedBedType] = useState('icuVentilator');

  const bedTypeCategories = [
    { id: 'icuVentilator', name: 'ICU with Ventilator', icon: HeartPulse, color: '#ef4444' },
    { id: 'traumaEmergency', name: 'Trauma & Emergency', icon: Activity, color: '#f59e0b' },
    { id: 'oxygenGeneral', name: 'Oxygen Ward Bed', icon: Wind, color: '#0284c7' },
    { id: 'pediatricIcu', name: 'Pediatric ICU Bed', icon: BedDouble, color: '#9333ea' }
  ];

  const handleReserveBed = (hospital, bedCategory) => {
    const bedData = hospital.beds[bedCategory.id];
    if (bedData.available === 0) {
      triggerPlanB({
        reason: `CRITICAL OCCUPANCY: 0 ${bedCategory.name} beds available at ${hospital.name}.`,
        missingResource: bedCategory.name,
        facilityName: hospital.name
      });
      return;
    }

    showToast(`🏥 1 ${bedCategory.name} Bed RESERVED at ${hospital.name}! Priority confirmation sent to admission desk. Phone: ${hospital.phone}`, 'success');
  };

  return (
    <div style={{ padding: '24px 0' }}>
      
      {/* Module Title */}
      <div style={{ marginBottom: '24px' }}>
        <div className="badge badge-warning" style={{ marginBottom: '6px' }}>
          <BedDouble size={14} /> MODULE 4: REAL-TIME HOSPITAL BED AVAILABILITY
        </div>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, margin: 0 }}>
          ICU, Ventilator & Emergency Bed Tracker
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
          Check live bed occupancy across regional hospitals. If beds are full, Plan B reroutes to backup centers.
        </p>
      </div>

      {/* Bed Category Selector */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: '12px',
        marginBottom: '28px'
      }}>
        {bedTypeCategories.map(cat => {
          const Icon = cat.icon;
          const isSelected = selectedBedType === cat.id;

          const totalAvail = hospitals.reduce((sum, h) => sum + h.beds[cat.id].available, 0);
          const totalCapacity = hospitals.reduce((sum, h) => sum + h.beds[cat.id].total, 0);

          return (
            <button
              key={cat.id}
              onClick={() => setSelectedBedType(cat.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px',
                borderRadius: '16px',
                border: isSelected ? `2px solid ${cat.color}` : '1px solid var(--border-color)',
                background: isSelected ? 'var(--bg-card)' : 'var(--bg-surface)',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s ease',
                boxShadow: isSelected ? 'var(--shadow-md)' : 'none'
              }}
            >
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                background: cat.color,
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Icon size={22} />
              </div>

              <div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, margin: 0, color: isSelected ? 'var(--text-main)' : 'var(--text-muted)' }}>
                  {cat.name}
                </h4>
                <p style={{ fontSize: '0.8rem', fontWeight: 600, color: totalAvail > 0 ? 'var(--success)' : 'var(--emergency)', margin: '2px 0 0 0' }}>
                  {totalAvail} / {totalCapacity} Free
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Hospitals Bed Status List */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '20px' }}>
        {hospitals.map(h => {
          const activeBedCat = bedTypeCategories.find(c => c.id === selectedBedType);
          const bedData = h.beds[selectedBedType];
          const isFull = bedData.available === 0;
          const pct = Math.round((bedData.available / bedData.total) * 100);

          return (
            <div key={h.id} className="glass-card" style={{ padding: '22px', position: 'relative' }}>
              
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0 }}>{h.name}</h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
                    {h.address} ({h.distanceKm} km away)
                  </p>
                </div>

                <span className={`badge ${isFull ? 'badge-danger' : 'badge-success'}`}>
                  {isFull ? '100% FULL' : `${bedData.available} Beds Free`}
                </span>
              </div>

              {/* Occupancy Progress Bar */}
              <div style={{ marginBottom: '18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  <span>{activeBedCat.name} Occupancy</span>
                  <span style={{ fontWeight: 600, color: isFull ? 'var(--emergency)' : 'var(--text-main)' }}>
                    {bedData.available} available out of {bedData.total}
                  </span>
                </div>
                <div style={{
                  height: '8px',
                  borderRadius: '4px',
                  background: 'var(--bg-primary)',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    height: '100%',
                    width: `${Math.max(100 - pct, 5)}%`,
                    background: isFull ? 'var(--emergency)' : pct < 20 ? 'var(--warning)' : 'var(--success)',
                    borderRadius: '4px',
                    transition: 'width 0.4s ease'
                  }} />
                </div>
              </div>

              {/* Secondary Bed Breakdown */}
              <div style={{
                background: 'var(--bg-primary)',
                borderRadius: '12px',
                padding: '12px',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '8px',
                fontSize: '0.75rem',
                marginBottom: '18px'
              }}>
                <div>ICU Ventilator: <strong>{h.beds.icuVentilator.available} free</strong></div>
                <div>Trauma Emergency: <strong>{h.beds.traumaEmergency.available} free</strong></div>
                <div>Oxygen Wards: <strong>{h.beds.oxygenGeneral.available} free</strong></div>
                <div>Pediatric ICU: <strong>{h.beds.pediatricIcu.available} free</strong></div>
              </div>

              {/* Card Actions */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
                <a
                  href={`tel:${h.phone}`}
                  className="btn btn-outline"
                  style={{ textDecoration: 'none', fontSize: '0.85rem', padding: '8px 12px' }}
                >
                  <PhoneCall size={14} /> Call Admission
                </a>

                <button
                  onClick={() => handleReserveBed(h, activeBedCat)}
                  className={`btn ${isFull ? 'btn-planb' : 'btn-primary'}`}
                  style={{ fontSize: '0.85rem', padding: '8px 14px' }}
                >
                  {isFull ? 'Trigger Plan B Reroute' : 'Reserve Bed'}
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
