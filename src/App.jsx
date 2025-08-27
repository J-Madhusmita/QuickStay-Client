import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Home, Hotels, RoomDetails, MyBookings, Login, Signup, Profile } from "./pages";
import AdminProfile from "./pages/Admin/Profile";
import ManageAdmins from "./pages/Admin/ManageAdmins";
import { Navbar, HotelRegister, Loader } from "./components";
import Layout from "./pages/Admin/Layout";
import Dashboard from "./pages/Admin/Dashboard";
import AddRoom from "./pages/Admin/AddRoom";
import ListRoom from "./pages/Admin/ListRoom";
import { Toaster } from "react-hot-toast";
import { useAppContext } from "./context/AppContext";

const App = () => {
  const isAdminPath = useLocation().pathname.startsWith("/admin");
  const { showHotelReg } = useAppContext();

  return (
    <div>
      {!isAdminPath && <Navbar />}
      {showHotelReg && <HotelRegister isModal={true} />}
      <Toaster />
      <Routes>
        {/* User Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/hotels/:id" element={<RoomDetails />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/loader/:nextUrl" element={<Loader />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="register-hotel" element={<HotelRegister isModal={false} />} />
          <Route path="add-room" element={<AddRoom />} />
          <Route path="list-rooms" element={<ListRoom />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="manage-admins" element={<ManageAdmins />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;