import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Axios } from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useRouteMatch,
  useParams,
  NavLink,
} from "react-router-dom";

function Login() {
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

  const onSubmit = (data, e) => {
    //console.log(data, e);
    e.preventDefault();
    Axios.post("");
  };

  const onError = (errors, e) => console.log(errors, e);

  return (
    <React.Fragment>
      <div className="container-fluid h-100">
        <div className="row d-flex justify-content-center align-items-center h-100 mx-auto mt-3 login-box">
          <h3 className="d-flex justify-content-center">Login</h3>
          <form onSubmit={handleSubmit(onSubmit, onError)} autoComplete="off">
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
                  value={loginFormData.email}
                  onChange={handleInputChange}
                  {...register("email", { required: true })}
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
                  value={loginFormData.password}
                  onChange={handleInputChange}
                  {...register("password", { required: true })}
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
