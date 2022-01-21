import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import blankprofile from "../assests/blankprofile.png";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useRouteMatch,
  useParams,
  NavLink,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { UserContext } from "../App";

function Navbar() {
  const history = useNavigate();
  const [userData, setUserData] = useContext(UserContext);
  // const [isAdmin, setIsAdmin] = useState(null);
  let token = localStorage.getItem("token");

  const clearSession = () => {
    setUserData(null);
    localStorage.clear();
    history("/login");
  };

  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-light bg-primary navbar-top">
        <NavLink to="/home" className="navbar-brand">
          Course Enrollment Portal
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ml-auto">
            {token && (
              <NavLink to="/home" className="nav-link active">
                Home
              </NavLink>
            )}
            {token && userData?.isAdmin && (
              <NavLink to="/adminDashboard" className="nav-link active">
                Admin Dashboard
              </NavLink>
            )}
            {!token && (
              <>
                <NavLink to="/login" className="nav-link">
                  Login
                </NavLink>
                <NavLink to="/register" className="nav-link">
                  Register
                </NavLink>
              </>
            )}

            {token && (
              <>
                <a className="nav-link" onClick={clearSession}>
                  Logout{" "}
                </a>
                <a href="#">
                  <img
                    src={blankprofile}
                    width="40"
                    height="40"
                    className="d-inline-block align-top"
                    alt="profile-pic"
                    style={{ borderRadius: "50%" }}
                  />
                </a>
              </>
            )}
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
}

export default Navbar;
