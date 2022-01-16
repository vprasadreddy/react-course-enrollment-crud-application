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

function Home() {
  return (
    <div>
      <React.Fragment>
        <div className="container-fluid h-100">
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
    </div>
  );
}

export default Home;
