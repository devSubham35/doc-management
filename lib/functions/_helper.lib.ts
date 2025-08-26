import CustomAlert from "./CustomAlert";
import { AxiosError, AxiosResponse } from "axios";
import { BaseApiResponse } from "@/typescript/interface/common.types";
import { destroyCookie } from "nookies";


export const globalCatchSucess = (response: AxiosResponse<BaseApiResponse>) => {

  let message = "Operation Successfull";
  if (response?.data?.message) {
    message = response?.data.message;
  }
  CustomAlert.success(message);
};

export const globalCatchWarning = (
  response: AxiosResponse<BaseApiResponse>
) => {
  let message = "Something went wrong";
  if (response?.data?.message) {
    message = response?.data.message;
  }
  CustomAlert.warning(message);
};

export const globalCatchError = (error: AxiosError<BaseApiResponse>) => {
  let message = "Something went wrong";
  if (error.response?.data?.message) {
    message = error.response?.data.message;
  }
  CustomAlert.error(message);
};

export const clearCookie = (name: string, ctx?: unknown) => {
  destroyCookie(ctx || null, name, { path: '/' });
};