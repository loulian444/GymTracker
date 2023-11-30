import { Link } from "react-router-dom";

const Navbar = ({ userData }) => {
  return (
    <>
      <section>
        <Link to={`/`}>Home</Link>
        <Link to={`/profile`}>Profile</Link>
        <Link to={`/login`}>Login</Link>
      </section>
    </>
  );
};

export default Navbar;
