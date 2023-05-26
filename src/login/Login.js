import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import { useHistory } from "react-router-dom";

function Login() {
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });
  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState([]);

  const history = useHistory();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("http://localhost:5000/api/login")
      .then((response) => setData(response.data))
      .catch((err) => console.error(err));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLogin({ ...login, [name]: value });
  };

  const handleSubmit = async (e) => {
    console.log(login);
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/login",
        login
      );
      if (response.data) {
        alert(response.data.message);
        if (response.data.role === "Admin") {
          history.push("/dataUser");
        } else {
          history.push("/landing");
        }
      }
    } catch (error) {
      console.error(error);
      alert("Login failed");
    }
  };

  return (
    <div>
      <div className="login-container">
        <div className="login-form">
          <h1 className="header-login">Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group" controlId="formUsername">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                name="username"
                value={login.username}
                onChange={handleChange}
                placeholder="Enter Username"
              />
            </div>
            <div className="form-group" controlId="formPassword">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                name="password"
                value={login.password}
                onChange={handleChange}
                placeholder="Enter Password"
              />
            </div>
            <button type="submit">Login</button>
            <p className="register-text">
              Don't have an account?{" "}
              <Link to="/register" replace className="link-register">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
