import React, { useEffect, useState } from "react";
import { Heart, Star, Shield, Loader } from "lucide-react";

function getGradient(id) {
  const gradients = [
    "from-yellow-400 to-orange-500",
    "from-green-400 to-blue-400",
    "from-pink-500 to-red-500",
  ];

  if (id === 1) {
    return gradients[0];
  } else if (id === 2) {
    return gradients[1];
  } else if (id === 3) {
    return gradients[2];
  } else {
    return "Invalid id";
  }
}

function getIcon(iconName) {
  if (iconName === "Shield") return <Shield className="text-white w-8 h-8" />;
  if (iconName === "Star") return <Star className="text-white w-8 h-8" />;
  if (iconName === "Heart") return <Heart className="text-white w-8 h-8" />;
}

const MembershipDiscounts = () => {
  const [memberships, setMemberships] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8080/api/auth/getMembershipPlans`)
      .then((res) => res.text())
      .then((res) => {
        const membershipPlans = JSON.parse(res);
        setMemberships(membershipPlans);
      });
  }, []);

  const handleUpgrade = (membership) => {
    setShowPopup(true);

    setTimeout(() => {
      setShowPopup(false);
    }, 5000);
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-yellow-200 shadow-sm">
      <h2 className="text-2xl font-semibold text-gray-800 mb-8">
        Coverage Plans
      </h2>
      <div className="flex flex-wrap justify-center gap-10">
        {memberships.map((membership) => (
          <div
            key={membership.membership.id}
            className={`p-4 rounded-lg shadow-lg bg-gradient-to-br ${getGradient(membership.membership.id)} text-white transform transition-transform hover:scale-105 w-[30%]`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">
                {membership.membership.planName}
              </h3>
              {getIcon(membership.membership.planIcon)}
            </div>
            <div>
              <div className="text-3xl font-bold mb-4">
                {membership.membership.pricePerMonth !== 0
                  ? `$${membership.membership.pricePerMonth}/month`
                  : "FREE"}
              </div>
              <h4 className="text-lg font-medium">Benefits:</h4>
              <ul className="mt-2 space-y-2 text-sm">
                {membership.membershipBenefits.map((benefit, index) => (
                  <li key={index} className="flex items-center">
                    • {benefit}
                  </li>
                ))}
              </ul>
            </div>

            {membership.membership.planName !== "Health Starter" && (
              <button
                className="mt-4 w-full py-2 bg-white text-black rounded-md hover:bg-gray-200 transition-colors"
                onClick={() => handleUpgrade(membership)}
              >
                Request to Upgrade
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setShowPopup(false)}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center w-[90%] max-w-md text-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Animated Bouncing Icon */}
            <div className="animate-bounce mb-4">
              <Loader className="w-12 h-12 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Your request is queued!
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              You will receive an email after your request inquiry.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MembershipDiscounts;
