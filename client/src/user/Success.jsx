import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const Success = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [booking, setBooking] = useState(null);
    
      const { user } = useSelector((state) => state.auth);
      const userId = user?._id; // safe check

    const fetchSuccess = async () => {
        try {
            const { data } = await axios.get(`https://unidhuhkdccbdkj.onrender.com/api/book/success/${id}`, {
                withCredentials: true,
            });

            if (data.success) {
                setBooking(data.find);
                toast.success('Booking Successful!');
            } else {
                toast.error('Failed to fetch booking details');
            }
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong!');
        }
    };

    useEffect(() => {
        fetchSuccess();
    }, []);

    if (!booking) {
        return <div className="text-center mt-10 text-lg text-white">Loading booking details...</div>;
    }
return (
  <div className="min-h-screen bg-black text-white px-3 sm:px-4 py-6">
    <div className="max-w-5xl mx-auto bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-700">

      {/* Header */}
      <div className="bg-green-500 p-4 sm:p-6 flex items-center gap-3">
        <FaCheckCircle
          size={28}
          className="text-white flex-shrink-0"
        />

        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
          Booking Successful!
        </h1>
      </div>

      <div className="p-4 sm:p-6 space-y-6">

        {/* Images */}
        <div className="flex gap-3 overflow-x-auto pb-2">
          {booking.room.image.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Room ${idx}`}
              className="
                w-52 sm:w-64
                h-36 sm:h-44
                object-cover
                rounded-xl
                flex-shrink-0
                border-2
                border-green-500
              "
            />
          ))}
        </div>

        {/* Room Details */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold text-green-400 mb-4">
            Room Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm sm:text-base">
            <p>
              <strong>Room Number:</strong>{" "}
              {booking.room.roomNumber}
            </p>

            <p>
              <strong>Type:</strong>{" "}
              {booking.room.type}
            </p>

            <p>
              <strong>Location:</strong>{" "}
              {booking.room.location}
            </p>

            <p>
              <strong>Members:</strong>{" "}
              {booking.room.member}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`font-bold ${
                  booking.status === "booked"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {booking.status.toUpperCase()}
              </span>
            </p>

            <p className="font-bold text-blue-400">
              ₹{booking.room.price}
            </p>
          </div>

          <p className="mt-4 text-gray-300 leading-relaxed">
            {booking.room.desc}
          </p>
        </div>

        {/* Booking Info */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold text-green-400 mb-4">
            Booking Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm sm:text-base">

            <p>
              <strong>Check-in:</strong>{" "}
              {new Date(
                booking.checkIn
              ).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>

            <p>
              <strong>Check-out:</strong>{" "}
              {new Date(
                booking.checkOut
              ).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>

            <p>
              <strong>Booked By:</strong>{" "}
              {booking.name}
            </p>

            <p>
              <strong>Phone:</strong>{" "}
              {booking.phoneno}
            </p>
          </div>

          <p className="text-xs sm:text-sm text-gray-400 mt-4 break-words">
            Booking created at:{" "}
            {new Date(
              booking.createdAt
            ).toLocaleString()}
          </p>
        </div>

        {/* Button */}
        <button
          onClick={() => navigate(`/history/${userId}`)}
          className="
            w-full
            py-3 sm:py-4
            rounded-xl
            bg-green-500
            text-black
            font-bold
            hover:bg-green-600
            transition-all
          "
        >
          View Booking History
        </button>

      </div>
    </div>
  </div>
);
};

export default Success;