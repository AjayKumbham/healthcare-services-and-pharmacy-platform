import React from 'react';
import { MapPin, ShoppingCart, Truck } from 'lucide-react';

export default function DrugCard({ drug }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4 hover:shadow-lg transition-shadow">
      <div className="flex gap-6">
        <img
          src={drug.image}
          alt={drug.name}
          className="w-32 h-32 object-cover rounded-lg"
        />
        <div className="flex-1">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                {drug.name} - {drug.dosage}
              </h3>
              <p className="text-2xl font-bold text-[#34A853] my-2">
                ₹{drug.pricePerSheet}
                <span className="text-sm text-gray-600 ml-1">per sheet</span>
              </p>
              <p className="text-gray-600">{drug.brand}</p>
              <p className="text-gray-600">{drug.store}</p>
              <div className="flex items-center text-gray-600 mt-2">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{drug.radius} miles away</span>
              </div>
            </div>
            <p className="text-gray-600">{drug.count}/Count</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-[#34A853] text-white px-6 py-2 rounded-md hover:bg-[#2C9147] transition-colors">
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </button>
            <button className="flex items-center gap-2 bg-[#81C784] text-white px-6 py-2 rounded-md hover:bg-[#66BB6A] transition-colors">
              <Truck className="w-5 h-5" />
              Home Delivery
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
