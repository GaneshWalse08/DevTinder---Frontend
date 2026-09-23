import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";
import { FourSquare } from "react-loading-indicators";

const Profile = () => {
  const user = useSelector((store) => store.user);

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
  return (
    <div>
      <EditProfile user={user} />
    </div>
  );
};

export default Profile;
