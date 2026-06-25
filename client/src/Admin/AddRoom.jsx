import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddRoom = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    roomNumber: "",
    type: "",
    location: "",
    member: "",
    price: "",
    image: "",
    desc: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://unidhuhkdccbdkj.onrender.com/api/room/create",
        form,
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );

      if (data.success) {
        toast.success(data.message);
        setForm({
          roomNumber: "",
          type: "",
          location: "",
          member: "",
          price: "",
          image: "",
          desc: "",
        });
        navigate("/admin/room");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 flex items-center justify-center px-6 py-16">

      {/* FORM CARD */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-5xl bg-black/50 backdrop-blur-lg border border-gray-700 rounded-3xl p-12 space-y-10 shadow-lg"
      >
        {/* TITLE */}
        <h1 className="text-5xl font-extrabold text-center text-yellow-400">
          Add New Room
        </h1>

        {/* INPUT GRID */}
        <div className="grid md:grid-cols-2 gap-8">
          {[
            { name: "roomNumber", type: "number", placeholder: "Room Number" },
            { name: "type", type: "text", placeholder: "Room Type (Deluxe/Suite)" },
            { name: "location", type: "text", placeholder: "Location" },
            { name: "member", type: "number", placeholder: "Max Guests" },
            { name: "price", type: "number", placeholder: "Room Price" },
            { name: "image", type: "text", placeholder: "Image URL" },
          ].map((input) => (
            <input
              key={input.name}
              type={input.type}
              name={input.name}
              value={form[input.name]}
              onChange={handleChange}
              placeholder={input.placeholder}
              required
              className="w-full p-4 rounded-xl bg-gray-900 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition hover:bg-gray-800"
            />
          ))}
        </div>

        {/* DESCRIPTION */}
        <textarea
          name="desc"
          value={form.desc}
          onChange={handleChange}
          placeholder="Room Description..."
          rows="4"
          required
          className="w-full p-4 rounded-xl bg-gray-900 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition resize-none hover:bg-gray-800"
        />

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          className="w-full py-5 text-lg font-bold rounded-xl bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(255,215,0,0.7)] transition duration-300 text-black"
        >
          Create Room
        </button>
      </form>
    </div>
  );
};

export default AddRoom;