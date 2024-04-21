"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { useUserContext } from "@/utils/context/contextProviders";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BsSend } from "react-icons/bs";
import { RiNotification4Line } from "react-icons/ri";
import userProfileServices from "@/app/services/userProfileServices";
function NavBar() {
  const pathname = usePathname();
  const { user } = useUserContext();
  const { handleLogout } = userProfileServices();
  return (
    <>
      {!pathname.includes("/auth") && (
        <div className="mb-10 sticky py-2 pb-5 top-0 bg-gray-950 z-50">
          <div className="flex  h-16  box-border  py-5 ">
            <div className="nav-left  w-1/2 ">
              <div className="nav-logo-wrapper w-fit flex items-center justify-center font-lobster text-4xl ">
                Loomix
              </div>
            </div>
            <div className="nav-right px-3 flex h-full items-center w-1/2 justify-end box-border gap-10 ">
              <div><BsSend size={23} /></div>
              <div><RiNotification4Line  size={23} /></div>
              <div className="start-btn-wrapper  right-0 ">
                {user ? (
                  <div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Avatar>
                          <AvatarImage src="https://github.com/.png" />
                          <AvatarFallback className="uppercase" >{user.user && user.user.first_name && user.user.last_name ? user.user.first_name[0]  + user.user.last_name[0] : 'Hi'}</AvatarFallback>
                        </Avatar>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start" className="w-56">
                        <DropdownMenuLabel>Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                          <DropdownMenuItem>
                            <Link href={"/user/dashboard"}>Dashboard</Link>
                            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                          <DropdownMenuItem>Create New Project</DropdownMenuItem>
                          <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                              Invite users
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                              <DropdownMenuSubContent>
                                <DropdownMenuItem>Email</DropdownMenuItem>
                                <DropdownMenuItem>Message</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>More...</DropdownMenuItem>
                              </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                          </DropdownMenuSub>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />

                        <DropdownMenuItem>Support</DropdownMenuItem>

                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <div onClick={handleLogout}>Log out</div>
                          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ) : (
                  <Link href={"/auth/login"}>
                    <Button variant={"ghost"} className="font-semibold text-lg">
                      Get Started
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default NavBar;
