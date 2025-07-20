import React from "react";
import Header from "../../Components-Common/Header";
import Footer from "../../Components-Common/Footer";
import Questions from "./components/Questions";


const FAQs = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header className="flex-none" />
      <div className="flex-1 flex flex-col overflow-scroll bg-transparent">
        <Questions />
        <Footer />
      </div>
    </div>
  );
};

export default FAQs;
