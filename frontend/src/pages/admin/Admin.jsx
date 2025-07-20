import React, { useState } from 'react';
import Header from './components/Header';
import ConsumersPage from './components/ConsumersPage';
import StoresPage from './components/StoresPage';
import InventoryPage from './components/InventoryPage';

function Admin() {
  const [activeTab, setActiveTab] = useState('consumers');

  const renderContent = () => {
    switch (activeTab) {
      case 'consumers':
        return <ConsumersPage />;
      case 'stores':
        return <StoresPage />;
      case 'inventory':
        return <InventoryPage />;
      // case 'membership':
      //   return <StoresPage />;
      default:
        return (
          <div className="flex items-center justify-center h-[calc(100vh-4rem)] text-gray-500">
            Coming Soon
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      {renderContent()}
    </div>
  );
}

export default Admin;