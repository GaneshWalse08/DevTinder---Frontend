import { BASE_URL } from "@/utils/constants";
import { addRequest, removeRequest } from "@/utils/requestSlice";
import { removeUser } from "@/utils/userSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Requests = () => {
  const requests = useSelector((store) => store.request);
  const dispatch = useDispatch();

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });

      dispatch(addRequest(res.data));
    } catch (err) {
      console.log(err.message);
    }
  };

  const reviewRequests = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true },
      );

      // await fetchRequests();
      dispatch(removeRequest(_id));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return null;

  if (requests.length === 0) {
    return (
      <div className="min-h-screen bg-[#0D1110] px-6 py-10">
        <h1 className="mb-8 text-center text-3xl font-bold text-white">
          Connection Requests
        </h1>

        <div className="flex justify-center pt-20">
          <div className="rounded-2xl border border-[#39FF88]/20 bg-[#111816] px-10 py-8 text-center">
            <p className="text-lg text-gray-300">No connection requests</p>

            <p className="mt-2 text-sm text-gray-500">You're all caught up!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D1110] px-6 py-10">
      {/* Heading */}
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-white">Connection Requests</h1>

        <p className="mt-2 text-sm text-gray-400">
          {requests.length}{" "}
          {requests.length === 1 ? "person wants" : "people want"} to connect
          with you
        </p>
      </div>

      {/* Requests */}
      <div className="mx-auto mt-8 max-w-4xl space-y-5">
        {requests.map((request) => {
          const user = request.fromUserId;

          return (
            <div
              key={request._id}
              className="group rounded-2xl border border-[#39FF88]/15 bg-[#111816] p-5 transition-all duration-300 hover:border-[#39FF88]/40 hover:shadow-[0_8px_30px_rgba(57,255,136,0.08)]"
            >
              <div className="flex flex-col gap-5 sm:flex-row">
                {/* Profile Image */}
                <div className="flex justify-center sm:block">
                  <img
                    src={user.photoUrl}
                    alt={user.firstName}
                    className="h-24 w-24 rounded-2xl object-cover ring-2 ring-[#39FF88]/20"
                  />
                </div>

                {/* User Information */}
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-white">
                        {user.firstName} {user.lastName}
                      </h2>

                      <p className="mt-1 text-sm text-gray-400">
                        {user.age} years • {user.gender}
                      </p>
                    </div>

                    {/* Request Badge */}
                    <span className="mt-2 w-fit rounded-full border border-[#39FF88]/30 bg-[#39FF88]/10 px-3 py-1 text-xs font-medium text-[#39FF88] sm:mt-0">
                      Wants to connect
                    </span>
                  </div>

                  {/* About */}
                  <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-gray-300">
                    {user.about}
                  </p>

                  {/* Skills */}
                  {user.skills?.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {user.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full bg-[#0D1110] px-3 py-1 text-xs text-gray-300 ring-1 ring-white/10"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-5 flex gap-3">
                    {user.githubUrl && (
                      <a
                        href={user.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-1 items-center justify-center gap-2 rounded-full border border-gray-600 px-4 py-3 text-sm font-medium text-white transition hover:border-emerald-400 hover:bg-emerald-500/10"
                      >
                        <span className="text-lg">◉</span>
                        GitHub ↗
                      </a>
                    )}

                    {user.linkedinUrl && (
                      <a
                        href={user.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-1 items-center justify-center gap-2 rounded-full border border-blue-500/40 px-4 py-3 text-sm font-medium text-white transition hover:bg-blue-500/10"
                      >
                        <span className="font-bold">in</span>
                        LinkedIn ↗
                      </a>
                    )}
                  </div>

                  {/* Buttons */}
                  <div className="mt-5 flex gap-3">
                    <button
                      className="cursor-pointer rounded-xl bg-[#39FF88] px-6 py-2 text-sm font-semibold text-black transition hover:bg-[#2ee879]"
                      onClick={() => reviewRequests("accepted", request._id)}
                    >
                      Accept
                    </button>

                    <button
                      className="cursor-pointer rounded-xl border border-gray-700 bg-transparent px-6 py-2 text-sm font-semibold text-gray-300 transition hover:border-red-400 hover:text-red-400"
                      onClick={() => reviewRequests("rejected", request._id)}
                    >
                      Ignore
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
