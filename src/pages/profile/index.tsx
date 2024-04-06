import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useAuthProvider } from "@/providers/authProvider";
import { API_ENDPOINT, LocalStorageKeys } from "@/config/constants";
import { updateUserProfilePictureForm } from "@/validation/profile.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { uploadImage } from "@/utils/axiosRequest";
import routes from "@/api/routes";
import { useEffect, useState } from "react";

const Profile = () => {
  const { user } = useAuthProvider();
  const [profilePicture, setProfilePicture] = useState<string | undefined>(
    user?.profilePicture || undefined,
  );
  useEffect(() => {
    setProfilePicture(user?.profilePicture || undefined);
  }, [user]);
  const profilePictureForm = useForm<
    z.infer<typeof updateUserProfilePictureForm>
  >({
    resolver: zodResolver(updateUserProfilePictureForm),
  });

  const uploadProfilePicture = async (
    data: z.infer<typeof updateUserProfilePictureForm>,
  ) => {
    const imageUrl = await uploadImage(data.profilePicture);
    if (!imageUrl) {
      return;
    }
    const updatedUser = await axios.put(
      API_ENDPOINT + routes.updateUser.path,
      { profilePicture: imageUrl },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            LocalStorageKeys.accessToken,
          )}`,
        },
      },
    );
    console.log(updatedUser);
    setProfilePicture(updatedUser.data.profilePicture);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold">Profile</h1>
      <p className="mt-4">This is the profile page.</p>
      <div className="">
        <img
          src={profilePicture}
          alt="Profile picture"
          className="h-40 w-40 rounded-lg object-cover"
        />
        <Form {...profilePictureForm}>
          <form
            onSubmit={profilePictureForm.handleSubmit((data) =>
              uploadProfilePicture(data),
            )}
            className="flex w-full flex-col gap-5"
          >
            <FormField
              control={profilePictureForm.control}
              name="profilePicture"
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/jpeg, image/jpg, image/png"
                      onChange={(e) => {
                        setProfilePicture(
                          URL.createObjectURL(e.target.files?.[0] as File),
                        );
                        onChange(e.target.files?.[0]);
                      }}
                      {...fieldProps}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" variant="default">
              Update Profile Pic
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Profile;
