import React, { useEffect, useState } from "react";
import { BookOpen, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { handleApiError } from "../../utils/ErrorHandler";
import { toast } from "react-toastify";

const PasswordReset = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [captchaSVG, setCaptchaSVG] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaId, setCaptchaId] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [role, setRole] = useState("student");
  const [timer, setTimer] = useState(300); // 5 minutes = 300 seconds
  const [timerActive, setTimerActive] = useState(false);

  const isStrongPassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password
    );

  const fetchCaptcha = async () => {
    try {
      const res = await api.get("/captcha");
      setCaptchaSVG(res.data.svg);
      setCaptchaId(res.data.captchaId);
      setError("");
    } catch (error) {
      handleApiError(error);
    }
  };

  useEffect(() => {
    fetchCaptcha();
  }, []);

  const handleCaptchaVerification = async () => {
    if (!captchaInput) return;

    setLoading(true);
    try {
      await api.post("/captcha/verify", {
        captchaId,
        input: captchaInput,
      });

      await api.post("/otp", { email });
      toast.success("OTP sent successfully to Your email");

      setTimeout(() => {
        setOtpSent(true);
        setLoading(false);
        setTimerActive(true);
        setTimer(300); // Reset timer
      }, 800);
    } catch (err) {
      handleApiError(err, "Captcha invalid or expired");

      fetchCaptcha();
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!isStrongPassword(newPassword)) {
      setError(
        "Password must be at least 8 characters, with uppercase, lowercase, number, and special char."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Password Not Match");
      return;
    }

    if (!otp) {
      setError("Enter OTP");
      return;
    }
    try {
      if (role === "student") {
        await api.post("/student/reset-password", { email, newPassword, otp });
        toast.success("Password Reset Successfully as Student");
      } else {
        await api.post("/teacher/reset-password", { email, newPassword, otp });
        toast.success("Password Reset Successfully as Teacher");
      }
      setTimeout(() => navigate("/login"), 800);
    } catch (error) {
      fetchCaptcha();
      setOtpSent(false);
      handleApiError(error);
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
    <div className="bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 min-h-screen flex flex-col items-center">
      <header className="w-full flex justify-between items-center px-6 py-4 bg-white/50 shadow-md backdrop-blur-md">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <h1
            className="text-2xl font-extrabold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent hover:cursor-pointer"
            onClick={() => navigate("/")}
          >
            EduVerse
          </h1>
        </div>
      </header>

      <div className="bg-white mt-10 p-8 rounded-2xl shadow-xl w-[90%] max-w-md transition-all duration-300">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Reset Password
        </h2>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              disabled={otpSent}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              placeholder="name@example.com"
              className="form-input"
            />
          </div>

          <div>
            <label htmlFor="role" className="text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="form-input "
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
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

          {otpSent && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="form-input"
                />
                <span className="text-sm text-red-400 ">{error}</span>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  className="form-input"
                />
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

              <button
                onClick={handleResetPassword}
                className="w-full py-2 bg-green-600 text-white font-semibold rounded-md hover:opacity-90 transition"
              >
                Reset Password
              </button>

              
            </>
          )}
        </div>
          <p className="text-right">Doesn't have account <a href="/signup">Sign Up</a></p>
      </div>
    
    </div>
  );
};

export default PasswordReset;
