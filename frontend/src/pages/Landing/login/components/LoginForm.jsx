import React, { useState } from "react";
import { AwesomeCaptcha } from "react-awesome-captcha";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const BackendUrl = import.meta.env.VITE_BACKEND_URL;

export default function LoginForm({}) {
  const [isFocused, setIsFocused] = useState(false);
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [loginData, setLoginData] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = async (e) => {
    const memberId = loginData["memberID"] || "";
    const password = loginData["password"] || "";
    
    if (!isCaptchaValid) {
      setAlertMessage("Invalid captcha");
      return;
    }

    Cookies.set("jwt_token", "test_token", { expires: 0.1 });

    try {
      const response = await axios.get(`${BackendUrl}/api/auth/users/login`, {
        params: {
          membershipId: memberId,
          password: password,
        },
      });

      if (response.status === 200) {
        localStorage.setItem("membershipId", memberId);
        navigate('/home');
      }
    } catch (err) {
      console.error('Login error:', err); // Log the error for debugging
      setAlertMessage(err.response?.data?.message || 'Invalid Member ID or Password');
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const handleCaptchaValidation = (isValid) => {
    setIsCaptchaValid(isValid);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  return (
    <div className="flex flex-col">
      <div className="w-full mx-2 flex-1">
        <div className="text-3xl mb-8">Member Login</div>
        <div className="font-bold h-6 mt-3 text-gray-500 text-md leading-8 uppercase">
          {""}
          MEMBER ID
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            type="text"
            onChange={handleChange}
            value={loginData["memberID"] || ""}
            name="memberID"
            placeholder="Enter your Member ID"
            onFocus={() => {
              setIsFocused(true);
              setAlertMessage("");
            }}
            onBlur={() => setIsFocused(false)}
            className="p-3 px-5 pr-20 appearance-none outline-none w-full text-gray-800"
          />
        </div>

        <div className="font-bold h-6 mt-3 text-gray-500 text-md leading-8 uppercase">
          {""}
          Password
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            type="password"
            onChange={handleChange}
            value={loginData["password"] || ""}
            name="password"
            placeholder="Enter the password"
            onFocus={() => {
              setIsFocused(true);
              setAlertMessage("");
            }}
            onBlur={() => setIsFocused(false)}
            className="p-3 px-5 appearance-none outline-none w-full text-gray-800"
          />
        </div>
        <div
          onFocus={() => {
            setIsFocused(true);
            setAlertMessage("");
          }}
          onBlur={() => setIsFocused(false)}
        >
          <AwesomeCaptcha
            onValidate={handleCaptchaValidation}
            className={"flex justify-between w-full font-medium"}
          />
        </div>

        {!isFocused && alertMessage != "" && (
          <p className="text-sm text-center text-[red] mt-5">{alertMessage}</p>
        )}

        <div className="p-1 mt-8 flex items-center justify-center">
          <button
            className="w-full h-[50px] bg-green-500 text-white rounded-md hover:bg-blue-400 font-semibold"
            onClick={validate}
          >
            Login
          </button>
        </div>

        <div className="p-3 flex flex-row-reverse">
          <a href="/forgotpassword" className="text-sm underline">
            Forgot Password
          </a>
        </div>
      </div>
    </div>
  );
}
