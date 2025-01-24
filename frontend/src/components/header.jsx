import { UserContext } from "../../context/userContext";
import { useContext, useState } from "react";
import { ArrowIcon } from "./icons";

const Header = () => {
  const { user, loading, logout } = useContext(UserContext);
  const [dropdown, setDropdown] = useState(false);

  const toggleDropdown = () => {
    setDropdown((prev) => !prev);
  };

  return (
    <div className="flex justify-between p-2">
      <h1>Je & Ghie | POS</h1>
      <div
        className="relative flex items-center justify-center gap-2 cursor-pointer"
        onClick={toggleDropdown}
      >
        {loading ? (
          <h1>Loading...</h1>
        ) : !!user ? (
          <h1>{user.username}</h1>
        ) : (
          <h1>Not logged in.</h1>
        )}
        <ArrowIcon />
      </div>

      {/* Dropdown menu */}
      {dropdown && (
        <div className="absolute top-10 right-0 flex flex-col bg-white shadow-lg p-2 rounded-md">
          <button
            className="px-4 py-2 hover:bg-gray-100"
            onClick={() => alert("Settings clicked!")} // Replace with your logic
          >
            Settings
          </button>
          <button className="px-4 py-2 hover:bg-gray-100" onClick={logout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
