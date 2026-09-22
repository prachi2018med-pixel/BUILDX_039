import React, { useState } from 'react';
import { useEmergency } from '../context/EmergencyContext';
import { ShieldAlert, PhoneCall, Radio, CheckCircle, ArrowRight, X, Building2, MapPin } from 'lucide-react';

export const PlanBFailoverModal = () => {
  const { planBActive, planBDetails, closePlanB, showToast } = useEmergency();
  const [broadcastSent, setBroadcastSent] = useState(false);

  if (!planBActive) return null;

  const handleBroadcast = () => {
    setBroadcastSent(true);
    showToast('🚨 PLAN B BROADCAST SENT! Emergency response units and regional blood banks notified.', 'emergency');
    setTimeout(() => {
      setBroadcastSent(false);
    }, 5000);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 100,
      background: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div className="glass-card planb-glow" style={{
        maxWidth: '700px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        background: 'var(--bg-surface)',
        border: '2px solid var(--planb-accent)',
        borderRadius: '20px',
        padding: '28px',
        position: 'relative'
      }}>
        
        {/* Close Button */}
        <button
          onClick={closePlanB}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'var(--bg-primary)',
            border: '1px solid var(--border-color)',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--text-muted)'
          }}
        >
          <X size={20} />
        </button>

        {/* Header Alert */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '20px' }}>
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #7e22ce, #a855f7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            flexShrink: 0
          }}>
            <ShieldAlert size={32} />
          </div>
          <div>
            <div className="badge badge-planb" style={{ marginBottom: '6px' }}>
              AUTOMATED FAILOVER PROTOCOL
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--planb-accent)', margin: 0 }}>
              PLAN B EMERGENCY ACTIVATED
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Resource Unavailable: <strong style={{ color: 'var(--emergency)' }}>{planBDetails.missingResource}</strong> at {planBDetails.targetFacility}
            </p>
          </div>
        </div>

        {/* Reason Card */}
        <div style={{
          background: 'var(--emergency-light)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          borderRadius: '12px',
          padding: '12px 16px',
          fontSize: '0.85rem',
          color: 'var(--emergency)',
          marginBottom: '20px',
          fontWeight: 500
        }}>
          ⚠️ {planBDetails.triggerReason || 'Primary healthcare resource is out of stock / unavailable. Backup failover recommendations loaded below.'}
        </div>

        {/* Backup Recommendations */}
        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Building2 size={18} style={{ color: 'var(--planb-accent)' }} />
          Step 1: Verified Rerouted Options ({planBDetails.recommendedOptions.length} Found)
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
          {planBDetails.recommendedOptions.map((opt, idx) => (
            <div key={idx} style={{
              background: 'var(--bg-primary)',
              border: '1px solid var(--border-color)',
              borderRadius: '14px',
              padding: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>{opt.name}</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '2px 0 0 0', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <MapPin size={12} /> Distance: {opt.distance} | Status: <span style={{ color: 'var(--success)', fontWeight: 600 }}>{opt.availableUnits}</span>
                </p>
              </div>
              <a
                href={`tel:${opt.phone}`}
                className="btn btn-primary"
                style={{ fontSize: '0.85rem', padding: '8px 14px', textDecoration: 'none' }}
              >
                <PhoneCall size={14} /> Call {opt.phone}
              </a>
            </div>
          ))}
        </div>

        {/* Step 2: Emergency Broadcast */}
        <div style={{
          background: 'var(--bg-primary)',
          border: '1px dashed var(--planb-accent)',
          borderRadius: '16px',
          padding: '20px',
          marginBottom: '20px'
        }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Radio size={18} style={{ color: 'var(--planb-accent)' }} />
            Step 2: Regional Emergency SOS Broadcast
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '6px 0 14px 0' }}>
            Broadcast an urgent SOS dispatch to nearby blood banks, ambulance networks, and verified emergency volunteers.
          </p>

          <button
            onClick={handleBroadcast}
            disabled={broadcastSent}
            className={`btn ${broadcastSent ? 'btn-outline' : 'btn-planb'}`}
            style={{ width: '100%', padding: '12px' }}
          >
            {broadcastSent ? (
              <>
                <CheckCircle size={18} style={{ color: 'var(--success)' }} /> Broadcast Active! Units Notified
              </>
            ) : (
              <>
                <Radio size={18} /> Trigger Regional Emergency Broadcast
              </>
            )}
          </button>
        </div>

        {/* Direct Action Hotlines */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <a
            href="tel:108"
            className="btn btn-emergency"
            style={{ flex: 1, textDecoration: 'none' }}
          >
            <PhoneCall size={16} /> Speed-Dial 108 Emergency
          </a>
          <button
            className="btn btn-outline"
            onClick={closePlanB}
            style={{ flex: 1 }}
          >
            Close & Return
          </button>
        </div>

      </div>
    </div>
  );
};
