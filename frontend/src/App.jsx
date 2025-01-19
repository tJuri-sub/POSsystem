import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Production from "./pages/Product";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/products" element={<Production />} />
      </Routes>
    </div>
  );
}

export default App;
