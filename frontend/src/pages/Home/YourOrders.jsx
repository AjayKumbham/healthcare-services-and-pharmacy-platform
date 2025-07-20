import React, { useState, useEffect } from 'react';
import { ShoppingBag, X, Package, Clock, AlertCircle, CheckCircle, Home } from 'lucide-react';
import Navbar from "../../Components-Common/Header";
import Footer from "../../Components-Common/Footer";

function YourOrders() {
  const [activeTab, setActiveTab] = useState('your-orders');

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancellingOrder, setCancellingOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const membershipId = localStorage.getItem('membershipId');

      const response = await fetch(`http://localhost:8080/api/auth/getOrders?membershipID=${membershipId}`);

      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }

      const data = await response.json();

      const ordersArray = data.map(order => ({
        id: order.orderId,
        date: order.orderedDate,
        price: order.price,
        deliveryTime: order.deliveryTime,
        status: order.status || 'Confirmed',
      }));

      setOrders(ordersArray);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Failed to load your orders. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (orders.length === 0 && !loading) {
      const mockOrders = [
        {
          id: '001',
          date: new Date().toISOString(),
          price: '129.99',
          deliveryTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'confirmed',
        },
        {
          id: '002',
          date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          price: '79.50',
          deliveryTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'Confirmed',
        },
        {
          id: '003',
          date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
          price: '45.75',
          deliveryTime: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'delivered',
        },
        {
          id: '004',
          date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
          price: '199.99',
          deliveryTime: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'cancelled',
        },
      ];
      setOrders(mockOrders);
    }
  }, [orders, loading]);

  const getFormattedDate = (dateString) => {
    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });

    let suffix = "th";
    if (day % 10 === 1 && day !== 11) suffix = "st";
    else if (day % 10 === 2 && day !== 12) suffix = "nd";
    else if (day % 10 === 3 && day !== 13) suffix = "rd";

    return `${day}${suffix} ${month}`;
  };

  const cancelOrder = async (orderId) => {
    setCancellingOrder(orderId);

    try {
      const membershipId = localStorage.getItem('membershipId');

      const response = await fetch('http://localhost:8080/api/auth/cancelOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          membershipId,
          orderId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to cancel order');
      }

      await new Promise(resolve => setTimeout(resolve, 2000));

      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === orderId
            ? { ...order, status: 'cancelled' }
            : order
        )
      );
    } catch (err) {
      console.error('Error cancelling order:', err);
      alert('Failed to cancel order. Please try again.');
    } finally {
      setCancellingOrder(null);
    }
  };

  const filteredOrders = orders.filter(order => {
    if (activeTab === 'your-orders') return order.status.toLowerCase() === 'confirmed';
    if (activeTab === 'cancelled-orders') return order.status.toLowerCase() === 'cancelled';
    if (activeTab === 'previous-orders') return order.status.toLowerCase() === 'delivered';
    return false;
  });

  const getStatusIndicator = (status) => {
    const statusLower = status.toLowerCase();
    if (statusLower === 'confirmed') {
      return <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>;
    } else if (statusLower === 'cancelled') {
      return <div className="w-3 h-3 rounded-full bg-red-500"></div>;
    } else if (statusLower === 'delivered') {
      return <div className="w-3 h-3 rounded-full bg-blue-500"></div>;
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <Navbar />
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-12">
        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('your-orders')}
              className={`${activeTab === 'your-orders'
                  ? 'border-b-4 border-b-green-500 text-green-600'
                  : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 font-medium text-sm sm:text-base flex items-center transition-colors`}
            >
              <Package className="w-5 h-5 mr-2" />
              Your Orders
            </button>
            <button
              onClick={() => setActiveTab('cancelled-orders')}
              className={`${activeTab === 'cancelled-orders'
                  ? 'border-b-4 border-b-green-500 text-green-600'
                  : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 font-medium text-sm sm:text-base flex items-center transition-colors`}
            >
              <X className="w-5 h-5 mr-2" />
              Cancelled Orders
            </button>
            <button
              onClick={() => setActiveTab('previous-orders')}
              className={`${activeTab === 'previous-orders'
                  ? 'border-b-4 border-b-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm sm:text-base flex items-center transition-colors`}
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              Previous Orders
            </button>
          </nav>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 my-4">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-red-400" />
              <p className="ml-3 text-sm text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <ShoppingBag className="mx-auto h-16 w-16 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No orders found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {activeTab === 'your-orders'
                ? "You don't have any active orders at the moment."
                : activeTab === 'cancelled-orders'
                  ? "You don't have any cancelled orders."
                  : "You don't have any delivered orders yet."}
            </p>
            <div className="mt-6">
              <a
                href="/home"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <Home className="mr-2 -ml-1 h-5 w-5" />
                Shop Now
              </a>
            </div>
          </div>
        )}

        {/* Orders Grid */}
        {!loading && !error && filteredOrders.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg border border-gray-100"
              >
                {/* Order Header */}
                <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-100">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
                      <span className="mr-2">OrdId: {order.id}</span>
                    </h3>
                    <div className="flex items-center">
                      {getStatusIndicator(order.status)}
                    </div>
                  </div>
                </div>

                {/* Order Details */}
                <div className="px-4 py-5 sm:p-6 space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Ordered Date:</span>
                    <span className="text-gray-900 font-medium">{getFormattedDate(order.date)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Delivery Date:</span>
                    <span className="text-gray-900 font-medium">{getFormattedDate(order.deliveryTime)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Total Amount:</span>
                    <span className="text-gray-900 font-medium">${order.price.toFixed(2)}</span>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-gray-100 my-4"></div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2">
                    <button className="flex-1 bg-blue-100 hover:bg-blue-400 text-black font-medium py-2 px-4 rounded-md text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      Track Now
                    </button>

                    {/* Only show cancel button for confirmed orders */}
                    {order.status.toLowerCase() === 'confirmed' && (
                      <button
                        onClick={() => cancelOrder(order.id)}
                        disabled={cancellingOrder === order.id}
                        className="flex-1 bg-red-100 hover:bg-red-400 text-black font-medium py-2 px-4 rounded-md text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 flex justify-center items-center"
                      >
                        {cancellingOrder === order.id ? (
                          <>
                            <span className="animate-pulse">Cancelling...</span>
                            <span className="ml-2 h-4 w-4 rounded-full border-2 border-white border-r-transparent animate-spin"></span>
                          </>
                        ) : (
                          <>Cancel Order</>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default YourOrders;