import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { FaRegBuilding, FaHotel, FaUser, FaTachometerAlt } from "react-icons/fa";
import { TbBrandBooking, TbLogout } from "react-icons/tb";
import { useAppContext } from "../../context/AppContext";

const Navbar = () => {
  const { isAdmin, user, logout } = useAppContext();
  const navLinks = [
    { name: "Home", path: "/", icon: <FaRegBuilding /> },
    { name: "Hotels", path: "/hotels", icon: <FaHotel /> },
  ];

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const profileMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHotelPage = location.pathname.includes("hotel");
  const isBookingPage = location.pathname.includes("my-bookings");

  const navBg =
    isHotelPage || isBookingPage
      ? "bg-white shadow-md"
      : isScrolled
      ? "bg-white/80 shadow-md backdrop-blur-sm"
      : "bg-transparent";

  const textColor =
    isHotelPage || isBookingPage || isScrolled ? "text-black" : "text-white";

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 px-4 md:px-16 lg:px-24 xl:px-32 ${navBg}`}>
      <div className="flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-2">
          <img src="/favicon.svg" alt="logo" className="h-9" />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, idx) => (
            <Link key={idx} to={link.path} className={`group flex items-center gap-2 ${textColor} transition`}>
              {link.icon}
              <span>{link.name}</span>
              <span className="block h-0.5 bg-current w-0 group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
          {user && isAdmin && (
             <Link to="/admin" className={`group flex items-center gap-2 ${textColor} transition`}>
                <FaTachometerAlt />
                <span>Dashboard</span>
            </Link>
          )}
        </div>

        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <button
                onClick={() => navigate("/my-bookings")}
                className={`text-sm px-4 py-2 border rounded-full transition ${textColor} border-current hover:bg-gray-100 hover:text-black`}
              >
                <TbBrandBooking className="inline mr-2" />
                My Bookings
              </button>
              <div className="relative" ref={profileMenuRef}>
                <img
                  src={user.image}
                  alt={user.username}
                  className="w-10 h-10 rounded-full cursor-pointer"
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                />
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border">
                    <Link to="/profile" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsProfileMenuOpen(false)}>
                      <FaUser /> View Profile
                    </Link>
                    <button onClick={() => { logout(); setIsProfileMenuOpen(false); }} className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <TbLogout /> Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <button onClick={() => navigate('/login')} className="bg-black text-white px-6 py-2 rounded-full hover:bg-slate-900 transition cursor-pointer">
              Login
            </button>
          )}
        </div>

        <div className="md:hidden flex items-center gap-3">
          {user && <img src={user.image} alt={user.username} className="w-10 h-10 rounded-full" />}
          <button onClick={() => setIsMenuOpen(true)} aria-label="Open Menu">
            <FiMenu className={`h-7 w-7 ${textColor}`} />
          </button>
        </div>
      </div>

      <div className={`fixed top-0 left-0 w-full h-screen text-gray-800 flex flex-col items-center justify-center gap-6 transition-transform duration-500 z-50 bg-white/90 backdrop-blur-xl ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <button className="absolute top-4 right-4 text-black" onClick={() => setIsMenuOpen(false)} aria-label="Close Menu">
          <FiX className="h-7 w-7" />
        </button>

        {navLinks.map((link, idx) => (
          <Link key={idx} to={link.path} onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 text-lg hover:text-blue-600 transition">
            {link.icon} {link.name}
          </Link>
        ))}
        {user ? (
          <>
            {isAdmin && (
                <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 text-lg hover:text-blue-600 transition">
                    <FaTachometerAlt /> Dashboard
                </Link>
            )}
            <Link to="/my-bookings" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 text-lg hover:text-blue-600 transition">
              <TbBrandBooking /> My Bookings
            </Link>
            <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 text-lg hover:text-blue-600 transition">
                <FaUser /> Profile
            </Link>
            <button onClick={() => { setIsMenuOpen(false); logout(); }} className="bg-black text-white px-8 py-2 rounded-full hover:bg-gray-800 transition">Logout</button>
          </>
        ) : (
          <button onClick={() => { setIsMenuOpen(false); navigate('/login'); }} className="bg-black text-white px-8 py-2 rounded-full hover:bg-gray-800 transition">
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;