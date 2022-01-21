import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect, createContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import ViewMyCourses from "./components/ViewMyCourses";
import EnrollCourse from "./components/EnrollCourse";
import AdminDashboard from "./components/AdminDashboard";
import Logout from "./components/Logout";
import PageNotFound from "./components/PageNotFound";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

axios.defaults.baseURL = "https://react-course-enrollment-crud.herokuapp.com";
export const UserContext = createContext();

function App() {
  const [userData, setUserData] = useState(null);
  return (
    <div className="App">
      <UserContext.Provider value={[userData, setUserData]}>
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/viewMyCourses" element={<ViewMyCourses />} />
            <Route exact path="/enrollCourse" element={<EnrollCourse />} />
            <Route exact path="/adminDashboard" element={<AdminDashboard />} />
            <Route exact path="/logout" element={<Logout />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </UserContext.Provider>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
