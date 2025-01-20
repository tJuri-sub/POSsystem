import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Production from "./pages/Product";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import { UserContextProvider } from "../context/userContext";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Toaster positon="top-center" toastDuration={{ duraiton: 2000 }} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/products" element={<Production />} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
