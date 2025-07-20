import { useState } from "react";
import axios from "axios";

const BackendUrl = import.meta.env.VITE_BACKEND_URL;


const Subscribe = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubscribe = async (event) => {
    event.preventDefault();

    let email = document.getElementById("subscribe-email").value;
    let mobile = document.getElementById("subscribe-phone").value;

    if (!email || !mobile) {
      setErrorMessage("All fields are required: email, mobile number.");
      return;
    }

    setErrorMessage("");
    setIsModalOpen(true);
    setLoading(true);

    try {
      const data = { email, phone: mobile };
      const response = await axios.post(`${BackendUrl}/api/auth/users`, data);

      if (response.status === 200) {
        setTimeout(() => {
          setLoading(false);
          setIsModalOpen(false);
          document.getElementById("subscribe-email").value = "";
          document.getElementById("subscribe-phone").value = "";
          alert("Subscription successful! Please check your email for further steps.");
        }, 1500);
      }
    } catch (error) {
      setLoading(false);
      setErrorMessage("Failed to subscribe. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center w-full aspect-[3/1] relative">
      <div className="w-[85%] rounded-lg bg-[url('https://res.cloudinary.com/dkezdazmt/image/upload/v1735828411/svgnq5g9ukslzwcynvlh.jpg')] bg-cover bg-center aspect-[3/1] p-2 md:p-4 lg:p-8">
        <div className="bg-blue-400 w-[35%] min-h-[100px] rounded-md flex flex-col justify-center gap-4 p-2 md:p-4 lg:p-8">
          <h1 className="text-xl text-white font-medium mt-2">
            Join our Subscription Service
          </h1>

          <form className="flex flex-col gap-4" onSubmit={handleSubscribe}>
            <input
              id="subscribe-email"
              name="subscribe-email"
              type="email"
              placeholder="yourmail@gmail.com"
              className="w-full rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3EFFC0] focus:border-[#3EFFC0] p-2"
              onFocus={() => setErrorMessage("")}
            />
            <input
              id="subscribe-phone"
              name="subscribe-phone"
              type="tel"
              placeholder="Enter your mobile number"
              className="w-full rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3EFFC0] focus:border-[#3EFFC0] p-2"
              onFocus={() => setErrorMessage("")}
            />
            <button
              type="submit"
              className="text-black bg-blue-300 px-4 py-2 rounded hover:bg-green-400 w-full flex items-center justify-center overflow-hidden"
            >
              Subscribe
            </button>
          </form>

          {errorMessage && (
            <p className="w-full text-center text-sm text-yellow-500 mb-2">{errorMessage}</p>
          )}
        </div>
      </div>

      {/* Modal Popup */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center relative">
            {loading ? (
              <>
                <img
                  src="https://res.cloudinary.com/dkezdazmt/image/upload/v1735902824/Evernorth/MSG_LOADING.gif"
                  className="w-16 mx-auto"
                  alt="Loading"
                />
                <p className="mt-4 text-gray-600">Processing...</p>
              </>
            ) : errorMessage ? (
              <>
                <img
                  src="https://res.cloudinary.com/dkezdazmt/image/upload/v1736511579/Evernorth/email-fail.svg"
                  className="w-16 mx-auto"
                  alt="Error"
                />
                <p className="mt-4 text-red-600">{errorMessage}</p>
                <button
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                  onClick={() => setIsModalOpen(false)}
                >
                  ✕
                </button>
              </>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default Subscribe;
