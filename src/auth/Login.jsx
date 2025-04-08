import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaEnvelope, FaKey, FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { Footer } from "../Components/Footer";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";



export const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    otp: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isOtpMode, setIsOtpMode] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);

  const fullName = "Mayank";



  // Handle input changes dynamically
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const navigate=useNavigate()

  const redirectToDashboard=(role)=>{
    if(role==="ROLE_ADMIN")
    {
      navigate("/admin")
    }
    else if(role=== "ROLE_USER")
    {
      navigate("/user")
    }
    else{
      toast.error("Invalid role.Contact Support")
    }
  }
   
  // Send OTP to email
  const handleSendOtp = async () => {
    try {
      console.log(formData.email)


      if (!formData.email) {
        toast.error("Please enter your email first!");
        return;
      }


      const response = await axios.post(`http://localhost:8082/sendLoginOTP?username=${formData.email}`, {},{
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        setIsOtpSent(true);
        toast.success("OTP is sent to your mail");
      } else {
        console.error("OTP Error:", error.response?.data || error.message);
        toast.error(error.response?.data );
      }
      
    } catch (error) {
      console.error("OTP Error:", error.response?.data || error.message);
      toast.error(error.response?.data)
    }
  };
  const handlePasswordLogin = async () => {
    try {
      if (!formData.username || !formData.password) {
        toast.error("Username and password are required!");
        return;
      }

      const encryptRes = await axios.post("http://localhost:8082/encryptPassword", null, {
        params: { password: formData.password },
      });

      const encryptedPassword = encryptRes.data;

      console.log("Encryption Response:", encryptRes.data);

      console.log("handlePasswordLogin called");
      // console.log("Sending Data:", formData);
      // console.log(formData)
      const response = await axios.post(
        "http://localhost:8082/signin",
        {
          userName: formData.username,
          password: encryptedPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data.token);
      const token = response.data.token
      if (!token) {
        toast.error("Invalid response from server");
        return;
      }

      try {
        const decodedToken = jwtDecode(token)

        console.log(decodedToken)
        const role = decodedToken?.role || decodedToken?.user?.role;
        console.log("Extracted Role:", role);
       
        localStorage.setItem("authToken", token)
        toast.success("Login Successful");
        setTimeout(() => {
          redirectToDashboard(role);
        }, 500); 
        
        // redirectToDashboard(role)
      } catch (error) {
        toast.error("Login Failed")
      }
    } catch (error) {
      const message =
        error?.response?.data|| "Invalid credentials or server error";
      toast.error(message); 
      console.error("Error Logging In:", error?.response?.data || error);
    }
  };

  // Verify OTP and login
  const handleOtpLogin = async () => {
    try {
      if (!formData.email || !formData.otp) {
        toast.error("Email and OTP are required!");
        return;
      }

      const response = await axios.post("http://localhost:8082/loginWithOTP", {
        username: formData.email,
        inputOTP: formData.otp,
      },
        {
          headers: {
            "Content-Type": "application/json",
          },
        });

      console.log(response.data.token);
      const token = response.data.token
      
      if (!token) {
        toast.error("Invalid response from server");
        return;
      }

      try {
        const decodedToken = jwtDecode(token)
        const role=decodedToken?.role
        console.log(decodedToken)
        localStorage.setItem("authToken", token)
        toast.success("Login Successful");
        setTimeout(() => {
          redirectToDashboard(role);
        }, 500); 
      } catch (error) {
        toast.error("Login Failed" + error)
      }
    } catch (error) {
      const message=error?.response?.data || "Error Verifying OTP"
      toast.error(message)
      console.error("OTP Login Error:", error?.response?.data || error)
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    isOtpMode ? handleOtpLogin() : handlePasswordLogin()
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
       <ToastContainer position="top-center" autoClose={3000} />
      {/* Navbar */}
      <div className="h-20 w-full bg-purple-950 flex items-center px-4 justify-between shadow-md">
        <Link to="/">
          <img
            src="https://cdaccybergyan.uat.dcservices.in/images/cdac-logo.png"
            alt="cdac"
            className="h-14"
          />
        </Link>
        <Link
          to="/"
          className="text-white font-semibold font-[Poppin] text-4xl px-4 py-2 rounded hover:text-purple-700 transition-all duration-300"
        >
          Home
        </Link>
      </div>

      {/* Login Section */}
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl flex">
          {/* Left Section - Welcome Message */}
          <div className="w-1/2 bg-purple-700 text-white flex flex-col items-center justify-center p-8">
            <img
              src="https://i0.wp.com/opportunitycell.com/wp-content/uploads/2023/08/Centre-For-Development-Of-Advanced-Computing-CDAC-logo.png?fit=1000%2C1000&ssl="
              alt="CDAC Logo"
              className="h-50 w-50 mb-4"
            />
            <h2 className="text-4xl font-extrabold text-center">
              Welcome, <span className="text-purple-300">User</span>
            </h2>
            <p className="text-lg text-center mt-4">
              Step into your training journey with <strong>CDAC Noida</strong>.
              Log in to access your courses and continue your learning.
            </p>
          </div>

          {/* Right Section - Login Form */}
          <div className="w-1/2 p-6">
            <h2 className="text-2xl font-bold text-purple-700 text-center mb-4">Login</h2>
            <form
              onSubmit={handleSubmit}
              className="space-y-4">
              {!isOtpMode ? (
                <>
                  {/* Username */}
                  <div className="flex items-center border rounded p-2 bg-purple-50">
                    <FaUser className="text-gray-600 mr-2" />
                    <div className="w-full">
                      <label className="block text-gray-800 font-semibold">Username</label>
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full outline-none bg-transparent"
                        placeholder="Enter your username"
                        autoComplete="username"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="flex items-center border rounded p-2 bg-purple-50 relative">
                    <FaLock className="text-gray-600 mr-2" />
                    <div className="w-full">
                      <label className="block text-gray-800 font-semibold">Password</label>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full outline-none bg-transparent"
                        placeholder="Enter your password"
                        autoComplete="current-password"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 text-gray-600"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>

                  {/* Login Button */}
                  <button
                    type="submit"

                    className="w-full bg-purple-700 text-white font-semibold text-lg p-2 rounded cursor-pointer hover:bg-purple-800"
                  >
                    Login with Password
                  </button>
                </>
              ) : (
                <>
                  {/* Email Field */}
                  <div className="flex items-center border rounded p-2 bg-purple-50">
                    <FaEnvelope className="text-gray-600 mr-2" />
                    <div className="w-full">
                      <label className="block text-gray-800 font-semibold">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="email"
                        className="w-full outline-none bg-transparent"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  {/* Verify Email / Send OTP Button */}
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className="w-30 h-10 bg-purple-700 text-white font-semibold text-md p-2 rounded cursor-pointer hover:bg-purple-800"
                  >
                    {isOtpSent ? "Resend OTP" : "Verify Email"}
                  </button>

                  {/* OTP Input */}
                  <div className="flex items-center border rounded p-2 bg-purple-50">
                    <FaKey className="text-gray-600 mr-2" />
                    <div className="w-full">
                      <label className="block text-gray-800 font-semibold">OTP</label>
                      <input
                        type="text"
                        name="otp"
                        value={formData.otp}
                        onChange={handleChange}
                        className="w-full outline-none bg-transparent font-lex"
                        placeholder="Enter OTP"
                        autoComplete="one-time-code"
                      
                      />
                    </div>
                  </div>

                  {/* Login with OTP Button */}
                  <button
                    type="button"
                    onClick={handleOtpLogin}
                    className="w-full bg-purple-700 text-white  text-lg p-2 rounded cursor-pointer hover:bg-purple-800"
                  >
                    Login with OTP
                  </button>
                </>
              )}

              {/* Toggle Login Method */}
              <button
                type="button"
                onClick={() => setIsOtpMode(!isOtpMode)}
                className="w-full text-purple-700 cursor-pointer font-semibold mt-2"
              >
                {isOtpMode ? "Login with Password" : "Login with OTP"}
              </button>

              {/* Register Redirect */}
              <p className="text-center text-gray-600">
                Don't have an account?{" "}
                <Link to="/signup" className="text-purple-700 font-semibold hover:underline">
                  Register
                </Link>
              </p>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
