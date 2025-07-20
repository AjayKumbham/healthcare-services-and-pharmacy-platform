import React from 'react';
import { Heart, Star, Shield } from 'lucide-react';

const membershipData = {
  1: {
    id: 1,
    planName: "Health Starter",
    planDesc: "Comprehensive health monitoring and personalized recommendations.",
    benefits: [
      "Regular health check-ups",
      "Priority appointment booking",
      "Digital health records",
      "Personalized health insights",
      "20% discount on purchases",
    ],
    gradient: "from-yellow-400 to-orange-500",
    icon: <Shield className="text-white w-8 h-8" />,
  },
  2: {
    id: 2,
    planName: "Wellness Plus",
    planDesc: "Enhanced wellness program with exclusive benefits.",
    benefits: [
      "Premium health services",
      "Specialist consultations",
      "Wellness workshops",
      "Fitness tracking",
      "40% discount on purchases",
    ],
    gradient: "from-green-400 to-blue-400",
    icon: <Star className="text-white w-8 h-8" />,
  },
  3: {
    id: 3,
    planName: "Vital Care",
    planDesc: "Complete healthcare coverage for you and your family.",
    benefits: [
      "Family health coverage",
      "Emergency support",
      "Mental health services",
      "Nutrition guidance",
      "60% discount on purchases",
    ],
    gradient: "from-pink-500 to-red-500",
    icon: <Heart className="text-white w-8 h-8" />,
  }
};

const CurrentPlans = ({ currentPlan }) => {
  if (!currentPlan || !membershipData[currentPlan]) {
    return <p className="text-center text-gray-600">Loading current plan...</p>;
  }

  const plan = membershipData[currentPlan];

  return (
    <main className="container mx-auto px-4 py-8 space-y-8">
      <div className="bg-white p-6 rounded-lg border border-[#A9DFBF] shadow-sm ">
        <h2 className="text-2xl font-semibold text-[#2C3E50] mb-8">
          Your Current Plan
        </h2>

        <div>
          <div
            key={plan.id}
            className={`p-4 rounded-lg border border-[#A9DFBF] transform transition-transform hover:scale-105 w-[30%] bg-gradient-to-br ${plan.gradient}`}
          >
            <div className="flex items-center mb-2">
              <h3 className="text-left text-xl font-semibold text-white mr-4">
                {plan.planName}
              </h3>
              <div className="ml-auto">{plan.icon}</div>
            </div>
            <p className="text-white">{plan.planDesc}</p>
            <h4 className="font-medium text-white mt-4">Benefits:</h4>
            <ul className="space-y-2 mt-2">
              {plan.benefits.map((benefit, index) => (
                <li key={index} className="text-white text-sm">• {benefit}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CurrentPlans;
