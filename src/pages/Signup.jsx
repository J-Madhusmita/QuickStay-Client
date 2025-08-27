import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Signup = () => {
    const { signup } = useAppContext();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [image, setImage] = useState(null);
    const [searchParams] = useSearchParams();
    const redirectUrl = searchParams.get('redirectUrl') || '/';

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signup(username, email, password, image, redirectUrl);
            toast.success("Account created successfully!");
        } catch (error) {
            toast.error(error.message || "Failed to create account");
        }
    };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
        <div className="flex flex-col justify-center p-8 md:p-14">
          <span className="mb-3 text-4xl font-bold">Create Account</span>
          <span className="font-light text-gray-400 mb-8">
            Please enter your details to create a new account
          </span>
          <form onSubmit={handleSubmit}>
            <div className="py-4">
              <span className="mb-2 text-md">Username</span>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                name="username"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="py-4">
              <span className="mb-2 text-md">Email</span>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="py-4">
              <span className="mb-2 text-md">Password</span>
              <input
                type="password"
                name="pass"
                id="pass"
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
             <div className="py-4">
                <span className="mb-2 text-md">Profile Picture (Optional)</span>
                <input
                    type="file"
                    className="w-full p-2 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                    name="image"
                    onChange={(e) => setImage(e.target.files[0])}
                />
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300"
            >
              Sign up
            </button>
          </form>
          <div className="text-center text-gray-400">
            Already have an account?
            <Link to={`/login?redirectUrl=${redirectUrl}`} className="font-bold text-black"> Login</Link>
          </div>
        </div>
        <div className="relative">
          <img
            src="https://media.istockphoto.com/id/119926339/photo/resort-swimming-pool.jpg?s=612x612&w=0&k=20&c=9QtwJC2boq3GFHaeDsKytF4-CavYKQuy1jBD2IRfYKc="
            alt="img"
            className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;