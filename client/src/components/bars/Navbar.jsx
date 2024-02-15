import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ userData, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem(`userData`);
    localStorage.removeItem(`token`);
    setIsLoggedIn(false);
    navigate(`/`);
  };

  return (
    <>
      <section>
        <Link to={`/`}>Home</Link>
        {userData.name ? (
          <>
            <Link to={`/profile`}>Profile</Link>
            <button onClick={logOut}>Log Out</button>
          </>
        ) : null}
      </section>
    </>
  );
};

export default Navbar;
