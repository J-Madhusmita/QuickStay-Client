import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const AdminProfile = () => {
  const { user, updateUser } = useAppContext();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
      setImagePreview(user.image);
    }
  }, [user]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser({ username, email, image });
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      toast.error(error.message || 'Failed to update profile');
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg border">
        <div className="flex flex-col items-center">
          <img
            src={imagePreview || user.image}
            alt={user.username}
            className="w-24 h-24 rounded-full mb-4 object-cover"
          />
          {!isEditing ? (
            <>
              <h1 className="text-3xl font-bold playfair">{user.username}</h1>
              <p className="text-gray-600 outfit">{user.email}</p>
              <button
                onClick={() => setIsEditing(true)}
                className="mt-6 bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
              >
                Edit Profile
              </button>
            </>
          ) : (
            <form onSubmit={handleSubmit} className="w-full mt-6 outfit">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Profile Picture
                </label>
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="w-full p-2 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex justify-center gap-4">
                <button
                  type="submit"
                  className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setImagePreview(user.image);
                    setImage(null);
                  }}
                  className="bg-gray-200 text-black px-6 py-2 rounded-lg hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;