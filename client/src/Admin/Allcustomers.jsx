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
return (
  <div className="min-h-screen bg-black text-gray-200 p-4 sm:p-6">
    <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-yellow-400 text-center">
      Customer Bookings
    </h1>

    {customers.length === 0 ? (
      <p className="text-center text-gray-500">No customers found.</p>
    ) : (
      <>
        {/* MOBILE VIEW */}
        <div className="md:hidden space-y-4">
          {customers.map((c, index) => (
            <div
              key={c._id}
              className="bg-gray-900 border border-yellow-500/20 rounded-2xl p-4 shadow-lg"
            >
              <div className="flex justify-between items-center mb-3">
                <span className="text-yellow-400 font-bold">
                  #{index + 1}
                </span>

                <span className="text-xs bg-yellow-500 text-black px-3 py-1 rounded-full font-semibold">
                  Booking
                </span>
              </div>

              <div className="space-y-2 text-sm">
                <p>
                  <span className="text-yellow-400">Name:</span>{" "}
                  {c.name || "N/A"}
                </p>

                <p>
                  <span className="text-yellow-400">Email:</span>{" "}
                  {c.userId?.email || "No Email"}
                </p>

                <p>
                  <span className="text-yellow-400">Phone:</span>{" "}
                  {c.phoneno || "N/A"}
                </p>

                <p>
                  <span className="text-yellow-400">Check-In:</span>{" "}
                  {c.checkIn
                    ? new Date(c.checkIn).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    : "-"}
                </p>

                <p>
                  <span className="text-yellow-400">Check-Out:</span>{" "}
                  {c.checkOut
                    ? new Date(c.checkOut).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    : "-"}
                </p>

                <p>
                  <span className="text-yellow-400">Booked On:</span>{" "}
                  {c.createdAt
                    ? new Date(c.createdAt).toLocaleDateString("en-IN")
                    : "-"}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* DESKTOP VIEW */}
        <div className="hidden md:block overflow-x-auto border border-gray-800 rounded-2xl shadow-lg">
          <table className="w-full text-sm">
            <thead className="bg-gray-900 text-yellow-400">
              <tr>
                <th className="px-5 py-4 text-left">#</th>
                <th className="px-5 py-4 text-left">Name</th>
                <th className="px-5 py-4 text-left">Email</th>
                <th className="px-5 py-4 text-left">Phone</th>
                <th className="px-5 py-4 text-left">Check-In</th>
                <th className="px-5 py-4 text-left">Check-Out</th>
                <th className="px-5 py-4 text-left">Booked On</th>
              </tr>
            </thead>

            <tbody>
              {customers.map((c, index) => (
                <tr
                  key={c._id}
                  className="border-t border-gray-800 hover:bg-gray-900 transition"
                >
                  <td className="px-5 py-4 text-yellow-400 font-bold">
                    {index + 1}
                  </td>

                  <td className="px-5 py-4">{c.name || "N/A"}</td>

                  <td className="px-5 py-4 text-gray-400">
                    {c.userId?.email || "No Email"}
                  </td>

                  <td className="px-5 py-4">{c.phoneno || "N/A"}</td>

                  <td className="px-5 py-4">
                    {c.checkIn
                      ? new Date(c.checkIn).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })
                      : "-"}
                  </td>

                  <td className="px-5 py-4">
                    {c.checkOut
                      ? new Date(c.checkOut).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })
                      : "-"}
                  </td>

                  <td className="px-5 py-4 text-gray-400">
                    {c.createdAt
                      ? new Date(c.createdAt).toLocaleDateString("en-IN")
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    )}
  </div>
);
};

export default Allcustomers;