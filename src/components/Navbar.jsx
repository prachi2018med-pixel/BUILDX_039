import React from 'react';
import { useEmergency } from '../context/EmergencyContext';
import { Ambulance, Stethoscope, Droplet, BedDouble, AlertTriangle, Moon, Sun, PhoneCall, HeartPulse } from 'lucide-react';

export const Navbar = () => {
  const { activeModule, setActiveModule, darkMode, setDarkMode, setSosModalOpen, triggerPlanB } = useEmergency();

  const navItems = [
    { id: 'ambulance', label: 'Ambulances', icon: Ambulance, color: 'text-sky-500' },
    { id: 'doctor', label: 'Doctor by Injury', icon: Stethoscope, color: 'text-emerald-500' },
    { id: 'blood', label: 'Blood Banks', icon: Droplet, color: 'text-rose-500' },
    { id: 'bed', label: 'Bed Availability', icon: BedDouble, color: 'text-amber-500' }
  ];

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 40,
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      background: darkMode ? 'rgba(11, 15, 25, 0.85)' : 'rgba(255, 255, 255, 0.85)',
      borderBottom: '1px solid var(--border-color)',
      padding: '12px 0'
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        
        {/* Brand & Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => setActiveModule('ambulance')}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #ef4444, #b91c1c)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            boxShadow: 'var(--shadow-glow)'
          }}>
            <HeartPulse size={26} className="sos-pulse" />
          </div>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
              SAHAY <span style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: '12px', background: 'var(--emergency-light)', color: 'var(--emergency)', border: '1px solid rgba(239,68,68,0.3)' }}>EMERGENCY 24x7</span>
            </h1>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>Healthcare Resource & Plan B Failover System</p>
          </div>
        </div>

        {/* 4 Module Tabs Navigation */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--bg-primary)', padding: '6px', borderRadius: '14px', border: '1px solid var(--border-color)' }}>
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeModule === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveModule(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 14px',
                  borderRadius: '10px',
                  border: 'none',
                  background: isActive ? 'var(--bg-surface)' : 'transparent',
                  color: isActive ? 'var(--text-main)' : 'var(--text-muted)',
                  fontWeight: isActive ? 600 : 500,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  boxShadow: isActive ? 'var(--shadow-sm)' : 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                <Icon size={18} style={{ color: isActive ? 'var(--emergency)' : 'inherit' }} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Controls: Hotlines, Plan B Manual Test, Theme Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          
          {/* Quick SOS Trigger */}
          <button 
            className="btn btn-emergency sos-pulse"
            onClick={() => setSosModalOpen(true)}
            style={{ padding: '8px 14px', fontSize: '0.85rem' }}
          >
            <PhoneCall size={16} />
            <span>SOS EMERGENCY</span>
          </button>

          {/* Test Plan B Failover */}
          <button 
            className="btn btn-planb"
            onClick={() => triggerPlanB({
              reason: 'Manual Test: Immediate Healthcare System Failover Triggered',
              missingResource: 'Emergency ICU Beds & O- Blood Units',
              facilityName: 'Central Regional Sector'
            })}
            title="Simulate automated Plan B failover"
            style={{ padding: '8px 12px', fontSize: '0.85rem' }}
          >
            <AlertTriangle size={16} />
            <span>TEST PLAN B</span>
          </button>

          {/* Theme Toggle */}
          <button
            className="btn btn-outline"
            onClick={() => setDarkMode(!darkMode)}
            style={{ width: '38px', height: '38px', padding: 0, borderRadius: '50%' }}
            title="Toggle Light/Dark Theme"
          >
            {darkMode ? <Sun size={18} style={{ color: '#f59e0b' }} /> : <Moon size={18} style={{ color: '#0284c7' }} />}
          </button>

        </div>

      </div>
    </header>
  );
};
