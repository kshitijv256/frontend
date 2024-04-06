import { UserModel } from "@/components/users/models";

export type AuthProviderState = {
  user: UserModel | null;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
};

export const initialState: AuthProviderState = {
  user: null,
  isLoading: false,
  isError: false,
  errorMessage: "",
};

export type AuthActions =
  | { type: "AUTH_REQUEST" }
  | { type: "AUTH_SUCCESS"; payload: UserModel }
  | { type: "AUTH_FAILURE"; payload: string }
  | { type: "AUTH_SUCCESS"; payload: UserModel };

export const authReducer = (
  state: AuthProviderState,
  action: AuthActions,
): AuthProviderState => {
  switch (action.type) {
    case "AUTH_REQUEST":
      return {
        ...state,
        isLoading: true,
        isError: false,
        errorMessage: "",
      };
    case "AUTH_SUCCESS":
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        isError: false,
        errorMessage: "",
      };
    case "AUTH_FAILURE":
      return {
        ...state,
        user: null,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};
