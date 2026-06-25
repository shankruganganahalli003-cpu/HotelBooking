import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://unidhuhkdccbdkj.onrender.com/api/auth/register",
        form,
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );

      if (data.success) {
        toast.success(data.message);
        navigate("/login");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="w-full h-screen bg-black flex items-center justify-center">

      <form
        onSubmit={handleSubmit}
        className="w-[420px] bg-black/70 backdrop-blur-lg border border-yellow-400/30 rounded-2xl shadow-[0_0_40px_rgba(255,255,0,0.3)] p-10 flex flex-col gap-8"
      >
        {/* Title */}
        <h1 className="text-4xl font-bold text-center text-yellow-400 drop-shadow-lg">
          Create Account
        </h1>

        {/* Inputs */}
        <div className="flex flex-col gap-5">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full h-12 px-4 rounded-lg bg-black/50 text-white placeholder-white outline-none border border-yellow-400/20 focus:border-yellow-300 focus:bg-black/70 transition"
          />

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="w-full h-12 px-4 rounded-lg bg-black/50 text-white placeholder-white outline-none border border-yellow-400/20 focus:border-yellow-300 focus:bg-black/70 transition"
          />

          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full h-12 px-4 rounded-lg bg-black/50 text-white placeholder-white outline-none border border-yellow-400/20 focus:border-yellow-300 focus:bg-black/70 transition"
          />
        </div>

        {/* Button */}
        <button className="w-full h-12 bg-yellow-400 text-black font-semibold rounded-lg hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,0,0.7)] transition duration-300">
          Register
        </button>

        {/* Login Link */}
        <p className="text-center text-yellow-200 text-sm">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-yellow-400 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;