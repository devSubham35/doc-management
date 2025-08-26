import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { constant } from "@/lib/constant";

export async function getCurrentUser() {
    
  const token = (await cookies()).get("token")?.value;
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, constant.JWT_SECRET!) as {
      id: string;
      email: string;
      role: string;
    };
    return decoded;
  } catch {
    return null;
  }
}
