import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";

const AllRooms = () => {
  const navigate = useNavigate();
  const locationHook = useLocation();

  const params = new URLSearchParams(locationHook.search);
  const initialLocation = params.get("location");

  const [rooms, setRooms] = useState([]);
  const [location, setLocation] = useState(initialLocation);

  const locations = ["All cities", "Bangalore", "Mysore", "Hubli", "Coorg"];



   const fetchRooms = async () => {
      try {

        const url =
          !location || location === "All cities"
            ? `https://unidhuhkdccbdkj.onrender.com/api/room/filter`
            : `https://unidhuhkdccbdkj.onrender.com/api/room/filter?location=${encodeURIComponent(location)}`;

        const { data } = await axios.get(url, { withCredentials: true });
        if (data.success);
        setRooms(data.filter);
      } catch (err) {
        toast.error(err?.response?.data?.message);
      }
    };

  useEffect(() => {
    fetchRooms(); 
  }, [location]);

  const handleSelectChange = (e) => {
    const selectedLocation = e.target.value;
    setLocation(selectedLocation);
    navigate(`?location=${encodeURIComponent(selectedLocation)}`);
  };

  return (
    <div className="min-h-screen bg-black px-6 py-12">
      <h1 className="text-5xl font-bold text-center text-white mb-8">
        Available Rooms
      </h1>


      <div className="flex justify-center mb-12">
        <select
          value={location}
          onChange={handleSelectChange}
          className="px-4 py-2 rounded-lg w-1/3 text-black bg-white font-semibold  transition duration-300"
        >
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        {rooms.length === 0 ? (
          <p className="text-center text-white text-xl">No rooms found</p>
        ) : (
          rooms.map((r) => (
            <div
              key={r._id}
              className="bg-gray-900 rounded-3xl overflow-hidden shadow-xl
                         hover:shadow-2xl transition duration-300
                         flex flex-col md:flex-row"
            >
              <div className="md:w-1/2 w-full overflow-hidden">
                <img
                  src={r.image?.[0] || "https://via.placeholder.com/800x500"}
                  alt={`Room ${r.roomNumber}`}
                  className="w-full h-full object-cover hover:scale-105 transition duration-500"
                />
              </div>

              <div className="md:w-1/2 w-full p-8 flex flex-col justify-between text-white">
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold">Room {r.roomNumber}</h2>
                  <p className="font-semibold">
                    Type: <span className="font-normal">{r.type}</span>
                  </p>
                  <p className="font-semibold">
                    Location: <span className="font-normal">{r.location}</span>
                  </p>
                  <p className="font-semibold">
                    Members: <span className="font-normal">{r.member}</span>
                  </p>
                  <p className="leading-relaxed">{r.desc}</p>
                </div>

                <div className="mt-8">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-3xl font-bold">₹ {r.price}</span>
                    <span
                      className={`font-semibold ${
                        r.isBooked ? "text-red-500" : "text-white"
                      }`}
                    >
                      {r.isBooked ? "Booked" : "Available"}
                    </span>
                  </div>

                  <button
                    disabled={r.isBooked}
                    onClick={() => navigate(`/user/book/${r._id}`)}
                    className={`w-full py-4 rounded-xl font-semibold text-lg transition ${
                      r.isBooked
                        ? "bg-gray-600 cursor-not-allowed text-white"
                        : "bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black hover:scale-105"
                    }`}
                  >
                    {r.isBooked ? "Already Booked" : "Book Now"}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllRooms;