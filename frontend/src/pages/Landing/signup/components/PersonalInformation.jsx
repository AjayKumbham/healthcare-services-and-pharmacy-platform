import React from "react";
import { useContext, useState } from "react";
import { StepperContext } from "./StepperContext";

export default function PersonalInformation({ alertMessage, setAlertMessage }) {
  const { userData, setUserData } = useContext(StepperContext);
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    // setFinalData([...finalData, userData]);
  };

  return (
    <div className="flex flex-col">
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          {""}
          Name
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            type="text"
            onChange={handleChange}
            value={userData["name"] || ""}
            name="name"
            placeholder="Enter your first name"
            onFocus={() => {
              setIsFocused(true);
              setAlertMessage("");
            }}
            onBlur={() => setIsFocused(false)}
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
          />
        </div>

        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          {""}
          Mobile Number
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            type="tel"
            onChange={handleChange}
            value={userData["phone"] || ""}
            name="phone"
            placeholder="Enter your Mobile Number"
            onFocus={() => {
              setIsFocused(true);
              setAlertMessage("");
            }}
            onBlur={() => setIsFocused(false)}
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
          />
        </div>

        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          {""}
          Email
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            type="email"
            onChange={handleChange}
            value={userData["email"] || ""}
            name="email"
            placeholder="Enter your Email Address"
            onFocus={() => {
              setIsFocused(true);
              setAlertMessage("");
            }}
            onBlur={() => setIsFocused(false)}
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
          />
        </div>

        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          {""}
          Date of Birth
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            type="date"
            onChange={handleChange}
            value={userData["dob"] || ""}
            name="dob"
            placeholder="Enter your Date of Birth"
            onFocus={() => {
              setIsFocused(true);
              setAlertMessage("");
            }}
            onBlur={() => setIsFocused(false)}
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
          />
        </div>

        {!isFocused && alertMessage != "" && (
          <p className="text-sm text-center text-[red] mt-5">{alertMessage}</p>
        )}
      </div>
    </div>
  );
}
