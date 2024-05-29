"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { useUserContext } from "@/utils/context/stateContextProviders";
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
import useUserProfileServices from "@/app/services/userProfileServices";
import { FaAngleDown } from "react-icons/fa6";
import PromoBar from "../promotionBar/promoBar";
import useNotificationStore from "@/stores/notificationStore";
function NavBar() {
  const pathname = usePathname();
  const { user } = useUserContext();
  const { handleLogout } = useUserProfileServices();
  const { toggleNotificationSheet } = useNotificationStore();
  return (
    <>
      {!pathname.includes("/auth") && (
        <>
          <div className=" sticky py-2 pb-5 top-0 bg-gray-950 z-50">
            <div className="flex  h-16  box-border  py-5 ">
              <div className="nav-left flex gap-10 items-center w-1/2 ">
                <Link href={user ? "/projects" : "/"}>
                  <div className="nav-logo-wrapper w-fit flex items-center justify-center font-lobster text-4xl ">
                    Loomix
                  </div>
                </Link>
                {user && (
                  <div className="nav-left-menu flex gap-5">
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        className="hover:cursor-pointer"
                        asChild
                      >
                        <div className=" flex items-center gap-1">
                          <div>projects</div>
                          <div className="dropdown-symbol">
                            <FaAngleDown size={15} />
                          </div>
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start" className="w-56">
                        <DropdownMenuGroup>
                          <DropdownMenuItem>
                            <Link href={"/projects"}>Find projects</Link>
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuGroup>
                          <DropdownMenuItem>
                            <Link href={"/projects"}>My Postings</Link>
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuGroup>
                          <DropdownMenuItem>
                            <Link href={"/projects"}>My Projects</Link>
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        className="hover:cursor-pointer"
                        asChild
                      >
                        <div className=" flex items-center gap-1">
                          <div>proposals</div>
                          <div className="dropdown-symbol">
                            <FaAngleDown size={15} />
                          </div>
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start" className="w-56">
                        <DropdownMenuGroup>
                          <DropdownMenuItem>
                            <Link href={"/projects/proposals/send"}>
                              Proposals send
                            </Link>
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuGroup>
                          <DropdownMenuItem>
                            <Link href={"/projects/proposals/received"}>
                              Proposals Recieved
                            </Link>
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              </div>
              <div className="nav-right px-3 flex h-full items-center w-1/2 justify-end box-border gap-10 ">
                {user && (
                  <div className="nav-right-menu flex gap-10">
                    <div>
                      <Link href={"/messages"}>
                        <BsSend size={23} />
                      </Link>
                    </div>
                    <div>
                      <RiNotification4Line
                        size={23}
                        className="hover:cursor-pointer"
                        onClick={() => toggleNotificationSheet(true)}
                      />
                    </div>
                  </div>
                )}
                <div className="start-btn-wrapper  right-0 ">
                  {user ? (
                    <div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Avatar>
                            <AvatarImage
                              src={`${
                                user.user?.profile_image &&
                                process.env.NEXT_PUBLIC_BASE_URL +
                                  user.user.profile_image
                              }`}
                            />
                            <AvatarFallback className="uppercase">
                              {user.user &&
                              user.user.first_name &&
                              user.user.last_name
                                ? user.user.first_name[0] +
                                  user.user.last_name[0]
                                : "Hi"}
                            </AvatarFallback>
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
                            <Link href={"/projects/create/"}>
                              <DropdownMenuItem>
                                Create New Project
                              </DropdownMenuItem>
                            </Link>
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

                          <DropdownMenuItem className="border border-gray-300">
                            <Link href={"/payments/subscriptions/plans"}>
                              Subscribe
                            </Link>
                          </DropdownMenuItem>

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
                      <Button
                        variant={"ghost"}
                        className="font-semibold text-lg"
                      >
                        Get Started
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* <div className="w-full">
            <PromoBar />
          </div> */}
        </>
      )}
    </>
  );
}

export default NavBar;
