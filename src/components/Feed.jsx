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

      console.log(res?.data);

      dispatch(addFeed(res?.data));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);


  return <div className="flex justify-center p-10">
    {feed.length > 0 && <UserCard user={feed[5]} />}
  </div>;
};

export default Feed;
