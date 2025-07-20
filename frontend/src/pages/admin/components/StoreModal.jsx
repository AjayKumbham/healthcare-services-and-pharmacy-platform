import React from 'react';
import { X, BarChart3 } from 'lucide-react';

export default function StoreModal({ store, onClose, onReport }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{store.name}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="h-px bg-gray-200 mb-6" />
        
        <div className="space-y-6">
          <button
            onClick={() => alert('Feature Coming Soon')}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
          >
            <BarChart3 className="w-6 h-6" />
            <span>View Analytics</span>
          </button>
          
          <div>
            <p className="text-sm text-gray-600">Total Deliveries</p>
            <p className="text-lg font-semibold">{store.totalDeliveries}</p>
          </div>
        </div>
        
        <button
          onClick={onReport}
          className="mt-6 w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
        >
          Report
        </button>
      </div>
    </div>
  );
}
