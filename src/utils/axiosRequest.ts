import routes from "@/api/routes";
import { API_ENDPOINT, LocalStorageKeys } from "@/config/constants";
import axios from "axios";

export const getAISummary = async (postId: string) => {
  const res = await axios.post(
    API_ENDPOINT + routes.getPostExplanation.path,
    { postId },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(LocalStorageKeys.accessToken)}`,
      },
    },
  );
  return res.data;
};

export const getHindiTranslation = async (postId: string) => {
  const res = await axios.post(
    API_ENDPOINT + routes.getHindiExplanation.path,
    { postId },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(LocalStorageKeys.accessToken)}`,
      },
    },
  );
  return res.data;
};

export const uploadImage = async (file: File): Promise<string | undefined> => {
  try {
    const res = await axios.post(API_ENDPOINT + routes.uploadMedia.path, file, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          LocalStorageKeys.accessToken,
        )}`,
        "Content-Type": `image/${file.type.split("/")[1]}`,
      },
    });
    return res.data.mediaUrl as string;
  } catch (err) {
    console.error(err);
  }
};
