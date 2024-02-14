import { useNavigate } from "react-router-dom";
import AllWorkouts from "./workout/AllWorkouts";

const Profile = () => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem(`token`);
    localStorage.removeItem(`userData`);
    navigate(`/`);
  };

  return (
    <>
      <h1>Profile Page</h1>
      <button onClick={logoutHandler}>Logout</button>
      <AllWorkouts />
    </>
  );
};

export default Profile;
