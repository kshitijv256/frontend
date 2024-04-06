import { getRelativeTimeOrFormattedDateTime } from "@/lib/dateFns";
import { Avatar, AvatarImage } from "../ui/avatar";
import { CommentUserAssignedModel } from "./models";
import { DefaultUserImage } from "@/constants";

const CommentCard = (comment: CommentUserAssignedModel) => {
  return (
    <div className="flex w-full items-center gap-2">
      <Avatar>
        <AvatarImage src={comment.User.profilePicture || DefaultUserImage} />
      </Avatar>
      <div className="flex w-full flex-col gap-1 rounded-lg bg-gray-100 p-2 dark:bg-gray-800">
        <div className="flex items-center gap-2">
          <p className="font-bold text-gray-800 dark:text-gray-300">
            {comment.User.username}
          </p>
          <p>~</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {
              getRelativeTimeOrFormattedDateTime(comment.createdAt)
                .relativeDateTime
            }
          </p>
        </div>
        <p>{comment.content}</p>
      </div>
    </div>
  );
};

export default CommentCard;
