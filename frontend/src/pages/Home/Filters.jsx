import React, { useState, useEffect } from "react";  
import { Sliders, Star, Clock, Truck } from "lucide-react";  

export default function Filters({ setFilteredDrugs, allDrugs, searchResults, setDiscount }) {  
  const [selectedPrice, setSelectedPrice] = useState(null);  
  const [selectedDrugType, setSelectedDrugType] = useState(null);  
  const [selectedRange, setSelectedRange] = useState("");  
  const [selectedMembership, setSelectedMembership] = useState(null);  
  const [drugsToFilter, setDrugsToFilter] = useState(allDrugs);

  // Update drugs to filter when search results change
  useEffect(() => {
    setDrugsToFilter(searchResults || allDrugs);
  }, [searchResults, allDrugs]);

  useEffect(() => {  
    applyFilters();  
  }, [selectedPrice, selectedDrugType, selectedMembership, drugsToFilter]);  

  const applyFilters = () => {  
    let filtered = [...drugsToFilter];  

    // Drug Type Filtering  
    if (selectedDrugType) {  
      filtered = filtered.filter(drug =>  
        (selectedDrugType === "Generic" && drug.generic) ||   
        (selectedDrugType === "Branded" && !drug.generic)  
      );  
    }  

    // Price Filtering  
    if (selectedPrice) {  
      filtered.sort((a, b) => {  
        return selectedPrice === "lowToHigh"  
          ? a.price - b.price  
          : b.price - a.price;  
      });  
    }  

    // Apply Membership Discount
    if (selectedMembership) {
      const discountRates = {  
        "Vital Care": 40,  
        "Wellness Plus": 20,  
        "Health Starter": 10,  
      };  
      const discount = discountRates[selectedMembership] || 0;  
      setDiscount(discount);
    } else {
      setDiscount(0);
    }
    setFilteredDrugs(filtered);  
  };  

  const clearFilters = () => {  
    setSelectedPrice(null);  
    setSelectedDrugType(null);  
    setSelectedRange("");  
    setSelectedMembership(null);  
    setDiscount(0);
    setFilteredDrugs(drugsToFilter); // Reset to current search results instead of all drugs
  };  

  return (  
    <div className="bg-white rounded-lg shadow-md px-3 py-4">  
      <h2 className="text-2xl font-semibold mb-6">Filters</h2>  

      {/* Drug Types */}  
      <div className="mt-4">  
        <h3 className="text-lg font-semibold">Drug Type</h3>  
        <div className="flex gap-4 flex-col p-3">  
          <label className="flex items-center space-x-2 cursor-pointer">  
            <input  
              type="radio"  
              name="drugType"  
              value="Generic"  
              checked={selectedDrugType === "Generic"}  
              onChange={e => setSelectedDrugType(e.target.value)}  
              className="form-radio text-green-600"  
            />  
            <span>Generic</span>  
          </label>  
          <label className="flex items-center space-x-2 cursor-pointer">  
            <input  
              type="radio"  
              name="drugType"  
              value="Branded"  
              checked={selectedDrugType === "Branded"}  
              onChange={e => setSelectedDrugType(e.target.value)}  
              className="form-radio text-green-600"  
            />  
            <span>Branded</span>  
          </label>  
        </div>  
      </div>  

      {/* Price Filtering */}  
      <div className="mt-4">  
        <h3 className="text-lg font-semibold">Price</h3>  
        <div className="flex gap-4 flex-col p-3">  
          <label className="flex items-center space-x-2 cursor-pointer">  
            <input  
              type="radio"  
              name="price"  
              value="lowToHigh"  
              checked={selectedPrice === "lowToHigh"}  
              onChange={e => setSelectedPrice(e.target.value)}  
              className="form-radio text-green-600"  
            />  
            <span>Low to High</span>  
          </label>  
          <label className="flex items-center space-x-2 cursor-pointer">  
            <input  
              type="radio"  
              name="price"  
              value="highToLow"  
              checked={selectedPrice === "highToLow"}  
              onChange={e => setSelectedPrice(e.target.value)}  
              className="form-radio text-green-600"  
            />  
            <span>High to Low</span>  
          </label>  
        </div>  
      </div>  

      {/* Store Distance Range */}  
      <div className="mt-4">  
        <h3 className="text-lg font-semibold">Store Distance Range</h3>  
        <input  
          type="number"  
          value={selectedRange}  
          onChange={e => setSelectedRange(e.target.value)}  
          placeholder="Enter Miles"  
          min="0"
          step="0.1"
          className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"  
        />  
      </div>  

      {/* Membership Coverages */}  
      <div className="mt-4">  
        <h3 className="text-lg font-semibold">Membership Coverages</h3>  
        <div className="flex gap-4 flex-col p-3">  
          <label className="flex items-center space-x-2 cursor-pointer">  
            <input  
              type="radio"  
              name="membership"  
              value="Vital Care"  
              checked={selectedMembership === "Vital Care"}  
              onChange={e => setSelectedMembership(e.target.value)}  
              className="form-radio text-green-600"  
            />  
            <span>Vital Care (40% off)</span>  
          </label>  
          <label className="flex items-center space-x-2 cursor-pointer">  
            <input  
              type="radio"  
              name="membership"  
              value="Wellness Plus"  
              checked={selectedMembership === "Wellness Plus"}  
              onChange={e => setSelectedMembership(e.target.value)}  
              className="form-radio text-green-600"  
            />  
            <span>Wellness Plus (20% off)</span>  
          </label>  
          <label className="flex items-center space-x-2 cursor-pointer">  
            <input  
              type="radio"  
              name="membership"  
              value="Health Starter"  
              checked={selectedMembership === "Health Starter"}  
              onChange={e => setSelectedMembership(e.target.value)}  
              className="form-radio text-green-600"  
            />  
            <span>Health Starter (10% off)</span>  
          </label>  
        </div>  
      </div>  

      {/* Clear Filters Button */}  
      <div className="mt-6">  
        <button  
          onClick={clearFilters}  
          className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"  
        >  
          Clear Filters  
        </button>  
      </div>  
    </div>  
  );  
}