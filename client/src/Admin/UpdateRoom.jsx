import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const UpdateRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    roomNumber: "",
    type: "",
    price: "",
    image: "",
  });

  const fetchRoom = async () => {
    try {
      const { data } = await axios.get(
        `https://unidhuhkdccbdkj.onrender.com/api/room/getone/${id}`,
        { withCredentials: true }
      );
      if (data.success) {
        setForm(data.room);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message);
    }
  };

  useEffect(() => {
    fetchRoom();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:3000/api/room/update/${id}`,
        form,
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );
      if (data.success) {
        toast.success("Room updated successfully!");
        navigate("/admin/room/getall");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-900 flex items-center justify-center p-5">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 w-full max-w-md p-8 rounded-2xl shadow-xl flex flex-col gap-5 border border-gray-700"
      >
        <h1 className="text-2xl font-bold text-gray-100 text-center mb-4">
          Update Room
        </h1>

        <input
          type="number"
          name="roomNumber"
          value={form.roomNumber}
          onChange={handleChange}
          placeholder="Room Number"
          min={1}
          className="p-3 rounded-lg bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
          required
        />

        <input
          type="text"
          name="type"
          value={form.type}
          onChange={handleChange}
          placeholder="Room Type"
          maxLength={50}
          className="p-3 rounded-lg bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
          required
        />

        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Room Price"
          min={0}
          className="p-3 rounded-lg bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
          required
        />

        <input
          type="text"
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="Room Image URL"
          className="p-3 rounded-lg bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
          required
        />

        <button
          type="submit"
          className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 rounded-lg transition"
        >
          Update Room
        </button>
      </form>
    </div>
  );
};

export default UpdateRoom;