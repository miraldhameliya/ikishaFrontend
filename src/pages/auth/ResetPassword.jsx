import React, { useState } from 'react'
import BackgroundDesign from '../../assets/icon/BackgroundDesign.png'
// import rounded from '../../assets/Rounded.png'
import Vector from '../../assets/icon/Vector.png'
import reset from '../../assets/icon/reset.png'
import { useNavigate } from 'react-router-dom'

function Reset() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        newPassword: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');

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
            className="bg-no-repeat flex items-center justify-center"
            style={{
                backgroundImage: `url(${BackgroundDesign})`
            }}
        >
            <div className="flex w-full h-screen 2xl:mx-32 mx-20 gap-10">
                {/* Left: Reset Password Form */}
                <div className="lg:w-1/2 w-full flex items-center justify-center lg:justify-start xl:mx-20">
                    <div className="bg-white p-10 rounded-2xl shadow-2xl lg:w-[26rem] w-96">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-10">
                            Reset Password
                        </h1>
                        {error && (
                            <div className="mb-4 p-2 text-sm text-red-600 bg-red-100 rounded-md">
                                {error}
                            </div>
                        )}
                        <form onSubmit={handleSubmit}>
                            {/* New Password */}
                            <div className="mb-4">
                                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1.5">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    id="newPassword"
                                    name="newPassword"
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                    placeholder="Enter your new password"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                                    required
                                />
                            </div>

                            {/* Confirm Password */}
                            <div className="mb-4">
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Confirm your new password"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                                    required
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full bg-green-800 text-white py-2 rounded-md hover:bg-green-900 transition duration-200 font-semibold"
                            >
                                Reset Password
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
                    {/* Centered Reset Password Illustration */}
                    <div className="flex items-center justify-center">
                        <img
                            src={reset}
                            alt="Reset Password Illustration"
                            className="h-auto w-96 mt-20 object-contain"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Reset
