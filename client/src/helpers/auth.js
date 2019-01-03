import { USER_AUTH_TOKEN_KEY } from "../constants/common";

export const isAuthenticated = () =>
  !!localStorage.getItem(USER_AUTH_TOKEN_KEY);
