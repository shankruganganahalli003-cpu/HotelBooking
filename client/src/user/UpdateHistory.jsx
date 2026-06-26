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
        `https://unidhuhkdccbdkj.onrender.com/api/book/update/${id}`,
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
  <div className="min-h-screen bg-gray-900 flex items-center justify-center px-3 sm:px-6 py-6">
    <div className="w-full max-w-4xl bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden">

      {/* Header */}
      <div className="bg-yellow-500 p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black text-center">
          Update Booking
        </h2>
      </div>

      {/* Form */}
      <div className="p-4 sm:p-6 md:p-8">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {/* Name */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              className="
                w-full
                px-4
                py-3
                rounded-xl
                bg-gray-700
                border
                border-gray-600
                text-white
                focus:outline-none
                focus:ring-2
                focus:ring-yellow-500
              "
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Phone Number
            </label>

            <input
              type="tel"
              name="phoneno"
              value={form.phoneno}
              onChange={handleChange}
              placeholder="9876543210"
              required
              className="
                w-full
                px-4
                py-3
                rounded-xl
                bg-gray-700
                border
                border-gray-600
                text-white
                focus:outline-none
                focus:ring-2
                focus:ring-yellow-500
              "
            />
          </div>

          {/* Check In */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Check-In Date
            </label>

            <input
              type="date"
              name="checkIn"
              value={form.checkIn}
              onChange={handleChange}
              required
              className="
                w-full
                px-4
                py-3
                rounded-xl
                bg-gray-700
                border
                border-gray-600
                text-white
                focus:outline-none
                focus:ring-2
                focus:ring-yellow-500
              "
            />
          </div>

          {/* Check Out */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Check-Out Date
            </label>

            <input
              type="date"
              name="checkOut"
              value={form.checkOut}
              onChange={handleChange}
              required
              className="
                w-full
                px-4
                py-3
                rounded-xl
                bg-gray-700
                border
                border-gray-600
                text-white
                focus:outline-none
                focus:ring-2
                focus:ring-yellow-500
              "
            />
          </div>

          {/* Submit */}
          <div className="md:col-span-2 pt-2">
            <button
              type="submit"
              disabled={loading}
              className={`
                w-full
                py-3 sm:py-4
                rounded-xl
                font-bold
                text-black
                bg-yellow-500
                hover:bg-yellow-600
                transition-all
                ${
                  loading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:scale-[1.02]"
                }
              `}
            >
              {loading
                ? "Updating..."
                : "Update Booking"}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
);
};

export default UpdateHistory;