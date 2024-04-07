import routes from "@/api/routes";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { API_ENDPOINT, LocalStorageKeys } from "@/config/constants";
import { getAISuggestion, uploadImage } from "@/utils/axiosRequest";
import { postFormSchema } from "@/validation/post.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Brain, XIcon } from "lucide-react";
import Loader from "@/components/common/Loader";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const AIExplanation = (props: { keywords: string }) => {
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [aiExplanationLoading, setAiExplanationLoading] = useState(false);

  const getAiPostSuggest = async () => {
    try {
      setAiExplanationLoading(true);
      setAiExplanation(null);
      const response = await getAISuggestion(props.keywords);
      setAiExplanation(response.suggestion);
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
          onClick={getAiPostSuggest}
        >
          Get AI Suggestion
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

const PostForm = () => {
  const postForm = useForm<z.infer<typeof postFormSchema>>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title: "",
      content: "",
      media: undefined,
    },
  });

  const createPost = async (data: z.infer<typeof postFormSchema>) => {
    if (!data.media) return;
    const media = await uploadImage(data.media);

    await axios.post(
      API_ENDPOINT + routes.createPost.path,
      {
        ...data,
        media,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(LocalStorageKeys.accessToken)}`,
        },
      },
    );
  };
  return (
    <div>
      <Form {...postForm}>
        <form
          onSubmit={postForm.handleSubmit((data) => createPost(data))}
          className="flex w-full flex-col gap-5"
        >
          <FormField
            control={postForm.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Something Awesome happened" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={postForm.control}
            name="media"
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/jpeg, image/jpg, image/png"
                    onChange={(e) => {
                      onChange(e.target.files?.[0]);
                    }}
                    {...fieldProps}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={postForm.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Describe your awesome moment"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <AIExplanation keywords={postForm.getValues().content} />
          <Button type="submit" variant="default">
            Create Post
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default PostForm;
