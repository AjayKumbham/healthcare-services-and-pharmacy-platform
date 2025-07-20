import React, { useState } from 'react';
import { Pill, PlusCircle } from 'lucide-react';
import Card from './Card';
import MedicationCard from './MedicationCard';
import AddMedicationDialog from './AddMedicationDialog';

const MedicationsCard = () => {
  const [medications, setMedications] = useState([
    { 
      id: '1',
      name: 'Albuterol',
      lastOrdered: '2024-02-15',
      frequency: 'Daily',
      daysRemaining: 3
    },
    {
      id: '2',
      name: 'Ventolin Inhaler',
      lastOrdered: '2024-01-30',
      frequency: 'As needed',
      daysRemaining: 7
    },
  ]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleRemoveMedication = (id) => {
    setMedications(medications.filter(med => med.id !== id));
  };

  const handleRefillMedication = (id) => {
    alert('Your refill is confirmed. Please be available at home, your order will arrive in 1 hour.');
    setMedications(medications.map(med => 
      med.id === id ? { ...med, daysRemaining: 30, lastOrdered: new Date().toISOString().split('T')[0] } : med
    ));
  };

  const handleAddMedications = (newMeds) => {
    const newMedications = newMeds.map(med => ({
      ...med,
      id: Math.random().toString(36).substr(2, 9),
      lastOrdered: new Date().toISOString().split('T')[0],
    }));
    setMedications([...medications, ...newMedications]);
  };

  return (
    <>
      <Card 
        title="Current Medications" 
        icon={Pill} 
        iconColor="text-blue-500"
        className="relative"
      >
        <button
          onClick={() => setIsAddDialogOpen(true)}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600"
        >
          <PlusCircle size={20} />
        </button>

        <div className="space-y-4">
          {medications.map((medication) => (
            <MedicationCard
              key={medication.id}
              medication={medication}
              onRemove={handleRemoveMedication}
              onRefill={handleRefillMedication}
            />
          ))}
        </div>
      </Card>

      <AddMedicationDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onSave={handleAddMedications}
      />
    </>
  );
};

export default MedicationsCard;