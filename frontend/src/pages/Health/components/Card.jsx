import React from 'react';

const Card = ({ title, icon: Icon, iconColor = 'text-gray-500', children, className = '' }) => {
  return (
    <div className={`bg-white rounded-xl shadow-sm p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Icon className={iconColor} />
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Card;
