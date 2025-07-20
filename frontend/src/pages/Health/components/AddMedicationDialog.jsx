import React, { useState } from 'react';
import { X } from 'lucide-react';

const FREQUENCY_OPTIONS = ['Daily', 'Twice Daily', 'As Needed', 'Weekly'];
const AVAILABLE_MEDICATIONS = [
  { id: '1', name: 'Amiodarone' },
  { id: '2', name: 'Metoprolol' },
  { id: '3', name: 'Glipizide' },
  { id: '4', name: 'Fluticasone' },
];

const AddMedicationDialog = ({ isOpen, onClose, onSave }) => {
  const [selectedMeds, setSelectedMeds] = useState([]);
  const [frequency, setFrequency] = useState(FREQUENCY_OPTIONS[0]);

  if (!isOpen) return null;

  const handleSave = () => {
    const newMedications = selectedMeds.map((medId) => {
      const med = AVAILABLE_MEDICATIONS.find((m) => m.id === medId);
      return {
        name: med.name,
        frequency,
        daysRemaining: 30,
      };
    });
    onSave(newMedications);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Add Medications</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Medications
            </label>
            <div className="space-y-2">
              {AVAILABLE_MEDICATIONS.map((med) => (
                <label key={med.id} className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 mr-2"
                    checked={selectedMeds.includes(med.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedMeds([...selectedMeds, med.id]);
                      } else {
                        setSelectedMeds(selectedMeds.filter((id) => id !== med.id));
                      }
                    }}
                  />
                  {med.name}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Frequency
            </label>
            <select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-2"
            >
              {FREQUENCY_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleSave}
            disabled={selectedMeds.length === 0}
            className="w-full bg-blue-600 text-white rounded-md py-2 px-4 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save Medications
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMedicationDialog;
