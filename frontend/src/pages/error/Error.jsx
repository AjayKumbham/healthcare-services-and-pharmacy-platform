import React from "react";
import { motion } from "framer-motion";
import Footer from "/src/Components-Common/Footer.jsx";

const Error = () => {
  return (
    <div className="flex flex-col h-screen justify-between items-center">
      <header className="bg-[#2A6041] text-white py-3 px-6 flex items-center justify-between text-lg w-full">
        <a href="/" className="text-2xl font-bold hover:text-[#A5D6A7] transition-colors flex items-center">
          <span>Price </span>
          <img
            src="https://res.cloudinary.com/dzymyjltu/image/upload/v1737485868/pam-logo_mpxeqp.png"
            alt="A"
            className="h-11 w-10 mx-1 inline"
          />
          <span>Med</span>
        </a>
      </header>

      <div className="flex flex-col items-center justify-center text-center m-10">
        {/* Animated Bouncing Man */}
        <motion.img
          src="https://res.cloudinary.com/dzymyjltu/image/upload/v1737485868/pam-logo_mpxeqp.png" // Example Error Character Image
          alt="Error Character"
          className="w-64 h-64 mb-6"
          animate={{ y: [0, -20, 0] }} // Bouncing animation
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        />

        <h1 className="text-6xl font-bold text-[#035c67] my-4">ERROR 404</h1>
        <a href="/home" className="text-[#035] text-lg underline hover:text-[#0277BD] transition-colors">
          Back to Home
        </a>
      </div>

      <div className="overflow-scroll w-full">
        <Footer />
      </div>
    </div>
  );
};

export default Error;
