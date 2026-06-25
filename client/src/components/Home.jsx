import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  /* ================= HANDLE CLICK ================= */
  const handleClick = () => {
    if (!user) return;

    if (user.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/user");
    }
  };

  /* ================= PROTECT ROUTE ================= */
  if (!user) return <Navigate to="/login" replace />;

  /* ================= UI ================= */
  return (
    <div className="min-h-screen flex items-center justify-center
        bg-black">

      <div className="text-center space-y-10 px-6">

        <h1 className="text-3xl sm:text-5xl font-bold text-yellow-400 tracking-wide drop-shadow-lg">
          Welcome Back 👋
        </h1>

        <p className="text-yellow-200 text-base sm:text-lg drop-shadow-md">
          Start managing your bookings instantly
        </p>

        <button
          onClick={handleClick}
          className="
           px-8 sm:px-16 py-4 sm:py-5
            rounded-2xl
            text-black text-lg font-semibold
            bg-yellow-400
            hover:bg-yellow-500
            hover:scale-105
            transition duration-300
            shadow-[0_10px_30px_rgba(255,255,0,0.5)]
          "
        >
          Get Started 🚀
        </button>

      </div>
    </div>
  );
};

export default Home;