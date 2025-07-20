import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MapPin, CreditCard, Wallet2, Banknote, ChevronUp, ChevronDown, MapPinned, Pill } from 'lucide-react';
import Header from "../../Components-Common/Header";
import Footer from "../../Components-Common/Footer";
import PropTypes from 'prop-types';
import { AlertCircle, X, Check } from 'lucide-react';
import axios from 'axios';

function Validate() {
  const location = useLocation();
  const receivedItems = location.state?.items || [];
  const [items, setItems] = useState(receivedItems);
  const [avoid, setAvoid] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [showCardDetails, setShowCardDetails] = useState(false);
  const [deliveryDetailsVisible, setDeliveryDetailsVisible] = useState(false);
  const [paymentMethodVisible, setPaymentMethodVisible] = useState(false);
  const [discount, setDiscount] = useState(20);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [paymentDetails, setPaymentDetails] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedUpi, setSelectedUpi] = useState('');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expirationDate: '',
    cvv: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch delivery details
    const membershipId = localStorage.getItem('membershipId');
    fetch(`http://localhost:8080/api/auth/delivery/${membershipId}`)
      .then(res => res.json())
      .then(data => {
        const formattedAddresses = data.map(addr => ({
          id: addr.id,
          fullAddress: `${addr.homeNumber}, ${addr.street}, ${addr.city}, ${addr.state}, ${addr.pinCode}`,
          isDefault: addr.setAsDefault
        }));
        setAddresses(formattedAddresses);

        // Set default address if available
        const defaultAddress = formattedAddresses.find(addr => addr.isDefault);
        if (defaultAddress) {
          setSelectedAddress(defaultAddress.fullAddress);
        }
      })
      .catch(error => {
        console.error("Error fetching delivery details:", error);
        showNotification("error", "Failed to fetch delivery addresses");
      });

    // Fetch payment details
    fetch(`http://localhost:8080/api/auth/payment-information/${membershipId}`)
      .then(res => res.json())
      .then(data => {
        setPaymentDetails(data);
      })
      .catch(error => {
        console.error("Error fetching payment details:", error);
        showNotification("error", "Failed to fetch payment details");
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8080/api/auth/getCoveragePlan?membershipId=${localStorage.getItem('membershipId')}`)
      .then(res => res.json())
      .then(data => {
        let newDiscount = 0;
        if (data === 1) {
          newDiscount = 10;
        } else if (data === 2) {
          newDiscount = 20;
        } else if (data === 3) {
          newDiscount = 40;
        }
        setDiscount(newDiscount);
      })
      .catch(error => console.error("Error fetching coverage plan:", error));
  }, []);

  const handleCardSelection = (cardNumber) => {
    const selectedCardDetails = paymentDetails.find(card => card.cardNumber === cardNumber);
    if (selectedCardDetails) {
      setSelectedCard(selectedCardDetails);
      setCardDetails({
        cardNumber: selectedCardDetails.cardNumber,
        expirationDate: selectedCardDetails.expirationDate,
        cvv: selectedCardDetails.cvv
      });
    }
  };

  const handleUpiSelection = (upiId) => {
    setSelectedUpi(upiId);
  };

  const showNotification = (type, message) => {
    const id = Date.now().toString();
    setNotifications(prev => [...prev, { id, type, message }]);

    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  showNotification.propTypes = {
    type: PropTypes.oneOf(["success", "error", "info"]).isRequired,
    message: PropTypes.string.isRequired,
  };

  const handleCheckout = () => {
    const itemsTotal = items.reduce((sum, item) => sum + (item.price - item.price * discount / 100) * item.quantity, 0);
    const deliveryCharge = 0.5;
    const total = itemsTotal + deliveryCharge;

    if (total >= 15) {
      navigate('/checkout', {
        state: {
          total: total.toFixed(2)
        }
      });
    } else {
      showNotification("info", "Minimum order should be placed above $15.");
    }
  };

  const refineCart = () => {
    navigate('/cart');
  };

  const updateQuantity = (index, newQty) => {
    console.log(items[index].medicationID, items[index].pharmID)


    axios.post(`http://localhost:8080/api/auth/updateCart`, null, {
      params: {
        mId: items[index].medicationID,
        pId: items[index].pharmID,
        quantity: Math.max(0, newQty),
      },
    })
      .then(response => {
        console.log('Cart updated:', response.data);

        const newItems = [...items];
        newItems[index] = { ...newItems[index], quantity: Math.max(0, newQty) };
        setItems(newItems);
      })
      .catch(error => {
        console.error('There was an error updating the cart:', error);
      });




  };

  useEffect(() => {
    console.log('Items received for validation:', items);
  }, [items]);

  const itemsTotal = items.reduce((sum, item) => sum + (item.price - item.price * discount / 100) * item.quantity, 0);
  const deliveryCharge = 0.5;
  const total = itemsTotal + deliveryCharge;

  return (
    <>
      <div className="min-h-[92vh] bg-emerald-50 max-w-[1920px] mx-auto mt-16">
        <Header />

        {/* Notifications */}
        <div className="fixed top-4 right-4 z-50 space-y-2">
          {notifications.map(notification => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg shadow-lg text-white flex items-center space-x-2 transition-all duration-500 ${notification.type === 'success' ? 'bg-green-500' :
                  notification.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
                }`}
            >
              {notification.type === 'success' ? <Check className="w-5 h-5" /> :
                notification.type === 'error' ? <X className="w-5 h-5" /> :
                  <AlertCircle className="w-5 h-5" />}
              <span>{notification.message}</span>
            </div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold text-emerald-800">Validate and Checkout</h2>
                </div>

                <div className="overflow-x-auto mb-6">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-emerald-100">
                        <th className="text-left py-4 text-emerald-700">Tablet Name</th>
                        <th className="text-center py-4 text-emerald-700">Days</th>
                        <th className="text-right py-4 text-emerald-700">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item, index) => (
                        <tr key={index} className={`border-b border-emerald-50 ${avoid.includes(item.medicationID) ? 'bg-red-500' : ''}`}>
                          <td className="py-4 text-emerald-900">{item.name}</td>
                          <td className="py-4">
                            <div className="flex items-center justify-center space-x-2">
                              <button
                                onClick={() => updateQuantity(index, item.quantity - 1)}
                                className="p-1 hover:bg-emerald-50 rounded text-emerald-600"
                              >
                                <ChevronDown size={16} />
                              </button>
                              <span className="w-8 text-center text-emerald-900">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(index, item.quantity + 1)}
                                className="p-1 hover:bg-emerald-50 rounded text-emerald-600"
                              >
                                <ChevronUp size={16} />
                              </button>
                            </div>
                          </td>
                          <td className="text-right py-4 text-emerald-900">${((item.price - item.price * discount / 100) * item.quantity).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <button
                  onClick={refineCart}
                  className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors mt-4"
                >
                  Refine Cart
                </button>

                <div className="flex flex-col justify-between items-start">
                  <button
                    onClick={() => setDeliveryDetailsVisible(true)}
                    className="w-full bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors mt-4"
                  >
                    Next
                  </button>
                </div>
              </div>

              {/* Delivery Details Section */}
              {deliveryDetailsVisible && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-semibold mb-6 text-emerald-800">Delivery Details</h2>
                  <div className="space-y-4">
                    <div className="relative">
                      <label className="block text-sm font-medium text-emerald-700 mb-1">Deliver At</label>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <select
                            value={selectedAddress}
                            onChange={(e) => setSelectedAddress(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          >
                            <option value="">Select an address</option>
                            {addresses.map((address) => (
                              <option key={address.id} value={address.fullAddress}>
                                {address.fullAddress} {address.isDefault ? '(Default)' : ''}
                              </option>
                            ))}
                          </select>
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-400" size={20} />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-emerald-700 mb-1">Contact Number</label>
                        <input
                          type="tel"
                          className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          placeholder="Enter contact number"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-emerald-700 mb-1">Recipient Name</label>
                        <input
                          type="text"
                          className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          placeholder="Enter recipient name"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end mt-4">
                      <button
                        onClick={() => setPaymentMethodVisible(true)}
                        className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                      >
                        Use This Address
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Payment Method Section */}
              {paymentMethodVisible && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-semibold mb-6 text-emerald-800">Payment Method</h2>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => {
                          setPaymentMethod('card');
                          setShowCardDetails(true);
                          setSelectedUpi('');
                        }}
                        className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-lg border-2 transition-colors ${paymentMethod === 'card' ? 'border-emerald-600 bg-emerald-50' : 'border-emerald-200 hover:border-emerald-600'}`}
                      >
                        <CreditCard size={24} className="text-emerald-600" />
                        <span className="text-emerald-600">Card</span>
                      </button>
                      <button
                        onClick={() => {
                          setPaymentMethod('upi');
                          setShowCardDetails(false);
                          setCardDetails({ cardNumber: '', expirationDate: '', cvv: '' });
                        }}
                        className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-lg border-2 transition-colors ${paymentMethod === 'upi' ? 'border-emerald-600 bg-emerald-50' : 'border-emerald-200 hover:border-emerald-600'}`}
                      >
                        <Wallet2 size={24} className="text-emerald-600" />
                        <span className="text-emerald-600">UPI</span>
                      </button>
                      <button
                        onClick={() => {
                          setPaymentMethod('cod');
                          setShowCardDetails(false);
                          setSelectedUpi('');
                          setCardDetails({ cardNumber: '', expirationDate: '', cvv: '' });
                        }}
                        className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-lg border-2 transition-colors ${paymentMethod === 'cod' ? 'border-emerald-600 bg-emerald-50' : 'border-emerald-200 hover:border-emerald-600'}`}
                      >
                        <Banknote size={24} className="text-emerald-600" />
                        <span className="text-emerald-600">Cash on Delivery</span>
                      </button>
                    </div>

                    {paymentMethod === 'card' && showCardDetails && (
                      <div className="mt-6">
                        <select
                          className="w-full mb-4 px-4 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          value={cardDetails.cardNumber}
                          onChange={(e) => handleCardSelection(e.target.value)}
                        >
                          <option value="">Select a card</option>
                          {paymentDetails.map((card) => (
                            <option key={card.id} value={card.cardNumber}>
                              {card.cardType.toUpperCase()} - **** {card.cardNumber.slice(-4)}
                            </option>
                          ))}
                        </select>
                        <div className="flex items-center space-x-4">
                          <input
                            type="text"
                            value={cardDetails.expirationDate}
                            readOnly
                            className="w-1/2 px-4 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            placeholder="Expiry Date"
                          />
                          <input
                            type="text"
                            value={cardDetails.cardNumber ? "***" : ""}
                            readOnly
                            className="w-1/2 px-4 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            placeholder="CVV"
                          />
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'upi' && (
                      <div className="mt-6">
                        <select
                          className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          value={selectedUpi}
                          onChange={(e) => handleUpiSelection(e.target.value)}
                        >
                          <option value="">Select a UPI ID</option>
                          {paymentDetails.map((detail) => (
                            <option key={detail.id} value={detail.upiId}>
                              {detail.upiId} ({detail.cardHolderName})
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    <div className="flex justify-end mt-4">
                      <button onClick={handleCheckout} className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
                        Proceed
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Summary */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                  <p className="text-sm text-emerald-700">Subtotal</p>
                  <p className="text-sm font-semibold text-emerald-900">${itemsTotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <p className="text-sm text-emerald-700">Delivery Charge</p>
                  <p className="text-sm font-semibold text-emerald-900">${deliveryCharge.toFixed(2)}</p>
                </div>
                <div className="border-t border-gray-200 my-4"></div>
                <div className="flex justify-between items-center mb-4">
                  <p className="text-sm text-emerald-700">Total</p>
                  <p className="text-sm font-semibold text-emerald-900">${total.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Validate;