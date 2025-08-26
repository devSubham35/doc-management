"use client";

import { useRouter } from "next/navigation";
import { User } from "@/api/hook/auth/schema";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

type ProfileMenuProps = {
  user: User;
  logout: ()=> void;
};

const ProfileMenu = ({ user, logout }: ProfileMenuProps) => {

  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src="" alt={user.name ?? user.email} />
          <AvatarFallback>
            {user.name?.charAt(0).toUpperCase() ??
              user.email?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => router.push("/dashboard/profile")}>
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileMenu;
