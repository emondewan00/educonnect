"use client";

import { Logo } from "@/components/logo";
import { MobileSidebar } from "./mobile-sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";

export const Navbar = () => {
  const session = useSession();

  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    async function fetchMe() {
      try {
        const response = await fetch("http://localhost:3000/api/me");
        const data = await response.json();
        setLoggedInUser(data);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    }
    fetchMe();
  }, [session]);

  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <MobileSidebar />
      <div className="flex items-center justify-end  w-full">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="cursor-pointer">
              <Avatar>
                <AvatarImage src={loggedInUser?.profilePicture} alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 mt-4">
            <DropdownMenuItem className="cursor-pointer">
              <button
                onClick={() => {
                  signOut();
                }}
              >
                Logout
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
