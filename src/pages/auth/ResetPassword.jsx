import React, { useState } from 'react'
import BackgroundDesign from '../../assets/icon/BackgroundDesign.png'
// import rounded from '../../assets/Rounded.png'
import Vector from '../../assets/icon/Vector.png'
import reset from '../../assets/icon/reset.png'
import { useNavigate, Link } from 'react-router-dom'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

function Reset() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        newPassword: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validate passwords match
        if (formData.newPassword !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        // Validate password strength (minimum 8 characters, at least one number and one letter)
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passwordRegex.test(formData.newPassword)) {
            setError('Password must be at least 8 characters long and contain at least one letter and one number');
            return;
        }

        try {
            // Here you would typically make an API call to reset the password
            // For example:
            // await resetPassword(formData.newPassword);

            // After successful password reset
            navigate('/login'); // Redirect to login page
        } catch (e) {
            console.log(e);
            setError('Failed to reset password. Please try again.');
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
                {/* Left: Reset Password Form */}
                <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-start xl:mx-20">
                    <div className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-2xl w-full max-w-md lg:max-w-lg mx-auto">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#334155] text-center mb-8 md:mb-10">
                            Reset Password
                        </h1>
                        {error && (
                            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
                                {error}
                            </div>
                        )}
                        <form onSubmit={handleSubmit}>
                            {/* New Password */}
                            <div className="mb-4">
                                <label htmlFor="newPassword" className="block text-sm font-medium text-[#334155] mb-1.5">
                                    New Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showNewPassword ? "text" : "password"}
                                        id="newPassword"
                                        name="newPassword"
                                        value={formData.newPassword}
                                        onChange={handleChange}
                                        placeholder="Enter your new password"
                                        className="w-full text-[#94A3B8] px-3 py-2 border border-gray-300 rounded-md pr-10 focus:outline-none focus:ring"
                                        required
                                    />
                                    {/* <span
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-red-300 cursor-pointer"
                                        onClick={() => setShowNewPassword((prev) => !prev)}
                                        title={showNewPassword ? 'Hide Password' : 'Show Password'}
                                    >
                                        {showNewPassword ? <FaEye /> : <FaEyeSlash />}
                                    </span> */}
                                </div>
                            </div>
                            {/* Confirm Password */}
                            <div className="mb-4">
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#334155] mb-1.5">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="Confirm your new password"
                                        className="w-full text-[#94A3B8] px-3 py-2 border border-gray-300 rounded-md pr-10 focus:outline-none focus:ring"
                                        required
                                    />
                                    <span
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-red-300 cursor-pointer"
                                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                                        title={showConfirmPassword ? 'Hide Password' : 'Show Password'}
                                    >
                                        {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                                    </span>
                                </div>
                            </div>
                            {/* Remember Me and Forgot Password */}
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
                                Reset Password
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
                    {/* Centered Reset Password Illustration */}
                    <div className="flex items-center justify-center">
                        <img
                            src={reset}
                            alt="Reset Password Illustration"
                            className="h-auto w-40 md:w-72 lg:w-96 mt-10 md:mt-20 object-contain"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Reset
