import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

import { CourseProvider } from "./components/Teacher/course/courseContext";
import { AuthProvider } from "./utils/authProvider";
import { ProtectedRoute } from "./utils/ProtectedRoute";



import Home from "./pages/user/Home";
import Course from "./pages/user/Course";
import About from "./pages/user/About";
import Contact from "./pages/user/Contact";
import Login from "./pages/user/login";
import Signup from "./pages/user/signup";
import TeacherDashboard from "./pages/teacher/teacherDashboard";
import CourseDetails from "./pages/teacher/courseDetails";
import StudentDashboard from "./pages/student/studentDashboard";
import CourseDetail from "./pages/CourseDetails";
import PaymentPage from "./pages/payment";
import PageNotFound from "./pages/PageNotFound";
import PasswordReset from "./pages/user/PasswordReset";
import EnrolledCourse from "./pages/student/EnrolledCourse";




function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/courses" element={<Course />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/coursedetails" element={
            <ProtectedRoute>
            <CourseDetail />
            </ProtectedRoute>
            } />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/passwordReset" element={<PasswordReset/>}/>

          <Route path='/enrolledCourse' element={
            <ProtectedRoute>
            <EnrolledCourse/>
            </ProtectedRoute>
            }/>

          <Route
            path="/teacher/*"
            element={
              <ProtectedRoute>
                <CourseProvider>
                  <TeacherLayout />
                </CourseProvider>
              </ProtectedRoute>
            }
          />

          <Route
            path="/student/dashboard"
            element={
              <ProtectedRoute>
                <StudentDashboard />
              </ProtectedRoute>
            }
          ></Route>

          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>

        <ToastContainer position="top-right" autoClose={300} pauseOnHover />
      </Router>

    </AuthProvider>
  );
}

export default App;

const TeacherLayout = () => (
  <Routes>
    <Route path="dashboard" element={
      <ProtectedRoute>
      <TeacherDashboard />
      </ProtectedRoute>} />
    <Route path="courseDetails" element={
      <ProtectedRoute>
      <CourseDetails />
      </ProtectedRoute>} />
  </Routes>
);
