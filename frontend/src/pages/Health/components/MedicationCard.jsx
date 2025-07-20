import React from 'react';
import { Clock, RefreshCw, X } from 'lucide-react';

const MedicationCard = ({ medication, onRemove, onRefill }) => {
  const getRefillButtonColor = (daysRemaining) => {
    if (daysRemaining < 2) return 'bg-red-100 text-red-700 hover:bg-red-200';
    if (daysRemaining <= 5) return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200';
    return 'bg-green-100 text-green-700 hover:bg-green-200';
  };

  return (
    <div className="p-4 bg-gray-50 rounded-lg relative">
      <button
        onClick={() => onRemove(medication.id)}
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
      >
        <X size={16} />
      </button>

      <div className="font-medium text-gray-900 mb-2">{medication.name}</div>

      <div className="text-sm text-gray-600 space-y-1 mb-4">
        <div className="flex items-center gap-1">
          <Clock size={14} />
          Last ordered: {medication.lastOrdered}
        </div>
        <div>Frequency: {medication.frequency}</div>
        <div>Days remaining: {medication.daysRemaining}</div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => onRefill(medication.id)}
          className={`px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-1.5 whitespace-nowrap ${getRefillButtonColor(medication.daysRemaining)}`}
        >
          <RefreshCw size={14} />
          Refill Now
        </button>
      </div>
    </div>
  );
};

export default MedicationCard;
