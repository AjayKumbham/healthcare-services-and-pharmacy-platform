import React from "react";
import Typewriter from "typewriter-effect";

import Header from "./components/Header";
import LoginForm from "./Components/LoginForm";
import Footer from "/src/Components-common/Footer.jsx";

const Login = () => {
  return (
    <div className="flex h-screen flex-col justify-between gap-16">
      <Header />
      <div className="flex flex-col gap-8 overflow-scroll">
        <div className="flex justify-evenly gap-36 px-24 items-center">
          
          {/* Typing Effect for Text */}
          <p className="font-normal text-[50px] w-1/2 py-16 leading-snug">
            <Typewriter
              options={{
                strings: [
                  "We make your mental health and well-being the priority.",
                  "Your well-being matters to us!",
                ],
                autoStart: true,
                loop: true,
                delay: 50,
              }}
            />
            <br />
            <span className="text-[#4CAF50] font-semibold">
              Your mind matters!
            </span>
          </p>

          <LoginForm className="w-2/5 " />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Login;
