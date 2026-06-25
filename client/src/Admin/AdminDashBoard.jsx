import React from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineMeetingRoom } from "react-icons/md";
import { FaUsers } from "react-icons/fa";

const AdminDashBoard = () => {
  const navigate = useNavigate();

  const menuItem = [
    {
      title: "Rooms",
      desc: "Manage Rooms",
      icon: <MdOutlineMeetingRoom />,
      path: "/admin/room",
    },
    {
      title: "Customers",
      desc: "Manage Customers",
      icon: <FaUsers />,
      path: "/admin/customers",
    },
  ];

  return (
    <div className="min-h-screen bg-black px-4 py-8 sm:px-6 md:px-10">
      {/* Heading */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-400">
          Admin Dashboard
        </h1>
        <p className="text-gray-400 mt-2 text-sm sm:text-base">
          Manage rooms and customers
        </p>
      </div>

      {/* Cards */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
        {menuItem.map((m, index) => (
          <div
            key={index}
            onClick={() => navigate(m.path)}
            className="
              bg-gray-900
              border border-yellow-400/20
              rounded-3xl
              p-6 sm:p-8
              flex flex-col items-center justify-center
              cursor-pointer
              transition-all duration-300
              hover:scale-105
              hover:border-yellow-400
              hover:shadow-[0_0_30px_rgba(255,215,0,0.4)]
              min-h-[220px]
              sm:min-h-[280px]
            "
          >
            <div className="text-yellow-400 text-5xl sm:text-6xl mb-5">
              {m.icon}
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-yellow-400 text-center">
              {m.title}
            </h2>

            <p className="text-gray-300 text-center mt-2 text-sm sm:text-base">
              {m.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashBoard;