import React from "react";

import UpdatePassword from "./components/UpdatePassword";
import Footer from "../../../Components-Common/Footer";
import Header from "../signup/components/Header";

const ForgotPassword = () => {
  return (
    <div className="h-screen flex flex-col justify-between gap-24">
      <Header/>
      <div className="flex flex-col gap-24">
        <UpdatePassword />
        <Footer />
      </div>
    </div>
  );
};

export default ForgotPassword;
