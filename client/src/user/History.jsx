import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { FaCalendarAlt, FaUser, FaPhone, FaMoneyBillAlt } from "react-icons/fa";

const History = () => {
  const { id } = useParams();
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    const fetchBooking = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/api/book/history/${id}`,
          { withCredentials: true }
        );
        if (data.success) setBookings(data.booked);
      } catch (err) {
        toast.error(err?.response?.data?.message || err.message);
      }
    };

    fetchBooking();
  }, [id]);

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-gray-100">Booking History</h1>

      {bookings.length === 0 ? (
        <p className="text-gray-400">No bookings found for this ID.</p>
      ) : (
        <div className="flex flex-col gap-5">
          {bookings.map((b) => (
            <div
              key={b._id}
              className="flex flex-col md:flex-row bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-700 hover:shadow-lg transition-shadow"
            >
              {/* Room Image */}
              <div className="w-full md:w-1/4 bg-gray-700 flex items-center justify-center">
                <img
                  src={b.room.image[0]}
                  alt={`Room ${b.room.roomNumber}`}
                  className="object-cover w-full h-40 md:h-full"
                />
              </div>

              {/* Details Section */}
              <div className="p-4 flex-1 flex flex-col justify-between relative">
                {/* Status Badge */}
                <span
                  className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold ${
                    b.status === "booked"
                      ? "bg-yellow-600 text-gray-900"
                      : b.status === "completed"
                      ? "bg-green-600 text-gray-900"
                      : "bg-red-600 text-gray-900"
                  }`}
                >
                  {b.status.toUpperCase()}
                </span>

                {/* Room Info */}
                <div className="mb-3">
                  <h2 className="text-lg font-semibold text-gray-100">
                    Room {b.room.roomNumber} - {b.room.type}
                  </h2>
                  <p className="text-gray-400 text-sm">{b.room.location}</p>
                  <p className="text-gray-300 text-sm mt-1">Members: {b.room.member}</p>
                </div>

                {/* Booking Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-300 text-sm">
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-yellow-400" /> 
                    <span>Check-In: {new Date(b.checkIn).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-yellow-400" /> 
                    <span>Check-Out: {new Date(b.checkOut).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaUser className="text-yellow-400" /> <span>Name: {b.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaPhone className="text-yellow-400" /> <span>Phone: {b.phoneno}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaMoneyBillAlt className="text-yellow-400" /> <span>Price: ₹{b.room.price}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>Booked At: {new Date(b.createdAt).toLocaleString()}</span>
                  </div>
                </div>

                {/* Update Button */}
                <div className="mt-3">
                  <button
                    onClick={() => navigate(`/updatehistory/${b._id}`)}
                    className="px-4 py-2 bg-yellow-500 text-gray-900 font-semibold rounded hover:bg-yellow-600 transition"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;