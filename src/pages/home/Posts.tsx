import routes from "@/api/routes";
import {
  PostAssignedModel,
  PollAssignedModel,
} from "@/components/posts/models";
import { API_ENDPOINT, LocalStorageKeys } from "@/config/constants";
import axios from "axios";
import { useEffect, useState } from "react";
import PostCard from "./PostCard";
import PollCard from "./PollCard";

const Posts = () => {
  const [posts, setPosts] = useState<(PostAssignedModel | PollAssignedModel)[]>(
    [],
  );
  const fetchPosts = async () => {
    const res = await axios.get(API_ENDPOINT + routes.queryPosts.path, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(LocalStorageKeys.accessToken)}`,
      },
      params: {
        limit: 10,
      },
    });
    setPosts(res.data.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="flex w-full flex-col gap-5 rounded-md bg-white text-sm transition-colors duration-200 ease-in-out hover:bg-gray-100 dark:bg-black">
      {posts &&
        posts.map((post, index) => (
          <div key={index} className="bg-gray-200">
            {post.PostType === "POST" ? (
              <PostCard post={post} isIndividual={false} />
            ) : (
              <PollCard {...post} />
            )}
          </div>
        ))}
    </div>
  );
};

export default Posts;
