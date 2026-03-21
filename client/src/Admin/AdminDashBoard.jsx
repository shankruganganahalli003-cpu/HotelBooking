import React from 'react';
import { useNavigate } from "react-router-dom";
import { MdOutlineMeetingRoom } from "react-icons/md";
import { FaUsers } from "react-icons/fa";

const AdminDashBoard = () => {
  const navigate = useNavigate();

  const menuItem = [
    {
      title: "Rooms",
      desc: "Manage Rooms",
      icon: <MdOutlineMeetingRoom size={56} />,
      path: "/admin/room",
    },
    {
      title: "Customers",
      desc: "Manage Customers",
      icon: <FaUsers size={56} />,
      path: "/admin/customers",
    },
  ];

  return (
    <div className='w-full h-screen bg-black flex flex-wrap items-center justify-center gap-10 p-10'>
      {menuItem.map((m, index) => (
        <div
          onClick={() => navigate(m.path)}
          key={index}
          className='w-[280px] h-[320px] bg-black border border-yellow-400/40 rounded-3xl p-6 flex flex-col items-center justify-center cursor-pointer
                     shadow-[0_0_30px_rgba(255,255,0,0.3)]
                     hover:shadow-[0_0_40px_rgba(255,255,0,0.6)]
                     transform hover:scale-105 transition duration-500 ease-in-out'
        >
          <div className='text-yellow-400 mb-5'>{m.icon}</div>
          <h1 className='text-2xl font-extrabold text-yellow-400 text-center'>{m.title}</h1>
          <h2 className='text-md font-semibold text-yellow-200 mt-2 text-center'>{m.desc}</h2>
        </div>
      ))}
    </div>
  );
}

export default AdminDashBoard;