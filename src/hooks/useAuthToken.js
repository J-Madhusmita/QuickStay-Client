// src/hooks/useAuthToken.js
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";

function useAuthToken() {
  const { getToken } = useAuth();

  useEffect(() => {
    const storeToken = async () => {
      try {
        const token = await getToken({ template: "default" }); // default template
        if (token) {
          localStorage.setItem("authToken", token);
        }
      } catch (err) {
        console.error("Failed to get Clerk token:", err);
      }
    };

    storeToken();
  }, [getToken]);
}

export default useAuthToken;
