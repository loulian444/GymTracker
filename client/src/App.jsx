import { useEffect, useState } from "react";
import Router from "./components/Router";
import Navbar from "./components/bars/Navbar";

const App = () => {
  const [userData, setUserData] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentWeek, setCurrentWeek] = useState(0);

  useEffect(() => {
    const data = localStorage.getItem(`userData`);

    if (data) {
      setIsLoggedIn(true);
      setUserData(JSON.parse(data));
      setCurrentWeek(JSON.parse(data).weeks[0].week);
    } else {
      setIsLoggedIn(false);
      setUserData({});
    }
  }, [isLoggedIn]);

  return (
    <>
      <Navbar
        userData={userData}
        setIsLoggedIn={setIsLoggedIn}
        currentWeek={currentWeek}
        setCurrentWeek={setCurrentWeek}
      />
      <Router
        userData={userData}
        setIsLoggedIn={setIsLoggedIn}
        currentWeek={currentWeek}
      />
    </>
  );
};

export default App;
