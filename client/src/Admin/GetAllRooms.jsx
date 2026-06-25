import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const GetAllRooms = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);

  // ================= FETCH ROOMS =================
  const fetchRooms = async () => {
    try {
      const { data } = await axios.get(
        "https://unidhuhkdccbdkj.onrender.com/api/room/getall",
        { withCredentials: true }
      );

      if (data.success) setRooms(data.getall);
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  // ================= DELETE ROOM =================
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this room?")) return;

    try {
      const { data } = await axios.delete(
        `https://unidhuhkdccbdkj.onrender.com/api/room/delete/${id}`,
        { withCredentials: true }
      );

      if (data.success) {
        toast.success(data.message);
        fetchRooms();
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message);
    }
  };
return (
  <div className="min-h-screen bg-black px-4 sm:px-6 py-6 sm:py-10">
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-400 text-center mb-8 sm:mb-12">
        All Rooms
      </h1>

      {rooms.length === 0 && (
        <p className="text-center text-gray-400 text-lg">
          No rooms available
        </p>
      )}

      <div className="flex flex-col gap-6 sm:gap-10">
        {rooms.map((room) => (
          <div
            key={room._id}
            className="
              bg-gray-900
              rounded-2xl
              overflow-hidden
              border border-yellow-500/10
              shadow-lg
              hover:shadow-yellow-500/20
              transition
              flex flex-col lg:flex-row
            "
          >
            {/* IMAGE */}
            <div className="w-full lg:w-1/2">
              <img
                src={
                  room.image?.[0] ||
                  "https://via.placeholder.com/800x600"
                }
                alt={`Room ${room.roomNumber}`}
                className="
                  w-full
                  h-52
                  sm:h-72
                  lg:h-full
                  object-cover
                "
              />
            </div>

            {/* DETAILS */}
            <div className="w-full lg:w-1/2 p-4 sm:p-6 md:p-8 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-4">
                  Room {room.roomNumber}
                </h2>

                <div className="space-y-2 text-sm sm:text-base text-white">
                  <p>
                    <span className="text-yellow-400 font-semibold">
                      Type:
                    </span>{" "}
                    {room.type}
                  </p>

                  <p>
                    <span className="text-yellow-400 font-semibold">
                      Location:
                    </span>{" "}
                    {room.location}
                  </p>

                  <p>
                    <span className="text-yellow-400 font-semibold">
                      Members:
                    </span>{" "}
                    {room.member}
                  </p>

                  <p className="text-gray-300 leading-relaxed mt-3">
                    {room.desc}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
                  <span className="text-green-400 text-2xl sm:text-3xl font-bold">
                    ₹{room.price}
                  </span>

                  <span
                    className={`font-semibold text-lg ${
                      room.isBooked
                        ? "text-red-400"
                        : "text-green-400"
                    }`}
                  >
                    {room.isBooked
                      ? "🔴 Booked"
                      : "🟢 Available"}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() =>
                      navigate(`/admin/room/edit/${room._id}`)
                    }
                    className="
                      bg-yellow-400
                      text-black
                      font-bold
                      py-3
                      rounded-xl
                      hover:bg-yellow-500
                      transition
                    "
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(room._id)}
                    className="
                      bg-red-500
                      text-white
                      font-bold
                      py-3
                      rounded-xl
                      hover:bg-red-600
                      transition
                    "
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
};

export default GetAllRooms;