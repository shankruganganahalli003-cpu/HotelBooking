import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setToken } from "../redux/authSlice";

const Login = () => {
  const { token, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
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
        "http://localhost:3000/api/auth/login",
        form,
        { withCredentials: true }
      );

      if (data.success) {
  toast.success(data.message);

  dispatch(setUser(data.user));
  dispatch(setToken(data.token)); // ✅ THIS IS THE MISSING PIECE

  navigate("/");
}
    } catch (err) {
      toast.error(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="w-full h-screen bg-black flex items-center justify-center">

      <form
        onSubmit={handleSubmit}
        className="w-[420px] bg-black/70 backdrop-blur-lg border border-yellow-400/30 rounded-2xl shadow-[0_0_40px_rgba(255,255,0,0.3)] p-10 flex flex-col gap-8"
      >
        <h1 className="text-4xl font-bold text-center text-yellow-400 drop-shadow-lg">
          Welcome Back
        </h1>

        <div className="flex flex-col gap-5">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className="w-full h-12 px-4 rounded-lg bg-black/50 text-yellow-200 placeholder-white outline-none border border-yellow-400/20 focus:border-yellow-300 focus:bg-black/70 transition"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full h-12 px-4 rounded-lg bg-black/50 text-yellow-200 placeholder-white outline-none border border-yellow-400/20 focus:border-yellow-300 focus:bg-black/70 transition"
          />
        </div>

        <button className="w-full h-12 bg-yellow-400 text-black font-semibold rounded-lg hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,0,0.7)] transition duration-300">
          Login
        </button>

        <p className="text-center text-yellow-200 text-sm">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-yellow-400 cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;