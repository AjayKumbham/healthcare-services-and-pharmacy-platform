import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';

export default function MyStore() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome to Your Pharma Store!</h1>
        <div className="mt-4 bg-white rounded-xl shadow-sm p-6">
          <p className="text-lg text-gray-600">Total Orders Delivered</p>
          <p className="text-4xl font-bold text-green-600">1,234</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Processing Orders</h2>
            <button className="flex items-center space-x-2 text-green-600">
              <Calendar size={20} />
              <span>Filter by Date</span>
            </button>
          </div>

          <div className="space-y-4">
            {[
              {
                name: 'John Doe',
                amount: 156.00,
                mode: 'pickup',
                time: '2024-03-14 10:30 AM',
              },
              {
                name: 'Jane Smith',
                amount: 243.50,
                mode: 'home-delivery',
                time: '2024-03-14 11:15 AM',
              },
            ].map((order, idx) => (
              <div key={idx} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">{order.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    order.mode === 'pickup' 
                      ? 'bg-yellow-100 text-yellow-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {order.mode === 'pickup' ? 'Pickup' : 'Home Delivery'}
                  </span>
                </div>
                <div className="border-t my-2" />
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-600 text-sm">{order.time}</p>
                    <p className="font-semibold text-lg">${order.amount.toFixed(2)}</p>
                  </div>
                  <button className="flex items-center space-x-2 text-white bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                    <span>Deliver</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Unsettled Funds</h2>
            <p className="text-4xl font-bold text-green-600">$2,459.50</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6">Customer Feedback</h2>
            <div className="space-y-4">
              {[
                {
                  name: 'Alice Johnson',
                  image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
                  feedback: 'Great service and fast delivery! Will order again.',
                },
                {
                  name: 'Bob Wilson',
                  image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
                  feedback: 'Very professional and helpful staff.',
                },
              ].map((feedback, idx) => (
                <div key={idx} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                  <img
                    src={feedback.image}
                    alt={feedback.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{feedback.name}</h3>
                    <p className="text-gray-600">{feedback.feedback}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}