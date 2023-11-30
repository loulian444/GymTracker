import { useState } from "react";

const LoginForm = ({ setLoginInfo }) => {
  const [username, setUsername] = useState(``);
  const [password, setPassword] = useState(``);

  const loginHandler = (e) => {
    e.preventDefault();
    setLoginInfo({ username, password });
  };

  return (
    <>
      <form onSubmit={loginHandler}>
        <label>
          Username:{" "}
          <input
            type="text"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>

        <label>
          Password:{" "}
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button>Login</button>
      </form>
    </>
  );
};

export default LoginForm;
