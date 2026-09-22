import React from 'react';
import { useEmergency } from '../context/EmergencyContext';
import { AlertTriangle } from 'lucide-react';

export const AmbulanceModule = () => {
  const { triggerPlanB, showToast } = useEmergency();

  const ambulances = [
    { id: 'amb-1', title: 'ICU / Advanced Life Support (ALS)', station: 'Apex Super Specialty Hospital', eta: '7 mins', status: 'AVAILABLE' },
    { id: 'amb-2', title: 'Basic Life Support (BLS)', station: 'Apex Super Specialty Hospital', eta: '12 mins', status: 'AVAILABLE' },
    { id: 'amb-3', title: 'ICU / ALS Ambulance', station: 'City Trauma & General Hospital', eta: '15 mins', status: 'BUSY' },
    { id: 'amb-4', title: 'ICU / ALS Ambulance', station: 'St. Jude Emergency Care Center', eta: '18 mins', status: 'AVAILABLE' }
  ];

  return (
    <div>
      <h2 className="module-header-title">
        🚑 Module 1: Live Ambulance Tracker & Dispatch
      </h2>

      <div className="module-card-list">
        {ambulances.map(amb => {
          const isAvailable = amb.status === 'AVAILABLE';

          return (
            <div key={amb.id} className="module-card">
              <div className="card-row-top">
                <span className="card-title">{amb.title}</span>
                <span className={`status-badge ${isAvailable ? 'available' : 'busy'}`}>
                  {amb.status}
                </span>
              </div>

              <div className="card-subtitle">
                Station: {amb.station} | ETA: <strong>{amb.eta}</strong>
              </div>

              {isAvailable ? (
                <button
                  className="btn-dispatch"
                  onClick={() => showToast(`🚑 ${amb.title} Dispatched from ${amb.station}! ETA: ${amb.eta}`)}
                >
                  Dispatch Ambulance Now
                </button>
              ) : (
                <button
                  className="btn-planb-failover"
                  onClick={() => triggerPlanB({
                    reason: `Ambulance (${amb.title}) is currently BUSY on duty at ${amb.station}.`,
                    missingResource: amb.title,
                    facilityName: amb.station
                  })}
                >
                  <AlertTriangle size={18} /> Trigger Plan B Failover
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
