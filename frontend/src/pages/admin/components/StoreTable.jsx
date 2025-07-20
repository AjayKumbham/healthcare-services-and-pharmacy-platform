import React from 'react';

export default function StoreTable({ stores, onActionClick }) {
  const getDeliveryColor = (deliveries) => {
    if (deliveries >= 1000) return 'bg-green-100 text-green-800';
    if (deliveries >= 500) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="mt-4 overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Store Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total Deliveries
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {stores.map((store) => (
            <tr key={store.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{store.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getDeliveryColor(store.totalDeliveries)}`}>
                  {store.totalDeliveries}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => onActionClick(store)}
                  className="px-4 py-2 bg-blue-50 text-green-600 rounded-md hover:bg-blue-100 transition-colors"
                >
                  See More
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
