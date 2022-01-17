import React, { useState, useEffect, useContext } from "react";
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
  const [courses, setCourses] = useState([]);
  let username = "";
  if (userData) {
    username = userData.user.name;
  }
  let token = localStorage.getItem("token");
  useEffect(() => {
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
                <tr key={course.courses[0]["_id"]}>
                  <td>{index}</td>
                  <td>{course.courses[0]["name"]}</td>
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
