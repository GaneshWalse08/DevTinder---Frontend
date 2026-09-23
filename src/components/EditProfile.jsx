import { useState } from "react";
import UserCard from "./UserCard";
import { BASE_URL } from "@/utils/constants";
import axios from "axios";
import { FourSquare } from "react-loading-indicators";
import { useDispatch } from "react-redux";
import { addUser } from "@/utils/userSlice";

const EditProfile = ({ user }) => {
  // const {firstName, lastName, age, photoUrl, skills, gender, githubUrl, linkedinUrl, about} = props;

  const [firstName, setfirstName] = useState(user.firstName || "");
  const [lastName, setlastName] = useState(user.lastName || "");
  // const [error, seterror] = useState("");
  const [age, setage] = useState(user.age || "");
  const [photoUrl, setphotoUrl] = useState(user.photoUrl || "");
  const [skills, setskills] = useState(
    Array.isArray(user.skills) ? user.skills.join(", ") : user.skills || "",
  );
  const [gender, setgender] = useState(
    user.gender
      ? user.gender.charAt(0).toUpperCase() + user.gender.slice(1).toLowerCase()
      : "",
  );
  const [githubUrl, setgithubUrl] = useState(user.githubUrl || "");
  const [linkedinUrl, setlinkedinUrl] = useState(user.linkedinUrl || "");
  const [about, setabout] = useState(user.about || "");
  const dispatch = useDispatch();

  const handleSaveprofile = async () => {
    try {
      console.log("Current gender:", gender);
      const updatedData = {
        firstName,
        lastName,
        age,
        photoUrl,
        skills: skills.split(",").map((skill) => skill.trim()),
        gender,
        githubUrl,
        linkedinUrl,
        about,
      };

      const res = await axios.patch(BASE_URL + "/profile/edit", updatedData, {
        withCredentials: true,
      });

      dispatch(addUser(res.data));
    } catch (err) {
      console.log("Save profile error:", err);
      console.log("Response data:", err.response?.data);
      console.log("Status:", err.response?.status);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#080A0A] flex items-center justify-center">
        <FourSquare color="#39FF88" size="medium" text="Loading" textColor="" />
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-center gap-30">
        <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10">
          <div className="w-full max-w-2xl">
            <div className="fieldset bg-[#080A0A] border border-[#26332F] rounded-2xl w-full p-6 md:p-8 shadow-2xl">
              <legend className="fieldset-legend mx-auto mb-6 px-4 text-2xl font-semibold text-[#F2F5F3]">
                Edit Profile
              </legend>

              {/* First Name + Last Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="label text-md pb-2 text-[#D7DEDA]">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="input w-full bg-[#0B0F0E] border-[#26332F] focus:border-[#39FF88] focus:outline-none"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setfirstName(e.target.value)}
                  />
                </div>

                <div>
                  <label className="label text-md pb-2 text-[#D7DEDA]">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="input w-full bg-[#0B0F0E] border-[#26332F] focus:border-[#39FF88] focus:outline-none"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setlastName(e.target.value)}
                  />
                </div>
              </div>

              {/* Age + Gender */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                <div>
                  <label className="label text-md pb-2 text-[#D7DEDA]">
                    Age
                  </label>
                  <input
                    type="number"
                    className="input w-full bg-[#0B0F0E] border-[#26332F] focus:border-[#39FF88] focus:outline-none"
                    placeholder="Age"
                    value={age}
                    onChange={(e) => setage(e.target.value)}
                  />
                </div>

                <div>
                  <label className="label text-md pb-2 text-[#D7DEDA]">
                    Gender
                  </label>
                  <select
                    className="select w-full bg-[#0B0F0E] border-[#26332F] focus:border-[#39FF88] focus:outline-none"
                    value={gender}
                    onChange={(e) => setgender(e.target.value)}
                  >
                    <option value="" disabled>
                      Select Gender
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Photo URL */}
              <div className="mt-5">
                <label className="label text-md pb-2 text-[#D7DEDA]">
                  Profile Photo URL
                </label>
                <input
                  type="url"
                  className="input w-full bg-[#0B0F0E] border-[#26332F] focus:border-[#39FF88] focus:outline-none"
                  placeholder="https://example.com/photo.jpg"
                  value={photoUrl}
                  onChange={(e) => setphotoUrl(e.target.value)}
                />
              </div>

              {/* Skills */}
              <div className="mt-5">
                <label className="label text-md pb-2 text-[#D7DEDA]">
                  Skills
                </label>
                <input
                  type="text"
                  className="input w-full bg-[#0B0F0E] border-[#26332F] focus:border-[#39FF88] focus:outline-none"
                  placeholder="React, Node.js, MongoDB..."
                  value={skills}
                  onChange={(e) => setskills(e.target.value)}
                />
              </div>

              {/* GitHub + LinkedIn */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                <div>
                  <label className="label text-md pb-2 text-[#D7DEDA]">
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    className="input w-full bg-[#0B0F0E] border-[#26332F] focus:border-[#39FF88] focus:outline-none"
                    placeholder="https://github.com/username"
                    value={githubUrl}
                    onChange={(e) => setgithubUrl(e.target.value)}
                  />
                </div>

                <div>
                  <label className="label text-md pb-2 text-[#D7DEDA]">
                    LinkedIn URL
                  </label>
                  <input
                    type="url"
                    className="input w-full bg-[#0B0F0E] border-[#26332F] focus:border-[#39FF88] focus:outline-none"
                    placeholder="https://linkedin.com/in/username"
                    value={linkedinUrl}
                    onChange={(e) => setlinkedinUrl(e.target.value)}
                  />
                </div>
              </div>

              {/* About */}
              <div className="mt-5">
                <label className="label text-md pb-2 text-[#D7DEDA]">
                  About
                </label>
                <textarea
                  className="textarea w-full h-28 bg-[#0B0F0E] border-[#26332F] focus:border-[#39FF88] focus:outline-none resize-none"
                  placeholder="Tell other developers something about yourself..."
                  value={about}
                  onChange={(e) => setabout(e.target.value)}
                />
              </div>

              {/* Button */}
              <button
                className="btn w-full mt-7 border-none bg-[#39FF88] text-[#080A0A] hover:bg-[#2ee879] font-semibold rounded-lg"
                onClick={handleSaveprofile}
              >
                Save profile
              </button>
            </div>
          </div>
        </div>

        <div className="my-auto">
          <UserCard
            user={{
              firstName,
              lastName,
              age,
              gender,
              about,
              photoUrl,
              linkedinUrl,
              githubUrl,
              skills: skills
                .split(",")
                .map((skill) => skill.trim())
                .filter(Boolean),
            }}
          />
        </div>
      </div>
    </>
  );
};

export default EditProfile;
