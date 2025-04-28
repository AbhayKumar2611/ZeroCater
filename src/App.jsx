import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import ErrorPage from "./components/ErrorPage";
import Register from "./components/Register";
import AddRecipies from "./components/AddRecipies";
import RecipieDetails from "./components/RecipieDetails";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/addRecipies" element={<AddRecipies />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recipieDetails/:id" element={<RecipieDetails />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
