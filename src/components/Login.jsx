import Particles from "@/components/Particles";
import { BASE_URL } from "@/utils/constants";
import { addUser } from "@/utils/userSlice";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";

const Login = () => {
  const [emailId, setemailId] = useState("anaghawaghmare@gmail.com");
  const [password, setpassword] = useState("Anagha@11");
  const [error, seterror] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((store) => store.user);

  if (user) {
    return navigate("/feed");
  }

  const handleLogIn = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true },
      );

      dispatch(addUser(res.data));
      toast.success("successfully logged in!")
      navigate("/feed");
    } catch (err) {
      toast.success("logged in Failed!")
      seterror(err.response?.data || "Something went wrong");
    }
  };

  return (
    <>
    <Toaster position="bottom-right" richColors/>
      <div className="absolute inset-0 z-0">
        <Particles
          particleCount={310}
          particleSpread={10}
          speed={0.1}
          particleColors={["#ffffff", "#ffffff", "#ffffff"]}
          moveParticlesOnHover
          particleHoverFactor={0.1}
          alphaParticles={false}
          particleBaseSize={100}
          sizeRandomness={1}
          cameraDistance={20}
          disableRotation={false}
        />
      </div>
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <div>
          <div className="fieldset bg-[#080A0A] border-base-300 rounded-box w-xs border p-4 w-auto">
            <legend className="fieldset-legend m-auto text-xl text-[#F2F5F3]">
              Login
            </legend>

            <label className="label text-md">Email</label>
            <input
              type="email"
              className="input mb-5 bg-[#0B0F0E] border-[#26332F]"
              placeholder="Email"
              value={emailId}
              onChange={(e) => setemailId(e.target.value)}
            />

            <label className="label text-md">Password</label>
            <input
              type="password"
              className="input bg-[#0B0F0E] border-[#26332F]"
              placeholder="Password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />

            <p className="text-red-700">{error}</p>

            <button
              className="btn btn-neutral mt-4 bg-[#39FF88] text-[#080A0A]"
              onClick={handleLogIn}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
