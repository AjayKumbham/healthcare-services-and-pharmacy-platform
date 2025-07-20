import React from 'react';
import { X, BarChart3 } from 'lucide-react';

export default function ConsumerModal({ consumer, onClose, onReport }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-green-600">{consumer.name}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="h-px bg-gray-200 mb-6" />
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <button
              onClick={() => alert('Feature Coming Soon')}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
            >
              <BarChart3 className="w-6 h-6" />
              <span>View Stats</span>
            </button>
            
            <div className="mt-4">
              <p className="text-sm text-gray-600">Total Orders</p>
              <p className="text-lg font-semibold">{consumer.totalOrders}</p>
              
              <p className="mt-2 text-sm text-gray-600">Status</p>
              <p className="text-lg font-semibold capitalize">{consumer.status}</p>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Shopping Details</h3>
            <p className="text-sm text-gray-600">
              View detailed shopping history and preferences
            </p>
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
