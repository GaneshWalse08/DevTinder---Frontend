import { useEffect, useState } from "react";
import UserCard from "./UserCard";

import { BASE_URL } from "@/utils/constants";
import axios from "axios";

import { FourSquare } from "react-loading-indicators";

import { useDispatch } from "react-redux";
import { addUser } from "@/utils/userSlice";

import { Toaster, toast } from "sonner";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();

  // -----------------------------------------
  // FORM STATES
  // -----------------------------------------

  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [age, setage] = useState("");
  const [gender, setgender] = useState("");

  const [photoFile, setphotoFile] = useState(null);
  const [photoUrl, setphotoUrl] = useState("");

  const [skills, setskills] = useState("");

  const [githubUrl, setgithubUrl] = useState("");
  const [linkedinUrl, setlinkedinUrl] = useState("");
  const [about, setabout] = useState("");

  const [error, seterror] = useState("");
  const [loading, setloading] = useState(false);

  // -----------------------------------------
  // LOAD USER DATA
  // -----------------------------------------
  // Important:
  // user can arrive/update after component mounts.
  // Therefore we use useEffect instead of only useState(user...)
  // -----------------------------------------

  useEffect(() => {
    if (!user) return;

    console.log("User received in EditProfile:", user);

    setfirstName(user.firstName || "");
    setlastName(user.lastName || "");
    setage(user.age || "");

    setgender(
      user.gender
        ? user.gender.charAt(0).toUpperCase() +
            user.gender.slice(1).toLowerCase()
        : ""
    );

    setphotoUrl(user.photoUrl || "");

    setskills(
      Array.isArray(user.skills)
        ? user.skills.join(", ")
        : user.skills || ""
    );

    setgithubUrl(user.githubUrl || "");
    setlinkedinUrl(user.linkedinUrl || "");
    setabout(user.about || "");

    // Reset selected file when user changes
    setphotoFile(null);
  }, [user]);

  // -----------------------------------------
  // SAVE PROFILE
  // -----------------------------------------

  const handleSaveprofile = async () => {
    try {
      setloading(true);
      seterror("");

      let uploadedPhotoUrl = photoUrl;

      // -----------------------------------------
      // UPLOAD PHOTO IF NEW PHOTO SELECTED
      // -----------------------------------------

      if (photoFile) {
        const formData = new FormData();

        formData.append("photo", photoFile);

        const uploadRes = await axios.post(
          BASE_URL + "/profile/photoupload",
          formData,
          {
            withCredentials: true,
          }
        );

        console.log("Photo Upload Response:", uploadRes.data);

        uploadedPhotoUrl = uploadRes.data.url;
      }

      // -----------------------------------------
      // PREPARE UPDATED DATA
      // -----------------------------------------

      const updatedData = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),

        age: age ? Number(age) : "",

        photoUrl: uploadedPhotoUrl,

        skills: skills
          .split(",")
          .map((skill) => skill.trim())
          .filter((skill) => skill !== ""),

        gender,

        githubUrl: githubUrl.trim(),

        linkedinUrl: linkedinUrl.trim(),

        about: about.trim(),
      };

      console.log("Profile Update Data:", updatedData);

      // -----------------------------------------
      // UPDATE PROFILE
      // -----------------------------------------

      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        updatedData,
        {
          withCredentials: true,
        }
      );

      console.log("Profile Update Response:", res.data);

      // -----------------------------------------
      // UPDATE REDUX USER
      // -----------------------------------------

      dispatch(addUser(res.data));

      // Update local photo URL as well
      setphotoUrl(res.data.photoUrl || uploadedPhotoUrl);

      toast.success("Profile saved successfully!");
    } catch (err) {
      console.log("Save profile error:", err);
      console.log("Response data:", err.response?.data);
      console.log("Status:", err.response?.status);

      const errorMessage =
        err.response?.data?.message ||
        err.response?.data ||
        err.message ||
        "Failed to save profile";

      seterror(errorMessage);

      toast.error(errorMessage);
    } finally {
      setloading(false);
    }
  };

  // -----------------------------------------
  // LOADING
  // -----------------------------------------

  if (!user) {
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

  // -----------------------------------------
  // PREVIEW USER OBJECT
  // -----------------------------------------

  const previewUser = {
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
  };

  // -----------------------------------------
  // UI
  // -----------------------------------------

  return (
    <>
      <Toaster position="bottom-right" richColors />

      <div className="flex justify-center gap-30">

        {/* ===================================== */}
        {/* LEFT SIDE - EDIT FORM */}
        {/* ===================================== */}

        <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10">

          <div className="w-full max-w-2xl">

            <div className="fieldset bg-[#080A0A] border border-[#26332F] rounded-2xl w-full p-6 md:p-8 shadow-2xl">

              {/* TITLE */}

              <legend className="fieldset-legend mx-auto mb-6 px-4 text-2xl font-semibold text-[#F2F5F3]">
                Edit Profile
              </legend>

              {/* ================================= */}
              {/* FIRST NAME + LAST NAME */}
              {/* ================================= */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* First Name */}

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

                {/* Last Name */}

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

              {/* ================================= */}
              {/* AGE + GENDER */}
              {/* ================================= */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">

                {/* Age */}

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

                {/* Gender */}

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

                    <option value="Male">
                      Male
                    </option>

                    <option value="Female">
                      Female
                    </option>

                    <option value="Other">
                      Other
                    </option>
                  </select>
                </div>

              </div>

              {/* ================================= */}
              {/* PROFILE PHOTO */}
              {/* ================================= */}

              <div className="mt-5">

                <label className="label text-md pb-2 text-[#D7DEDA]">
                  Profile Photo
                </label>

                <input
                  type="file"
                  accept=".png,.jpg,.jpeg"
                  className="file-input w-full bg-[#0B0F0E] border-[#26332F]"
                  onChange={(e) => {
                    const file = e.target.files[0];

                    if (file) {
                      setphotoFile(file);

                      // Show temporary preview immediately
                      const previewUrl = URL.createObjectURL(file);
                      setphotoUrl(previewUrl);
                    }
                  }}
                />

                {photoUrl && (
                  <div className="mt-3">
                    <img
                      src={photoUrl}
                      alt="Profile Preview"
                      className="w-20 h-20 rounded-full object-cover border border-[#39FF88]"
                    />
                  </div>
                )}

              </div>

              {/* ================================= */}
              {/* SKILLS */}
              {/* ================================= */}

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

                <p className="text-xs text-gray-500 mt-2">
                  Separate skills using commas.
                </p>

              </div>

              {/* ================================= */}
              {/* GITHUB + LINKEDIN */}
              {/* ================================= */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">

                {/* GitHub */}

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

                {/* LinkedIn */}

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

              {/* ================================= */}
              {/* ABOUT */}
              {/* ================================= */}

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

              {/* ================================= */}
              {/* ERROR */}
              {/* ================================= */}

              {error && (
                <p className="mt-4 text-center text-sm text-red-400">
                  {error}
                </p>
              )}

              {/* ================================= */}
              {/* SAVE BUTTON */}
              {/* ================================= */}

              <button
                className="btn w-full mt-7 border-none bg-[#39FF88] text-[#080A0A] hover:bg-[#2ee879] font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleSaveprofile}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save profile"}
              </button>

            </div>
          </div>
        </div>

        {/* ===================================== */}
        {/* RIGHT SIDE - USER CARD */}
        {/* ===================================== */}

        <div className="my-auto">

          <UserCard user={previewUser} />

        </div>

      </div>
    </>
  );
};

export default EditProfile;