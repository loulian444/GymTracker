import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ userData, setIsLoggedIn, currentWeek, setCurrentWeek }) => {
  const navigate = useNavigate();
  const [weeks, setWeeks] = useState([]);
  const [changeWeek, setChangeWeek] = useState(false);

  useEffect(() => {
    userData.id ? fetchWeeks(userData.id) : null;
  }, [userData]);

  const fetchWeeks = async (userId) => {
    try {
      const response = await fetch(`/api/weeks?user=${userId}`);

      const result = await response.json();

      setWeeks(result.toReversed());
    } catch (error) {
      alert(error);
    }
  };

  const logOut = () => {
    localStorage.removeItem(`userData`);
    localStorage.removeItem(`token`);
    setIsLoggedIn(false);
    navigate(`/`);
  };

  return (
    <>
      <section className="flex" id="navbar">
        <section>
          <Link to={`/`}>Home</Link>
          {userData.name ? (
            <>
              <Link to={`/profile`}>Profile</Link>
              <button onClick={logOut}>Log Out</button>
            </>
          ) : null}
        </section>
        {userData.name ? (
          <section>
            {changeWeek ? (
              <>
                <label>Select Week: </label>
                <select
                  onChange={(e) => {
                    setCurrentWeek(e.target.value);
                    setChangeWeek(!changeWeek);
                  }}
                >
                  <option value={currentWeek}>{currentWeek}</option>
                  {weeks.map((week) => (
                    <option key={week.id} value={week.week}>
                      {week.week}
                    </option>
                  ))}
                </select>
              </>
            ) : (
              <button onClick={() => setChangeWeek(!changeWeek)}>
                Change Current Week
              </button>
            )}
          </section>
        ) : null}
      </section>
    </>
  );
};

export default Navbar;
