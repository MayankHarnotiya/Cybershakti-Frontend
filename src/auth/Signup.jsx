import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaUser, FaEnvelope, FaLock, FaMobileAlt, FaEye, FaEyeSlash, FaBriefcase, FaFileAlt } from "react-icons/fa";
import { VscOrganization } from "react-icons/vsc";
import { Footer } from "../Components/Footer";
import { IoDocumentText } from "react-icons/io5";
import { TbHomeFilled } from "react-icons/tb";

export const Signup = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    mobile: "",
    state:"",
    organization: "",
    designation: "",
    document: null,
  });


  const statesList = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan",
    "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
    "Uttarakhand", "West Bengal","Delhi"
  ];

  const organizationsList = [
    "Google", "Microsoft", "Amazon", "CDAC", "IBM", "Infosys",
    "TCS", "Wipro", "Capgemini", "Tech Mahindra"
  ];



  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
 
  const [stateInput,setStateInput]=useState("")
  const[filteredStates,setFilteredStates]=useState([])
  const[showStateDropdown,setShowStateDropDown]=useState(false)

  const [filteredOrgs, setFilteredOrgs] = useState([]);
  const [orgInput, setOrgInput] = useState("");
  const [showOrgDropdown, setShowOrgDropdown] = useState(false);

  // useEffect(() => {
  //   axios.get("")
  //     .then(response => setFilteredOrgs(response.data))
  //     .catch(error => console.error("Error fetching organizations:", error));
  // }, []);

    // Close dropdowns when clicking outside

    const handleStateChange = (e) => {
      const value = e.target.value;
      setStateInput(value);
      // Filter the states list based on the input, making it case-insensitive
      const filtered = value
        ? statesList.filter((state) =>
            state.toLowerCase().includes(value.toLowerCase().trim())
          )
        : [];
      setFilteredStates(filtered);
      setShowStateDropDown(value !== "");
    };
    


  const handleSelectState=(state)=>{
    setStateInput(state)
    setFormData(prev=>({...prev,state}))
    setShowStateDropDown(false)
  }

  const handleOrgChange=(e)=>{
    const value=e.target.value
    setOrgInput(value)
    setFilteredOrgs(value ? organizationsList.filter(org=>org.toLowerCase().includes(value.toLowerCase())) : [])
    setShowOrgDropdown(value !== "")
  }

  const handleSelectOrg=(org)=>{
    setOrgInput(org)
    setFormData(prev=>({...prev,organization:org}))
    setShowOrgDropdown(false)
  }
 
  const validate = (name, value) => {
    switch (name) {
      case "fullname":
        if (!value) return "Name is required";
        if (value.length < 3 || value.length > 40) return "Name must be 3-40 characters";
        if (!/^[A-Za-z]+([ '-][A-Za-z]+)*$/.test(value)) return "Invalid name format";
        break;
      case "username":
        if (!value) return "Username is required";
        if (value.length < 6 || value.length > 40) return "Username must be 6-40 characters";
        if (!/^[a-zA-Z]([a-zA-Z0-9._-]*[a-zA-Z0-9])?$/.test(value)) return "Invalid username format";
        break;
      case "email":
        if (!value) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Invalid email format";
        break;
      case "password":
        if (!value) return "Password is required";
        if (value.length < 8 || value.length > 40) return "Password must be 8-40 characters";
        break;
      case "mobile":
        if (value && !/^\d{10}$/.test(value)) return "Must be 10 digits";
        break;
      case "state":
        if (!value) return "State is required";
        if (!/^[A-Za-z ]{2,50}$/.test(value)) return "Invalid state format";
        break;
      default:
        return "";
    }
    return "";
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validate(name, value) }));
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;
    Object.entries(formData).forEach(([name, value]) => {
      const error = validate(name, value);
      if (error) {
        newErrors[name] = error;
        isValid = false;
      }
    });
    if (!formData.document) {
      newErrors.document = "Document is required";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedType = "application/pdf";
      const maxSize = 2 * 1024 * 1024;
      if (file.type !== "application/pdf") {
        setErrors((prev) => ({ ...prev, document: "Invalid file type" }));
        return;
      }
      if (file.size > maxSize) {
        setErrors((prev) => ({ ...prev, document: "File size must be <2MB" }));
        return;
      }
      setErrors((prev) => ({ ...prev, document: "" }));
      setFormData((prev) => ({ ...prev, document: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {

      const encryptRes = await axios.post("http://localhost:8082/encryptPassword", null, {
        params: { password: formData.password },
      });

      const encryptedPassword = encryptRes.data;


      const formDataToSend = new FormData();
      const signupRequest = {
        fullName: formData.fullname,
        userName: formData.username,
        password: encryptedPassword,
        email: formData.email,
        mobileNumber: formData.mobile,
        designation: formData.designation,
        organisation: orgInput,
        state: stateInput,

      };

      formDataToSend.append("signupRequest", new Blob([JSON.stringify(signupRequest)], { type: "application/json" }));
      formDataToSend.append("id", formData.document);
      console.log(signupRequest, formDataToSend.signupRequest, formDataToSend.id, formData.document)
      const response = await axios.post("http://localhost:8082/signup", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Registration successful:", response.data);
      alert("User registered successfully!");
    } catch (error) {
      console.error("Error registering user:", error.response?.data || error.message);
      alert("Registration failed! " + (error.response?.data || error.message));
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="h-20 w-full bg-blue-100 flex items-center px-4 justify-between shadow-md">
        <Link to="/">
          <img src="https://cdaccybergyan.uat.dcservices.in/images/cdac-logo.png" alt="cdac" className="h-14" />
        </Link>
        <Link to="/" className="text-blue-800 hover:text-blue-900 font-[Poppin] text-3xl px-4 py-2 rounded transition-all duration-300">Home</Link>
      </div>

      <main className="flex-grow flex items-center justify-center p-6">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl flex">
          <div className="w-1/2 bg-blue-700 text-white flex flex-col items-center justify-center p-8">
            <img src="https://i0.wp.com/opportunitycell.com/wp-content/uploads/2023/08/Centre-For-Development-Of-Advanced-Computing-CDAC-logo.png?fit=1000%2C1000&ssl=" alt="CDAC Logo" className="h-60 mb-4 w-60 mt-[-90px]" />
            <h2 className="text-4xl font-extrabold text-center">CyberSecurity</h2>
            <p className="text-lg text-center mt-4">Join our <strong>Virtual Training Program</strong> conducted by <strong>CDAC Noida</strong>. Enhance your skills with expert training!</p>
          </div>

          <div className="w-1/2 p-6">
            <h2 className="text-2xl font-bold text-blue-700 text-center mb-4">Register</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>

              {/* Full Name Field */}
              <div className="flex items-center border rounded p-2 bg-blue-50">
                <FaUser className="text-gray-600 mr-2" />
                <div className="w-full">
                  <label className="block text-gray-800 font-semibold">Full Name</label>
                  <input
                    type="text"
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleChange}
                    className="w-full outline-none bg-transparent"
                    placeholder="Enter your full name"
                    autoComplete="name"
                  />
                </div>
              </div>
              {errors.fullname && <p className="text-red-600 text-sm mt-1">{errors.fullname}</p>}

              {/* Email Field */}
              <div className="flex items-center border rounded p-2 bg-blue-50">
                <FaEnvelope className="text-gray-600 mr-2" />
                <div className="w-full">
                  <label className="block text-gray-800 font-semibold">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full outline-none bg-transparent"
                    placeholder="Enter your email"
                    autoComplete="username"
                  />
                </div>
              </div>
              {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}

              {/* Mobile Field */}
              <div className="flex items-center border rounded p-2 bg-blue-50">
                <FaMobileAlt className="text-gray-600 mr-2" />
                <div className="w-full">
                  <label className="block text-gray-800 font-semibold">Mobile</label>
                  <input
                    type="text"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="w-full outline-none bg-transparent"
                    placeholder="Enter your mobile number"
                    autoComplete="tel"
                  />
                </div>
              </div>
              {errors.mobile && <p className="text-red-600 text-sm mt-1">{errors.mobile}</p>}

              {/* State Field */}
              <div className="relative w-full">
              <div className="flex items-center border rounded p-2 bg-blue-50">
                <TbHomeFilled className="text-gray-800 mr-2 size-5" />
                <div className="w-full">
                  <label className="block text-gray-800 font-semibold">State</label>
                  <input
                    type="text"
                    name="designation"
                    value={stateInput}
                    onChange={handleStateChange}
                    className="w-full outline-none bg-transparent"
                    placeholder="Enter your state"
                  />
                </div>
                </div>

                  {/* State Dropdown */}
                  {showStateDropdown && (
                  <ul className="absolute w-full border bg-white shadow-md rounded mt-1 max-h-40 overflow-y-auto z-50">
                    {filteredStates.map((state, index) => (
                      <li
                        key={index}
                        className="p-2 hover:bg-gray-200 cursor-pointer"
                        onClick={() => handleSelectState(state)}
                      >
                        {state}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {errors.state && <p className="text-red-600 text-sm mt-1">{errors.state}</p>}

              {/* Organization Field */}
              <div className="relative w-full">
                <div className="flex items-center border rounded p-2 bg-blue-50">
                  <VscOrganization className="text-gray-800 mr-1 size-5" />
                  <div className="w-full">
                    <label className="block text-gray-800 font-semibold">Organization</label>
                    <input
                      type="text"
                      name="organization"
                      value={orgInput}
                      onChange={handleOrgChange}
                      className="w-full outline-none bg-transparent"
                      placeholder="Enter organization name"
                      autoComplete="organization"
                    />
                  </div>
                </div>
                {/* Dropdown List */}
                {showOrgDropdown && (
                  <ul className="absolute w-full border bg-white shadow-md rounded mt-1 max-h-40 overflow-y-auto z-50">
                    {filteredOrgs.length > 0 ? (
                      filteredOrgs.map((org, index) => (
                        <li
                          key={index}
                          className="p-2 hover:bg-gray-200 cursor-pointer"
                          onClick={() => handleSelectOrg(org)}
                        >
                          {org}
                        </li>
                      ))
                    ) : null}
                  </ul>
                )}
              </div>

              {errors.organization && <p className="text-red-600 text-sm mt-1">{errors.organization}</p>}

              {/* Designation Field */}
              <div className="flex items-center border rounded p-2 bg-blue-50">
                <FaBriefcase className="text-gray-800 mr-2 size-5" />
                <div className="w-full">
                  <label className="block text-gray-800 font-semibold">Designation</label>
                  <input
                    type="text"
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    className="w-full outline-none bg-transparent"
                    placeholder="Enter your designation"
                    autoComplete="off"
                  />
                </div>
              </div>
              {errors.designation && <p className="text-red-600 text-sm mt-1">{errors.designation}</p>}

              {/* Document Upload Section */}
              <div className="flex items-center border rounded p-3 bg-blue-50 relative w-full">
                {/* Left Section: Icon & Label */}
                <div className="flex items-center gap-2">
                  <IoDocumentText className="text-gray-800 size-6" />
                  <label className="text-gray-800 font-semibold mb-4">Document</label>
                </div>

                {/* Center Section: File Preview (Only when a file is selected) */}
                <div className="flex-1 text-center">
                  {formData.document && (
                    <div className="flex items-center justify-center gap-2 text-gray-700">
                      <FaFileAlt className="text-blue-600" />
                      <p className="text-sm">{formData.document.name}</p>
                    </div>
                  )}
                </div>

                {/* Hidden File Input */}
                <input
                  type="file"
                  id="fileInput"
                  name="document"
                  accept=".pdf,.doc,.docx,.jpg,.png"
                  className="hidden"
                  onChange={handleFileChange}
                />

                {/* Right Section: Choose File Button (Always at Right) */}
                <label
                  htmlFor="fileInput"
                  className="cursor-pointer bg-gray-200 px-3 py-2 text-md rounded-md hover:bg-gray-300 transition flex items-center gap-2 ml-auto"
                >
                  <FaFileAlt className="text-gray-600" />
                  Choose File
                </label>
              </div>
              {/* Error Message */}
              {errors.document && <p className="text-red-600 text-sm mt-1">{errors.document}</p>}

              {/* Username Field */}
              <div className="flex items-center border rounded p-2 bg-blue-50">
                <FaUser className="text-gray-600 mr-2" />
                <div className="w-full">
                  <label className="block text-gray-800 font-semibold">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full outline-none bg-transparent"
                    placeholder="Choose a username"
                    autoComplete="username"
                  />
                </div>
              </div>
              {errors.username && <p className="text-red-600 text-sm mt-1">{errors.username}</p>}

              {/* Password Field */}
              <div className="flex items-center border rounded p-2 bg-blue-50 relative">
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
                    autoComplete="new-password"
                  />
                </div>
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 text-gray-600">
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}

              {/* Submit Button */}
              <button type="submit" className="w-full bg-blue-700 text-white font-semibold text-lg p-2 rounded cursor-pointer hover:bg-blue-800">
                Register
              </button>

              {/* Login Link */}
              <div className="text-center mt-4">
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <Link to="/login" className="text-blue-700 font-semibold hover:underline">
                    Login here
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
};