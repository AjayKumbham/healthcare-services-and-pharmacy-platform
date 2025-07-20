import React, { useState, useMemo, useEffect } from 'react';  
import { Search } from 'lucide-react';  
import InventoryTable from './InventoryTable';  
import UpdateDrugModal from './UpdateDrugModal';  

export default function InventoryPage() {  
  const [allDrugs, setAllDrugs] = useState([]);  
  const [filteredDrugs, setFilteredDrugs] = useState([]);  
  const [searchTerm, setSearchTerm] = useState('');  
  const [quantityFilter, setQuantityFilter] = useState('');  
  const [typeFilter, setTypeFilter] = useState('');  
  const [tierFilter, setTierFilter] = useState('');  
  const [selectedDrug, setSelectedDrug] = useState(null);  

  const fetchData = async (url) => {  
    const response = await fetch(url);  
    if (!response.ok) {  
      throw new Error('Network response was not ok');  
    }  
    return await response.json();  
  };  

  useEffect(() => {  
    const loadData = async () => {  
      try {  
        const allData = await fetchData("http://localhost:8080/api/auth/pam/inventory");  
        
        const formattedMeds = allData.map(item => ({  
          medid: item.mId,  
          medname: item.medName || 'Unknown',  
          brandName: item.brandName || 'Generic',  
          frequency: item.frequency || 'N/A',  
          quantity: item.quantity || 0,  
          type: item.drugType,  
          dosage_form: item.strength || 'Unknown',  
          image: item.imageUrl || '',  
          tierLevel: 'Tier 2',  
          description: item.description || 'No description available',  
        }));  

        setAllDrugs(formattedMeds);  
        setFilteredDrugs(formattedMeds);  

      } catch (error) {  
        console.error('Error loading data:', error);  
      }  
    };  

    loadData();  
  }, []);  

  const filteredDrugsList = useMemo(() => {  
    return filteredDrugs.filter(drug => {  
      const matchesSearch = drug.medname.toLowerCase().includes(searchTerm.toLowerCase());  
      
      const matchesQuantity = !quantityFilter || (  
        quantityFilter === '2000' ? drug.quantity <= 2000 :  
        quantityFilter === '6000' ? drug.quantity <= 6000 && drug.quantity > 2000 :  
        quantityFilter === '10000' ? drug.quantity <= 10000 && drug.quantity > 6000 :  
        true  
      );  
      
      const matchesType = !typeFilter || drug.type === typeFilter; // Fixed logic for type matching  
      
      // Assuming the tier logic may not be directly related to the drug entity. Adjust if needed.  
      const matchesTier = !tierFilter || drug.tierLevel === tierFilter; // Adjust level matching  

      return matchesSearch && matchesQuantity && matchesType && matchesTier;  
    });  
  }, [searchTerm, quantityFilter, typeFilter, tierFilter, filteredDrugs]);  

  const handleUpdateDrug = (updatedDrug) => {  
    console.log('Updating drug:', updatedDrug);  
    setSelectedDrug(null);  
  };  

  return (  
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">  
      <div className="space-y-4">  
        {/* Search Bar */}  
        <div className="relative">  
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />  
          <input  
            type="text"  
            placeholder="Search by Drug Name"  
            value={searchTerm}  
            onChange={(e) => setSearchTerm(e.target.value)}  
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"  
          />  
        </div>  

        {/* Filters and Total */}  
        <div className="flex flex-wrap items-center justify-between gap-4">  
          <div className="text-sm text-gray-600">  
            Total Drugs: {filteredDrugsList.length}  
          </div>  

          <div className="flex flex-wrap gap-4">  
            <select  
              value={quantityFilter}  
              onChange={(e) => setQuantityFilter(e.target.value)}  
              className="block w-40 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"  
            >  
              <option value="">All Quantities</option>  
              <option value="2000">Below 2,000</option>  
              <option value="6000">2,000 - 6,000</option>  
              <option value="10000">6,000 - 10,000</option>  
            </select>  

            <select  
              value={typeFilter}  
              onChange={(e) => setTypeFilter(e.target.value)}  
              className="block w-40 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"  
            >  
              <option value="">All Types</option>  
              <option value="GENERIC">Generic</option>  
              <option value="BRANDED">Branded</option>  
            </select>  

            <select  
              value={tierFilter}  
              onChange={(e) => setTierFilter(e.target.value)}  
              className="block w-40 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"  
            >  
              <option value="">All Tiers</option>  
              <option value="Tier 1">Tier 1</option>  
              <option value="Tier 2">Tier 2</option>  
              <option value="Tier 3">Tier 3</option>  
            </select>  
          </div>  
        </div>  

        {/* Inventory Table */}  
        <InventoryTable  
          drugs={filteredDrugsList}  
          onUpdateClick={setSelectedDrug}  
        />  
      </div>  

      {/* Update Drug Modal */}  
      {selectedDrug && (  
        <UpdateDrugModal  
          drug={selectedDrug}  
          onClose={() => setSelectedDrug(null)}  
          onUpdate={handleUpdateDrug}  
        />  
      )}  
    </div>  
  );  
}