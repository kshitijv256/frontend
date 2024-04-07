import { PostAssignedModel } from "@/components/posts/models";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getRelativeTimeOrFormattedDateTime } from "@/lib/dateFns";
import PostSettingsPopover from "./PostSettingsPopover";
import { Brain, Heart, MessageSquare, XIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import PostComment from "./PostComment";
import CommentCard from "@/components/comments/CommentCard";
import { CommentUserAssignedModel } from "@/components/comments/models";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DefaultUserImage } from "@/constants";
import { getImageRatio, likeUnlikePost } from "@/lib/utils";
import { getAISummary, getHindiTranslation } from "@/utils/axiosRequest";
import Loader from "@/components/common/Loader";
import { useAuthProvider } from "@/providers/authProvider";

const PostCard = (props: {
  post: PostAssignedModel;
  isIndividual?: boolean;
}) => {
  const { post } = props;
  const { user } = useAuthProvider();
  const [postState, setPostState] = useState<PostAssignedModel>(post);
  const [comments, setComments] = useState<CommentUserAssignedModel[]>(
    postState.comments,
  );
  const [imageRatio, setImageRatio] = useState<number | undefined>(3 / 2);

  useEffect(() => {
    setImageRatio(getImageRatio(postState.media));
  }, [postState.media]);

  const PostMeta = [
    {
      icon: Heart,
      name: "likes",
      iconClass: `hover:fill-red-900 ${postState.likes.map((like) => (like.userId === user?.id ? "fill-red-900 dark:fill-red-500" : ""))}`,
      onIconClick: async () => {
        const res = await likeUnlikePost(postState.id);
        setPostState(res!);
      },
      count: postState._count.likes,
    },
    {
      icon: MessageSquare,
      name: "comments",
      iconClass: "hover:fill-gray-300 dark:hover:fill-gray-500",
      onIconClick: () => {},
      count: postState._count.comments,
    },
  ];

  return (
    <div className="flex w-full flex-col gap-2 rounded-xl bg-white p-3 shadow-md dark:bg-black">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage
              src={postState.Author.profilePicture || DefaultUserImage}
            />
          </Avatar>
          <p className="text-lg text-slate-600">{postState.Author.username}</p>
        </div>
        <div className="flex items-center gap-2">
          <p className="tooltip">
            {
              getRelativeTimeOrFormattedDateTime(postState.createdAt)
                .relativeDateTime
            }
            <span className="tooltip-text">
              {
                getRelativeTimeOrFormattedDateTime(postState.createdAt)
                  .formattedDateTime
              }
            </span>
          </p>
          <PostSettingsPopover {...postState} />
        </div>
      </div>
      <Link to={`/post/${postState.id}`} className="flex flex-col gap-2">
        <p className="text-lg font-bold">{postState.title}</p>
        <p className="">&emsp;{postState.content}</p>
      </Link>
      {postState.media && (
        <Link to={`/post/${postState.id}`}>
          <AspectRatio ratio={imageRatio}>
            <img
              src={postState.media}
              alt="Post"
              className="h-full w-full rounded-xl object-cover"
            />
          </AspectRatio>
        </Link>
      )}
      <div>
        <AIExplanation postId={postState.id} />
        {/* <HindiTranslation postId={postState.id} /> */}
      </div>
      <Separator className="my-2" />
      <Link to={`/post/${postState.id}`} className="flex items-center gap-2">
        {PostMeta.map((meta, index) => (
          <div
            key={index}
            className="flex cursor-pointer items-center gap-2 rounded-md bg-gray-100 p-1 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            <meta.icon
              strokeWidth={0.5}
              size={24}
              className={meta.iconClass}
              onClick={meta.onIconClick}
            />
            <p className="hover:underline">
              {meta.count} {meta.name}
            </p>
          </div>
        ))}
      </Link>
      <Separator className="my-2" />
      <PostComment
        post={postState}
        onComment={(comment: CommentUserAssignedModel) => {
          setComments((prev) => [comment, ...prev]);
        }}
      />
      {comments.map((comment, index) => (
        <CommentCard key={index} {...comment} />
      ))}
      <div className="flex items-center gap-2">
        {postState.comments.length === 1 && postState._count.comments > 1 && (
          <Link
            to={`/post/${postState.id}`}
            className="cursor-pointer text-sm text-gray-600 hover:underline dark:text-gray-400"
          >
            View all {postState._count.comments} comments
          </Link>
        )}
      </div>
    </div>
  );
};

const AIExplanation = (props: { postId: string }) => {
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [aiExplanationLoading, setAiExplanationLoading] = useState(false);

  const getAiExplanation = async () => {
    try {
      setAiExplanationLoading(true);
      setAiExplanation(null);
      const response = await getAISummary(props.postId);
      setAiExplanation(response.explanation);
    } catch (error) {
      console.error("Error getting AI explanation:", error);
      setAiExplanation("Error getting AI explanation");
    } finally {
      setAiExplanationLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-end gap-2 text-xs">
        <Brain size={12} className="text-gray-600 dark:text-gray-400" />
        <p
          className="cursor-pointer text-gray-600 hover:underline dark:text-gray-400"
          onClick={getAiExplanation}
        >
          Get AI Explanation
        </p>
      </div>
      <div
        className={`relative rounded-xl bg-gray-100 p-2 dark:bg-gray-800 ${aiExplanationLoading ? "block" : "hidden"}`}
      >
        <Loader />
      </div>
      <div
        className={`relative rounded-xl bg-gray-100 p-2 dark:bg-gray-800 ${aiExplanation ? "block" : "hidden"}`}
      >
        <div>
          <XIcon
            size={16}
            className="absolute right-2 top-2 cursor-pointer"
            onClick={() => {
              setAiExplanation(null);
            }}
          />
          <p className="mt-2 text-sm">{aiExplanation}</p>
        </div>
      </div>
    </div>
  );
};

const HindiTranslation = (props: { postId: string }) => {
  const [hindiTranslation, setHindiTranslation] = useState<string | null>(null);
  const [hindiTranslationLoading, setHindiTranslationLoading] = useState(false);

  const getHindi = async () => {
    try {
      setHindiTranslationLoading(true);
      setHindiTranslation(null);
      const response = await getHindiTranslation(props.postId);
      setHindiTranslation(response.explanation);
    } catch (error) {
      console.error("Error getting Hindi explanation:", error);
      setHindiTranslation("Error getting Hindi explanation");
    } finally {
      setHindiTranslationLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-end gap-2 text-xs">
        <Brain size={12} className="text-gray-600 dark:text-gray-400" />
        <p
          className="cursor-pointer text-gray-600 hover:underline dark:text-gray-400"
          onClick={getHindi}
        >
          Get French Translation
        </p>
      </div>
      <div
        className={`relative rounded-xl bg-gray-100 p-2 dark:bg-gray-800 ${hindiTranslationLoading ? "block" : "hidden"}`}
      >
        <Loader />
      </div>
      <div
        className={`relative rounded-xl bg-gray-100 p-2 dark:bg-gray-800 ${hindiTranslation ? "block" : "hidden"}`}
      >
        <div>
          <XIcon
            size={16}
            className="absolute right-2 top-2 cursor-pointer"
            onClick={() => {
              setHindiTranslation(null);
            }}
          />
          <p className="mt-2 text-sm">{hindiTranslation}</p>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
