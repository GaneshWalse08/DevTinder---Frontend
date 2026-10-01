import { BASE_URL } from "@/utils/constants";
import {
  addFeed,
  appendFeed,
} from "@/utils/feedSlice";

import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);

  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const LIMIT = 15;

  // -----------------------------------------
  // GET FEED
  // -----------------------------------------

  const getFeed = async (pageNumber) => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);

      const res = await axios.get(BASE_URL + "/user/feed", {
        params: {
          page: pageNumber,
          limit: LIMIT,
        },
        withCredentials: true,
      });

      const newUsers = res.data;

      console.log(
        `Feed Page ${pageNumber}:`,
        newUsers
      );

      // -----------------------------------------
      // FIRST PAGE
      // -----------------------------------------

      if (pageNumber === 1) {
        dispatch(addFeed(newUsers));
      }

      // -----------------------------------------
      // NEXT PAGES
      // -----------------------------------------

      else {
        dispatch(appendFeed(newUsers));
      }

      // -----------------------------------------
      // CHECK IF MORE USERS EXIST
      // -----------------------------------------

      if (newUsers.length < LIMIT) {
        setHasMore(false);
      }

      setPage(pageNumber);

    } catch (err) {
      console.log(
        "Feed Error:",
        err.response?.data || err.message
      );
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------------------
  // FIRST API CALL
  // -----------------------------------------

  useEffect(() => {
    if (feed.length === 0) {
      getFeed(1);
    }
  }, []);

  // -----------------------------------------
  // AUTOMATIC PAGINATION
  // -----------------------------------------

  useEffect(() => {
    /*
      When only 3 users are left,
      automatically fetch the next page.
    */

    if (
      feed.length <= 3 &&
      feed.length > 0 &&
      !loading &&
      hasMore
    ) {
      getFeed(page + 1);
    }
  }, [feed.length, loading, hasMore, page]);

  // -----------------------------------------
  // NO FEED
  // -----------------------------------------

  if (!loading && feed.length === 0) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <h1 className="text-3xl font-bold text-white md:text-4xl">
          No Feed Found!!
        </h1>
      </div>
    );
  }

  // -----------------------------------------
  // FEED
  // -----------------------------------------

  return (
    <div className="flex flex-col items-center p-10">

      {feed.length > 0 && (
        <UserCard
          key={feed[0]._id}
          user={feed[0]}
        />
      )}

      {/* Loading indicator when next page is being fetched */}

      {loading && (
        <p className="mt-5 text-sm text-gray-500">
          Loading more users...
        </p>
      )}

      {/* No more users */}

      {!hasMore && feed.length === 0 && (
        <h1 className="text-2xl font-bold text-white">
          No More Users
        </h1>
      )}

    </div>
  );
};

export default Feed;