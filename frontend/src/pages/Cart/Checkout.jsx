import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from "../../Components-Common/Header";
import Footer from "../../Components-Common/Footer";
import { Clock, ChevronRight, Crown } from 'lucide-react';
import axios from 'axios';

function getFormattedDateNextDay() {
  const today = new Date();
  const nextDay = new Date(today);
  nextDay.setDate(today.getDate() + 1);

  const day = nextDay.getDate();
  const month = nextDay.toLocaleString('default', { month: 'long' });
  const suffix = getOrdinalSuffix(day);

  return `${day}${suffix} ${month}`;
}

function getOrdinalSuffix(day) {
  if (day >= 11 && day <= 13) return "th";
  switch (day % 10) {
    case 1: return "st";
    case 2: return "nd";
    case 3: return "rd";
    default: return "th";
  }
}

function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedTime, setSelectedTime] = useState(0);
  const [popupState, setPopupState] = useState(null); // null, "processing", "success"
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const { total } = location.state || {};

  const handlePlaceOrder = () => {
    setIsPlacingOrder(true);
    setPopupState("processing"); // Show "Processing..." in popup

    axios.post(`http://localhost:8080/api/auth/placeOrder`, null, {
      params: {
        membershipId: localStorage.getItem('membershipId'),
        time: selectedTime
      }
    })
      .then(res => {
        if (res.status === 200) {
          setPopupState("success"); // Update popup to "Order Placed!"
          setTimeout(() => {
            navigate('/home');
          }, 1500); // Redirect after 1.5 seconds
        } else {
          console.log("Order failed!");
          setPopupState(null);
          setIsPlacingOrder(false);
        }
      })
      .catch(error => {
        console.error("Error placing the order:", error);
        setPopupState(null);
        setIsPlacingOrder(false);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Review and Delivery</h1>
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-emerald-600" />
              Choose Delivery Time
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {[2, 3].map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`p-4 rounded-lg border-2 transition-all ${selectedTime === time
                    ? 'border-emerald-500 bg-emerald-50'
                    : 'border-gray-200 hover:border-emerald-300'
                    }`}
                >
                  <div className="font-medium">{getFormattedDateNextDay()}</div>
                  <div className="text-lg text-emerald-700">{time} PM</div>
                </button>
              ))}
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-t border-gray-100">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${total}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-t border-gray-100">
                <span className="text-gray-600">TAX</span>
                <span className="font-medium">$1.00</span>
              </div>
              <div className="flex justify-between items-center py-3 border-t border-gray-100">
                <span className="text-gray-800 font-semibold text-lg">Total</span>
                <span className="text-gray-800 font-bold text-lg">${(Number(total) + 1).toFixed(2)}</span>
              </div>
            </div>
          </div>
          <div className="bg-emerald-50 rounded-xl p-6 mb-6">
            <div className="flex items-start space-x-4">
              <Crown className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">See Coverage Plans</h3>
                <p className="text-gray-600 mb-3">
                  Reduce your medical expenses and enjoy free shipping by upgrading your coverage plan!
                </p>
                <button onClick={() => navigate('/membership')} className="text-emerald-600 font-medium flex items-center hover:text-emerald-700 transition">
                  Learn More <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between w-full">
              <button onClick={() => navigate('/home')} className="bg-red-400 text-white px-6 py-4 rounded-lg font-semibold hover:bg-red-600 transition shadow-lg">
                Cancel
              </button>
              <button
                onClick={handlePlaceOrder}
                disabled={isPlacingOrder}
                className={`px-8 py-4 rounded-lg font-semibold transition shadow-lg ${isPlacingOrder ? 'bg-gray-400' : 'bg-emerald-600 hover:bg-emerald-700'
                  } text-white`}
              >
                {isPlacingOrder ? 'Processing...' : 'Place Order'}
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      {popupState && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-500">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center flex flex-col items-center">
            {popupState === "processing" ? (
              <>
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-xl font-semibold text-gray-800 mt-4">Processing...</p>
              </>
            ) : (
              <>
                <div className="w-16 h-16 flex items-center justify-center bg-green-500 rounded-full">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" strokeWidth="4" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <p className="text-xl font-semibold text-gray-800 mt-4">Order Placed!</p>
              </>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

export default Checkout;
