import React, { useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../../components/admin/Navbar';
import Sidebar from '../../components/admin/Sidebar';
import { useAppContext } from '../../context/AppContext';

const Layout = () => {
    const { isAdmin, hasHotel, navigate } = useAppContext();
    const location = useLocation();

    useEffect(() => {
        if (!isAdmin) {
            navigate('/');
            return;
        }

        // Logic for redirection
        if (location.pathname === '/admin' || location.pathname === '/admin/') {
            if (hasHotel) {
                navigate('/admin/dashboard', { replace: true });
            } else {
                navigate('/admin/register-hotel', { replace: true });
            }
        }
    }, [isAdmin, hasHotel, navigate, location.pathname]);

    // Render nothing while redirecting
    if (location.pathname === '/admin' || location.pathname === '/admin/') {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
                <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }
    
    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex h-full">
                <Sidebar />
                <div className="flex-1 p-4 pt-10 mx:px-10 h-full overflow-y-auto">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Layout;