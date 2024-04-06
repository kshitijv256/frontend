import { CommentUserAssignedModel } from "../comments/models";
import { UserModel } from "../users/models";

export enum PostType {
  Post = "POST",
  Poll = "POLL",
}

export type PostModel = {
  id: string;
  authorId: UserModel["id"];
  PostType: PostType.Post;
  title?: string;
  content: string;
  likes: LikesModel[];
  comments: CommentUserAssignedModel[];
  createdAt: string;
  isEdited: boolean;
  media?: string;
};

export type PollModel = Omit<PostModel, "PostType"> & {
  PostType: PostType.Poll;
  options: Option[];
};

export type LikesModel = {
  id: number;
  postId: PostModel["id"];
  userId: UserModel["id"];
  createdAt: string;
  updatedAt: string;
};

export type Option = {
  id: number;
  content: string;
  media?: string;
};

export type PostAssignedModel = PostModel & {
  Author: UserModel;
  _count: {
    likes: number;
    comments: number;
  };
};

export type PollAssignedModel = PollModel & {
  Author: UserModel;
  _count: {
    likes: number;
    comments: number;
  };
};
