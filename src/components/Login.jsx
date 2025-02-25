import React, { useState } from "react";
import authService from "../services/auth.service";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = ({ setUser }) => {
  const navigate = useNavigate();
  const [islogin, setIslogin] = useState(true);
  //login api
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ userName: "", password: "" });

  const handleLogin = async (e) => {
    e.preventDefault();

    let isValid = true;
    let newErrors = { userName: "", password: "" };

    if (!userName.trim()) {
      newErrors.userName = "Username is required!";
      isValid = false;
    } else if (userName.length < 3) {
      newErrors.userName = "Username must be at least 3 characters!";
      isValid = false;
    }

    if (!password.trim()) {
      newErrors.password = "Password is required!";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters!";
      isValid = false;
    }

    setErrors(newErrors);

    if (!isValid) return;

    //----------------API CALLING STRAT----------------------

    try {
      const credentials = { userName: userName, password: password };
      const response = await authService.login(credentials);
      setUser(response.data);

      toast.success("Login SuccessFully !");
      navigate("/post");

      setUserName("");
      setPassword("");
    } catch (error) {
      toast.error(error.message);
    }

    //----------------API CALLING END----------------------
    console.log("Logging in with:", { userName, password });
  };

  const [errorsdata, setErrorsData] = useState({});

  const [formData, setFormData] = useState({
    userName: "",
    fullName: "",
    age: "",
    phone: "",
    gender: "",
    mail: "",
    password: "",
  });

  const validate = () => {
    let newErrors = {};

    if (!formData.userName.trim()) {
      newErrors.userName = "Username is required!";
    } else if (formData.userName.length < 3) {
      newErrors.userName = "Username must be at least 3 characters!";
    }

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required!";
    }

    if (!formData.age.trim()) {
      newErrors.age = "Age is required!";
    } else if (isNaN(formData.age) || formData.age < 18) {
      newErrors.age = "You must be at least 18 years old!";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required!";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone number!";
    }

    if (!formData.gender) {
      newErrors.gender = "Gender selection is required!";
    }

    if (!formData.mail.trim()) {
      newErrors.mail = "Email is required!";
    } else if (!/\S+@\S+\.\S+/.test(formData.mail)) {
      newErrors.mail = "Invalid email format!";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required!";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters!";
    }

    setErrorsData(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await authService.register(formData);
      toast.success("Registration successful!");

      alert("Registration successful!");
      setFormData({
        userName: "",
        fullName: "",
        age: "",
        phone: "",
        gender: "",
        email: "",
        password: "",
      });
      setErrorsData({});
    } catch (error) {
      toast.error(error.message); // Show error as a toast
    }
  };

  return (
    <section className="min-h-screen flex flex-col md:flex-row pt-20">
      {/* Left Side - Image (Visible on Mobile & Desktop) */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100 p-6 md:p-10">
        <img
          src="/postimages/postit.png"
          alt="Login Banner"
          className="w-full max-w-lg h-auto md:h-full object-contain md:object-cover rounded-lg shadow-md"
        />
      </div>
      <div>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>

      {/* Right Side - Login Form */}

      {islogin ? (
        <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100 p-6">
          <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center text-gray-700">
              Login
            </h2>

            <form className="mt-6" onSubmit={handleLogin}>
              {/* Username Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  name="userName"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter username"
                  className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />

                {errors.userName && (
                  <p className="text-red-500 text-sm mt-1">{errors.userName}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              {/* Login Button */}
              <button
                className="w-full mt-6 p-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
                type="submit"
                onSubmit={handleRegister}
              >
                Login
              </button>
            </form>

            {/* Extra Links */}
            <p className="mt-4 text-sm text-center text-gray-600">
              Don't have an account?
              <a
                href="#"
                className="text-blue-500 hover:underline"
                onClick={(e) => {
                  e.preventDefault(); // Prevents page reload
                  setIslogin(!islogin);
                  setPassword("");
                  setUserName("");
                }}
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      ) : (
        <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100 p-6">
          <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center text-gray-700">
              Regsiter
            </h2>

            <form className="mt-6" onSubmit={handleRegister}>
              {/* Username Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="Enter username"
                  name="userName"
                  onChange={handleChange}
                  value={formData.userName}
                  className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
                {errorsdata.userName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errorsdata.userName}
                  </p>
                )}
              </div>

              {/*age */}

              <div className="mt-4">
                <label className="block text-sm font-medium text-grey-700">
                  Age
                </label>
                <input
                  type="number"
                  placeholder="Enter age"
                  name="age"
                  onChange={handleChange}
                  value={formData.age}
                  className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-one"
                />
                {errorsdata.age && (
                  <p className="text-red-500 text-sm mt-1">{errorsdata.age}</p>
                )}
              </div>

              {/*phone*/}

              <div className="mt-4">
                <label className="block text-sm font-medium text-grey-700">
                  Phone
                </label>
                <input
                  type="text"
                  placeholder="Enter phone"
                  name="phone"
                  onChange={handleChange}
                  value={formData.phone}
                  className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-one"
                />
                {errorsdata.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errorsdata.phone}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  FullName
                </label>
                <input
                  type="text"
                  placeholder="Enter fullName"
                  name="fullName"
                  onChange={handleChange}
                  value={formData.fullName}
                  className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />

                {errorsdata.fullName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errorsdata.fullName}
                  </p>
                )}
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Gender
                </label>
                <div className="flex space-x-4 mt-2">
                  {["male", "female", "other"].map((g) => (
                    <label key={g} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="gender"
                        value={g}
                        checked={formData.gender === g}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-500 border-gray-300 focus:ring-blue-400"
                      />
                      <span className="text-gray-700 capitalize">{g}</span>
                    </label>
                  ))}
                </div>

                {errorsdata.gender && (
                  <p className="text-red-500 text-sm mt-1">
                    {errorsdata.gender}
                  </p>
                )}
              </div>

              {/*Email*/}

              <div className="mt-4">
                <label className="block text-sm font-medium text-grey-700">
                  Email
                </label>
                <input
                  type="text"
                  placeholder="Enter email"
                  name="mail"
                  onChange={handleChange}
                  value={formData.mail}
                  className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-one"
                />
                {errorsdata.mail && (
                  <p className="text-red-500 text-sm mt-1">{errorsdata.mail}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter password"
                  name="password"
                  onChange={handleChange}
                  value={formData.password}
                  className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
                {errorsdata.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errorsdata.password}
                  </p>
                )}
              </div>

              {/* Login Button */}
              <button
                className="w-full mt-6 p-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
                type="submit"
              >
                Register
              </button>
            </form>

            {/* Extra Links */}
            <p className="mt-4 text-sm text-center text-gray-600">
              You have an account?
              <a
                href="#"
                className="text-blue-500 hover:underline"
                onClick={(e) => {
                  e.preventDefault(); // Prevents page reload
                  setIslogin(!islogin);
                  setPassword("");
                  setUserName("");
                }}
              >
                Sign In
              </a>
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Login;
