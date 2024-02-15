import { Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import Profile from "./Profile";
import AddSet from "./workout/AddSet";
import Register from "./auth/Register";
import WorkoutDay from "./workout/WorkoutDay";

const Router = ({ userData, setIsLoggedIn }) => {
  return (
    <>
      <section className="flex" id="routerSec">
        <Routes>
          <Route
            path="/"
            element={<Home userData={userData} setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/profile" element={<Profile userData={userData} />} />
          <Route path="/add-set" element={<AddSet />} />
          <Route path="/register" element={<Register />} />
          <Route path="/workout-day/:dayId" element={<WorkoutDay />} />
        </Routes>
      </section>
    </>
  );
};

export default Router;
