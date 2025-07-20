import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import ConsumerTable from './ConsumerTable';
import ConsumerModal from './ConsumerModal';
import ReportModal from './ReportModal';

const mockConsumers = [
  { id: '1', name: 'John Doe', status: 'active', totalOrders: 25, email: 'john@example.com' },
  { id: '2', name: 'Jane Smith', status: 'inactive', totalOrders: 15, email: 'jane@example.com' },
  { id: '3', name: 'Bob Johnson', status: 'active', totalOrders: 52, email: 'bob@example.com' },
  { id: '4', name: 'Alice Brown', status: 'inactive', totalOrders: 8, email: 'alice@example.com' },
];

export default function ConsumersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [ordersFilter, setOrdersFilter] = useState('');
  const [selectedConsumer, setSelectedConsumer] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);

  const filteredConsumers = useMemo(() => {
    return mockConsumers.filter(consumer => {
      const matchesSearch = consumer.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = !statusFilter || consumer.status === statusFilter;
      const matchesOrders = !ordersFilter || (
        ordersFilter === 'Above 50' ? consumer.totalOrders > 50 :
        Number(ordersFilter) === consumer.totalOrders
      );
      return matchesSearch && matchesStatus && matchesOrders;
    });
  }, [searchTerm, statusFilter, ordersFilter]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by Consumer Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Filters and Total */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="text-sm text-gray-600">
            Total Consumers: {filteredConsumers.length}
          </div>

          <div className="flex flex-wrap gap-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="block w-40 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">All Status</option>
              <option value="active">Active User</option>
              <option value="inactive">Inactive User</option>
            </select>

            <select
              value={ordersFilter}
              onChange={(e) => setOrdersFilter(e.target.value)}
              className="block w-40 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">All Orders</option>
              <option value="5">5 Orders</option>
              <option value="20">20 Orders</option>
              <option value="50">50 Orders</option>
              <option value="Above 50">Above 50</option>
            </select>
          </div>
        </div>

        {/* Consumer Table */}
        <ConsumerTable
          consumers={filteredConsumers}
          onActionClick={setSelectedConsumer}
        />
      </div>

      {/* Consumer Modal */}
      {selectedConsumer && (
        <ConsumerModal
          consumer={selectedConsumer}
          onClose={() => setSelectedConsumer(null)}
          onReport={() => setShowReportModal(true)}
        />
      )}

      {/* Report Modal */}
      {showReportModal && selectedConsumer && (
        <ReportModal
          consumerEmail={selectedConsumer.email}
          onClose={() => setShowReportModal(false)}
          onSubmit={(data) => {
            console.log('Report submitted:', data);
            setShowReportModal(false);
            setSelectedConsumer(null);
          }}
        />
      )}
    </div>
  );
}
