/* eslint-disable no-unused-vars */
// ... imports ...
import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import api from "../utils/api";

// axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [isAdmin, setIsAdmin] = useState(false);
    const [hasHotel, setHasHotel] = useState(false); // New state
    const [showHotelReg, setShowHotelReg] = useState(false);
    const [searchedCities, setSearchedCities] = useState([]);
    const [rooms, setRooms] = useState([]);

    const login = async (email, password, redirectUrl = '/') => {
        try {
            const { data } = await api.post('/api/user/login', { email, password });
            localStorage.setItem("token", data.token);
            setToken(data.token);
            setUser(data.user);
            setIsAdmin(data.user.role === 'admin');
            
            // Navigate to admin panel if role is admin, otherwise to redirectUrl
            if (data.user.role === 'admin') {
                navigate('/admin');
            } else {
                navigate(redirectUrl);
            }
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Login failed');
        }
    };
    
    const fetchUser = useCallback(async () => {
        if (token) {
            try {
                const { data } = await api.get("/api/user");
                if (data.success) {
                    setUser(data.user);
                    setIsAdmin(data.role === "admin");
                    setHasHotel(data.hasHotel); // Set hasHotel state from backend
                    setSearchedCities(data.recentSearchedCities);
                } else {
                    logout();
                }
            // eslint-disable-next-line no-unused-vars
            } catch (error) {
                logout();
            }
        }
    }, [token]);
    
    useEffect(() => {
        fetchUser();
    }, [token]);

    // ... rest of the context ...
// ... (the rest of the file remains the same) ...
  const signup = async (username, email, password, image, redirectUrl = '/') => {
    try {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);
        if (image) {
            formData.append('image', image);
        }
        const { data } = await api.post('/api/user/signup', formData);
        localStorage.setItem("token", data.token);
        setToken(data.token);
        setUser(data.user);
        navigate(redirectUrl);
    } catch(error) {
        throw new Error(error.response.data.message || 'Signup failed');
    }
  };

  const logout = () => {
    toast.success('Logged out successfully!');
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setIsAdmin(false);
    navigate('/login');
  };

  const updateUser = async (userData) => {
    try {
        const formData = new FormData();
        formData.append('username', userData.username);
        formData.append('email', userData.email);
        if (userData.image) {
            formData.append('image', userData.image);
        }

        const { data } = await api.put('/api/user/profile', formData);
        if (data.success) {
            setUser(data);
        }
        return data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Failed to update profile');
    }
  };

  const fetchRooms = useCallback(async () => {
    try {
      const { data } = await api.get("/api/room");
      if (data.success) {
        setRooms(data.rooms);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  }, []);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

    const value = {
        axios: api,
        navigate,
        user,
        token,
        login,
        signup,
        logout,
        updateUser,
        isAdmin,
        hasHotel,
        setHasHotel,
        setIsAdmin,
        showHotelReg,
        setShowHotelReg,
        searchedCities,
        setSearchedCities,
        rooms,
        setRooms,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
export const useAppContext = () => useContext(AppContext);