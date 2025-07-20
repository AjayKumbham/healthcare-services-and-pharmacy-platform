import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { AlertCircle, X, Check } from 'lucide-react';

function CartItem({
  id,
  name,
  brand,
  distance,
  delivery,
  price,
  quantity,
  removeItem,
  pharmID,
  medicationID,
  onCartUpdate,
  onCartCountChange
}) {
  const [Quantity, setIsQuantity] = useState(quantity);
  const [coverageplan, setCurrentPlan] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [discount, setDiscount] = useState(0);

  // Stable showNotification function using useCallback
  const showNotification = useCallback((type, message) => {
    const id = Date.now().toString();
    setNotifications(prev => [...prev, { id, type, message }]);

    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 2000);
  }, []);

   showNotification.propTypes = {
      type: PropTypes.oneOf(["success", "error", "info"]).isRequired,
      message: PropTypes.string.isRequired,
    };

  useEffect(() => {
    fetch(`http://localhost:8080/api/auth/getCoveragePlan?membershipId=${localStorage.getItem('membershipId')}`)
      .then(res => res.json())
      .then(data => {
        setCurrentPlan(data);
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

  const onButtonClick = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/auth/delCart?membershipId=${localStorage.getItem('membershipId')}&medId=${medicationID}&pharmId=${pharmID}`,
        { method: 'POST' }
      );

      if (response.ok) {
        showNotification("success", "Drug removed from cart successfully");
        removeItem(id);
        if (onCartUpdate) {
          onCartUpdate();
        }
        if (onCartCountChange) {
          onCartCountChange(-1);
        }
      } else {
        showNotification("error", "Failed to remove the drug. Try again.");
      }
      
    } catch (error) {
      console.error("Error removing item from cart:", error);
      showNotification("error", "Something went wrong. Try again.");
    }
  };

  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 w-full block">{name}</h3>
      <div className="flex justify-between mt-2">
        <div className="flex flex-col text-sm text-gray-600">
          <p className="text-gray-600">{brand}</p>
          <p className="text-gray-400">{distance}</p>
          <p className="text-gray-500">{delivery}</p>
        </div>
        <div className="flex flex-col items-end">
          <p className="text-lg font-medium text-green-600">
            ${(Quantity * (price * (1 - discount / 100))).toFixed(2)}
          </p>
          <button
            onClick={onButtonClick}
            className="mt-2 text-sm text-white bg-red-600 hover:bg-red-400 transition-colors duration-300 py-1.5 px-4 rounded-lg focus:outline-none"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
