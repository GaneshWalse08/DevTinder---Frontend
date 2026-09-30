import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/utils/constants";
import { toast, Toaster } from "sonner";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "@/utils/userSlice";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    age: "",
    gender: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    setError("");

    if (loading) return;

    try {
      setLoading(true);

      const signupData = {
        ...formData,
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        emailId: formData.emailId.trim(),
        age: Number(formData.age),
      };

      console.log("Signup Data:", signupData);

      const res = await axios.post(
        BASE_URL + "/signup",
        signupData,
        {
          withCredentials: true,
        }
      );

      console.log("Signup Response:", res.data);

      // Store user in Redux
      dispatch(addUser(res.data));

      toast.success("Signed up successfully!");

      // Go to profile
      navigate("/profile");
    } catch (err) {
      console.log("Signup Error:", err.response?.data || err.message);

      const message =
        err.response?.data?.message ||
        err.response?.data ||
        err.message ||
        "Something went wrong";

      setError(message);

      toast.error("SignUp Failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="bottom-right" richColors />

      <div className="min-h-screen bg-[#080A0A] text-white flex items-center justify-center">
        <div className="w-full max-w-5xl flex items-center justify-center gap-16 px-8">

          {/* LEFT IMAGE */}
          <div className="hidden md:flex w-[42%] items-center justify-center">
            <img
              src="/signup.jpg"
              alt="DevTinder"
              className="w-[420px] h-[420px] object-contain"
            />
          </div>

          {/* RIGHT FORM */}
          <div className="w-full md:w-[360px]">

            <h1 className="text-center text-3xl font-bold text-white mb-7">
              Sign Up
            </h1>

            <form onSubmit={handleSignup}>

              {/* First Name */}
              <label className="block text-sm text-gray-300 mb-2">
                First Name
              </label>

              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter first name"
                className="w-full h-[42px] px-3 mb-4 bg-[#0c1110] text-white outline-none focus:border focus:border-[#39FF88]"
                required
              />

              {/* Last Name */}
              <label className="block text-sm text-gray-300 mb-2">
                Last Name
              </label>

              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter last name"
                className="w-full h-[42px] px-3 mb-4 bg-[#0c1110] text-white outline-none focus:border focus:border-[#39FF88]"
                required
              />

              {/* Email */}
              <label className="block text-sm text-gray-300 mb-2">
                Email
              </label>

              <input
                type="email"
                name="emailId"
                value={formData.emailId}
                onChange={handleChange}
                placeholder="Enter email"
                className="w-full h-[42px] px-3 mb-4 bg-[#0c1110] text-white outline-none focus:border focus:border-[#39FF88]"
                required
              />

              {/* Password */}
              <label className="block text-sm text-gray-300 mb-2">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Min. 8 characters"
                className="w-full h-[42px] px-3 mb-4 bg-[#0c1110] text-white outline-none focus:border focus:border-[#39FF88]"
                required
              />

              <p className="text-xs text-gray-500 -mt-2 mb-4">
                Use uppercase, lowercase, number and special character.
              </p>

              {/* Age */}
              <label className="block text-sm text-gray-300 mb-2">
                Age
              </label>

              <input
                type="number"
                name="age"
                min="18"
                value={formData.age}
                onChange={handleChange}
                placeholder="Enter age"
                className="w-full h-[42px] px-3 mb-4 bg-[#0c1110] text-white outline-none focus:border focus:border-[#39FF88]"
                required
              />

              {/* Gender */}
              <label className="block text-sm text-gray-300 mb-2">
                Gender
              </label>

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="cursor-pointer w-full h-[42px] px-3 mb-5 bg-[#0c1110] text-white outline-none focus:border focus:border-[#39FF88]"
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>

              {/* Error */}
              {error && (
                <p className="mb-3 text-center text-sm text-red-400">
                  {error}
                </p>
              )}

              {/* Signup Button */}
              <button
                type="submit"
                disabled={loading}
                className="cursor-pointer w-full h-[44px] bg-[#39FF88] text-black font-semibold border-2 border-gray-500 hover:bg-[#32e97c] transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Creating Account..." : "Sign Up"}
              </button>
            </form>

            {/* Login */}
            <p className="text-center text-sm text-gray-400 mt-4">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-[#39FF88] cursor-pointer hover:underline"
              >
                Login
              </span>
            </p>

          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;