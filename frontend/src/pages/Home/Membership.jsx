import React, { useEffect, useState } from 'react';
import MembershipDiscounts from '../Prescription/MembershipDiscounts';
import CurrentPlans from './CurrentPlans';
import Navbar from "../../Components-Common/Header";
import Footer from "../../Components-Common/Footer";

function Membership() {

  const [currentPlan, setCurrentPlan] = useState(null);

  useEffect(() => {      
    fetch(`http://localhost:8080/api/auth/getCoveragePlan?membershipId=${localStorage.getItem('membershipId')}`)
      .then(res => res.json())
      .then(data => {
        setCurrentPlan(data);
      });
  }, []);


  return (
    <div >
      <Navbar />
      <div className="min-h-screen bg-[#E8F5E9] max-w-[1920px] mx-auto px-3 py-4 mt-16">
        <CurrentPlans currentPlan={currentPlan} />
        <main className="container mx-auto px-4 py-8 space-y-8">
          <MembershipDiscounts />
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default Membership;
