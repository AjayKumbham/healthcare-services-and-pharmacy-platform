import React, { useEffect, useState } from 'react';
import { MapPin, ShoppingCart, Truck, Star, Calendar } from 'lucide-react';
import PropTypes from 'prop-types';
import { AlertCircle, X, Check } from 'lucide-react';


export default function DrugCard({ allDrugs, drug, discount, onCartUpdate, onCartCountChange, isInCart, setPrescription, selecteddname, prepmeds }) {
  const [isMedInCart, setIsMedInCart] = useState(isInCart);
  const [notifications, setNotifications] = useState([]);
  const [patientDetails, setPatientDetails] = useState(null);

  const fetchHealthInfo = async (name) => {
    try {
      const encodedName = encodeURIComponent(name);
      const response = await fetch(`http://localhost:8080/api/auth/get/patient/data?name=${encodedName}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${await response.text()}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching health info:", error);
      return null;
    }
  };

  // useEffect to trigger fetch when needed
  useEffect(() => {
    if (patientDetails) {
      console.log("Updated Patient Details:", patientDetails);
    }
  }, [patientDetails]);

  
  useEffect(() => {
    setIsMedInCart(isInCart);
  }, [isInCart]);

  const showNotification = (type, message) => {
    const id = Date.now().toString();
    setNotifications(prev => [...prev, { id, type, message }]);

    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  };

  showNotification.propTypes = {
    type: PropTypes.oneOf(["success", "error", "info"]).isRequired,
    message: PropTypes.string.isRequired,
  };

  const discountedPrice = (drug.price - (drug.price * (discount / 100))).toFixed(2);

  const onButtonClick = async () => {
    try {
      if (setPrescription) {
        const cleanedNames = prepmeds.map(med => med.name.replace(/\s*\d+mg$/, '').trim());
        const filteredDrugs = allDrugs.filter(drug => cleanedNames.includes(drug.medName));

        function mapAlternativeMedNames(filteredDrugs, allDrugs) {
          return filteredDrugs.map(med => {
            let existingAlternatives = new Set();

            let alternativeNames = med.alternativeMedIds
              .map(altId => {
                let match = allDrugs.find(drug => drug.mId === altId);
                return match ? match.medName : null;
              })
              .filter(name => name !== null);

            alternativeNames.forEach(name => existingAlternatives.add(name));

            const result = {
              mId: med.mId,
              medName: med.medName,
              alternativeMedNames: Array.from(existingAlternatives)
            };

            return result;
          });
        }

        let result = mapAlternativeMedNames(filteredDrugs, allDrugs);
        console.log(result);

        // await fetchHealthInfo(selecteddname);
        const patientDetailsn = await fetchHealthInfo(selecteddname);
        console.log(patientDetailsn);

      // Call the additional endpoint
      const requestBody = {
        previousMedications: patientDetailsn.currentMedications,
        previousHealthConditions: patientDetailsn.healthConditions,
        selectedMedication: drug.medname
      };

      console.log(requestBody);


      // const response = await fetch('http://localhost:5000/health', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(requestBody)
      // });

      // if (response.ok) {
      //   const data = await response.json();
      //   if(data.response.startsWith("Yes")){
      //     showNotification("error", "You are adding a medicine which might interfere with previous medications! . please consult doctor");
      //   }
      //   console.log("Health check response:", data);
      // } else {
      //   console.error("Error in health check API:", response.statusText);
      // }


        const checkAndNotifyDrug = (drug, result) => {

          if (!drug || !drug.medname) {
            showNotification("error", "Invalid drug data");
            return;
          }
          const drugName = drug.medname.trim().toLowerCase();
          const isMainDrugPresent = result.some(entry => entry.medName.trim().toLowerCase() === drugName);

          if (isMainDrugPresent) {
            showNotification("error", "The Selected Drug may interfer with the previous drugs. Please consult a doctor.");
            showNotification("success", "Drug added to cart successfully");
            return;
          }
          const isAlternativeDrugPresent = result.some(entry =>
            entry.alternativeMedNames.some(altName => altName.trim().toLowerCase() === drugName)
          );
          if (isAlternativeDrugPresent) {
            showNotification("info", "Alternative drug has been added to the cart");
            return;
          }
          showNotification("error", "Drug is not under your prescription. Please confirm with your physician once before checkout.");
        };       

        // console.log("user health details are \nallergies: ",allergies,"\ncurrent medications : ", currentMedications,"\nhealthconditions: ",healthConditions );

        if (!isMedInCart) {
          const response = await fetch('http://localhost:8080/api/auth/addCart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              membershipId: localStorage.getItem('membershipId'),
              medicationId: drug.medid,
              pharmacyId: drug.store_id,
              quantity: 1,
              unitPrice: drug.price,
            }),
          });

          if (response.ok) {
            setIsMedInCart(true);
            onCartUpdate();
            onCartCountChange(1);
          }
          checkAndNotifyDrug(drug, result);

        } else {
          const response = await fetch(
            `http://localhost:8080/api/auth/delCart?membershipId=${localStorage.getItem("membershipId")}&medId=${drug.medid}&pharmId=${drug.store_id}`,
            { method: "POST" }
          );

          if (response.ok) {
            setIsMedInCart(false);
            onCartUpdate();
            onCartCountChange(-1);
          }
          showNotification("success", "Drug removed from cart successfully");
        }
      } else {
        showNotification("info", "Select your Prescription to Shop for drugs");
      }
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };


  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4 hover:shadow-lg transition-shadow">
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
      {/* Rest of the component remains the same */}
      <div className="flex gap-6">
        <img src={drug.image} alt={drug.medname} className="w-32 h-32 object-cover rounded-lg" />
        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <h3 className={`text-lg font-bold py-1 px-2 rounded-lg ${drug.generic ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
              {drug.medname}
            </h3>
            <div className="flex items-center space-x-2">
              <span className="text-sm bg-red-100 text-red-800 py-1 px-2 rounded-full line-through">
                ${drug.price.toFixed(2)}
              </span>
              <span className="text-sm bg-green-100 text-green-800 py-1 px-2 rounded-full">
                ${discountedPrice}
              </span>
            </div>
          </div>

          <p className="text-sm text-gray-700 mb-2">{drug.description}</p>
          <p className="text-sm text-gray-600"><strong>Brand: </strong>{drug.brandname}</p>
          <p className="text-sm text-gray-600"><strong>Dosage:</strong> {drug.dosage_form}</p>
          <p className="text-sm text-gray-600"><strong>Quantity: </strong>{drug.quantity} per sheet or bottle</p>
          <p className="text-sm text-gray-600"><strong>Frequency: </strong>{drug.frequency}</p>
          <p className="text-sm text-gray-600"><strong>Age: </strong>{drug.age_range}</p>
          <div className="flex items-center text-yellow-500 mt-2">
            <Star className="w-4 h-4" />
            <span className="ml-1 text-sm">4.2</span>
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center text-sm text-gray-500">
          <MapPin className="w-4 h-4 mr-2" />
          <span>{drug.store_name} ({drug.distance} miles)</span>
        </div>

        {drug.home_delivery == "1" && (
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-sm text-green-600">
              <Truck className="w-4 h-4 mr-2" />
              <span>Home Delivery</span>
            </div>
            {drug.days_supply && (
              <div className="flex items-center text-sm text-blue-600">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{drug.days_supply} days supply</span>
              </div>
            )}
          </div>
        )}

        {drug.home_delivery == "1" && (
          <button
            className={`flex items-center text-sm text-white ${isMedInCart ? 'bg-blue-600' : 'bg-green-600'} hover:${isMedInCart ? 'bg-blue-300' : 'bg-green-300'} transition-colors duration-300 py-2 px-4 rounded-lg focus:outline-none`}
            onClick={onButtonClick}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            <span>{isMedInCart ? 'Added to Cart' : 'Add to Cart'}</span>
          </button>
        )}
      </div>
    </div>
  );
}