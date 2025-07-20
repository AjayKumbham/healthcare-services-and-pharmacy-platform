import React, { useRef, useState } from "react";
import Carousel from "./Carousel";
import Benefits from "./Benefits";
import Support from "./Support";
import FAQ from "./FAQ";
import Footer from "../../Components-Common/Footer";
import Subscribe  from "./Subscribe";
import "./tailwind.css";
import LandingHeader from "./LandingHeader";
import PAMBot from "../../chatbot/PAMBot";

export default function Landing2() {
  const benefitsRef = useRef(null);
  const supportRef = useRef(null);
  const faqRef = useRef(null);

  function scrollToBenefits() {
    benefitsRef.current.scrollIntoView();
  }

  function scrollToSupport() {
    supportRef.current.scrollIntoView();
  }

  function scrollToFAQ() {
    faqRef.current.scrollIntoView();
  }

  

  return (
    <div className="min-h-screen bg-white">

      <LandingHeader
        scrollToBenefits={scrollToBenefits}
        scrollToSupport={scrollToSupport}
        scrollToFAQ={scrollToFAQ}
      />

      <Carousel />

      <Benefits ref={benefitsRef} />

      <Support ref={supportRef} />

      <FAQ ref={faqRef} />

      <Subscribe/>

      <PAMBot/>

      <Footer />


    </div>
  );
}
