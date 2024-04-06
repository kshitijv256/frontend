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
import { pollFormSchema } from "@/validation/post.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const PollForm = () => {
  const pollForm = useForm<z.infer<typeof pollFormSchema>>({
    resolver: zodResolver(pollFormSchema),
    defaultValues: {
      title: "",
      content: "",
      media: "",
      options: [
        {
          content: "Option 1",
          media: "",
        },
        {
          content: "Option 2",
          media: "",
        },
      ],
    },
  });

  const createPoll = async (data: z.infer<typeof pollFormSchema>) => {
    const res = await axios.post(API_ENDPOINT + routes.createPoll.path, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(LocalStorageKeys.accessToken)}`,
      },
    });
    console.log(res.data);
  };
  return (
    <div>
      <Form {...pollForm}>
        <form
          onSubmit={pollForm.handleSubmit((data) => createPoll(data))}
          className="flex w-full flex-col gap-5"
        >
          <FormField
            key={"title"}
            control={pollForm.control}
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
            key={"content"}
            control={pollForm.control}
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
          {
            // <OptionsInput />
            pollForm.watch("options").map((_, index) => (
              <div key={index} className="flex w-full items-center space-x-2">
                <input
                  placeholder={`Option ${index + 1}`}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  {...pollForm.register(`options.${index}.content`)}
                />
                <X
                  className="cursor-pointer"
                  onClick={() => {
                    const options = pollForm.getValues("options");
                    pollForm.setValue(
                      "options",
                      options.filter((_, i) => i !== index),
                    );
                  }}
                />
              </div>
            ))
          }
          <Button
            className="w-1/4"
            onClick={() =>
              pollForm.setValue("options", [
                ...pollForm.getValues("options"),
                {
                  content: "",
                  media: "",
                },
              ])
            }
            variant="outline"
          >
            Add Option
          </Button>
          <Button type="submit" variant="default">
            Create Poll
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default PollForm;
