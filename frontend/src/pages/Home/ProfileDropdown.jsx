// ProfileDropdown.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function ProfileDropdown() {
  return (
    <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg w-48 z-50">
      <ul className="flex flex-col py-2">
        <li className="px-4 py-2  text-gray-700 hover:text-[#34A853]">
          <Link to="/memberprofilepage">My Profile</Link>
        </li>
        <li className="px-4 py-2  text-gray-700 hover:text-[#34A853]">
          <Link to="/orders">Your Orders</Link>
        </li>
        <li className="px-4 py-2  text-gray-700 hover:text-[#34A853]">
          <Link to="/membership">Membership Plans</Link>
        </li>
        <li className="px-4 py-2  text-gray-700 hover:text-[#34A853]">
          <Link to="/support">Support</Link>
        </li>
        <li className="px-4 py-2  text-gray-700 hover:text-[#34A853]">
          <Link to="/">Log out</Link>
        </li>
      </ul>
    </div>
  );
}

export default ProfileDropdown;
