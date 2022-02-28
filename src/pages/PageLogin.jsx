import { useContext, useState, useEffect } from "react";
import AppContext from "../AppContext";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import styles from "./PageLogin.module.css";

const PageLogin = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const { setCurrentUser } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    return () => setLogin("");
  }, []); // damit keine Warrning im console
  // LOGIN FORM FIELD HANDLERS
  const handleLogin = (e) => {
    let _login = e.target.value;
    setLogin(_login);
  };

  const handlePassword = (e) => {
    let _password = e.target.value;
    setPassword(_password);
  };

  const handleLoginButton = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login, password }),
    };
    console.log(JSON.stringify({ login, password }));

    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/login`,
      requestOptions
    );
    if (response.ok) {
      const _currentUser = response.json();
      setCurrentUser((prev) => ({ ...prev, ..._currentUser }));
      setLogin("");
      setPassword("");
      window.location.reload();
    }
  };

  return (
    <div className={styles.PageLogin}>
      <img src="images/plants/linh-le-Ebwp2-6BG8E-unsplash.jpg" alt="" />

      <form className={styles.form} type="submit">
        <div>
          <div>
            <p>Sign in to Floral Garden</p>

            <label htmlFor="login">Username</label>
            <input
              type="text"
              id="login"
              value={login}
              onChange={handleLogin}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePassword}
            />
          </div>
          <div className={styles.button}>
            <button onClick={handleLoginButton}>Sign in</button>
          </div>
        </div>
      </form>

      <div className={styles.register}>
        Don't have an account? <NavLink to="/register"> Sign up now</NavLink>
      </div>
    </div>

  );
};

export default PageLogin;
