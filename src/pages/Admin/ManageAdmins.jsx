import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const ManageAdmins = () => {
    const { axios } = useAppContext();
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            toast.error("Please enter a user's email.");
            return;
        }
        try {
            const { data } = await axios.put('/api/user/make-admin', { email });
            if (data.success) {
                toast.success(data.message);
                setEmail('');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to make user an admin.');
        }
    };

    return (
        <div className="px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-2xl mx-auto">
                <div className="text-center md:text-left mb-10">
                    <h1 className="text-3xl md:text-4xl font-semibold playfair">
                        Manage Admins
                    </h1>
                    <p className="text-gray-500 text-sm md:text-base mt-2 outfit">
                        Promote existing users to an admin role.
                    </p>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-lg border">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2 outfit">
                                User Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-md outfit"
                                placeholder="Enter the email of the user to promote"
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition outfit"
                            >
                                Make Admin
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ManageAdmins;