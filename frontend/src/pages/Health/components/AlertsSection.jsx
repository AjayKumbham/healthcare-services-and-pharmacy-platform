import React from 'react';
import { AlertTriangle, AlertCircle, PlusCircle } from 'lucide-react';

const alerts = [
  { type: 'critical', condition: 'Penicillin Allergy', details: 'Severe allergic reaction' },
  { type: 'warning', condition: 'Latex Sensitivity', details: 'Mild to moderate reaction' },
  { type: 'info', condition: 'Seasonal Allergies', details: 'Spring pollen' },
];

const AlertsSection = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-red-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="text-red-500" />
          <h2 className="text-xl font-semibold text-gray-900">Critical Alerts</h2>
        </div>
        <button className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1">
          <PlusCircle size={16} />
          Add / Update Alert
        </button>
      </div>
      <div className="space-y-3">
        {alerts.map((alert, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg flex items-start gap-3 ${
              alert.type === 'critical' ? 'bg-red-50 text-red-700' :
              alert.type === 'warning' ? 'bg-yellow-50 text-yellow-700' :
              'bg-blue-50 text-blue-700'
            }`}
          >
            <AlertCircle className="mt-1" size={20} />
            <div>
              <h3 className="font-medium">{alert.condition}</h3>
              <p className="text-sm opacity-90">{alert.details}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertsSection;
