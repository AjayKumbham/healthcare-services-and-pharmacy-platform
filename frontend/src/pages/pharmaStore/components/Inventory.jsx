import React, { useState, useEffect, useMemo } from 'react';  
import { Search, X } from 'lucide-react';  

export default function Inventory() {  
  const [showRefillModal, setShowRefillModal] = useState(false);  
  const [selectedDrug, setSelectedDrug] = useState(null);  
  const [searchQuery, setSearchQuery] = useState('');  
  const [quantityFilter, setQuantityFilter] = useState('');  
  const [brandFilter, setBrandFilter] = useState('');  
  const [inventory, setInventory] = useState([]);   
  const [loading, setLoading] = useState(false);  

  useEffect(() => {  
    const fetchInventory = async () => {  
      setLoading(true);  
      try {  
        const userId = localStorage.getItem('userId');  
        const response = await fetch('http://localhost:8080/pharmastores/storeinventory', {  
          method: 'POST',  
          headers: { 'Content-Type': 'application/json' },  
          body: JSON.stringify({ phId: userId })  
        });  

        if (response.ok) {  
          const data = await response.json();  
          setInventory(data);  
        } else {  
          console.error('Failed to fetch inventory data');  
        }  
      } catch (error) {  
        console.error('Error fetching inventory:', error);  
      } finally {  
        setLoading(false);  
      }  
    };  

    fetchInventory();  
  }, []);  

  // Extract unique brand names from inventory  
  const uniqueBrands = useMemo(() => {  
    return [...new Set(inventory.map((drug) => drug.brandName).filter(Boolean))];  
  }, [inventory]);  

  const filteredInventory = useMemo(() => {  
    return inventory.filter(drug => {  
      const medName = drug.medName?.toLowerCase() ?? '';  
      const brandName = drug.brandName?.toLowerCase() ?? '';  

      // Search filter  
      const searchMatch = medName.includes(searchQuery.toLowerCase()) || brandName.includes(searchQuery.toLowerCase());  

      // Quantity filter  
      const quantityMatch = !quantityFilter || drug.quantity <= parseInt(quantityFilter);  

      // Brand filter  
      const brandMatch = !brandFilter || brandName === brandFilter.toLowerCase();  

      return searchMatch && quantityMatch && brandMatch;  
    });  
  }, [searchQuery, quantityFilter, brandFilter, inventory]);  

  const getButtonColor = (quantity) => {  
    if (quantity < 20) return 'bg-red-600 hover:bg-red-700';  
    if (quantity < 80) return 'bg-yellow-600 hover:bg-yellow-700';  
    return 'bg-green-600 hover:bg-green-700';  
  };  

  return (  
    <div className="p-8">  
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Manage Your Inventory</h1>  

      <div className="bg-white rounded-xl shadow-sm p-6">  
        <div className="flex flex-col md:flex-row gap-4 mb-6">  
          <div className="relative flex-grow">  
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />  
            <input  
              type="text"  
              value={searchQuery}  
              onChange={(e) => setSearchQuery(e.target.value)}  
              placeholder="Search by Drug Name or Brand Name"  
              className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"  
            />  
          </div>  
          <select   
            value={quantityFilter}  
            onChange={(e) => setQuantityFilter(e.target.value)}  
            className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"  
          >  
            <option value="">Filter by Quantity</option>  
            <option value="20">Less than 20</option>  
            <option value="80">Less than 80</option>  
            <option value="100">Less than 100</option>  
          </select>  
          <select   
            value={brandFilter}  
            onChange={(e) => setBrandFilter(e.target.value)}  
            className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"  
          >  
            <option value="">Filter by Brand</option>  
            {uniqueBrands.map((brand) => (  
              <option key={brand} value={brand}>{brand}</option>  
            ))}  
          </select>  
        </div>  

        {loading ? (  
          <p className="text-center">Loading inventory...</p>  
        ) : (  
          <div className="overflow-x-auto">  
            <table className="w-full">  
              <thead>  
                <tr className="border-b">  
                  <th className="text-left py-4 px-4">Drug Name</th>  
                  <th className="text-left py-4 px-4">Quantity</th>  
                  <th className="text-left py-4 px-4">Brand Name</th>  
                  <th className="text-left py-4 px-4">Type</th>  
                  <th className="text-left py-4 px-4">Action</th>  
                </tr>  
              </thead>  
              <tbody className="divide-y">  
                {filteredInventory.map((drug, idx) => (  
                  <tr key={idx} className="hover:bg-gray-50">  
                    <td className="py-4 px-4">{drug.medName}</td>  
                    <td className="py-4 px-4">{drug.quantity}</td>  
                    <td className="py-4 px-4">{drug.brandName || '--'}</td>  
                    <td className="py-4 px-4">  
                      <span className={`px-3 py-1 rounded-full text-sm ${  
                        drug.drugType === 'GENERIC'  
                          ? 'bg-green-100 text-green-800'  
                          : 'bg-yellow-100 text-yellow-800'  
                      }`}>  
                        {drug.drugType === 'GENERIC' ? 'Generic' : 'Branded'}  
                      </span>  
                    </td>  
                    <td className="py-4 px-4">  
                      <button  
                        onClick={() => {  
                          setSelectedDrug(drug);  
                          setShowRefillModal(true);  
                        }}  
                        className={`text-white px-4 py-2 rounded-lg transition-colors ${getButtonColor(drug.quantity)}`}  
                      >  
                        Refill Today  
                      </button>  
                    </td>  
                  </tr>  
                ))}  
                {filteredInventory.length === 0 && (  
                  <tr>  
                    <td colSpan={5} className="py-8 text-center text-gray-500">  
                      No matching items found  
                    </td>  
                  </tr>  
                )}  
              </tbody>  
            </table>  
          </div>  
        )}  
      </div>  

      {/* Refill Modal */}  
      {showRefillModal && selectedDrug && (  
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">  
          <div className="bg-white rounded-xl max-w-md w-full">  
            <div className="p-6">  
              <div className="flex justify-between items-center mb-6">  
                <h2 className="text-xl font-bold">{selectedDrug.medName}</h2>  
                <button  
                  onClick={() => setShowRefillModal(false)}  
                  className="text-gray-400 hover:text-gray-600"  
                >  
                  <X size={24} />  
                </button>  
              </div>  

              <div className="space-y-4">  
                <div>  
                  <label className="block text-sm font-medium text-gray-700 mb-1">  
                    Refill Quantity  
                  </label>  
                  <input  
                    type="number"  
                    min="1"  
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"  
                  />  
                </div>  

                <div>  
                  <label className="block text-sm font-medium text-gray-700 mb-1">  
                    Brand  
                  </label>  
                  <select className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500">  
                    <option value="Pfizer">Pfizer</option>  
                    <option value="Moderna">Moderna</option>  
                    <option value="Johnson & Johnson">Johnson & Johnson</option>  
                    <option value="Eli Lilly">Eli Lilly</option>  
                    <option value="Merck">Merck</option>  
                  </select>  
                </div>  

                <button  
                  onClick={() => {  
                    alert('Your Refill is Confirmed');  
                    setShowRefillModal(false);  
                  }}  
                  className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"  
                >  
                  Confirm Refill  
                </button>  
              </div>  
            </div>  
          </div>  
        </div>  
      )}  
    </div>  
  );  
}