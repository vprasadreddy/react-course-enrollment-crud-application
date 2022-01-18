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
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { UserContext } from "../App";

function Home() {
  const history = useNavigate();
  const [userData, setUserData] = useContext(UserContext);
  const [myProfileData, setMyProfileData] = useState({});
  const [isAdmin, setIsAdmin] = useState(null);
  let token = localStorage.getItem("token");
  let username = "";
  if (localStorage.getItem("user")) {
    let user = JSON.parse(localStorage.getItem("user"));
    username = user.name;
  }

  useEffect(() => {
    const getMyProfile = async () => {
      try {
        let response = await axios.get(
          "http://localhost:9999/api/users/myProfile",
          {
            headers: {
              "x-access-token": token,
            },
          }
        );
        setMyProfileData(response.data);
        setUserData(response.data.user);
        setIsAdmin(response.data.user.isAdmin);
      } catch (error) {
        if (error.response) {
          /*
           * The request was made and the server responded with a
           * status code that falls out of the range of 2xx
           */
          // console.log(error.response.data);
          // console.log(error.response.status);
          // console.log(error.response.headers);
          if (error.response.status == 400) {
            //console.log(error.response.data);
            toast.error(error.response.data.message);
          }
        } else if (error.request) {
          /*
           * The request was made but no response was received, `error.request`
           * is an instance of XMLHttpRequest in the browser and an instance
           * of http.ClientRequest in Node.js
           */
          //console.log(error.request);
          toast.error(error.request);
        } else {
          // Something happened in setting up the request and triggered an Error
          //console.log("Error", error.message);
        }
        //console.log(error);
      }
    };
    getMyProfile();
  }, []);

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
                className="card view-my-courses"
                style={{ width: "18rem", height: "15rem" }}
              >
                <div className="card-body view-my-courses-body">
                  <h5 className="card-title justify-content-center align-items-center">
                    View My Courses
                  </h5>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-xs-6 m-2 d-flex justify-content-center">
            <Link to="/enrollCourse">
              <div
                className="card enroll-course"
                style={{ width: "18rem", height: "15rem" }}
              >
                <div className="card-body enroll-course-body">
                  <h5 className="card-title justify-content-center align-items-center">
                    Enroll in a Course
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

export default Home;
