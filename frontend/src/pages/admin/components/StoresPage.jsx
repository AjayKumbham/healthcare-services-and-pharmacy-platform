import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import StoreTable from './StoreTable';
import StoreModal from './StoreModal';
import ReportModal from './ReportModal';

const mockStores = [
  { id: '1', name: 'Downtown Market', totalDeliveries: 1200, email: 'downtown@example.com' },
  { id: '2', name: 'Sunset Grocers', totalDeliveries: 750, email: 'sunset@example.com' },
  { id: '3', name: 'Fresh Foods Co', totalDeliveries: 450, email: 'fresh@example.com' },
  { id: '4', name: 'City Supermarket', totalDeliveries: 1500, email: 'city@example.com' },
];

export default function StoresPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [deliveriesFilter, setDeliveriesFilter] = useState('');
  const [selectedStore, setSelectedStore] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);

  const filteredStores = useMemo(() => {
    return mockStores.filter(store => {
      const matchesSearch = store.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDeliveries = !deliveriesFilter || (
        deliveriesFilter === '1000+' ? store.totalDeliveries >= 1000 :
        Number(deliveriesFilter) >= store.totalDeliveries
      );
      return matchesSearch && matchesDeliveries;
    });
  }, [searchTerm, deliveriesFilter]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by Store Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Filters and Total */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="text-sm text-gray-600">
            Total Stores: {filteredStores.length}
          </div>

          <div className="flex flex-wrap gap-4">
            <select
              value={deliveriesFilter}
              onChange={(e) => setDeliveriesFilter(e.target.value)}
              className="block w-40 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">All Deliveries</option>
              <option value="100">100 Deliveries</option>
              <option value="500">500 Deliveries</option>
              <option value="1000+">1000+ Deliveries</option>
            </select>
          </div>
        </div>

        {/* Store Table */}
        <StoreTable
          stores={filteredStores}
          onActionClick={setSelectedStore}
        />
      </div>

      {/* Store Modal */}
      {selectedStore && (
        <StoreModal
          store={selectedStore}
          onClose={() => setSelectedStore(null)}
          onReport={() => setShowReportModal(true)}
        />
      )}

      {/* Report Modal */}
      {showReportModal && selectedStore && (
        <ReportModal
          consumerEmail={selectedStore.email}
          onClose={() => setShowReportModal(false)}
          onSubmit={(data) => {
            console.log('Report submitted:', data);
            setShowReportModal(false);
            setSelectedStore(null);
          }}
        />
      )}
    </div>
  );
}