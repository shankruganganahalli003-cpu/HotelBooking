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
        <div className="min-h-screen bg-black flex items-center justify-center p-4 text-white">
            <div className="max-w-4xl w-full bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
                {/* Header */}
                <div className="bg-green-500 text-white p-6 flex items-center gap-3 shadow-lg">
                    <FaCheckCircle size={28} className="text-white" />
                    <h1 className="text-2xl font-bold">Booking Successful!</h1>
                </div>

                <div className="p-6 space-y-6">
              
                    <div className="flex gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-gray-800">
                        {booking.room.image.map((img, idx) => (
                            <img key={idx} src={img} alt={`Room ${idx}`}
                                className="w-60 h-40 object-cover rounded-lg flex-shrink-0 border-2 border-green-500 shadow-lg"
                            />
                        ))}
                    </div>

                    {/* Room Details */}
                    <div className="bg-gray-800 p-4 rounded-lg shadow-inner border border-gray-700">
                        <h2 className="text-xl font-semibold mb-2 text-green-400">Room Details</h2>
                        <p><strong>Room Number:</strong> {booking.room.roomNumber}</p>
                        <p><strong>Type:</strong> {booking.room.type}</p>
                        <p><strong>Location:</strong> {booking.room.location}</p>
                        <p><strong>Members:</strong> {booking.room.member}</p>
                        <p>
                            <strong>Status:</strong> 
                            <span className={`font-bold ml-1 ${booking.status === 'booked' ? 'text-green-500' : 'text-red-400'}`}>
                                {booking.status.toUpperCase()}
                            </span>
                        </p>
                        <p className="mt-2 text-gray-300">{booking.room.desc}</p>
                        <p className="mt-2 text-lg font-bold text-blue-400">Price: ₹{booking.room.price}</p>
                    </div>

                    {/* Booking Info */}
                    <div className="bg-gray-800 p-4 rounded-lg shadow-inner border border-gray-700">
                        <h2 className="text-xl font-semibold mb-2 text-green-400">Booking Information</h2>

                        <p><strong>Check-in:</strong> {new Date(booking.checkIn).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
                        <p><strong>Check-out:</strong> {new Date(booking.checkOut).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
                        <p>
  <strong>Booked by:</strong> {booking.name}
</p>

<p>
  <strong>Phone:</strong> {booking.phoneno}
</p>
                        <p className="text-sm text-gray-400 mt-2">Booking created at: {new Date(booking.createdAt).toLocaleString()}</p>
                    </div>

                    {/* Back Button */}
                    <div className="text-center">
                        <button
                            onClick={() => navigate(`/history/${userId}`)}
                            className="mt-4 px-6 py-2 bg-green-500 text-black font-bold rounded-lg hover:bg-green-600 transition-all shadow-md"
                        >
                            Booking History
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Success;