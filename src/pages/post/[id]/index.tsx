import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { PostAssignedModel } from "@/components/posts/models";
import axios from "axios";
import { API_ENDPOINT, LocalStorageKeys } from "@/config/constants";
import routes from "@/api/routes";
import PostCard from "@/pages/home/PostCard";

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState<PostAssignedModel>();

  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get(API_ENDPOINT + routes.getPostById.path + id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(LocalStorageKeys.accessToken)}`,
        },
      });
      setPost(res.data);
    };
    fetchPost();
  }, [id]);

  return (
    <div className="w-full">
      {post && <PostCard post={post} isIndividual={true} />}
    </div>
  );
};

export default Post;
