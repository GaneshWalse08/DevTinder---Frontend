import { Link } from "react-router-dom";
import logo from "../assets/horizontal_Logo.png";
import { useSelector } from "react-redux";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  

  return (
    <div className="navbar relative z-50 bg-[#0D1110] shadow-sm">
      <div className="flex-1">
        <Link className="inline-block cursor-pointer" to="/">
          <img src={logo} className="w-40 h-auto"></img>
        </Link>
      </div>
      {user && (
        <div className="flex gap-2">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar mx-3.5"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={user.photoUrl ? user.photoUrl : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                />
              </div>
            </div>
            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
