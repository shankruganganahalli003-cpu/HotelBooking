import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const UpdateHistory = () => {
  const { user } = useSelector((state) => state.auth);
  const userId = user?._id;

  const { id } = useParams(); // booking id
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phoneno: "",
    checkIn: "",
    checkOut: "",
  });

  const [loading, setLoading] = useState(false);

  // Fetch booking data
  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const { data } = await axios.get(
          `https://unidhuhkdccbdkj.onrender.com/api/book/success/${id}`,
          { withCredentials: true }
        );
        if (data.success) {
          const booking = data.find;
          setForm({
            name: booking.name || "",
            phoneno: booking.phoneno || "",
            checkIn: booking.checkIn ? booking.checkIn.split("T")[0] : "",
            checkOut: booking.checkOut ? booking.checkOut.split("T")[0] : "",
          });
        }
      } catch (err) {
        toast.error(err?.response?.data?.message || err.message);
      }
    };
    fetchBooking();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.put(
        `http://localhost:3000/api/book/update/${id}`,
        form,
        { withCredentials: true }
      );
      if (data.success) {
        toast.success("Booking updated successfully!");
        navigate(`/history/${userId}`);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-6">
      <div className="bg-gray-800 w-full max-w-3xl rounded-xl shadow-xl p-6 border border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-gray-100 text-center">
          Update Booking
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name */}
          <div className="flex flex-col">
            <label className="mb-1 text-gray-300 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-gray-200 focus:outline-none focus:border-gray-400 transition"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col">
            <label className="mb-1 text-gray-300 font-medium">Phone</label>
            <input
              type="text"
              name="phoneno"
              value={form.phoneno}
              onChange={handleChange}
              className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-gray-200 focus:outline-none focus:border-gray-400 transition"
              placeholder="Enter phone number"
              required
            />
          </div>

          {/* Check-In */}
          <div className="flex flex-col">
            <label className="mb-1 text-gray-300 font-medium">Check-In</label>
            <input
              type="date"
              name="checkIn"
              value={form.checkIn}
              onChange={handleChange}
              className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-gray-200 focus:outline-none focus:border-gray-400 transition"
              required
            />
          </div>

          {/* Check-Out */}
          <div className="flex flex-col">
            <label className="mb-1 text-gray-300 font-medium">Check-Out</label>
            <input
              type="date"
              name="checkOut"
              value={form.checkOut}
              onChange={handleChange}
              className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-gray-200 focus:outline-none focus:border-gray-400 transition"
              required
            />
          </div>

          {/* Submit Button spans both columns */}
          <div className="md:col-span-2 mt-2">
            <button
              type="submit"
              className={`w-full py-2 rounded bg-yellow-500  font-bold hover:bg-yellow-600 transition ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Booking"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateHistory;