import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import axios from "axios";
import { BASE_URL } from "./utils/constants";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "./utils/userSlice";
import { useEffect } from "react";

const Body = () => {
  const dispatch = useDispatch();
   const navigate = useNavigate();

  const fetchData = async () => {

    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });

      dispatch(addUser(res.data));
    } catch (err) {
      navigate("/login");
    }
  };


  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className="min-h-screen bg-[#080A0A] text-white">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
