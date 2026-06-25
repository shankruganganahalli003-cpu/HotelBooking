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
          `https://unidhuhkdccbdkj.onrender.com/api/book/history/${id}`,
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

  <div className="min-h-screen bg-gray-900 text-gray-200 px-3 sm:px-6 py-6">
    <div className="max-w-7xl mx-auto">

```
  {/* Heading */}
  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-100 mb-6">
    Booking History
  </h1>

  {bookings.length === 0 ? (
    <div className="bg-gray-800 rounded-xl p-6 text-center">
      <p className="text-gray-400 text-base sm:text-lg">
        No bookings found for this ID.
      </p>
    </div>
  ) : (
    <div className="flex flex-col gap-5">
      {bookings.map((b) => (
        <div
          key={b._id}
          className="
            bg-gray-800
            rounded-2xl
            overflow-hidden
            border
            border-gray-700
            shadow-lg
            hover:shadow-2xl
            transition-all
            duration-300
            flex
            flex-col
            lg:flex-row
          "
        >
          {/* ROOM IMAGE */}
          <div className="w-full lg:w-72 xl:w-80 flex-shrink-0">
            <img
              src={b.room.image?.[0]}
              alt={`Room ${b.room.roomNumber}`}
              className="
                w-full
                h-56
                sm:h-72
                lg:h-full
                object-cover
              "
            />
          </div>

          {/* DETAILS */}
          <div className="flex-1 p-4 sm:p-6 relative">

            {/* STATUS */}
            <div className="flex justify-end mb-4">
              <span
                className={`px-3 py-1 rounded-full text-xs sm:text-sm font-bold ${
                  b.status === "booked"
                    ? "bg-yellow-500 text-black"
                    : b.status === "completed"
                    ? "bg-green-500 text-black"
                    : "bg-red-500 text-black"
                }`}
              >
                {b.status.toUpperCase()}
              </span>
            </div>

            {/* ROOM INFO */}
            <div className="mb-5">
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Room {b.room.roomNumber}
              </h2>

              <p className="text-gray-400 mt-1">
                {b.room.type}
              </p>

              <p className="text-gray-400">
                📍 {b.room.location}
              </p>

              <p className="text-gray-400">
                👥 {b.room.member} Members
              </p>
            </div>

            {/* BOOKING DETAILS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm sm:text-base">

              <div className="flex items-center gap-2">
                <FaCalendarAlt className="text-yellow-400" />
                <span>
                  Check-In:{" "}
                  {new Date(
                    b.checkIn
                  ).toLocaleDateString()}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <FaCalendarAlt className="text-yellow-400" />
                <span>
                  Check-Out:{" "}
                  {new Date(
                    b.checkOut
                  ).toLocaleDateString()}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <FaUser className="text-yellow-400" />
                <span>{b.name}</span>
              </div>

              <div className="flex items-center gap-2">
                <FaPhone className="text-yellow-400" />
                <span>{b.phoneno}</span>
              </div>

              <div className="flex items-center gap-2">
                <FaMoneyBillAlt className="text-yellow-400" />
                <span>
                  ₹{b.room.price}
                </span>
              </div>

              <div className="flex items-center gap-2 text-gray-400">
                <span>
                  {new Date(
                    b.createdAt
                  ).toLocaleString()}
                </span>
              </div>
            </div>

            {/* BUTTON */}
            <div className="mt-6">
              <button
                onClick={() =>
                  navigate(`/updatehistory/${b._id}`)
                }
                className="
                  w-full
                  sm:w-auto
                  px-6
                  py-3
                  bg-yellow-500
                  text-black
                  font-semibold
                  rounded-xl
                  hover:bg-yellow-600
                  hover:scale-[1.02]
                  transition-all
                "
              >
                Update Booking
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )}
</div>
```

  </div>
);

};

export default History;