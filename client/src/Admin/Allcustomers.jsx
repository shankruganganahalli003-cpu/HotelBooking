import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Allcustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH ================= */
  const fetchCustomers = async () => {
    try {
      const { data } = await axios.get(
        "https://unidhuhkdccbdkj.onrender.com/api/book/getall",
        { withCredentials: true }
      );

      if (data.success) {
        setCustomers(data.getall || []);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-gray-400 text-lg">
        Loading customers...
      </div>
    );
  }

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-black text-gray-200 p-6">

      <h1 className="text-3xl font-bold mb-6 text-white">
        Customer Bookings
      </h1>

      {customers.length === 0 ? (
        <p className="text-gray-500">No customers found.</p>
      ) : (
        <div className="overflow-x-auto border border-gray-800 rounded-xl shadow-lg">
          <table className="w-full text-sm">

            {/* TABLE HEAD */}
            <thead className="bg-gray-900 text-gray-300">
              <tr>
                <th className="px-5 py-3 text-left">#</th>
                <th className="px-5 py-3 text-left">Name</th>
                <th className="px-5 py-3 text-left">Email</th>
                <th className="px-5 py-3 text-left">Phone</th>
                <th className="px-5 py-3 text-left">Check-In</th>
                <th className="px-5 py-3 text-left">Check-Out</th>
                <th className="px-5 py-3 text-left">Booked On</th>
              </tr>
            </thead>

            {/* TABLE BODY */}
            <tbody>
              {customers.map((c, index) => (
                <tr
                  key={c._id}
                  className="border-t border-gray-800 hover:bg-gray-900 transition"
                >
                  <td className="px-5 py-3 text-yellow-400 font-medium">
                    {index + 1}
                  </td>

                  <td className="px-5 py-3">
                    {c.name || "N/A"}
                  </td>

                  <td className="px-5 py-3 text-gray-400">
                    {c.userId?.email || "No Email"}
                  </td>

                  <td className="px-5 py-3">
                    {c.phoneno || "N/A"}
                  </td>

                <td className="px-5 py-3 text-gray-400">
    {c.checkIn
    ? new Date(c.checkIn).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "-"}
</td>

                <td className="px-5 py-3 text-gray-400">
  {c.checkOut
    ? new Date(c.checkOut).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "-"}
</td>

                  {/* CREATED */}
                  <td className="px-5 py-3 text-gray-500">
                    {c.createdAt
                      ? new Date(c.createdAt).toLocaleDateString("en-IN",{
                        day:"numeric",
                        month:"numeric",
                        year:"numeric"
                      })
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
};

export default Allcustomers;