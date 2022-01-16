import logo from "./logo.svg";
import "./App.css";
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
import MyCourses from "./components/MyCourses";
import EnrollCourse from "./components/EnrollCourse";
import PageNotFound from "./components/PageNotFound";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/viewMyCourses" element={<MyCourses />} />
          <Route exact path="/enrollCourse" element={<EnrollCourse />} />
          <Route component={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
