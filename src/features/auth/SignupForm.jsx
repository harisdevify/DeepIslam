import React, { useState } from 'react';
import { FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { NavLink } from 'react-router-dom';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    agreeTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData(formData);
    console.log(formData);
    setFormData({
      name: '',
      email: '',
      password: '',
      agreeTerms: false,
    });
  };

  return (
    <div className="min-h-screen flex md:mt-10 mt-26 items-center justify-center">
      <div className=" p-8 rounded-lg w-full max-w-md text-white">
        <h2 className="text-2xl font-bold text-center mb-6">
          Sign Up in{' '}
          <span className="text-[#2BA4AB] cursor-pointer hover:underline">
            DeepIslam.com
          </span>
        </h2>

        {/* Social Signup Buttons */}
        <div className="grid grid-cols-1 gap-4">
          <button className="flex items-center cursor-pointer justify-center w-full border px-4 py-2 rounded-lg hover:bg-gray-100 hover:text-black">
            <FcGoogle className="h-5 w-5 mr-2" />
            Sign Up with Google
          </button>
          <button className="flex items-center cursor-pointer justify-center w-full border px-4 py-2 rounded-lg hover:bg-gray-100 hover:text-black">
            <FaFacebook className="h-5 w-5 mr-2" />
            Sign Up with Facebook
          </button>
        </div>

        <div className="flex items-center my-4">
          <div className="flex-1 border-t border-gray-600"></div>
          <span className="px-2 text-gray-400">or</span>
          <div className="flex-1 border-t border-gray-600"></div>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-400 mb-1">
              What should we call you?
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder=".e.g mohmandi"
              className="w-full px-3 py-2 rounded-lg placeholder:italic bg-transparent text-gray-300 border border-gray-600 placeholder-gray-400  outline-[#2BA4AB]"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-400 mb-1">Your email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@company.com"
              className="w-full px-3 py-2 rounded-lg placeholder:italic bg-transparent text-gray-300 border border-gray-600 placeholder-gray-400  outline-[#2BA4AB]"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-400 mb-1">Your password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder=".e.g 00100@blocker"
              className="w-full px-3 py-2 rounded-lg placeholder:italic bg-transparent text-gray-300 border border-gray-600 placeholder-gray-400  outline-[#2BA4AB]"
            />
          </div>

          {/* Terms and Subscription */}
          <div className="flex items-start mb-4">
            <input
              type="checkbox"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
              className="h-5 w-5 accent-[#2BA4AB]"
            />
            <label className="ml-2 text-gray-400 italic text-sm">
              By signing up, you are agree with{' '}
              <span className="font-semibold">DeepIslam</span>
              <a href="#" className="text-[#2BA4AB] hover:underline">
                <span> Terms of Use </span>
              </a>
              and
              <a href="#" className="text-[#2BA4AB] hover:underline">
                <span> Privacy Policy </span>
              </a>
              .
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full transform active:scale-95 cursor-pointer bg-[#2BA4AB] text-white px-3 py-2 rounded-lg hover:bg-white hover:text-black transition"
          >
            Create an account
          </button>
        </form>

        {/* Login Link */}
        <p className="text-gray-400 text-sm text-center mt-4">
          Already have an account?
          <NavLink to={'/Login'} className="text-[#2BA4AB] hover:underline">
            <span> Login here </span>
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
