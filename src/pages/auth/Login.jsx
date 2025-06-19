import React, { useState } from 'react';
import loginvactor from '../../assets/icon/loginvactor.png';
import BackgroundDesign from '../../assets/icon/BackgroundDesign.png';
import Vector from '../../assets/icon/Vector.png';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { LoginApi } from '../../redux/services/authService';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
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
      console.log('Login response:', response.data); // Debug: print the login API response
      
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
      className="bg-no-repeat flex items-center justify-center"
      style={{
        backgroundImage: `url(${BackgroundDesign})`
      }}
    >
      <div className="flex w-full h-screen 2xl:mx-32 mx-20 gap-10">
        {/* Left: Login Form */}
        <div className="lg:w-1/2 w-full flex items-center justify-center lg:justify-start xl:mx-20">
          <div className="bg-white p-10 rounded-2xl shadow-2xl lg:w-[26rem] w-96">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-10">
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
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>

              {/* Password */}
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">👁️</span>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between mb-6 text-sm">
                <label className="flex items-center text-gray-700">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="mr-2 h-4 w-4 text-green-600"
                  />
                  Remember me
                </label>
                <Link to="/forgot-password" className="text-green-700 hover:underline font-semibold">
                  Forgot Password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 rounded-md transition duration-200 font-semibold ${
                  loading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-green-800 hover:bg-green-900'
                } text-white`}
              >
                {loading ? 'Logging In...' : 'Log In'}
              </button>
            </form>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex w-[500px] bg-[#eef1eb] rounded-t-[300px] flex-col items-center lg:mt-16 md:mt-14 relative overflow-hidden 2xl:ml-28
  md:hidden
  sm:flex
  lg:flex">
          {/* Logo */}
          <div className='md:mt-20 lg:mt-28 flex items-center justify-center'>
            <img
              src={Vector}
              alt="Logo"
              className="lg:w-96 md: mb-10 h-auto"
            />
          </div>
          {/* Centered Login Illustration */}
          <div className="flex items-center justify-center">
            <img
              src={loginvactor}
              alt="Login Illustration"
              className="h-auto w-96 mt-20 object-contain"
            />
          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;
