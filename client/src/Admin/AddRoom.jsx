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
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "https://unidhuhkdccbdkj.onrender.com/api/room/create",
        form,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
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
    <div className="min-h-screen bg-black px-4 py-6 sm:px-6 sm:py-10">
      <div className="max-w-5xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="
            bg-gray-900
            border border-yellow-500/20
            rounded-2xl
            sm:rounded-3xl
            shadow-[0_0_40px_rgba(255,215,0,0.15)]
            p-4
            sm:p-6
            md:p-8
            lg:p-10
          "
        >
          {/* Heading */}
          <div className="mb-8 text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-400">
              Add New Room
            </h1>

            <p className="text-gray-400 text-sm sm:text-base mt-2">
              Create a new room listing
            </p>
          </div>

          {/* Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <input
              type="number"
              name="roomNumber"
              value={form.roomNumber}
              onChange={handleChange}
              placeholder="Room Number"
              required
              className="w-full h-12 px-4 rounded-xl bg-black text-white border border-gray-700 focus:border-yellow-400 outline-none"
            />

            <input
              type="text"
              name="type"
              value={form.type}
              onChange={handleChange}
              placeholder="Room Type"
              required
              className="w-full h-12 px-4 rounded-xl bg-black text-white border border-gray-700 focus:border-yellow-400 outline-none"
            />

            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Location"
              required
              className="w-full h-12 px-4 rounded-xl bg-black text-white border border-gray-700 focus:border-yellow-400 outline-none"
            />

            <input
              type="number"
              name="member"
              value={form.member}
              onChange={handleChange}
              placeholder="Maximum Guests"
              required
              className="w-full h-12 px-4 rounded-xl bg-black text-white border border-gray-700 focus:border-yellow-400 outline-none"
            />

            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="Room Price"
              required
              className="w-full h-12 px-4 rounded-xl bg-black text-white border border-gray-700 focus:border-yellow-400 outline-none"
            />

            <input
              type="text"
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="Image URL"
              required
              className="w-full h-12 px-4 rounded-xl bg-black text-white border border-gray-700 focus:border-yellow-400 outline-none"
            />
          </div>

          {/* Description */}
          <div className="mt-6">
            <textarea
              name="desc"
              value={form.desc}
              onChange={handleChange}
              placeholder="Room Description..."
              rows="5"
              required
              className="
                w-full
                p-4
                rounded-xl
                bg-black
                text-white
                border border-gray-700
                focus:border-yellow-400
                outline-none
                resize-none
              "
            />
          </div>

          {/* Preview */}
          {form.image && (
            <div className="mt-6">
              <p className="text-yellow-400 mb-2 font-medium">
                Image Preview
              </p>

              <img
                src={form.image}
                alt="Preview"
                className="
                  w-full
                  h-48
                  sm:h-64
                  object-cover
                  rounded-xl
                  border border-gray-700
                "
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </div>
          )}

          {/* Button */}
          <button
            type="submit"
            className="
              mt-8
              w-full
              h-12
              sm:h-14
              rounded-xl
              font-bold
              text-black
              bg-yellow-400
              hover:bg-yellow-500
              hover:scale-[1.01]
              transition
            "
          >
            Create Room
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRoom;