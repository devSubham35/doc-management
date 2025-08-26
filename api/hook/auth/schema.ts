import { BaseApiResponse } from "@/typescript/interface/common.types";

export interface SignUpPayload {
  email: string;
  name: string;
  password: string;
}
export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginAPiResponse extends BaseApiResponse {
  data: LoginAPiResponse
}

export interface LoginAPiResponse {
  token: string
  user: User
}

export interface User {
  id: string
  name: string
  email: string
  role: string
}
