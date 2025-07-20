import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import MyStore from './components/MyStore';
import Orders from './components/Orders';
import Inventory from './components/Inventory';
import Profile from './components/Profile';

function StoreDashboard() {
  const [activeItem, setActiveItem] = useState('store');

  const handleNavigate = (item) => {
    if (item === 'logout') {
      window.location.href = '/';
      return;
    }
    setActiveItem(item);
  };

  const renderContent = () => {
    switch (activeItem) {
      case 'store':
        return <MyStore />;
      case 'orders':
        return <Orders />;
      case 'inventory':
        return <Inventory />;
      case 'profile':
        return <Profile />;
      default:
        return <MyStore />;
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-64 h-screen bg-white shadow-lg overflow-hidden">
      <Sidebar activeItem={activeItem} onNavigate={handleNavigate} />
      </div>
      <main className="flex-1 overflow-y-auto bg-gray-50 p-4">
        <Routes>
          <Route path="/" element={renderContent()} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default StoreDashboard;
