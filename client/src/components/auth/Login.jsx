import { useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsLoggedIn }) => {
  const [loginInfo, setLoginInfo] = useState({});
  const [message, setMessage] = useState(``);
  const navigate = useNavigate();

  useEffect(() => {
    loginInfo.username ? attemptLogin() : null;
  }, [loginInfo]);

  const attemptLogin = async () => {
    try {
      const response = await fetch(`/auth/login`, {
        method: `POST`,
        headers: {
          "Content-Type": `application/json`,
        },
        body: JSON.stringify(loginInfo),
      });

      const result = await response.json();

      if (result.token) {
        localStorage.setItem(`token`, result.token);
        const tokenArr = result.token.split(`.`);
        const { id } = JSON.parse(atob(tokenArr[1]));
        fetchUserData(id, result.token);
      } else {
        setMessage(result.message);
      }
    } catch (error) {
      alert(error);
    }
  };

  const fetchUserData = async (id, token) => {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: `GET`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();

      localStorage.setItem(`userData`, JSON.stringify(result));

      setIsLoggedIn(true);
      navigate(`/`);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <h1>Login</h1>
      {message ? <p>{message}</p> : null}
      <LoginForm setLoginInfo={setLoginInfo} />
    </>
  );
};

export default Login;
