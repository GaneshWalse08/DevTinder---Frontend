import { BASE_URL } from "@/utils/constants";
import { addFeed } from "@/utils/feedSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed.length > 0) return;

    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });

      dispatch(addFeed(res?.data));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (feed.length === 0) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <h1 className="text-3xl font-bold text-white md:text-4xl">
          No Feed Found!!
        </h1>
      </div>
    );
  }

  return (
    <div className="flex justify-center p-10">
      <UserCard
        key={feed[0]._id}
        user={feed[0]}
      />
    </div>
  );
};

export default Feed;