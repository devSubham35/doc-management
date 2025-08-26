import { authKeys } from "./key";
import { endpoints } from "@/api/endpoints";
import axiosInstance from "@/api/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { LoginPayload, SignUpPayload } from "./schema";

export const useAuthSignupMutation = () => {
  return useMutation({
    mutationKey: [authKeys.auth_signup],
    mutationFn: async (body: SignUpPayload) => {
      const res = await axiosInstance.post(
        endpoints.auth.signup,
        body
      );

      return res.data;
    }
  });
};

export const useAuthSigninMutation = () => {
  return useMutation({
    mutationKey: [authKeys.auth_login],
    mutationFn: async (body: LoginPayload) => {
      const res = await axiosInstance.post(
        endpoints.auth.signin,
        body
      );

      return res.data;
    }
  });
};