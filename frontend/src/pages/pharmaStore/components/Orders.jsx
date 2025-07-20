import React, { useState } from 'react';
import { Search, Calendar, MapPin, X, Send, ArrowRight } from 'lucide-react';

export default function Orders() {
  const [showModal, setShowModal] = useState(false);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  return (
    <div className="p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-lg text-gray-600">Pending Pickup Orders</p>
          <p className="text-4xl font-bold text-yellow-600">12</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-lg text-gray-600">Pending Home Delivery</p>
          <p className="text-4xl font-bold text-green-600">8</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h2 className="text-xl font-semibold">Processing Orders</h2>
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <div className="relative flex-grow md:flex-grow-0">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by Name or Address"
                className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <button className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
              <Calendar size={20} />
              <span>Filter by Date</span>
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {[
            {
              name: 'John Doe',
              amount: 156.00,
              mode: 'pickup',
              time: '2024-03-14 10:30 AM',
              address: '123 Main St, City, State',
            },
            {
              name: 'Jane Smith',
              amount: 243.50,
              mode: 'home-delivery',
              time: '2024-03-14 11:15 AM',
              address: '456 Oak Ave, City, State',
            },
          ].map((order, idx) => (
            <div key={idx} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-lg">{order.name}</h3>
                  <p className="text-gray-600">{order.address}</p>
                </div>
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
                <button
                  onClick={() => {
                    setSelectedOrder(order);
                    setShowModal(true);
                  }}
                  className="flex items-center space-x-2 text-white bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <span>Deliver</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Details Modal */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold">{selectedOrder.name}</h2>
                  <p className="text-3xl font-bold text-green-600 mt-2">
                    ${selectedOrder.amount.toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Order Items</h3>
                  <div className="space-y-2">
                    {[
                      { name: 'Paracetamol', qty: 2, inStock: true },
                      { name: 'Amoxicillin', qty: 1, inStock: false },
                    ].map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center">
                        <span>{item.name} x{item.qty}</span>
                        <span className={`px-2 py-1 rounded-full text-sm ${
                          item.inStock
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {item.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedOrder.mode === 'home-delivery' && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold">Delivery Location</h3>
                      <button className="text-green-600 hover:text-green-700">
                        <MapPin size={20} />
                      </button>
                    </div>
                    <p className="text-gray-600 mt-1">{selectedOrder.address}</p>
                  </div>
                )}
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => {
                    setShowReplyModal(true);
                  }}
                  className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <span>Reply & Close</span>
                </button>
                <button
                  onClick={() => {
                    alert('Order is Completed');
                    setShowModal(false);
                    setShowReplyModal(false);
                  }}
                  className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <span>Deliver Now</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reply Modal */}
      {showReplyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Reply to Customer</h3>
                <button
                  onClick={() => setShowReplyModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              </div>
              <textarea
                className="w-full h-32 p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Type your message here..."
              />
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => {
                    setShowReplyModal(false);
                    setShowModal(false);
                  }}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <span>Send</span>
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}