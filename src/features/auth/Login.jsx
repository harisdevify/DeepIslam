import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

import { NavLink } from 'react-router-dom';
export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    agreeTerms: false,
  });

  const handleonChange = (e) => {
    const { type, name, checked, value } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };
  const handleSubmitData = (e) => {
    e.preventDefault();
    setFormData(formData);

    console.log('Submitted data successfullay: ', formData);
    setFormData({
      email: '',
      password: '',
      agreeTerms: false,
    });
  };
  return (
    <div className="flex mt-20 py-10 items-center justify-center">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-md  p-8 rounded-2xl "
      >
        <h2 className="text-2xl font-bold  text-center mb-4">
          Login in
          <span className="text-[#2BA4AB] font-black hover:underline cursor-pointer">
            {' '}
            DeepIslam.com
          </span>
        </h2>
        <form onSubmit={handleSubmitData} className="space-y-4">
          <div>
            <label className="block  text-sm font-medium text-gray-500">
              Email address
            </label>
            <input
              name="email"
              value={formData.email}
              onChange={handleonChange}
              required
              type="email"
              className="mt-1 block w-full px-4 py-2 outline-[#2BA4AB] border rounded-lg shadow-sm "
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">
              Password
            </label>
            <input
              name="password"
              value={formData.password}
              onChange={handleonChange}
              type="password"
              className="mt-1 block w-full px-4 py-2 rounded-lg shadow-sm outline-[#2BA4AB] border"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleonChange}
                className="h-4 w-4 accent-[#2BA4AB]"
              />

              <span className="ml-2 text-gray-500">Remember me</span>
            </label>
            <a
              href="#"
              className="text-[#2BA4AB] text-sm font-medium hover:underline"
            >
              Forgot password?
            </a>
          </div>
          <button className="w-full bg-[#2BA4AB] cursor-pointer text-white py-2 rounded-lg hover:bg-[#2BA4AB]">
            Login in
          </button>
        </form>
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="mx-3 text-gray-500 text-sm">Or continue with</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center cursor-pointer justify-center w-full border px-4 py-2 rounded-lg hover:bg-gray-100 hover:text-black">
            <FcGoogle className="h-5 w-5 mr-2" />
            Google
          </button>
          <button className="flex items-center cursor-pointer justify-center w-full border px-4 py-2 rounded-lg hover:bg-gray-100 hover:text-black">
            <FaFacebook className="h-5 w-5 mr-2 rounded-full" />
            Facebook
          </button>
        </div>
        <p className="text-center text-sm text-gray-600 mt-4">
          Not a member?
          <NavLink
            to={'/SignupForm'}
            className="text-[#2BA4AB] hover:underline"
          >
            <span> Sign Up</span>
          </NavLink>
        </p>
      </motion.div>
    </div>
  );
}
