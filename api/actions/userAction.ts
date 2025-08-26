"use server";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";

//////////////////////////////////////
/// Fetch User Profile
//////////////////////////////////////

export async function getProfile() {

  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  return prisma.user.findUnique({
    where: { id: user.id },
    select: { id: true, name: true, email: true, role: true },
  });
}

//////////////////////////////////////
/// Update User Profile
//////////////////////////////////////

export async function updateProfile(data: { name?: string }) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: {
      ...(data.name && { name: data.name }),
    },
    select: { id: true, name: true, email: true, role: true },
  });

  /// Invalidate cache
  revalidatePath("/dashboard/profile");

  return updatedUser;
}