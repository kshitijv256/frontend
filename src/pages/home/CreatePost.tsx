import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageIcon, VoteIcon } from "lucide-react";
import PostForm from "./PostForm";
import PollForm from "./PollForm";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { useAuthProvider } from "@/providers/authProvider";
import { DefaultUserImage } from "@/constants";

export const CreatePost = () => {
  const { user } = useAuthProvider();
  return (
    <Dialog>
      <DialogTrigger className="flex w-full cursor-pointer items-center gap-2 rounded-lg bg-white p-3 transition-colors duration-200 ease-in-out hover:bg-gray-100 dark:bg-slate-800">
        <Avatar>
          <AvatarImage src={user?.profilePicture || DefaultUserImage} />
        </Avatar>
        <Input
          className="disabled"
          placeholder={"What's on your mind?" + " " + user?.username}
        />
      </DialogTrigger>
      <DialogContent>
        <div className="flex w-full flex-col gap-5 rounded-md">
          <Tabs defaultValue="post" className="p-5">
            <TabsList>
              <TabsTrigger value="post">
                <ImageIcon size={20} />
                <p className="ml-2">Post</p>
              </TabsTrigger>
              <TabsTrigger value="poll">
                <VoteIcon size={20} />
                <p className="ml-2">Poll</p>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="post">
              <PostForm />
            </TabsContent>
            <TabsContent value="poll">
              <PollForm />
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};
