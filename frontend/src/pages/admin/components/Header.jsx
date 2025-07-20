import React from 'react';
import { Store, Users, Package2, UserCircle } from 'lucide-react';

export default function Header({ activeTab, onTabChange }) {
  const navItems = [
    { id: 'consumers', label: 'Consumers', icon: <Users className="w-5 h-5" /> },
    { id: 'stores', label: 'Stores', icon: <Store className="w-5 h-5" /> },
    { id: 'inventory', label: 'Inventory', icon: <Package2 className="w-5 h-5" /> },
    { id: 'membership', label: 'Membership', icon: <UserCircle className="w-5 h-5" /> },
  ];

  return (
    <header className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <img
              src="https://res.cloudinary.com/dzymyjltu/image/upload/v1737485868/pam-logo_mpxeqp.png"
              alt="A"
              className="h-11 w-10 mx-1 inline"
            />
            <span className="ml-2 text-xl font-bold text-gray-900">PAM Inventory</span>
          </div>

          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors
                  ${activeTab === item.id
                    ? 'text-green-600 bg-blue-50'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                  }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100">
              <span className="sr-only">Open menu</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex items-center w-full px-3 py-2 rounded-md text-base font-medium
                ${activeTab === item.id
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`}
            >
              {item.icon}
              <span className="ml-2">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
