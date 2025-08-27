import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import { useAppContext } from "../../context/AppContext";

const Navbar = () => {
  const { user, logout } = useAppContext();
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
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

  return (
    <div className='flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white'>
      <Link to="/admin">
        <img src="/favicon.svg" alt="Stayza" className="h-9" />
      </Link>
      <div className="flex items-center gap-4">
        {user ? (
          <div className="relative" ref={profileMenuRef}>
            <img 
              src={user.image} 
              alt={user.username} 
              className="w-10 h-10 rounded-full object-cover cursor-pointer"
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            />
            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border">
                <Link to="/admin/profile" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsProfileMenuOpen(false)}>
                  <FaUser /> Profile
                </Link>
                <button 
                  onClick={() => { logout(); setIsProfileMenuOpen(false); }} 
                  className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <TbLogout /> Logout
                </button>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default Navbar;