import React, { useEffect, useState, useCallback } from 'react';
import { Search, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import Navbar from '../../Components-Common/Header';
import Footer from '../../Components-Common/Footer';
import Filters from './Filters';
import DrugCard from './DrugCard';
import CartItem from '../Cart/CartItem';

function Home() {
  const navigate = useNavigate();
  const [allDrugs, setAllDrugs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDrugs, setFilteredDrugs] = useState([]);
  const [searchResults, setSearchResults] = useState(null);
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [selectedPrescription, setSelectedPrescription] = useState("");
  const [patientName, setPatientName] = useState("");
  const [selectedMedications, setSelectedMedications] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [coverageplan, setCurrentPlan] = useState(0);
  const [prescriptions, setPrescriptions] = useState([]);
  const [cartMedications, setCartMedications] = useState(new Set());
  const [setdiscount, setDiscount] = useState(0);
  const [discount, setDiscountd] = useState(0);
  const [setprep, setPrescription] = useState(false);
  const [setdrugdata, setDrugData] = useState();
  const [selectedConsumer, setSelectedConsumer] = useState("");
  const [consumers, setConsumers] = useState([]);
  const [filteredPrescriptions, setFilteredPrescriptions] = useState([]);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/auth/getPrescriptions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: localStorage.getItem('membershipId') || null,
        });

        if (!response.ok) throw new Error('Failed to fetch prescriptions');

        const data = await response.json();

        const runningPrescriptions = data
          .filter(prescription => prescription.endDate === null)
          .map(prescription => ({
            id: prescription.id,
            pname: prescription.patientName,
            dname: prescription.diseaseName,
            medications: prescription.medications ? prescription.medications.map(med => ({
              id: med.id,
              name: med.name,
              days: med.days
            })) : []
          }));

        const uniqueConsumers = [...new Set(runningPrescriptions.map(p => p.pname))];
        setConsumers(uniqueConsumers);
        setPrescriptions(runningPrescriptions);
      } catch (error) {
        console.error("Error fetching prescriptions:", error);
      }
    };

    fetchPrescriptions();
  }, []);

  const handleConsumerChange = (event) => {
    const selected = event.target.value;
    setSelectedConsumer(selected);
    setPatientName(selected);
    localStorage.setItem("patientName", selected);

    const prescriptionsForConsumer = prescriptions.filter(p => p.pname === selected);
    setFilteredPrescriptions(prescriptionsForConsumer);
    setSelectedPrescription("");
  };

  const handlePrescriptionChange = (event) => {
    const selectedId = event.target.value;
    const selectedPrescription = filteredPrescriptions.find(prescription => 
      prescription.id.toString() === selectedId
    );

    if (selectedPrescription) {
      setSelectedPrescription(selectedPrescription.dname);
      setPrescription(true);
      setSelectedMedications(selectedPrescription.medications || []);
    } else {
      setSelectedPrescription("");
      setPrescription(false);
      setSelectedMedications([]);
    }
  };

  const updateCartMedications = useCallback(() => {
    const membershipId = localStorage.getItem('membershipId');
    fetch(`http://localhost:8080/api/auth/getUserCart?membershipId=${membershipId}`)
      .then(res => res.json())
      .then(cartItems => {
        const medIds = new Set(cartItems.map(item => item.medication.mId));
        setCartMedications(medIds);
        setCartCount(cartItems.length);
      })
      .catch(error => console.error('Error fetching cart:', error));
  }, []);

  useEffect(() => {
    updateCartMedications();
  }, [updateCartMedications]);

  const removeItem = async (id, medicationId) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    setCartMedications(prev => {
      const newSet = new Set(prev);
      newSet.delete(medicationId);
      return newSet;
    });
  };

  const handleCartCountChange = (change) => {
    setCartCount(prevCount => Math.max(0, prevCount + change));
  };

  const calculateTotalAmount = (items) => {
    fetch(`http://localhost:8080/api/auth/getCoveragePlan?membershipId=${localStorage.getItem('membershipId')}`)
      .then(res => res.json())
      .then(data => {
        setCurrentPlan(data);
        if (data) {
          const newDiscount = data === 1 ? 10 : data === 2 ? 20 : data === 3 ? 40 : 0;
          setDiscountd(newDiscount);
        }
      })
      .catch(error => console.error("Error fetching coverage plan:", error));
    
    return items.reduce((sum, item) => {
      return sum + (item.selected ? parseFloat(((item.price - (item.price * discount) / 100) * item.quantity).toFixed(2)) : 0);
    }, 0);
  };

  useEffect(() => {
    const membershipId = localStorage.getItem('membershipId');
    if (!membershipId) {
      console.error("Membership ID not found in local storage.");
      return;
    }

    fetch(`http://localhost:8080/api/auth/getUserCart?membershipId=${membershipId}`)
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(cartItems => {
        if (!Array.isArray(cartItems)) {
          console.error("Invalid cart data received:", cartItems);
          return;
        }

        const formattedCart = cartItems.map((drug) => ({
          id: drug.id,
          pharmID: drug.pharmacy?.phId ?? null,
          medicationID: drug.medication?.mId ?? null,
          name: drug.medication?.medName ?? "Unknown",
          brand: drug.medication?.brandName ?? "Unknown",
          store: drug.pharmacy?.address ?? "Unknown",
          distance: `3 miles away`,
          delivery: drug.pharmacy?.hd ? "Home Delivery" : "In-store Pickup",
          price: parseFloat(drug.unitPrice) || 0,
          quantity: drug.quantity || 1,
          selected: true
        }));

        setItems(formattedCart);
        setTotal(calculateTotalAmount(formattedCart));
      })
      .catch(error => console.error('Error fetching cart:', error));
  }, []);

  useEffect(() => {
    setTotal(calculateTotalAmount(items));
  }, [items, discount]);

  const updateTotal = useCallback(() => {
    const val = calculateTotalAmount(items);
    setTotal(val);
  }, [items, discount]);

  const handleQuantityChange = useCallback((id, increment) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id
          ? { ...item, quantity: increment ? Math.min(item.quantity + 1, 10) : Math.max(item.quantity - 1, 0) }
          : item
      )
    );
  }, []);

  useEffect(() => {
    updateTotal();
  }, [items, updateTotal]);

  const handlevalidate = () => {
    const selectedItems = items.filter(item => item.selected);
    navigate('/validate', { state: { items: selectedItems } });
  };

  async function fetchData(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }

  const refreshCart = useCallback(async () => {
    const membershipId = localStorage.getItem('membershipId');
    try {
      const response = await fetch(`http://localhost:8080/api/auth/getUserCart?membershipId=${membershipId}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const cartItems = await response.json();

      const formattedCart = cartItems.map((drug) => ({
        id: drug.id,
        pharmID: drug.pharmacy.phId,
        medicationID: drug.medication.mId,
        name: drug.medication.medName,
        brand: drug.medication.brandName,
        store: drug.pharmacy.address,
        distance: `3 miles away`,
        delivery: drug.pharmacy.hd ? "Home Delivery" : "In-store Pickup",
        price: drug.unitPrice,
        quantity: drug.quantity,
        selected: true
      }));

      setItems(formattedCart);
      setTotal(calculateTotalAmount(formattedCart));
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  }, []);

  useEffect(() => {
    const loadData = async () => {
      const pharmaInventory = await fetchData("http://localhost:8080/api/auth/inventory/all");
      const drugData = await fetchData("http://localhost:8080/api/auth/all");
      const pharmaStores = await fetchData("http://localhost:8080/api/auth/stores/all");

      setDrugData(drugData);

      const formattedMeds = pharmaInventory.map(item => {
        const matchedDrug = drugData.find(drug => drug.mId === item.drugData.mId);
        const matchedStore = pharmaStores.find(store => store.userId === item.phId);

        if (!matchedDrug) {
          console.warn(`No matching drug found for mid: ${item.mid}`);
          return null;
        }

        return {
          medid: matchedDrug.mId,
          medname: matchedDrug.medName || 'Unknown',
          brandname: matchedDrug.brandName || 'Generic',
          store_name: matchedStore ? matchedStore.storeName : 'Unknown Store',
          store_id: matchedStore ? matchedStore.phId : "No store",
          distance: 3.0,
          availability: true,
          frequency: matchedDrug.frequency,
          home_delivery: matchedStore && matchedStore.hd === 1 ? 1 : 0,
          price: item.pricePerPill,
          quantity: matchedDrug.quantityPerSheetOrBox,
          generic: matchedDrug.drugType === 'GENERIC',
          dosage_form: matchedDrug.strength || 'Unknown',
          days_supply: matchedStore ? matchedStore.sd : 0,
          age_range: matchedDrug.ageRange || 'Unknown',
          alt_meds: matchedDrug.alternativeMedIds?.join(", ") || 'None',
          image: matchedDrug.imageUrl || '',
          description: matchedDrug.description || 'No description available',
        };
      }).filter(Boolean);

      setAllDrugs(formattedMeds);
      setFilteredDrugs(formattedMeds);
    };

    loadData();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults(null);
      setFilteredDrugs(allDrugs);
    } else {
      const searchResults = allDrugs.filter(drug =>
        drug.medname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        drug.brandname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        drug.description.toLowerCase().includes(searchQuery.toLowerCase())
      );

      const altDrugIds = new Set();
      searchResults.forEach(drug => {
        if (drug.alt_meds !== "None") {
          drug.alt_meds.split(", ").forEach(id => altDrugIds.add(id));
        }
      });

      const alternativeDrugs = allDrugs.filter(drug => altDrugIds.has(drug.medid.toString()));
      const finalResults = [...searchResults, ...alternativeDrugs];

      const updatedResults = finalResults.map(drug => ({
        ...drug,
        stores: allDrugs
          .filter(storeDrug => storeDrug.medid === drug.medid)
          .map(storeDrug => ({
            storeName: storeDrug.store_name,
            storeId: storeDrug.store_id,
            homeDelivery: storeDrug.home_delivery,
            daysSupply: storeDrug.days_supply,
            availability: true,
          }))
      }));

      setSearchResults(updatedResults);
      setFilteredDrugs(updatedResults);
    }
  }, [searchQuery, allDrugs]);

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-[#E8F5E9] max-w-[1920px] mx-auto px-3 py-4 mt-16">
        <main className="max-w-[1920px] mx-auto px-3 py-4">
          <div className="grid grid-cols-1 md:grid-cols-[300px_1fr_350px] gap-6">
            <aside>
              <Filters
                allDrugs={allDrugs}
                searchResults={searchResults}
                setFilteredDrugs={setFilteredDrugs}
                setDiscount={setDiscount}
              />
            </aside>

            <div>
              <section>
                <div className="flex items-center space-x-4 mb-8 justify-center">
                  <div className="relative flex-1 max-w-2xl">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search for medicines..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#34A853] text-lg"
                    />
                  </div>
                </div>

                <div>
                  {filteredDrugs.length > 0 ? (
                    <>
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold">
                          Available Medicines ({filteredDrugs.length})
                        </h2>
                        <div className="flex space-x-4">
                          <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-green-200">
                            <span className="text-sm font-semibold text-black">Generic</span>
                          </div>
                          <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-yellow-200">
                            <span className="text-sm font-semibold text-black">Branded</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4 h-[99vh] overflow-y-auto">
                        {filteredDrugs.map((drug, index) => (
                          <DrugCard
                            key={`${drug.medid}-${index}`}
                            drug={drug}
                            allDrugs={setdrugdata}
                            discount={setdiscount}
                            onCartUpdate={refreshCart}
                            setPrescription={setprep}
                            selecteddname={patientName}
                            prepmeds={selectedMedications}
                            onCartCountChange={handleCartCountChange}
                            isInCart={cartMedications.has(drug.medid)}
                          />
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-12">
                      <img
                        src="https://res.cloudinary.com/dzymyjltu/image/upload/v1737485868/pam-logo_mpxeqp.png"
                        alt="No Medicines Found"
                        className="mx-auto w-24 h-24 animate-bounce"
                      />
                      <h2 className="text-xl font-semibold text-gray-600 mt-4">No Medicines Found</h2>
                      <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
                    </div>
                  )}
                </div>
              </section>
            </div>

            <aside>
              <div>
                <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                  <h2 className="text-lg font-bold mb-2">
                    Select your <span className="text-green-600">Consumer</span>
                  </h2>
                  <select 
                    onChange={handleConsumerChange} 
                    className="border p-2 rounded w-full"
                  >
                    <option value="">Select Consumer</option>
                    {consumers.map((consumer, index) => (
                      <option key={index} value={consumer}>{consumer}</option>
                    ))}
                  </select>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                  <h2 className="text-lg font-bold mb-2">
                    Select your <span className="text-blue-500">Prescription</span>
                  </h2>
                  <select 
                    onChange={handlePrescriptionChange} 
                    className="border p-2 rounded w-full" 
                    disabled={!selectedConsumer}
                  >
                    <option value="">Select Prescription</option>
                    {filteredPrescriptions.map((prescription) => (
                      <option key={prescription.id} value={prescription.id}>
                        {prescription.dname}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="bg-[#E8F5E9]">
                  <div className='container mx-auto'>
                    <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-xl p-6 b-5">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2 relative">
                          <div className="relative">
                            <ShoppingCart className="w-6 h-6 text-green-600" />
                            {cartCount > 0 && (
                              <motion.span
                                key={cartCount}
                                initial={{ scale: 0.4 }}
                                animate={{ scale: 1.2 }}
                                transition={{ type: "spring", stiffness: 300, damping: 10 }}
                                className="absolute -top-5 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                              >
                                {cartCount}
                              </motion.span>
                            )}
                          </div>
                          <h1 className="text-xl font-bold text-gray-800">Your Cart</h1>
                        </div>

                        <div className="flex gap-3">
                          <button
                            onClick={handlevalidate}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                            disabled={!items.some(item => item.selected)}
                          >
                            Validate
                          </button>
                        </div>
                      </div>

                      <div className="flex justify-between mt-6 text-lg font-semibold">
                        <p className="text-gray-800">Total Amount:</p>
                        <p className="text-red-600">$ {total.toFixed(2)}</p>
                      </div>

                      <div className="space-y-4 overflow-y-auto max-h-96 p-2">
                        {items.length > 0 ? (
                          items.map(item => (
                            <CartItem
                              key={item.id}
                              {...item}
                              onQuantityChange={handleQuantityChange}
                              removeItem={(id) => removeItem(id, item.medicationID)}
                              updateTotal={updateTotal}
                              onCartCountChange={handleCartCountChange}
                              onCartUpdate={updateCartMedications}
                            />
                          ))
                        ) : (
                          <div className="text-center py-8 text-gray-500">
                            Your cart is empty
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default Home;