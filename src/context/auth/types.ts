import { UserModel } from "@/components/users/models";
import { Dispatch } from "react";

// Define the action types
enum AuthActionTypes {
  LOGIN_REQUEST = "LOGIN_REQUEST",
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  LOGIN_FAILURE = "LOGIN_FAILURE",
  LOGOUT = "LOGOUT",
}

// Define the state shape
export interface AuthState {
  isAuthenticated: boolean;
  user: UserModel | null;
  error: string | null;
}

// Define the action objects
interface LoginRequestAction {
  type: AuthActionTypes.LOGIN_REQUEST;
}

interface LoginSuccessAction {
  type: AuthActionTypes.LOGIN_SUCCESS;
  payload: UserModel;
}

interface LoginFailureAction {
  type: AuthActionTypes.LOGIN_FAILURE;
  payload: string;
}

interface LogoutAction {
  type: AuthActionTypes.LOGOUT;
}

export type AuthAction =
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailureAction
  | LogoutAction;

// Define the dispatch function type
export type AuthDispatch = Dispatch<AuthAction>;
