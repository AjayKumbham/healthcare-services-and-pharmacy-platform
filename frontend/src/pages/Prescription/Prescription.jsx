import React, { useEffect, useState } from 'react';
import RunningPrescriptions from './RunningPrescriptions';
import OlderPrescriptions from './OlderPrescriptions';
import MembershipDiscounts from './MembershipDiscounts';
import Navbar from "../../Components-Common/Header";
import Footer from "../../Components-Common/Footer";


function Prescription() {

  const [runningPrescriptions, setRunningPrescriptions] = useState([]);
  const [oldPrescriptions, setOldPrescriptions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/auth/getPrescriptions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: localStorage.getItem('membershipId') || null,
    })
      .then(res => res.text())
      .then(res => {
        const prescriptionList = JSON.parse(res);
        const runningPrescriptions = []
        const oldPrescriptions = []

        prescriptionList.forEach(prescription => {
          if (prescription.endDate != null) oldPrescriptions.push(prescription);
          else runningPrescriptions.push(prescription);
        })

        setRunningPrescriptions(runningPrescriptions);
        setOldPrescriptions(oldPrescriptions);
        console.log(runningPrescriptions, oldPrescriptions);
      });
  }, []);


  function closePrescription(id) {

    setRunningPrescriptions(runningPrescriptions.filter(prescription => {
      if (prescription.id === id) {
        const currentDate = new Date();
        const formattedDate = currentDate.getFullYear() + '-' +
          String(currentDate.getMonth() + 1).padStart(2, '0') + '-' +
          String(currentDate.getDate()).padStart(2, '0');
        prescription.endDate = formattedDate;
        setOldPrescriptions([...oldPrescriptions, prescription]);
      }
      return prescription.id != id;
    }));

    fetch('http://localhost:8080/api/auth/endPrescription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: id,
    });
  }

  return (
    <div className="min-h-screen bg-[#E9F7EF]">
      <Navbar />
      <main className="container mx-auto px-4 py-8 space-y-8">
        <RunningPrescriptions prescriptions={runningPrescriptions} closePrescription={closePrescription} />
        <OlderPrescriptions prescriptions={oldPrescriptions} />
        <MembershipDiscounts />
      </main>
      <Footer />
      
    </div>
  );
}

export default Prescription;