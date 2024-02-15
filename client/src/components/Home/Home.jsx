import Login from "../auth/Login";
import HomePage from "./HomePage";

const Home = ({ userData, setIsLoggedIn }) => {
  return (
    <>
      {userData.name ? (
        <HomePage userData={userData} />
      ) : (
        <Login setIsLoggedIn={setIsLoggedIn} />
      )}
    </>
  );
};

export default Home;
