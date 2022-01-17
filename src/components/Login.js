import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useRouteMatch,
  useParams,
  NavLink,
  Navigate,
} from "react-router-dom";
import { UserContext } from "../App";

function Login() {
  const [userData, setUserData] = useContext(UserContext);
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  let { email, password } = loginFormData;

  const handleInputChange = (e) => {
    setLoginFormData({
      ...loginFormData,
      [e.target.name]: e.target.value,
    });
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data, e) => {
    //console.log(data, e);
    e.preventDefault();
    try {
      let response = await axios.post(
        "http://localhost:9999/api/users/login",
        loginFormData
      );
      setUserData(response.data);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    } catch (error) {
      console.error(error);
    }
  };

  const onError = (errors, e) => console.log(errors, e);
  if (localStorage.getItem("token")) {
    return <Navigate replace to="/home" />;
  }

  return (
    <React.Fragment>
      <div className="container-fluid h-100">
        <div className="row d-flex justify-content-center align-items-center h-100 mx-auto mt-3 login-box">
          <h3 className="d-flex justify-content-center">Login</h3>
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            <div className="row mb-3">
              <label htmlFor="email" className="col-sm-12 col-form-label">
                Email
              </label>
              <div className="col-sm-12">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={email}
                  {...register("email", { required: true })}
                  onChange={handleInputChange}
                />
                {errors.email && (
                  <span className="form-text small text-danger">
                    Email is required
                  </span>
                )}
              </div>
            </div>
            <div className="row mb-3">
              <label
                htmlFor="inputpassword"
                className="col-sm-12 col-form-label"
              >
                Password
              </label>
              <div className="col-sm-12">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={password}
                  {...register("password", { required: true })}
                  onChange={handleInputChange}
                />
                {errors.password && (
                  <span className="form-text small text-danger">
                    Password is required
                  </span>
                )}
              </div>
            </div>
            <input
              type="submit"
              name="submit"
              className="btn btn-warning text-white"
            />
            <span className="form-text small mt-3">
              Not registered yet? Click
              <Link to="/register"> here</Link> to register.
            </span>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Login;
