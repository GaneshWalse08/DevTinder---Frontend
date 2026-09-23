import axios from "axios";
import UserCard from "./UserCard";
import { BASE_URL } from "@/utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "@/utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      dispatch(addConnections(res.data));

      console.log(res.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0) return <h1>No connections Found!!</h1>;

  return (
    <>
      {connections.map((connection) => {
        return (
          <div className="min-h-screen bg-[#0D1110] px-6 py-10">
            <h1 className="mb-8 text-center text-3xl font-bold text-white">
              My Connections
            </h1>

            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 cursor-pointer">
              {connections.map((connection) => (
                <div
                  key={connection._id}
                  className="group overflow-hidden rounded-2xl border border-[#39FF88]/20 bg-[#111816] shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-[#39FF88]/60 hover:shadow-[0_10px_40px_rgba(57,255,136,0.15)]"
                >
                  {/* Profile Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={connection.photoUrl}
                      alt={connection.firstName}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111816] via-transparent to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    {/* Name */}
                    <h2 className="text-xl font-bold text-white">
                      {connection.firstName} {connection.lastName}
                    </h2>

                    {/* Age + Gender */}
                    <p className="mt-1 text-sm text-gray-400">
                      {connection.age} years • {connection.gender}
                    </p>

                    {/* About */}
                    <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-gray-300">
                      {connection.about}
                    </p>

                    {/* Skills */}
                    {connection.skills?.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {connection.skills.map((skill) => (
                          <span
                            key={skill}
                            className="rounded-full border border-[#39FF88]/30 bg-[#39FF88]/10 px-3 py-1 text-xs text-[#39FF88]"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}

                    
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Connections;
