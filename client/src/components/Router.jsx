import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Profile from "./Profile";
import AddSet from "./workout/AddSet";
import Login from "./auth/Login";
import Register from "./auth/Register";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/add-set" element={<AddSet />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};

export default Router;
