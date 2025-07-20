// Define the structure of an Order
export const Order = {
  id: '', // string
  customerName: '', // string
  amount: 0, // number
  deliveryMode: 'pickup', // 'pickup' or 'home-delivery'
  createdAt: '', // string
  address: '', // string (optional)
  items: [] // array of OrderItem
};

// Define the structure of an OrderItem
export const OrderItem = {
  drugName: '', // string
  quantity: 0, // number
  inStock: false // boolean
};

// Define the structure of an InventoryItem
export const InventoryItem = {
  id: '', // string
  drugName: '', // string
  quantity: 0, // number
  brandName: '', // string
  type: 'generic' // 'generic' or 'branded'
};

// Define the structure of a StoreProfile
export const StoreProfile = {
  name: '', // string
  icon: '', // string
  address: '', // string
  homeDelivery: false, // boolean
  contact: '' // string
};
