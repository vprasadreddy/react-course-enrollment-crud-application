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
import ScrollToTop from "./components/ScrollToTop";
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

export const UserContext = createContext();

function App() {
  const [userData, setUserData] = useState(null);
  return (
    <div className="App">
      <UserContext.Provider value={[userData, setUserData]}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/viewMyCourses" element={<ViewMyCourses />} />
            <Route path="/enrollCourse" element={<EnrollCourse />} />
            <Route path="/adminDashboard" element={<AdminDashboard />} />
            <Route path="/logout" element={<Logout />} />
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
      <ScrollToTop />
    </div>
  );
}

export default App;
