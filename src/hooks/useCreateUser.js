// src/hooks/useCreateUser.js
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

function useCreateUser() {
  const { user } = useUser();

  const createUserInDb = async () => {
    if (!user) return;

    try {
      await axios.post("http://localhost:3000/api/user/create", {
        id: user.id,
        username: user.username || `${user.firstName} ${user.lastName}`,
        email: user.primaryEmailAddress?.emailAddress,
        image: user.imageUrl,
      });
    } catch (err) {
      console.error("Error creating user in DB:", err.response?.data || err.message);
    }
  };

  return { createUserInDb };
}

export default useCreateUser;
