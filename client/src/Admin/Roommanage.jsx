import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdAddBox, MdViewList } from "react-icons/md";

const Roommanage = () => {
  const navigate = useNavigate();

  const route = [
    {
      title: "Add Room",
      icon: <MdAddBox size={50} />,
      path: "/admin/room/addroom",
      color: "from-yellow-400 via-yellow-500 to-yellow-600"
    },
    {
      title: "Get All Rooms",
      icon: <MdViewList size={50} />,
      path: "/admin/room/getall",
      color: "from-yellow-300 via-yellow-400 to-yellow-500"
    }
  ];

  return (
    <div className="w-full min-h-screen bg-black flex items-center justify-center px-6 py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
        {route.map((r, index) => (
      <div
  key={index}
  onClick={() => navigate(r.path)}
  className={`
    w-[260px] h-[300px] rounded-3xl p-6 cursor-pointer
    flex flex-col items-center justify-center
    bg-black
    border border-yellow-400/50
    shadow-[0_0_30px_rgba(255,255,0,0.3)]
    hover:shadow-[0_0_40px_rgba(255,255,0,0.5)]
    transform hover:scale-105 transition duration-500 ease-in-out
  `}
>
  <div className="text-yellow-400 mb-5">{r.icon}</div>
  <h1 className="text-xl md:text-2xl font-extrabold text-yellow-400 text-center">
    {r.title}
  </h1>
</div>
        ))}
      </div>
    </div>
  );
};

export default Roommanage;