import React, { useState } from 'react';
import loginvactor from '../../assets/icon/loginvactor.png';
import BackgroundDesign from '../../assets/icon/BackgroundDesign.png';
import Vector from '../../assets/icon/Vector.png';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { LoginApi } from '../../redux/services/authService';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await LoginApi(formData);
      console.log('Login response:', response.data);

      if (response.data.IsSuccess) {
        localStorage.setItem('token', response.data.Data);
        // setIsAuthenticated(true);
        navigate('/category');
        // Store remember me preference
        if (rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        } else {
          localStorage.removeItem('rememberMe');
        }

      } else {
        setError(response.data.Message || 'Login failed');
      }
    } catch (err) {
      // console.error('Login error:', err);
      setError(err.response?.data?.Message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="bg-no-repeat flex items-center justify-center min-h-screen"
      style={{
        backgroundImage: `url(${BackgroundDesign})`
      }}
    >
      <div className="flex flex-col lg:flex-row w-full min-h-screen lg:mx-20 2xl:mx-32 gap-10 p-4 lg:p-0 overflow-y-auto">
        {/* Left: Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-start xl:mx-20">
          <div className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-2xl w-full max-w-md lg:max-w-lg mx-auto">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#334155] text-center mb-8 md:mb-10">
              Welcome Back!
            </h1>
            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-[#334155] mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="w-full text-[#94A3B8] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring"
                />
              </div>
              {/* Password */}
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-[#334155] mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                    className="w-full text-[#94A3B8] px-3 py-2 border border-gray-300 rounded-md pr-10 focus:outline-none focus:ring"
                  />
                  <span
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-red-300 cursor-pointer"
                    onClick={() => setShowPassword((prev) => !prev)}
                    title={showPassword ? 'Hide Password' : 'Show Password'}
                  >
                    {showPassword ?   <FaEye /> : <FaEyeSlash />} 
                  </span>
                </div>
              </div>
              {/* Remember Me */}
              <div className="flex items-center justify-between mb-6 text-sm flex-wrap gap-2">
                <label className="flex items-center text-gray-700">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="mr-2 h-4 w-4 text-[#303F26]"
                  />
                  Remember me
                </label>
                <Link to="/forgot-password" className="text-[#303F26] hover:underline font-semibold">
                  Forgot Password?
                </Link>
              </div>
              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 rounded-md transition duration-200 font-semibold ${loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-[#303F26]'
                  } text-white`}
              >
                {loading ? 'Logging In...' : 'Log In'}
              </button>
            </form>
          </div>
        </div>
        {/* Right Section */}
        <div className="flex w-full lg:w-[500px] bg-[#eef1eb] rounded-t-[100px] md:rounded-t-[200px] lg:rounded-t-[300px] flex-col items-center mt-8 lg:mt-16 md:mt-14 relative overflow-hidden 2xl:ml-28">
          {/* Logo */}
          <div className='mt-10 md:mt-20 lg:mt-28 flex items-center justify-center'>
            <img
              src={Vector}
              alt="Logo"
              className="w-40 md:w-72 lg:w-96 h-auto mb-6"
            />
          </div>
          {/* Centered Login Illustration */}
          <div className="flex items-center justify-center">
            <img
              src={loginvactor}
              alt="Login Illustration"
              className="h-auto w-40 md:w-72 lg:w-96 mt-10 md:mt-20 object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
