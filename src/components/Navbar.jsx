import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/horizontal_Logo.png";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "@/utils/constants";
import { removeUser } from "@/utils/userSlice";
import { CgProfile } from "react-icons/cg";
import { IoLogOutOutline } from "react-icons/io5";
import { toast, Toaster } from "sonner";
import { FaUserFriends } from "react-icons/fa";
import { MdPendingActions } from "react-icons/md";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useState } from "react";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const isHomePage = location.pathname === "/";

  const handleLogOut = async () => {
    try {
      await axios.post(
        BASE_URL + "/logout",
        {},
        { withCredentials: true }
      );

      dispatch(removeUser());
      setIsDropdownOpen(false);

      toast.success("successfully logged out");
      navigate("/login");
    } catch (err) {
      console.log("Something Went wrong!!");
      toast.error("Logout Failed!");
    }
  };

  return (
    <>
      <Toaster position="bottom-right" richColors />

      <div className="navbar relative z-50 bg-[#0D1110] shadow-sm">

        {/* Logo */}
        <div className="flex-1">
          <Link className="inline-block cursor-pointer" to="/">
            <img
              src={logo}
              className="w-40 h-auto"
              alt="Logo"
            />
          </Link>
        </div>

        {/* Home Page Links */}
        {isHomePage && (
          <div className="hidden md:flex items-center gap-8 mr-8">
            <a
              href="#about"
              className="text-gray-300 hover:text-[#39FF88] transition"
            >
              About Us
            </a>

            <a
              href="#discover"
              className="text-gray-300 hover:text-[#39FF88] transition"
            >
              Discover
            </a>

            <a
              href="#features"
              className="text-gray-300 hover:text-[#39FF88] transition"
            >
              Features
            </a>
          </div>
        )}

        {/* User */}
        {user && (
          <div className="flex gap-2">

            <div className="dropdown dropdown-end relative">

              {/* Profile Image - ORIGINAL STYLE */}
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar mx-3.5"
                onClick={() =>
                  setIsDropdownOpen((prev) => !prev)
                }
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Profile"
                    src={
                      user.photoUrl
                        ? user.photoUrl
                        : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    }
                  />
                </div>
              </div>

              {/* Arrow */}
              <span
                className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-gray-300"
              >
                {isDropdownOpen ? (
                  <FaChevronUp size={14} />
                ) : (
                  <FaChevronDown size={14} />
                )}
              </span>

              {/* Dropdown */}
              <ul
                tabIndex={-1}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow text-xl font-bold"
              >
                <li>
                  <Link
                    to="/profile"
                    className="justify-between"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Profile
                    <span>
                      <CgProfile />
                    </span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/connections"
                    className="justify-between"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    My Connections
                    <span>
                      <FaUserFriends />
                    </span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/requests"
                    className="justify-between"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Pending Requests
                    <span>
                      <MdPendingActions />
                    </span>
                  </Link>
                </li>

                <li>
                  <Link
                    onClick={handleLogOut}
                    className="justify-between"
                  >
                    Logout
                    <span>
                      <IoLogOutOutline />
                    </span>
                  </Link>
                </li>
              </ul>

            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;