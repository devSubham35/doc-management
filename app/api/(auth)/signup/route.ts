import bcrypt from "bcrypt";
import { prisma } from "@/lib/db";
import { ApiError } from "@/lib/handler/ApiError";
import { asyncHandler } from "@/lib/handler/asyncHandler";
import { successResponse } from "@/lib/handler/ApiResponse";

export const POST = asyncHandler(async (req: Request) => {
  
  const { name, email, password, role } = await req.json();

  if (!name || !email || !password || !role) {
    throw new ApiError(400, "All fields are required");
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    throw new ApiError(409, "Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      role,
      name,
      email,
      password: hashedPassword,
    },
    select: { id: true, name: true, email: true, role: true },
  });

  return successResponse(201, "Sign up successfully", newUser);
});
