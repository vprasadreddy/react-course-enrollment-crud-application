import React, { useState, useEffect, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
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
import { Table } from "react-bootstrap";

function ViewMyCourses() {
  const [userData, setUserData] = useContext(UserContext);
  const [myProfileData, setMyProfileData] = useState({});
  const [isAdmin, setIsAdmin] = useState(null);
  let token = localStorage.getItem("token");
  const [courses, setCourses] = useState([]);
  let username = useEffect(() => {
    const getCourses = async () => {
      let response = await axios.get(
        "http://localhost:9999/api/enrollments/viewMyEnrollments",
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
      setCourses(response.data);
      console.log(response.data);
    };
    getCourses();
  }, []);

  useEffect(() => {
    const getCourses = async () => {
      let response = await axios.get("http://localhost:9999/api/courses");
      setCourses(response.data);
      console.log(response.data);
    };
    getCourses();
  }, []);

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
        setUserData(response.data.user);
        setMyProfileData(response.data);
        setIsAdmin(response.data.user.isAdmin);
        //console.log(userData);
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
      <h5 className="d-flex justify-content-center mt-5">My Courses</h5>
      <div className="d-flex justify-content-center">
        <Table striped bordered hover className="courses-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Course Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => {
              return (
                <tr key={course._id}>
                  <td>{index}</td>
                  <td>{course.courseid.name}</td>
                  <td>Delete</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      <span className="d-flex justify-content-center mt-2 font-italic">
        Interested in enrolling in a new course? Click&nbsp;
        <Link to="/enrollCourse">here</Link>&nbsp;to enroll.
      </span>
    </React.Fragment>
  );
}

export default ViewMyCourses;
