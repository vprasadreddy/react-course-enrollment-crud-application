import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useRouteMatch,
  useParams,
  NavLink,
} from "react-router-dom";

function Navbar() {
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-light bg-primary navbar-top">
        <NavLink to="/" className="navbar-brand">
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
            <NavLink to="/" className="nav-link active">
              Home
            </NavLink>
            <NavLink to="/login" className="nav-link">
              Login
            </NavLink>
            <NavLink to="/register" className="nav-link">
              Register
            </NavLink>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
}

export default Navbar;
