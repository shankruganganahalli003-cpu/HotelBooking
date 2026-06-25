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
    <div className="min-h-screen bg-black px-6 py-10 flex flex-col items-center">

      <h1 className="text-4xl md:text-5xl font-bold text-white mb-14">
        All Rooms
      </h1>

      {/* EMPTY STATE */}
      {rooms.length === 0 && (
        <p className="text-gray-400 text-lg">
          No rooms available
        </p>
      )}

      <div className="w-full max-w-7xl flex flex-col gap-12">
        {rooms.map((room) => (
          <div
            key={room._id}
            className="bg-gray-900 rounded-3xl overflow-hidden shadow-xl
                       hover:shadow-2xl transition duration-300
                       flex flex-col lg:flex-row"
          >
            {/* IMAGE */}
            <div className="lg:w-1/2">
              <img
                src={room.image?.[0] || "https://via.placeholder.com/800x600"}
                alt={`Room ${room.roomNumber}`}
                className="w-full h-[350px] lg:h-full object-cover"
              />
            </div>

            {/* CONTENT */}
            <div className="lg:w-1/2 p-10 flex flex-col justify-between text-white">

              <div className="space-y-4">
                <h2 className="text-4xl font-bold text-yellow-400">
                  Room {room.roomNumber}
                </h2>

                <p><span className="text-yellow-400">Type:</span> {room.type}</p>
                <p><span className="text-yellow-400">Location:</span> {room.location}</p>
                <p><span className="text-yellow-400">Members:</span> {room.member}</p>

                <p className="text-gray-300">{room.desc}</p>
              </div>

              <div className="mt-8">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-green-400 text-3xl font-bold">
                    ₹{room.price}
                  </span>

                  <span
                    className={`text-xl font-semibold ${
                      room.isBooked ? "text-red-400" : "text-green-400"
                    }`}
                  >
                    {room.isBooked ? "Booked" : "Available"}
                  </span>
                </div>

                <div className="flex gap-5">
                  <button
                    onClick={() => navigate(`/admin/room/edit/${room._id}`)}
                    className="flex-1 bg-yellow-400 text-black font-semibold py-4 rounded-xl hover:bg-yellow-500 transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(room._id)}
                    className="flex-1 bg-red-500 text-white font-semibold py-4 rounded-xl hover:bg-red-600 transition"
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
  );
};

export default GetAllRooms;