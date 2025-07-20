import React from 'react';
import { Store, ShoppingBag, Package, User, LogOut } from 'lucide-react';

export default function Sidebar({ activeItem, onNavigate }) {
  const menuItems = [
    { id: 'store', label: 'My Store', icon: Store },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'inventory', label: 'Inventory', icon: Package },
  ];

  const footerItems = [
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'logout', label: 'Logout', icon: LogOut },
  ];

  const isActive = (id) => activeItem === id;

  return (
    <div
      className="h-screen w-64 bg-gradient-to-b from-green-500 to-green-700 text-white flex flex-col"
    >
      <div className="p-4">
        <div className="flex items-center justify-center mb-5 pr-3">
          <a href="/" className="text-2xl font-bold hover:text-[#A5D6A7] transition-colors flex items-center">
            <span>Price </span>
            <img
              src="https://res.cloudinary.com/dzymyjltu/image/upload/v1737485868/pam-logo_mpxeqp.png"
              alt="A"
              className="h-11 w-10 mx-1 inline"
            />
            <span>Med</span>
          </a>
        </div>
        <nav className="space-y-2">
          {menuItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${isActive(id)
                  ? 'bg-green-300 text-green-900 font-semibold'
                  : 'hover:bg-green-600'
                }`}
            >
              <Icon size={20} className={`${isActive(id) ? 'text-green-900' : 'text-white'}`} />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </div>
      <div className="mt-auto p-4 border-t border-green-400">
        {footerItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${isActive(id)
                ? 'bg-green-300 text-green-900 font-semibold'
                : 'hover:bg-green-600'
              }`}
          >
            <Icon size={20} className={`${isActive(id) ? 'text-green-900' : 'text-white'}`} />
            <span>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
