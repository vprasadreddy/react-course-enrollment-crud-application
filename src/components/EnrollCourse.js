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

function EnrollCourse() {
  const [userData, setUserData] = useContext(UserContext);
  let token = localStorage.getItem("token");
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    courseid: "",
  });

  let { courseid } = formData;

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(formData);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const getCourses = async () => {
      let response = await axios.get("http://localhost:9999/api/courses");
      setCourses(response.data);
      console.log(response.data);
    };
    getCourses();
  }, []);

  const onSubmit = async (data, e) => {
    //console.log(data, e);
    e.preventDefault();
    try {
      let response = await axios.post(
        "http://localhost:9999/api/enrollments/enrollCourse",
        formData,
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
    } catch (error) {
      if (error.response) {
        /*
         * The request was made and the server responded with a
         * status code that falls out of the range of 2xx
         */
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        /*
         * The request was made but no response was received, `error.request`
         * is an instance of XMLHttpRequest in the browser and an instance
         * of http.ClientRequest in Node.js
         */
        console.log(error.request);
      } else {
        // Something happened in setting up the request and triggered an Error
        console.log("Error", error.message);
      }
      console.log(error);
    }
  };

  const onError = (errors, e) => console.log(errors, e);
  return (
    <div>
      <React.Fragment>
        <div className="container-fluid h-100">
          <div className="row d-flex justify-content-center align-items-center h-100 mx-auto mt-5 enrollcourse-box">
            <h3 className="d-flex justify-content-center">Enroll a Course</h3>
            <form onSubmit={handleSubmit(onSubmit, onError)} autoComplete="off">
              <div className="row mb-3">
                <label htmlFor="courseid" className="col-sm-12 col-form-label">
                  Course
                </label>
                <div className="col-sm-12">
                  <select
                    class="custom-select"
                    id="courseid"
                    name="courseid"
                    {...register("courseid", { required: true })}
                    onChange={handleInputChange}
                  >
                    <option selected value="">
                      Select a Course
                    </option>
                    {courses.map((course, index) => {
                      return (
                        <option key={course._id} value={course._id}>
                          {course.name}
                        </option>
                      );
                    })}
                  </select>
                  {errors.course && (
                    <span className="form-text small text-danger">
                      Course is required
                    </span>
                  )}
                </div>
              </div>

              <input
                type="submit"
                name="submit"
                className="btn btn-warning text-white"
              />
            </form>
          </div>
        </div>
      </React.Fragment>
    </div>
  );
}

export default EnrollCourse;
