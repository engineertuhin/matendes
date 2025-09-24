"use client";
// import { useSession, signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { useAppSelector } from "@/hooks/use-redux";

const ProfileInfo = () => {
    const { user } = useAppSelector(
        (state) => state.auth
    );
const session=[];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className=" cursor-pointer">
        <div className=" flex items-center  ">
   
         <img
  src="https://static.vecteezy.com/system/resources/previews/045/944/199/non_2x/male-default-placeholder-avatar-profile-gray-picture-isolated-on-background-man-silhouette-picture-for-user-profile-in-social-media-forum-chat-greyscale-illustration-vector.jpg"
  alt="Profile"
  width={36}
  height={36}
  className="rounded-full"
/>

        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 p-0" align="end">
        <DropdownMenuLabel className="flex gap-2 items-center mb-1 p-3">
       
         <img
  src="https://static.vecteezy.com/system/resources/previews/045/944/199/non_2x/male-default-placeholder-avatar-profile-gray-picture-isolated-on-background-man-silhouette-picture-for-user-profile-in-social-media-forum-chat-greyscale-illustration-vector.jpg"
  alt="Profile"
  width={36}
  height={36}
  className="rounded-full"
/>
          <div>
            <div className="text-sm font-medium text-default-800 capitalize ">
             {user?.user?.name || "Unknown"}
            </div>
            <Link
              href="/dashboard"
              className="text-xs text-default-600 hover:text-primary"
            >
             {user?.user?.email || "Not provided"}
            </Link>
          </div>
        </DropdownMenuLabel>
   
        <DropdownMenuSeparator className="mb-0 dark:bg-background" />
        <DropdownMenuItem
            onClick={() => {
              document.cookie = "auth-token=; path=/; max-age=0";
              window.location.assign("/");
            }}
          className="flex items-center gap-2 text-sm font-medium text-default-600 capitalize my-1 px-3 dark:hover:bg-background cursor-pointer"
        >
          <Icon icon="heroicons:power" className="w-4 h-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default ProfileInfo;
