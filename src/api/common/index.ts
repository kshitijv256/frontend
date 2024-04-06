import { API_ENDPOINT } from "@/config/constants";
import axios from "axios";
import routes from "../routes";
import { UserModel } from "@/components/users/models";
import { AuthActions } from "@/providers/authReducer";

export const checkAccessTokenValidity = async (
  accessToken: string,
  dispatch: React.Dispatch<AuthActions>,
): Promise<boolean> => {
  try {
    dispatch({ type: "AUTH_REQUEST" });
    const res = await axios.get(API_ENDPOINT + routes.currentUser.path, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (res.status === 200)
      dispatch({ type: "AUTH_SUCCESS", payload: res.data as UserModel });
    return true;
  } catch (error: unknown) {
    dispatch({ type: "AUTH_FAILURE", payload: "Invalid access token" });
    return false;
  }
};
