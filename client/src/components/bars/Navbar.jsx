import { Link } from "react-router-dom";

const Navbar = ({ userData, setIsLoggedIn }) => {

  const logOut = () => {
    localStorage.removeItem(`userData`);
    localStorage.removeItem(`token`);
    setIsLoggedIn(false);
  };

  return (
    <>
      <section>
        <Link to={`/`}>Home</Link>
        <Link to={`/profile`}>Profile</Link>
        {userData.name ? (
          <button onClick={logOut}>Log Out</button>
        ) : (
          <Link to={`/login`}>Login</Link>
        )}
      </section>
    </>
  );
};

export default Navbar;
