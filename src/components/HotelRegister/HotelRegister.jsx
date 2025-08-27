import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const HotelRegister = ({ isModal = true }) => {
  const { setShowHotelReg, axios, setIsAdmin, setHasHotel } = useAppContext();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        '/api/hotel',
        { name, address, contact, city }
      );
      if(data.success){
        toast.success(data.message);
        setIsAdmin(true);
        setHasHotel(true);
        if (isModal) {
            setShowHotelReg(false);
        } else {
            navigate('/admin/dashboard'); // Redirect to dashboard after successful registration
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to register hotel.");
    }
  };

  const FormComponent = () => (
    <div className="bg-white w-full max-w-4xl mx-4 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 h-64 md:h-auto">
        <img
          src="https://media.istockphoto.com/id/119926339/photo/resort-swimming-pool.jpg?s=612x612&w=0&k=20&c=9QtwJC2boq3GFHaeDsKytF4-CavYKQuy1jBD2IRfYKc="
          alt="Hotel"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
        <h2 className="text-3xl font-bold mb-4 text-black playfair">
          Register Your Hotel
        </h2>
        <p className="text-gray-500 mb-6 outfit">
            Become a partner and start welcoming guests.
        </p>
        <form className="space-y-4 text-sm text-black outfit" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 font-medium">Hotel Name</label>
            <input
              name="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              className="w-full border border-gray-300 px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-black"
              placeholder="e.g., The Grand Palace"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Address</label>
            <input
              name="address"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              type="text"
              className="w-full border border-gray-300 px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-black"
              placeholder="Street, City, ZIP Code"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Phone</label>
            <input
              type="tel"
              name="contact"
              onChange={(e) => setContact(e.target.value)}
              value={contact}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-black"
              placeholder="+91 9876543210"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">City</label>
            <input
              type="text"
              name="city"
              onChange={(e) => setCity(e.target.value)}
              value={city}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-black"
              placeholder="e.g., New York"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-all duration-300"
          >
            Register Hotel
          </button>
        </form>

        {isModal ? (
            <button onClick={() => setShowHotelReg(false)} className="mt-4 text-sm text-gray-500 hover:underline self-end">
                Close
            </button>
        ) : (
            <button onClick={() => navigate('/admin')} className="mt-4 text-sm text-gray-500 hover:underline self-end">
                Go Back
            </button>
        )}
      </div>
    </div>
  );

  return isModal ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
        <FormComponent />
    </div>
  ) : (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <FormComponent />
    </div>
  );
};

export default HotelRegister;