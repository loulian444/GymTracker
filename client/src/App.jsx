import { useEffect, useState } from "react";
import Router from "./components/Router";
import Navbar from "./components/bars/Navbar";

const App = () => {
  const [userData, setUserData] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem(`userData`);

    if (data) {
      setIsLoggedIn(true);
      setUserData(JSON.parse(data));
    } else {
      setIsLoggedIn(false);
      setUserData({});
    }
  }, [isLoggedIn]);

  return (
    <>
      <Navbar userData={userData} setIsLoggedIn={setIsLoggedIn} />
      <Router userData={userData} setIsLoggedIn={setIsLoggedIn} />
    </>
  );
};

export default App;
