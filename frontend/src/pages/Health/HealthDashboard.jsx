import React from 'react';
import AlertsSection from './components/AlertsSection';
import ConditionsCard from './components/ConditionsCard';
import MedicationsCard from './components/MedicationsCard';
import Header from "../../Components-Common/Header";
import Footer from "../../Components-Common/Footer";
import NotesCard from './components/NotesCard';

const HealthDashboard = () => {
  return (
    <div>
      <Header />
      <div
        className="min-h-screen p-6 bg-green-400"
        style={{ backgroundColor: 'rgb(233 247 239 / var(--tw-bg-opacity))' }}
      >

        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Health Conditions & Allergies</h1>
          <p className="text-gray-600 mt-2">Manage your health information and prescriptions</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="col-span-full">
            <AlertsSection />
          </div>
          <ConditionsCard />
          <MedicationsCard />
          <NotesCard />
        </div>

      </div>
      <Footer />
    </div>
  );
};

export default HealthDashboard;
