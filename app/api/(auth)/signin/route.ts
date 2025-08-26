import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/db";
import { constant } from "@/lib/constant";
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

  const isValidPassword = await bcrypt.compare(password, existedUser.password);

  if (!isValidPassword) {
    throw new ApiError(400, "Invalid credentials");
  }

  const token = jwt.sign(
    {
      id: existedUser.id,
      email: existedUser.email,
      role: existedUser.role,
    },
    constant.JWT_SECRET!,
    { expiresIn: "7d" }
  );

  return successResponse(200, "Sign in successfully", {
    token,
    user: {
      id: existedUser.id,
      name: existedUser.name,
      email: existedUser.email,
      role: existedUser.role,
    },
  });
});
