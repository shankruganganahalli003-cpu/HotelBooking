import React from "react";
import { useNavigate } from "react-router-dom";
import { MdAddBox, MdViewList } from "react-icons/md";

const Roommanage = () => {
  const navigate = useNavigate();

  const route = [
    {
      title: "Add Room",
      icon: <MdAddBox size={50} />,
      path: "/admin/room/addroom",
    },
    {
      title: "Get All Rooms",
      icon: <MdViewList size={50} />,
      path: "/admin/room/getall",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-black flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12 md:py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10 w-full max-w-4xl place-items-center">
        {route.map((r, index) => (
          <div
            key={index}
            onClick={() => navigate(r.path)}
            className="
              w-full max-w-[280px]
              h-[240px] sm:h-[280px] md:h-[300px]
              rounded-3xl
              p-4 sm:p-6
              cursor-pointer
              flex flex-col items-center justify-center
              bg-black
              border border-yellow-400/50
              shadow-[0_0_30px_rgba(255,255,0,0.3)]
              hover:shadow-[0_0_40px_rgba(255,255,0,0.5)]
              hover:scale-105
              transition-all duration-500 ease-in-out
            "
          >
            <div className="text-yellow-400 mb-4 sm:mb-5">
              {r.icon}
            </div>

            <h1 className="text-lg sm:text-xl md:text-2xl font-extrabold text-yellow-400 text-center">
              {r.title}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Roommanage;