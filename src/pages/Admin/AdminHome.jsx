import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

const AdminHome = () => {
    const { hasHotel } = useAppContext();
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <h1 className="text-4xl md:text-5xl font-bold playfair mb-4">Welcome, Admin!</h1>
            <p className="text-gray-600 text-lg outfit mb-8 max-w-lg">
                This is your central hub for managing your hotel listings, bookings, and more.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
                {hasHotel ? (
                    <button
                        onClick={() => navigate('/admin/dashboard')}
                        className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition outfit"
                    >
                        View Dashboard
                    </button>
                ) : (
                    <button
                        onClick={() => navigate('/admin/register-hotel')}
                        className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition outfit"
                    >
                        Register Your Hotel
                    </button>
                )}
            </div>
        </div>
    );
};

export default AdminHome;