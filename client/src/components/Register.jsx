import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "https://unidhuhkdccbdkj.onrender.com/api/auth/register",
        form,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
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
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-6">
      <form
        onSubmit={handleSubmit}
        className="
          w-full
          max-w-md
          bg-black/70
          backdrop-blur-lg
          border border-yellow-400/30
          rounded-3xl
          shadow-[0_0_40px_rgba(255,255,0,0.3)]
          p-6 sm:p-8 md:p-10
          flex flex-col gap-6
        "
      >
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-yellow-400">
          Create Account
        </h1>

        {/* Inputs */}
        <div className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
            className="
              w-full
              h-12
              px-4
              rounded-xl
              bg-black/50
              text-white
              placeholder-gray-400
              border border-yellow-400/20
              focus:border-yellow-300
              outline-none
              transition
            "
          />

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email Address"
            required
            className="
              w-full
              h-12
              px-4
              rounded-xl
              bg-black/50
              text-white
              placeholder-gray-400
              border border-yellow-400/20
              focus:border-yellow-300
              outline-none
              transition
            "
          />

          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="
              w-full
              h-12
              px-4
              rounded-xl
              bg-black/50
              text-white
              placeholder-gray-400
              border border-yellow-400/20
              focus:border-yellow-300
              outline-none
              transition
            "
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="
            w-full
            h-12
            bg-yellow-400
            text-black
            font-semibold
            rounded-xl
            hover:scale-[1.02]
            active:scale-95
            transition-all
            duration-300
            shadow-lg
          "
        >
          Register
        </button>

        {/* Login Link */}
        <p className="text-center text-sm text-yellow-200">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-yellow-400 font-semibold cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;