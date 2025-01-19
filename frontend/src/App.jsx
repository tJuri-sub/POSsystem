import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Production from "./pages/Product";
import { Toaster } from "react-hot-toast";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/products" element={<Production />} />
      </Routes>
      <Toaster positon="top-center" reverseOrder={false} />
    </div>
  );
}

export default App;
