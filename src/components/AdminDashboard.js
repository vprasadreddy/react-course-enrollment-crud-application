import React, { useState, useEffect, useContext } from "react";
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
import { UserContext } from "../App";

function AdminDashboard() {
  const history = useNavigate();
  const [userData, setUserData] = useContext(UserContext);
  let token = localStorage.getItem("token");
  let username = "";
  let isAdmin = "";

  if (localStorage.getItem("user")) {
    let user = JSON.parse(localStorage.getItem("user"));
    username = user.name;
    isAdmin = user.isAdmin;
  }

  if (!token) {
    // history("/login");
    return <Navigate replace to="/login" />;
  }

  return (
    <React.Fragment>
      <div className="container-fluid h-100">
        <h1 className="d-flex justify-content-center mt-5">
          Welcome, {username}
        </h1>
        <div className="row d-flex justify-content-center align-items-center enrollments-row">
          <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-xs-6 m-2 d-flex justify-content-center">
            <Link to="/viewMyCourses">
              <div
                className="card add-course"
                style={{ width: "18rem", height: "15rem" }}
              >
                <div className="card-body view-my-courses-body">
                  <h5 className="card-title justify-content-center align-items-center">
                    Add Course
                  </h5>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-xs-6 m-2 d-flex justify-content-center">
            <Link to="/viewMyCourses">
              <div
                className="card delete-course"
                style={{ width: "18rem", height: "15rem" }}
              >
                <div className="card-body view-my-courses-body">
                  <h5 className="card-title justify-content-center align-items-center">
                    Delete Course
                  </h5>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-xs-6 m-2 d-flex justify-content-center">
            <Link to="/enrollCourse">
              <div
                className="card delete-user"
                style={{ width: "18rem", height: "15rem" }}
              >
                <div className="card-body enroll-course-body">
                  <h5 className="card-title justify-content-center align-items-center">
                    Delete User
                  </h5>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default AdminDashboard;
