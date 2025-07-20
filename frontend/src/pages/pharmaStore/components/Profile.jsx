import React, { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    icon: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926',
    address: '',
    homeDelivery: true,
    contact: '',
    email: '',
    supplyDays: '0', // Default value for supply days  
  });

  // Load initial profile data from local storage  
  useEffect(() => {
    setProfile({
      ...profile,
      name: localStorage.getItem('username') || '',
      address: localStorage.getItem('address') || '',
      email: localStorage.getItem('email') || '',
      contact: localStorage.getItem('contact') || '',
      supplyDays: localStorage.getItem('supplyDays') || '0',
    });
  }, []);

  const handleSave = async () => {
    const updateRequest = {
      userId: localStorage.getItem('userId'), // Assume userId is stored in local storage  
      name: profile.name,
      email: profile.email,
      address: profile.address,
      contact: profile.contact,
      sd: parseInt(profile.supplyDays),
      hd: profile.homeDelivery ? 1 : 0, // Assuming home delivery is represented as 1 or 0  
    };

    try {
      const response = await fetch('http://localhost:8080/pharmastores/update', { // Replace with your actual URL  
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateRequest),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const data = await response.text(); // Get the response message  
      alert(data); // Alert the user with the server response message  

      // Update local storage with new values  
      localStorage.setItem('username', profile.name);
      localStorage.setItem('address', profile.address);
      localStorage.setItem('contact', profile.contact);
      localStorage.setItem('email', profile.email);
      localStorage.setItem('supplyDays', profile.supplyDays);
      setIsEditing(false);
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while updating the profile');
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Manage Your Profile</h1>

      <div className="max-w-2xl bg-white rounded-xl shadow-sm p-6">
        <div className="space-y-6">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <img
                src={profile.icon}
                alt="Store Icon"
                className="w-24 h-24 rounded-lg object-cover"
              />
              {isEditing && (
                <button className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white rounded-lg">
                  Change
                </button>
              )}
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Store Name
              </label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                disabled={!isEditing}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-50"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Store Address
            </label>
            <input
              type="text"
              value={profile.address}
              onChange={(e) => setProfile({ ...profile, address: e.target.value })}
              disabled={!isEditing}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Home Delivery
            </label>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => isEditing && setProfile({ ...profile, homeDelivery: true })}
                disabled={!isEditing}
                className={`px-4 py-2 rounded-lg transition-colors ${profile.homeDelivery
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-600'
                  } disabled:opacity-50`}
              >
                Yes
              </button>
              <button
                onClick={() => isEditing && setProfile({ ...profile, homeDelivery: false })}
                disabled={!isEditing}
                className={`px-4 py-2 rounded-lg transition-colors ${!profile.homeDelivery
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-600'
                  } disabled:opacity-50`}
              >
                No
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact
            </label>
            <input
              type="text"
              value={profile.contact}
              onChange={(e) => setProfile({ ...profile, contact: e.target.value })}
              disabled={!isEditing}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              disabled={!isEditing}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Supply Days Count
            </label>
            <input
              type="number"
              value={profile.supplyDays}
              onChange={(e) => setProfile({ ...profile, supplyDays: e.target.value })}
              disabled={!isEditing}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-50"
            />
          </div>

          <button
            onClick={() => {
              if (isEditing) {
                handleSave();
              } else {
                setIsEditing(true);
              }
            }}
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            {isEditing ? 'Save Changes' : 'Update Profile'}
          </button>
        </div>
      </div>
    </div>
  );
}