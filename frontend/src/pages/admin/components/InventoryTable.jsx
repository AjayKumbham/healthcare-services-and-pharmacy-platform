import React from 'react';  

export default function InventoryTable({ drugs, onUpdateClick }) {  
  const getQuantityColor = (quantity) => {  
    if (quantity > 10000) return 'bg-green-100 text-green-800';  
    if (quantity > 6000) return 'bg-yellow-100 text-yellow-800';  
    return 'bg-red-100 text-red-800';  
  };  

  const getTypeColor = (type) => {  
    return type === 'GENERIC' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';  
  };  

  return (  
    <div className="mt-4 overflow-x-auto">  
      <table className="min-w-full divide-y divide-gray-200">  
        <thead className="bg-gray-50">  
          <tr>  
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">  
              Drug Name  
            </th>  
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">  
              Quantity  
            </th>  
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">  
              Type  
            </th>  
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">  
              Brand Name  
            </th>  
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">  
              Tier Level  
            </th>  
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">  
              Action  
            </th>  
          </tr>  
        </thead>  
        <tbody className="bg-white divide-y divide-gray-200">  
          {drugs.map((drug) => (  
            <tr key={drug.medid}> {/* Changed this to use medid to match the rest of the code */}  
              <td className="px-6 py-4 whitespace-nowrap">  
                <div className="text-sm font-medium text-gray-900">{drug.medname}</div>  
              </td>  
              <td className="px-6 py-4 whitespace-nowrap">  
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getQuantityColor(drug.quantity)}`}>  
                  {drug.quantity.toLocaleString()}  
                </span>  
              </td>  
              <td className="px-6 py-4 whitespace-nowrap">  
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getTypeColor(drug.type)}`}>  
                  {drug.type} {/* Display the type with the appropriate background highlight */}  
                </span>  
              </td>  
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">  
                {drug.brandName}  
              </td>  
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">  
                {drug.tierLevel}  
              </td>  
              <td className="px-6 py-4 whitespace-nowrap">  
                <button  
                  onClick={() => onUpdateClick(drug)}  
                  className="px-4 py-2 bg-blue-50 text-green-600 rounded-md hover:bg-blue-100 transition-colors"  
                >  
                  Update  
                </button>  
              </td>  
            </tr>  
          ))}  
        </tbody>  
      </table>  
    </div>  
  );  
}