import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import axios from "axios";
import { BASE_URL } from "./utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "./utils/userSlice";
import { useEffect, useState } from "react";
import { FourSquare } from "react-loading-indicators";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });

      dispatch(addUser(res.data));
    } catch (err) {
      console.log("Profile error:", err.response?.data);
      console.log("Status:", err.response?.status);

      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080A0A] flex items-center justify-center">
      <FourSquare
        color="#39FF88"
        size="medium"
        text="Loading"
        textColor=""
      />
    </div>

    );
  }

  return (
    <div className="min-h-screen bg-[#080A0A] text-white">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
