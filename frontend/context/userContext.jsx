import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get("/profile");
      setUser(response.data);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      setUser(null);
    }
  };

  useEffect(() => {
    if (!user) {
      fetchUserProfile();
    }
  }, [user]);

  const logout = async () => {
    try {
      await axios.post("/logout");
      setUser(null); // Reset user state
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}
