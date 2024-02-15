import Login from "../auth/Login";
import HomePage from "./HomePage";

const Home = ({ userData, setIsLoggedIn, currentWeek }) => {
  return (
    <>
      {userData.name ? (
        <HomePage userData={userData} currentWeek={currentWeek} />
      ) : (
        <Login setIsLoggedIn={setIsLoggedIn} />
      )}
    </>
  );
};

export default Home;
