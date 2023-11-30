import { useEffect, useState } from "react";

const Home = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const data = localStorage.getItem(`userData`);
    data ? setUserData(JSON.parse(data)) : null;
  }, []);

  return (
    <>
      {userData.name ? <h1>Hello {userData.name}</h1> : <h1>Hello there</h1>}
    </>
  );
};

export default Home;
