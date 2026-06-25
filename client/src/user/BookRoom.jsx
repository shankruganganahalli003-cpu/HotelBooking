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
return (

  <div className="min-h-screen bg-black grid grid-cols-1 lg:grid-cols-2">

```
{/* ROOM IMAGE */}
<div className="h-[35vh] sm:h-[45vh] lg:h-screen overflow-hidden">
  <img
    src={room?.image?.[0]}
    alt="Room"
    className="w-full h-full object-cover"
  />
</div>

{/* FORM */}
<div className="flex items-center justify-center px-4 sm:px-6 lg:px-10 py-6 sm:py-10">
  <form
    onSubmit={handleSubmit}
    className="
      w-full
      max-w-3xl
      bg-white/5
      backdrop-blur-2xl
      border border-white/10
      rounded-3xl
      shadow-[0_30px_80px_rgba(0,0,0,0.8)]
      p-5 sm:p-8 lg:p-12
      space-y-6 sm:space-y-8
      text-white
    "
  >
    {/* ROOM INFO */}
    <div className="space-y-3 border-b border-gray-700 pb-6">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
        Room {room?.roomNumber}
      </h1>

      <p className="text-gray-300 leading-relaxed">
        {room?.desc}
      </p>

      <div className="flex flex-col sm:flex-row sm:justify-between gap-2 text-base sm:text-lg">
        <span>👥 {room?.member} Guests</span>
        <span>📍 {room?.location}</span>
      </div>

      <p className="text-2xl sm:text-3xl font-bold text-yellow-400">
        ₹{room?.price} / night
      </p>
    </div>

    {/* INPUTS */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">

      {/* NAME */}
      <div className="space-y-2">
        <label className="text-sm text-gray-300">
          Full Name
        </label>

        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          placeholder="Enter your name"
          className="
            w-full
            px-4 py-3
            rounded-xl
            bg-black/40
            border border-gray-600
            focus:border-yellow-400
            focus:ring-2
            focus:ring-yellow-400
            outline-none
            text-white
          "
        />
      </div>

      {/* PHONE */}
      <div className="space-y-2">
        <label className="text-sm text-gray-300">
          Phone Number
        </label>

        <input
          type="tel"
          name="phoneno"
          value={form.phoneno}
          onChange={handleChange}
          required
          placeholder="9876543210"
          className="
            w-full
            px-4 py-3
            rounded-xl
            bg-black/40
            border border-gray-600
            focus:border-yellow-400
            focus:ring-2
            focus:ring-yellow-400
            outline-none
            text-white
          "
        />
      </div>

      {/* CHECK IN */}
      <div className="space-y-2">
        <label className="text-sm text-gray-300">
          Check-In
        </label>

        <input
          type="date"
          name="checkIn"
          min={today}
          value={form.checkIn}
          onChange={handleChange}
          required
          className="
            w-full
            px-4 py-3
            rounded-xl
            bg-black/40
            border border-gray-600
            focus:border-yellow-400
            focus:ring-2
            focus:ring-yellow-400
            outline-none
            text-white
          "
        />
      </div>

      {/* CHECK OUT */}
      <div className="space-y-2">
        <label className="text-sm text-gray-300">
          Check-Out
        </label>

        <input
          type="date"
          name="checkOut"
          min={form.checkIn || today}
          value={form.checkOut}
          onChange={handleChange}
          required
          className="
            w-full
            px-4 py-3
            rounded-xl
            bg-black/40
            border border-gray-600
            focus:border-yellow-400
            focus:ring-2
            focus:ring-yellow-400
            outline-none
            text-white
          "
        />
      </div>
    </div>

    {/* BUTTON */}
    <button
      type="submit"
      className="
        w-full
        py-4
        rounded-xl
        font-semibold
        text-base sm:text-lg
        bg-gradient-to-r
        from-yellow-400
        via-yellow-500
        to-yellow-600
        text-black
        hover:scale-[1.02]
        transition-all
        duration-300
      "
    >
      Confirm Booking ✨
    </button>
  </form>
</div>
```

  </div>
);
};

export default BookRoom;