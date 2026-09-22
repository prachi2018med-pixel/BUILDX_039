import React, { useState } from 'react';
import { useEmergency } from '../context/EmergencyContext';
import { Droplet, PhoneCall, Building2, AlertTriangle, ShieldCheck, HeartHandshake, MapPin } from 'lucide-react';

export const BloodAvailabilityModule = () => {
  const { hospitals, bloodBanks, triggerPlanB, showToast } = useEmergency();
  const [selectedGroup, setSelectedGroup] = useState('O-'); // Default to O- (often zero stock to showcase Plan B!)

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  // Calculate total units across all hospitals for selected blood group
  const totalHospitalUnits = hospitals.reduce((sum, h) => sum + (h.bloodBank[selectedGroup] || 0), 0);
  const totalRegionalUnits = bloodBanks.reduce((sum, bb) => sum + (bb.inventory[selectedGroup] || 0), 0);

  const isOutOfStock = totalHospitalUnits === 0;

  const handleFailoverToBloodBanks = () => {
    triggerPlanB({
      reason: `CRITICAL DEFICIT: 0 units of ${selectedGroup} Blood available across primary hospital inventories.`,
      missingResource: `${selectedGroup} Blood Units`,
      facilityName: 'Primary Hospital Network'
    });
  };

  const handleRequestDonor = (group) => {
    showToast(`🩸 Emergency Request for ${group} Blood broadcasted to Sanjeevani Donor Network! Donors responding...`, 'emergency');
  };

  return (
    <div style={{ padding: '24px 0' }}>
      
      {/* Module Title */}
      <div style={{ marginBottom: '24px' }}>
        <div className="badge badge-danger" style={{ marginBottom: '6px' }}>
          <Droplet size={14} /> MODULE 3: BLOOD AVAILABILITY & BLOOD BANK CONNECT
        </div>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, margin: 0 }}>
          Blood Group Inventory & Failover Directory
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
          Select required blood group to verify live stock. If unavailable, Plan B connects directly with certified regional blood banks.
        </p>
      </div>

      {/* Blood Group Picker */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
        gap: '12px',
        marginBottom: '28px'
      }}>
        {bloodGroups.map(grp => {
          const isSelected = selectedGroup === grp;
          const unitsCount = hospitals.reduce((sum, h) => sum + (h.bloodBank[grp] || 0), 0);
          const hasStock = unitsCount > 0;

          return (
            <button
              key={grp}
              onClick={() => setSelectedGroup(grp)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '14px 10px',
                borderRadius: '16px',
                border: isSelected ? '2px solid var(--emergency)' : '1px solid var(--border-color)',
                background: isSelected ? 'var(--emergency-light)' : 'var(--bg-surface)',
                color: isSelected ? 'var(--emergency)' : 'var(--text-main)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: isSelected ? 'var(--shadow-glow)' : 'none'
              }}
            >
              <span style={{ fontSize: '1.4rem', fontWeight: 800 }}>{grp}</span>
              <span style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                marginTop: '4px',
                color: hasStock ? 'var(--success)' : 'var(--emergency)'
              }}>
                {unitsCount > 0 ? `${unitsCount} Units` : 'Out of Stock'}
              </span>
            </button>
          );
        })}
      </div>

      {/* Status Banner */}
      <div className="glass-card" style={{
        padding: '20px',
        marginBottom: '28px',
        borderColor: isOutOfStock ? 'var(--emergency)' : 'var(--success)',
        background: isOutOfStock ? 'var(--emergency-light)' : 'var(--bg-card)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '14px',
              background: isOutOfStock ? 'var(--emergency)' : 'var(--success)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Droplet size={28} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, color: isOutOfStock ? 'var(--emergency)' : 'var(--text-main)' }}>
                Selected Group: {selectedGroup} Blood Stock Status
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
                Primary Hospitals: <strong>{totalHospitalUnits} Units</strong> | Regional Blood Banks: <strong>{totalRegionalUnits} Units</strong>
              </p>
            </div>
          </div>

          {isOutOfStock ? (
            <button
              onClick={handleFailoverToBloodBanks}
              className="btn btn-emergency sos-pulse"
              style={{ padding: '10px 18px' }}
            >
              <AlertTriangle size={18} /> PLAN B: CONTACT BLOOD BANKS NOW
            </button>
          ) : (
            <button
              onClick={() => handleRequestDonor(selectedGroup)}
              className="btn btn-primary"
            >
              <HeartHandshake size={18} /> Request Emergency Donor
            </button>
          )}
        </div>
      </div>

      {/* Hospital Stock Table */}
      <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Building2 size={18} style={{ color: 'var(--primary)' }} />
        Primary Hospital Blood Stock ({selectedGroup})
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        {hospitals.map(h => {
          const units = h.bloodBank[selectedGroup] || 0;
          const available = units > 0;

          return (
            <div key={h.id} className="glass-card" style={{ padding: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '10px' }}>
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>{h.name}</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
                    Distance: {h.distanceKm} km
                  </p>
                </div>
                <span className={`badge ${available ? 'badge-success' : 'badge-danger'}`}>
                  {available ? `${units} Units` : '0 Units'}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pt: '10px', borderTop: '1px solid var(--border-color)', marginTop: '12px' }}>
                <a href={`tel:${h.phone}`} className="btn btn-outline" style={{ textDecoration: 'none', fontSize: '0.8rem', padding: '6px 10px' }}>
                  <PhoneCall size={14} /> Call Hospital
                </a>

                {!available && (
                  <button
                    onClick={() => triggerPlanB({
                      reason: `${h.name} has 0 units of ${selectedGroup} blood available.`,
                      missingResource: `${selectedGroup} Blood`,
                      facilityName: h.name
                    })}
                    className="btn btn-planb"
                    style={{ fontSize: '0.8rem', padding: '6px 10px' }}
                  >
                    Plan B Failover
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Regional Blood Banks Section */}
      <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <ShieldCheck size={18} style={{ color: 'var(--planb-accent)' }} />
        Certified Regional Blood Banks Directory ({selectedGroup})
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '20px' }}>
        {bloodBanks.map(bb => {
          const units = bb.inventory[selectedGroup] || 0;

          return (
            <div key={bb.id} className="glass-card" style={{ padding: '20px', borderLeft: '4px solid var(--planb-accent)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '8px' }}>
                <div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0 }}>{bb.name}</h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--planb-accent)', fontWeight: 600 }}>{bb.verifiedStatus}</span>
                </div>
                <span className="badge badge-planb">
                  {units} Units Available
                </span>
              </div>

              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '8px 0 14px 0', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <MapPin size={14} /> {bb.address} ({bb.distanceKm} km)
              </p>

              <div style={{ display: 'flex', gap: '8px' }}>
                <a href={`tel:${bb.phone}`} className="btn btn-primary" style={{ flex: 1, textDecoration: 'none', fontSize: '0.85rem' }}>
                  <PhoneCall size={14} /> Call Blood Bank
                </a>
                <a href={`tel:${bb.helpline}`} className="btn btn-outline" style={{ textDecoration: 'none', fontSize: '0.85rem' }}>
                  24x7 Helpline
                </a>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
