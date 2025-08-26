import bcrypt from "bcrypt";
import { prisma } from "@/lib/db";
import { ApiError } from "@/lib/handler/ApiError";
import { asyncHandler } from "@/lib/handler/asyncHandler";
import { successResponse } from "@/lib/handler/ApiResponse";

export const POST = asyncHandler(async (req: Request) => {

  const { email, password } = await req.json();

  if (!email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await prisma.user.findUnique({ where: { email } });

  if (!existedUser) {
    throw new ApiError(400, "User not exist");
  }

  const isValidPassword = await bcrypt.compare(password, existedUser?.password);

  if (!isValidPassword) {
    throw new ApiError(400, "Invalid credentials");
  }

  return successResponse(201, "Sign in successfully", 
    { 
      id: existedUser?.id, 
      full_name: existedUser?.full_name 
    }
  );
});
