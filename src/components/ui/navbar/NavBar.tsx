"use client";
import React from "react";
import { Button } from "../button";
import Link from "next/link";
import { usePathname } from "next/navigation";

function NavBar() {
  const pathname = usePathname();
  return (
    <>
      {!pathname.includes("/auth") && (
        <div className="mb-10">
          <div className="flex  h-16  box-border px-10 p-2">
            <div className="nav-left  w-1/2 ">
              <div className="nav-logo-wrapper w-fit flex items-center justify-center font-lobster text-4xl ">
                Loomix
              </div>
            </div>
            <div className="nav-right flex relative items-center w-1/2">
              <div className="start-btn-wrapper absolute right-0 ">
                <Link href={"/auth/login"}>
                  <Button variant={"ghost"} className="font-semibold text-lg">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default NavBar;
