import React, { useState } from "react";
import { BookOpen, LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useLogout from "../../../utils/logout";
import { useAuth } from "../../../utils/authProvider";

const CourseHeader = ({ course }) => {
  const { role } = useAuth();

  const navigate = useNavigate();
  const logout = useLogout();
  const NavigationHandle = () => {
    if (role === "teacher") navigate("/teacher/dashboard");
    else if (role === "student") navigate("/student/dashboard");
    else navigate("/login");
  };

  return (
    <header className="sticky top-0 flex justify-between gap-2 px-6 py-4 bg-white/80 shadow-xl backdrop-blur-md">
      <div className="flex ">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
          <BookOpen className="w-6 h-6 text-white" />
        </div>
        <h1
          className="text-2xl font-bold text-indigo-600 hover:cursor-pointer"
          onClick={() => navigate("/")}
        >
          <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            EduVerse
          </span>
        </h1>
      </div>
      <div className="flex">
        <button
          onClick={() => NavigationHandle()}
          className="flex border-1 p-1 rounded-sm border-purple-300  bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:bg-purple-50"
        >
          <User className="h-4 w-4 mr-2 mt-1.5" />
          Dashboard
        </button>
        <LogOut
          className="text-red-600 mr-4 ml-3 text-sm hover:scale-105"
          onClick={logout}
        />
      </div>
    </header>
  );
};

export default CourseHeader;
