import { checkAccessTokenValidity } from "@/api/common";
import routes from "@/api/routes";
import { API_ENDPOINT, LocalStorageKeys } from "@/config/constants";
import axios from "axios";
import React, { createContext, useContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import {
  AuthActions,
  AuthProviderState,
  authReducer,
  initialState,
} from "./authReducer";

const AuthProviderStateContext = createContext<AuthProviderState>(initialState);

type AuthDispatch = React.Dispatch<AuthActions>;

const AuthDispatchContext = createContext<AuthDispatch>(() => {});

export const AuthProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem(LocalStorageKeys.accessToken);
      const refreshToken = localStorage.getItem(LocalStorageKeys.refreshToken);
      if (accessToken) {
        const isValid = await checkAccessTokenValidity(accessToken, dispatch);
        if (isValid) {
          return;
        } else if (refreshToken) {
          // Access token expired, try refreshing it using the refresh token
          await refreshBothTokens(refreshToken);
          await checkAccessTokenValidity(
            localStorage.getItem(LocalStorageKeys.accessToken) as string,
            dispatch,
          );
        } else {
          // No refresh token available, navigate to the sign-in page
          navigate("/sign-in");
        }
      } else {
        // No access token available, navigate to the sign-in page
        navigate("/sign-in");
      }
    };

    fetchData();

    // Check access token validity every 1 minute
    const intervalId = setInterval(
      async () => {
        const accessToken = localStorage.getItem(LocalStorageKeys.accessToken);
        if (accessToken) {
          const isValid = await checkAccessTokenValidity(accessToken, dispatch);
          if (!isValid) {
            // Access token expired, try refreshing it using the refresh token
            const refreshToken = localStorage.getItem(
              LocalStorageKeys.refreshToken,
            );
            if (refreshToken) {
              await refreshBothTokens(refreshToken);
              await checkAccessTokenValidity(
                localStorage.getItem(LocalStorageKeys.accessToken) as string,
                dispatch,
              );
            } else {
              // No refresh token available, navigate to the sign-in page
              navigate("/sign-in");
            }
          }
        }
      },
      1 * 60 * 1000,
    ); // 1 minutes

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const refreshBothTokens = async (refreshToken: string) => {
    try {
      const res = await axios.post(API_ENDPOINT + routes.tokenRefresh.path, {
        refreshToken,
      });
      localStorage.setItem(LocalStorageKeys.accessToken, res.data.access.token);
      localStorage.setItem(
        LocalStorageKeys.refreshToken,
        res.data.refresh.token,
      );

      dispatch({
        type: "AUTH_SUCCESS",
        payload: res.data.user,
      });
    } catch (error) {
      navigate("/sign-in");
    }
  };

  return (
    <AuthProviderStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthProviderStateContext.Provider>
  );
};

export const useAuthProvider = () => useContext(AuthProviderStateContext);
export const useAuthDispatch = () => useContext(AuthDispatchContext);
