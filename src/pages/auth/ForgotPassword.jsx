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
      className="bg-no-repeat flex items-center justify-center min-h-screen"
      style={{
        backgroundImage: `url(${BackgroundDesign})`,
      }}
    >
      <div className="flex flex-col lg:flex-row w-full min-h-screen lg:mx-20 2xl:mx-32 gap-10 p-4 lg:p-0 overflow-y-auto">
        {/* Left: Forgot Password Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-start xl:mx-20">
          <div className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-2xl w-full max-w-md lg:max-w-lg mx-auto">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#334155] text-center mb-8 md:mb-10">
              Forgot Password
            </h1>
            <form onSubmit={handleSubmit}>
              {/* Email Input */}
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-[#334155] mb-1.5">

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
                  className="w-full text-[#94A3B8] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring"
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
                className={`w-full py-2 rounded-md transition duration-200 font-semibold ${isLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-[#303F26]'
                  } text-white`}
              >
                {isLoading ? "Sending..." : "Get Verification Code"}
              </button>
            </form>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex w-full lg:w-[500px] bg-[#eef1eb] rounded-t-[100px] md:rounded-t-[200px] lg:rounded-t-[300px] flex-col items-center mt-8 lg:mt-16 md:mt-14 relative overflow-hidden 2xl:ml-28">

          {/* Logo */}
          <div className='mt-10 md:mt-20 lg:mt-28 flex items-center justify-center'>
            <img src={Vector} alt="Logo" className="w-40 md:w-72 lg:w-96 h-auto mb-6"
            />
          </div>
          {/* Centered Forgot Password Illustration */}
          <div className="flex items-center justify-center">
            <img
              src={forgotImage}
              alt="Forgot Password Illustration"
              className="h-auto w-40 md:w-72 lg:w-96 mt-10 md:mt-20 object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
