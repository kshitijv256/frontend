import { PostModel } from "../posts/models";
import { UserModel } from "../users/models";

export type CommentModel = {
  id: number;
  postId: PostModel["id"];
  userId: UserModel["id"];
  content: string;
  isEdited: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CommentUserAssignedModel = CommentModel & {
  User: UserModel;
};
