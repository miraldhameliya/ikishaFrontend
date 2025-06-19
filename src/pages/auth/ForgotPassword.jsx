import React, { useState } from "react";
// import BackgroundDesign from '../../assets/BackgroundDesign.png';
// import rounded from "../../assets/rounded.png";
import Vector from "../../assets/icon/Vector.png";
import forgotImage from "../../assets/icon/forgotImage.png";
import BackgroundDesign from "../../assets/icon/BackgroundDesign.png";
import { ForgotPasswordApi } from "../../redux/services/authService";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      const response = await ForgotPasswordApi({ email });

      // await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Verification code sent to:", response);


      setSuccess("Verification code has been sent to your email");
      setEmail("");
    } catch (err) {
      setError("Failed to send verification code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="bg-no-repeat flex items-center justify-center"
      style={{
        backgroundImage: `url(${BackgroundDesign})`,
      }}
    >
      <div className="flex w-full h-screen 2xl:mx-32 mx-20 gap-10">
        {/* Left: Forgot Password Form */}
        <div className="lg:w-1/2 w-full flex items-center justify-center lg:justify-start xl:mx-20">
          <div className="bg-white p-10 rounded-2xl shadow-2xl lg:w-[26rem] w-96">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-10">
              Forgot Password
            </h1>
            <form onSubmit={handleSubmit}>
              {/* Email Input */}
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Enter your email"
                  required
                  className={`w-full px-3 py-2 border ${error ? "border-red-500" : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-green-600`}
                />
                {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
                {success && (
                  <p className="mt-2 text-sm text-green-500">{success}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-green-800 text-white py-2 rounded-md hover:bg-green-900 transition duration-200 font-semibold ${isLoading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
              >
                {isLoading ? "Sending..." : "Get Verification Code"}
              </button>
            </form>
          </div>
        </div>


        {/* Right Section */}
        <div
          className="flex w-[500px] bg-[#eef1eb] rounded-t-[300px] flex-col items-center lg:mt-20 md:mt-14 relative overflow-hidden 2xl:ml-28
  md:hidden
  sm:flex
  lg:flex
"
        >
          {/* Logo */}
          <div className="md:mt-20 lg:mt-28 flex items-center justify-center">
            <img src={Vector} alt="Logo" className="lg:w-96 md:mb-10 h-auto" />
          </div>
          {/* Centered Forgot Password Illustration */}
          <div className="flex items-center justify-center">
            <img
              src={forgotImage}
              alt="Forgot Password Illustration"
              className="h-auto w-96 mt-20 object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
