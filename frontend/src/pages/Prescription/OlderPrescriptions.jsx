import React, { useState } from 'react';
import { Eye, X } from 'lucide-react';

const OlderPrescriptions = ({ prescriptions }) => {
  const [selectedPrescription, setSelectedPrescription] = useState(null);

  const openModal = (prescription) => {
    setSelectedPrescription(prescription);
  };

  const closeModal = () => {
    setSelectedPrescription(null);
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-red-200 shadow-sm">
      <h2 className="text-2xl font-semibold text-[#2C3E50] mb-4">Older</h2>
      
      {/* Scrollable container */}
      <div className="max-h-[550px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 p-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {prescriptions.slice().reverse().map((prescription) => (
            <div 
              key={prescription.id} 
              className="bg-white p-4 rounded-lg border border-[#A9DFBF] transform transition-transform hover:scale-105 hover:shadow-lg hover:border-[#1e7b43] h-full"
            >
              <h3 className="text-center text-xl font-medium text-[#2C3E50] mb-2">
                {prescription.diseaseName}
              </h3>
              <div className="space-y-2 mb-4">
              <p className="text-green-700 underline">Patient: {prescription.patientName}</p>
                <div className="flex justify-between">
                  <p className="text-[#2C3E50]">Start: {prescription.startDate}</p>
                  <p className="text-[#2C3E50]">End: {prescription.endDate || 'Ongoing'}</p>
                </div>   
                <p className="text-[#2C3E50]">Hospital: {prescription.hospitalName}</p>
                <p className="text-[#2C3E50]">Doctor: {prescription.doctorName}</p>
              </div>
              <div className="flex space-x-3 justify-center">
                <button onClick={() => openModal(prescription)} className="flex items-center px-4 py-2 bg-[#2ECC71] text-white rounded-md hover:bg-[#27AE60] transition-colors">
                  <Eye className="w-4 h-4 mr-2" />
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for prescription details */}
      {selectedPrescription && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-semibold text-[#2C3E50]">Prescription Details</h3>
              <button onClick={closeModal} className="text-gray-600 hover:text-gray-900">
                <X className="w-6 h-6" />
              </button>
            </div>
            <p><strong>Disease:</strong> {selectedPrescription.diseaseName}</p>
            <p className="text-green-700 underline"><strong>Patient:</strong> {selectedPrescription.patientName}</p>
            <p><strong>Doctor:</strong> {selectedPrescription.doctorName}</p>
            <p><strong>Hospital:</strong> {selectedPrescription.hospitalName}</p>
            <p><strong>Address:</strong> {selectedPrescription.hospitalAddress}</p>
            <p><strong>Start Date:</strong> {selectedPrescription.startDate}</p>
            <p><strong>End Date:</strong> {selectedPrescription.endDate || 'Ongoing'}</p>
            <h4 className="mt-4 text-xl font-semibold text-red-600">Medications</h4>
            <table className="w-full mt-2 border border-collapse border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Days</th>
                </tr>
              </thead>
              <tbody>
                {selectedPrescription.medications.map((med) => (
                  <tr key={med.id} className="border">
                    <td className="border p-2">{med.name}</td>
                    <td className="border p-2">{med.days}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default OlderPrescriptions;