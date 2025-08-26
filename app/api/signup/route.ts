import bcrypt from "bcrypt";
import { prisma } from "@/lib/db";
import { ApiError } from "@/lib/handler/ApiError";
import { asyncHandler } from "@/lib/handler/asyncHandler";
import { successResponse } from "@/lib/handler/ApiResponse";

export const POST = asyncHandler(async (req: Request) => {
  
  const { full_name, email, password } = await req.json();

  if (!full_name || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    throw new ApiError(409, "Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: { full_name, email, password: hashedPassword },
    select: { id: true, full_name: true, email: true },
  });

  return successResponse(201, "Sign up successfully", newUser);
});
