import React, { useState,useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import { useAuth } from '../../utils/authProvider';
import { BookOpen, Loader2  } from 'lucide-react';
import { handleApiError } from '../../utils/ErrorHandler';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('student');
  const [name, setName] = useState('');
  const [errors, setErrors] = useState({}); // store errors per field
  const [captchaSVG, setCaptchaSVG] = useState("");
    const [captchaInput, setCaptchaInput] = useState("");
    const [captchaId, setCaptchaId] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState("");
    const [timer, setTimer] = useState(300); // 5 minutes = 300 seconds
    const [timerActive, setTimerActive] = useState(false);
    const [loading, setLoading] = useState(false);


     const fetchCaptcha = async () => {
    try {
      const res = await api.get("/captcha");
      setCaptchaSVG(res.data.svg);
      setCaptchaId(res.data.captchaId);
    } catch (error) {
      handleApiError(error);
    }
  };

  useEffect(() => {
    fetchCaptcha();
  }, []);

  const handleCaptchaVerification = async () => {
    if (!captchaInput) return;
    if(!email) {
        return;
    }

    setLoading(true);
    try {
      await api.post("/captcha/verify", {
        captchaId,
        input: captchaInput,
      });

      await api.post("/otp", { email });
      toast.success("OTP sent successfully to Your email");
      setLoading(false);
      setTimeout(() => {
        setOtpSent(true);
        setTimerActive(true);
        setTimer(300); // Reset timer
      }, 800);
    } catch (err) {
      handleApiError(err, "Captcha invalid or expired");
     setLoading(false);
      fetchCaptcha();
    }
  };

  const navigate = useNavigate();
  const { setIsAuthenticated, setIsLoggingOut,setUserRole } = useAuth();

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isStrongPassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!email) newErrors.email = 'Email is required.';
    else if (!isValidEmail(email)) newErrors.email = 'Please enter a valid email address.';

    if (!password) newErrors.password = 'Password is required.';
    else if (!isStrongPassword(password))
      newErrors.password =
        'Password must be at least 8 characters, with uppercase, lowercase, number, and special char.';

    if (!confirmPassword) newErrors.confirmPassword = 'Please confirm your password.';
    else if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match.';

    if (!name) newErrors.name = 'Name is required.';

    if (!role) newErrors.role = 'Role is required.';

    if(!otp) newErrors.otp = 'OTP is required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return; // stop submission if errors

    try {
      if (role === 'teacher') {
        await api.post(`/teacher/signup`, { email, password, name, otp });
        setIsAuthenticated(true);
        setIsLoggingOut(false);
        setUserRole('teacher');
        toast.success('Registered successfully! Redirecting...', { position: 'top-right', autoClose: 1000 });
        setTimeout(() => navigate('/teacher/dashboard'), 1000);
      } else if (role === 'student') {
        await api.post(`/student/signup`, { email, password, name, otp });
        setIsAuthenticated(true);
        setIsLoggingOut(false);
        setUserRole('student');
        toast.success('Registered successfully! Redirecting...', { position: 'top-right', autoClose: 1000 });
        setTimeout(() => navigate('/student/dashboard'), 1000);
      }
    } catch (err) {
      handleApiError(err,'Signup failed' )
     
    }
  };

  // Helper to clear error for a specific field on change
  const handleChange = (field, setter) => (e) => {
    setter(e.target.value);
    if (errors[field]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  useEffect(() => {
    let interval;
  
    if (timerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
  
    if (timer === 0 && timerActive) {
      setOtpSent(false);
      setOtp("");
      alert("OTP expired! Please request again.");
      setTimerActive(false);
    }
  
    return () => clearInterval(interval);
  }, [timer, timerActive]);

  return (
    <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 min-h-screen flex flex-col items-center">
  {/* Header */}
  <header className="w-full flex justify-between items-center px-6 py-4 bg-white/60 shadow-sm backdrop-blur-md">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
        <BookOpen className="w-6 h-6 text-white" />
      </div>
      <h1
        className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent cursor-pointer"
        onClick={() => navigate("/")}
      >
        EduVerse
      </h1>
    </div>
  </header>

  {/* Sign Up Card */}
  <div className="bg-white p-8 rounded-2xl shadow-xl w-[90%] max-w-md mt-8 transition-all duration-300">
    <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create Your Account</h2>
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      
      {/* Name */}
      <div>
        <label htmlFor="name" className="text-sm font-medium text-gray-700">Name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={handleChange('name', setName)}
          placeholder="Enter your full name"
          className={`w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
            errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
          }`}
        />
        {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={handleChange('email', setEmail)}
          placeholder="Enter your email"
          className={`w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
            errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
          }`}
        />
        {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
      </div>
      {!otpSent && (
            <>
              {/* CAPTCHA Display */}
              <div className="flex flex-col items-center">
                <div
                  className="my-2"
                  dangerouslySetInnerHTML={{ __html: captchaSVG }}
                />
                <button
                  type="button"
                  onClick={fetchCaptcha}
                  className="text-xs text-blue-500 hover:underline mb-2"
                >
                  Reload CAPTCHA
                </button>
              </div>
              <input
                type="text"
                placeholder="Enter CAPTCHA"
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
                className="form-input"
              />

              <button
                onClick={handleCaptchaVerification}
                disabled={!email || !captchaInput || loading}
                className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:opacity-90 transition disabled:opacity-60"
              >
                {loading ? (
                  <Loader2 className="animate-spin h-4 w-4 mx-auto" />
                ) : (
                  "Verify Captcha & Send OTP"
                )}
              </button>
            </>
          )}


      {otpSent && <>
           {/* Password */}
      <div>
        <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={handleChange('password', setPassword)}
          placeholder="Enter your password"
          className={`w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
            errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
          }`}
        />
        {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
      </div>

      {/* Confirm Password */}
      <div>
        <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={handleChange('confirmPassword', setConfirmPassword)}
          placeholder="Confirm your password"
          className={`w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
            errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
          }`}
        />
        {errors.confirmPassword && <p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>}
      </div>

      {/* Role */}
      <div>
        <label htmlFor="role" className="text-sm font-medium text-gray-700">Role</label>
        <select
          id="role"
          value={role}
          onChange={handleChange('role', setRole)}
          className={`w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
            errors.role ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
          }`}
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>
        {errors.role && <p className="text-red-600 text-sm mt-1">{errors.role}</p>}
      </div>


      <div>
                <label
                  htmlFor="otp"
                  className="block text-sm font-medium text-gray-600"
                >
                  Enter OTP
                </label>
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="6-digit OTP"
                  className="form-input"
                />
              </div>
              <p className="text-sm text-gray-500 text-center">
                Time left: {Math.floor(timer / 60)}:
                {(timer % 60).toString().padStart(2, "0")}
              </p>

      {/* Submit */}
      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
      >
        Sign Up
      </button>
      </>}
      
    </form>

    <p className="mt-5 text-center text-sm text-gray-500">
      Already have an account?{" "}
      <a href="/login" className="text-blue-500 hover:underline">
        Login
      </a>
    </p>
  </div>
</div>

  );
};

export default SignUp;
