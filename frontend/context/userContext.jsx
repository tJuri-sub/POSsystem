import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchUserProfile = async () => {
    try {
      console.log("Fetching user profile...");
      const response = await axios.get("/profile", {
        withCredentials: true,
      });

      if (response.data) {
        console.log("User profile fetched:", response.data);
        setUser(response.data); // Update user with the received data
      } else {
        throw new Error("No user data found.");
      }
    } catch (error) {
      console.error("Error fetching user profile:", error.message);
      setUser(null); // Ensure user is null
      navigate("/"); // Redirect to login page
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = document.cookie.includes("token"); // Check for token in cookies
    if (token) {
      fetchUserProfile();
    } else {
      console.log("No token found. Redirecting to login...");
      setUser(null);
      navigate("/"); // Redirect if no token
      setLoading(false);
    }
  }, [navigate]);

  const logout = async () => {
    try {
      console.log("Logging out...");
      await axios.post("/logout", {}, { withCredentials: true });
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error.message);
    }
  };

  return (
    <UserContext.Provider value={{ user, logout, loading }}>
      {!loading ? children : <div>Loading...</div>}
    </UserContext.Provider>
  );
};
