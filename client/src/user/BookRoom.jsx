import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const BookRoom = () => {
  const navigate = useNavigate();
  const { room: roomId } = useParams();

  
  const [room, setRoom] = useState(null);
  const [form, setForm] = useState({
    name: "",
    phoneno: "",
    checkIn: "",
    checkOut: "",
  });

  const today = new Date().toISOString().split("T")[0];

  /* ================= FETCH ROOM ================= */
  const fetchRoom = async () => {
    try {
      const { data } = await axios.get(
        `https://unidhuhkdccbdkj.onrender.com/api/room/getone/${roomId}`,
        { withCredentials: true }
      );
      if (data.success) setRoom(data.room);
    } catch {
      toast.error("Failed to load room");
    }
  };

  useEffect(() => {
    fetchRoom();
  }, []);

  /* ================= HANDLE INPUT ================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ================= SUBMIT BOOKING ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `https://unidhuhkdccbdkj.onrender.com/api/book/create/${roomId}`,
        form,
        { withCredentials: true }
      );
      if (data.success) {
        toast.success("Booking successful!");
        navigate(`/user/success/${data.booking._id}`);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Booking failed");
    }
  };

  /* ================= UI ================= */
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-black">

      {/* LEFT IMAGE */}
      <div className="h-[45vh] lg:h-screen overflow-hidden">
        <img
          src={room?.image?.[0]}
          alt="Room"
          className="w-full h-full object-cover"
        />
      </div>

      {/* RIGHT FORM */}
      <div className="flex items-center justify-center px-8 py-14">
        <form
          onSubmit={handleSubmit}
          className="
            w-full max-w-3xl
            bg-white/5
            backdrop-blur-2xl
            border border-white/10
            rounded-3xl
            shadow-[0_30px_80px_rgba(0,0,0,0.8)]
            p-12 space-y-10
            text-white
          "
        >
          {/* ROOM INFO */}
          <div className="space-y-4 border-b border-gray-700 pb-8">
            <h1 className="text-4xl font-bold tracking-wide">
              Room {room?.roomNumber}
            </h1>

            <p className="leading-relaxed max-w-2xl">{room?.desc}</p>

            <div className="flex justify-between text-lg">
              <span>👥 {room?.member} Guests</span>
              <span>📍 {room?.location}</span>
            </div>

            <p className="text-3xl font-bold">₹{room?.price} / night</p>
          </div>

          {/* INPUTS */}
          <div className="grid md:grid-cols-2 gap-8">

            {/* NAME */}
            <div className="space-y-2">
              <label className="text-sm">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Enter your name"
                className="
                  w-full px-5 py-4 rounded-xl
                  bg-black/40 border border-gray-600
                  focus:border-blue-500 focus:ring-2 focus:ring-blue-500
                  outline-none transition text-white
                "
              />
            </div>

            {/* PHONE */}
            <div className="space-y-2">
              <label className="text-sm">Phone Number</label>
              <input
                type="tel"
                name="phoneno"
                value={form.phoneno}
                onChange={handleChange}
                required
                placeholder="9876543210"
                className="
                  w-full px-5 py-4 rounded-xl
                  bg-black/40 border border-gray-600
                  focus:border-blue-500 focus:ring-2 focus:ring-blue-500
                  outline-none transition text-white
                "
              />
            </div>

            {/* CHECK-IN */}
            <div className="space-y-2">
              <label className="text-sm">Check-In</label>
              <input
                type="date"
                name="checkIn"
                min={today}
                value={form.checkIn}
                onChange={handleChange}
                required
                className="
                  w-full px-5 py-4 rounded-xl
                  bg-black/40 border border-gray-600
                  focus:ring-2 focus:ring-blue-500 outline-none
                  text-white
                "
              />
            </div>

            {/* CHECK-OUT */}
            <div className="space-y-2">
              <label className="text-sm">Check-Out</label>
              <input
                type="date"
                name="checkOut"
                min={form.checkIn || today}
                value={form.checkOut}
                onChange={handleChange}
                required
                className="
                  w-full px-5 py-4 rounded-xl
                  bg-black/40 border border-gray-600
                  focus:ring-2 focus:ring-blue-500 outline-none
                  text-white
                "
              />
            </div>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="
              w-full py-5 rounded-xl
              font-semibold text-lg
              bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600
              hover:scale-[1.02]
              hover:shadow-[0_10px_30px_rgba(255,215,0,0.4)]
              transition duration-300
              text-black
            "
          >
            Confirm Booking ✨
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookRoom;