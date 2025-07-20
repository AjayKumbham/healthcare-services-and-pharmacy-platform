import Stepper from "./components/Stepper";
import StepperControl from "./components/StepperControl";
import { StepperContext } from "./components/StepperContext";
import MemberID from "./components/MemberID";
import PersonalInformation from "./components/PersonalInformation";
import SetPassword from "./components/SetPassword";
import Verification from "./components/Verification";
import Status from "./components/Status";
import Header from "./components/Header";
import Footer from "../../../Components-Common/Footer";
import { useState } from "react";
import axios from 'axios';

const Signup = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userData, setUserData] = useState({});
  const [alertMessage, setAlertMessage] = useState("");
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const [showPopup, setShowPopup] = useState(false); // State for the pop-up

  const sendOtp = async () => {
    try {
      const storedEmail = userData['email'];

      if (!storedEmail) {
        setAlertMessage('No email found');
        return;
      }

      setShowPopup(true); // Show pop-up when OTP is being sent
      setLoading(true);

      await axios.post('http://localhost:8080/api/auth/send-otp', { email: storedEmail });

      setAlertMessage("OTP sent successfully to your email.");
    } catch (err) {
      setAlertMessage('Error sending OTP. Please try again.');
      console.error('Error:', err.message || err);
    } finally {
      setLoading(false);
      setShowPopup(false); // Hide pop-up after OTP request completes
    }
  };

  const handleValidateOtp = async () => {
    const email = userData["email"] || "";
    const otp = userData["otp"] || "";
    const { cpassword, ...newUserData } = userData;

    if (!otp) {
      setAlertMessage('OTP is required.');
      return false;
    }

    try {
      // Send OTP and email to backend for validation
      const response = await axios.post('http://localhost:8080/api/auth/validate-otp', {
        email,
        otp,
      });

      if (response.status === 200) {
        setAlertMessage("OTP is Validated Successfully");
        axios.post('http://localhost:8080/api/auth/register', newUserData)
          .then((response) => {
            if (response.status === 200) {
              alert('Signup successful: ' + response.data);
              console.log('Signup successful:', response.data);
              return true;
            } else {
              setAlertMessage('Signup failed. Please try again.');
              return false;
            }
          })
          .catch((error) => {
            if (error.response) {
              // Handle specific error message from the backend
              setAlertMessage(error.response.data);
              return false;
            } else {
              setAlertMessage('An error occurred during signup. Please try again later.');
              return false;
            }
          })

        return true;
      } else {
        setAlertMessage('Invalid OTP. Please try again.');
        return false;
      }
    } catch (error) {
      setAlertMessage('An error occurred while validating OTP. Please try again.');
      return false;
    }
  };

  const steps = [
    "Member ID",
    "Personal Information",
    "Set Password",
    "Verification",
    "Status",
  ];

  const displayStep = (step) => {
    switch (step) {
      case 0:
        return (
          <MemberID
            alertMessage={alertMessage}
            setAlertMessage={setAlertMessage}
            isCaptchaValid={isCaptchaValid}
            setIsCaptchaValid={setIsCaptchaValid}
          />
        );
      case 1:
        return (
          <PersonalInformation
            alertMessage={alertMessage}
            setAlertMessage={setAlertMessage}
          />
        );
      case 2:
        return (
          <SetPassword
            alertMessage={alertMessage}
            setAlertMessage={setAlertMessage}
          />
        );
      case 3:
        return (
          <Verification
            alertMessage={alertMessage}
            setAlertMessage={setAlertMessage}
          />
        );
      case 4:
        return <Status />;
      default:
        return null;
    }
  };

  const handleClick = async (direction) => {
    let newStep = currentStep;
    if (direction !== "next") {
      newStep--;
      newStep >= 0 && newStep < steps.length && setCurrentStep(newStep);
      setAlertMessage("");
      return;
    }

    if (currentStep === 0) {
      const memberID = userData["membershipId"] || "";

      const regex = /^ENU\d+$/;

      if (!regex.test(memberID)) {
        setAlertMessage("Invalid Member ID");
        return;
      }

      if (!isCaptchaValid) {
        setAlertMessage("Invalid Captcha");
        return;
      }

      try {
        const isValid = await validateMembershipId(memberID);
        if (!isValid) {
          setAlertMessage("Membership ID not found");
          return;
        }
      } catch (error) {
        setAlertMessage(error.message);
        return;
      }
      console.log(userData);
      localStorage.setItem('membershipId', memberID);


    } else if (currentStep === 1) {
      const firstName = userData["name"] || "";
      const mobileNumber = userData["phone"] || "";
      const email = userData["email"] || "";
      const birthDate = userData["dob"] || "";

      const nameRegex = /^[a-zA-Z]{2,}$/;
      if (!nameRegex.test(firstName)) {
        setAlertMessage("Invalid name");
        return;
      }

      const mobileRegex = /^(0|)[1-9]\d{9}$/;
      if (!mobileRegex.test(mobileNumber)) {
        setAlertMessage("Invalid mobile number");
        return;
      }

      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(email)) {
        setAlertMessage("Invalid Email Address");
        return;
      }

      const currentDate = new Date();
      const day = String(currentDate.getDate()).padStart(2, "0");
      const month = String(currentDate.getMonth() + 1).padStart(2, "0");
      const year = currentDate.getFullYear();
      const formattedDate = `${year}-${month}-${day}`;

      if (birthDate > formattedDate) {
        setAlertMessage("Invalid Date of Birth");
        return;
      }

      console.log(userData);
    } else if (currentStep === 2) {

      const { cpassword, ...newUserData } = userData;
      const password = userData["password"];

      // const passwordRegex =
      //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

      // if (!passwordRegex.test(password)) {
      //   setAlertMessage("Choose a strong password");
      //   return;
      // }

      if (password !== cpassword) {
        setAlertMessage("Entered passwords did not match");
        return;
      }

      console.log(newUserData);

      await sendOtp();

    } else if (currentStep === 3) {
      const isOtpValid = await handleValidateOtp();
      if (!isOtpValid) {
        return;
      }
    }

    newStep++;
    newStep >= 0 && newStep < steps.length && setCurrentStep(newStep);
  };

  const validateMembershipId = async (membershipId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/auth/validateMembershipId/${membershipId}`
      );
      if (!response.ok) {
        throw new Error("Membership ID not found");
      }
      return true;
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="h-screen flex flex-col gap-12">
      <Header />
      <div className="flex flex-col overflow-scroll gap-12">
        {/* Signup Form */}
        <div className="md:w-1/2 mx-auto shadow-xl rounded-2xl pb-2 bg-white">
          <div className="container horizontal mt-5 px-8">
            <Stepper steps={steps} currentStep={currentStep} />
            <div className="my-10 p-10">
              <StepperContext.Provider
                value={{
                  userData,
                  setUserData,
                  // finalData,
                  // setFinalData,
                }}
              >
                {displayStep(currentStep)}
              </StepperContext.Provider>
            </div>
          </div>
          {currentStep != steps.length - 1 && (
            <StepperControl
              handleClick={handleClick}
              currentStep={currentStep}
              steps={steps}
            />
          )}
        </div>
        <Footer />
      </div>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg font-semibold">Sending OTP...</p>
          </div>
        </div>
      )}

    </div>
  );
};

export default Signup;
