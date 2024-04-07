import {
  PollAssignedModel,
  PostAssignedModel,
} from "@/components/posts/models";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { commentFormSchema } from "@/validation/comment.validation";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import axios from "axios";
import routes from "@/api/routes";
import { API_ENDPOINT, LocalStorageKeys } from "@/config/constants";
import { CommentUserAssignedModel } from "@/components/comments/models";
import { DefaultUserImage } from "@/constants";
import { useAuthProvider } from "@/providers/authProvider";

const PostComment = (props: {
  post: PostAssignedModel | PollAssignedModel;
  onComment?: (comment: CommentUserAssignedModel) => void;
}) => {
  const { post, onComment } = props;
  const { user } = useAuthProvider();

  const commentForm = useForm<z.infer<typeof commentFormSchema>>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: {
      content: "",
    },
  });

  const submitComment = async (data: z.infer<typeof commentFormSchema>) => {
    try {
      const res = await axios.post(
        API_ENDPOINT + routes.createComment.path,
        {
          postId: post.id,
          content: data.content,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(LocalStorageKeys.accessToken)}`,
          },
        },
      );
      commentForm.reset();
      if (onComment) {
        onComment(res.data as CommentUserAssignedModel);
      }
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex w-full items-center gap-2">
        <Avatar>
          <AvatarImage src={user?.profilePicture || DefaultUserImage} />
        </Avatar>
        <Form {...commentForm}>
          <form
            onSubmit={commentForm.handleSubmit(submitComment)}
            className="flex w-full items-center gap-2"
          >
            <FormField
              control={commentForm.control}
              name="content"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormControl>
                    <Input {...field} placeholder="Write a comment..." />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" size="sm" variant="default" className="h-10">
              Comment
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default PostComment;
