import { constant } from "@/lib/constant";

export const baseUrlApi = `${constant.BASE_API_URL}/api`;

export const endpoints = {
  auth: {
    signup: "/signup",
    signin: "/signin",
  },
};

export const sucessNotificationEndPoints = [
  endpoints.auth.signup,
  endpoints.auth.signin,
];
