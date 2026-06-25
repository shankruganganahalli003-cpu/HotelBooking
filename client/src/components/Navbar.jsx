import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useSelector((state) => state.auth);
  const userId = user?._id; // safe check

  // Hide navbar on login/register
  if (location.pathname === "/register" || location.pathname === "/login") return null;

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    navigate("/login", { replace: true });
  };

  return (
    <nav className="
w-full
bg-gray-900
text-white
p-4
flex
flex-col
sm:flex-row
justify-between
items-center
gap-4
">
      <h1 className="text-xl font-bold cursor-pointer" onClick={() => navigate("/")}>
        My App
      </h1>

    <div className="
flex
flex-wrap
justify-center
gap-2
w-full
sm:w-auto
">
        {/* Home Button */}
        <button
          onClick={() => navigate("/")}
         className="
px-3 py-2
sm:px-4
rounded
text-sm
sm:text-base
"
        >
          Home
        </button>

        {/* Booking History */}
        <button
          onClick={() => navigate(`/history/${userId}`)}
          className="bg-yellow-500 text-black px-4 py-2 rounded hover:scale-105 transition"
        >
          Booking History
        </button>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="bg-red-600 px-4 py-2 rounded hover:bg-red-500 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;