"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { use, useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";

import {
  useApplicationContext,
  useUserContext,
} from "@/utils/context/stateContextProviders";
import useUserProfileServices from "@/app/services/userProfileServices";
import { User, UserData } from "@/utils/types/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import useWorkProfileStore from "@/stores/workProfileStore";
function SideBarClient() {
  const [userDetails, setUserDetails] = useState<User>();
  const { user } = useUserContext();
  const { workProfiles } = useWorkProfileStore();
  const { getProfileCompletionStatus } = useUserProfileServices();
  const [profileStatus, setprofileStatus] = useState<number>();
  useEffect(() => {
    if (user?.user) {
      setUserDetails(user.user);

      const profileCompletionStatus = getProfileCompletionStatus(user);
      const timer = setTimeout(() => setprofileStatus(profileCompletionStatus), 500)
      return () => clearTimeout(timer)
      
    }
  }, [user]);
  return (
    <div className="p-5 bg-secondary rounded-2xl w-full h-80 ">
      <div className="client-details space-y-3">
        <div className="client-basic-detail flex gap-3 items-center">
          <div className="client-avatar-wrapper">
            <div className="client-avatar w-24 h-24">
              <Avatar className="min-w-full min-h-full h-full w-full flex items-center justify-center">
                <AvatarImage
                  src={`${
                    userDetails?.profile_image &&
                    process.env.NEXT_PUBLIC_BASE_URL + userDetails.profile_image
                  }`}
                  alt="user"
                />
                <AvatarFallback>
                  <div className=" h-full w-full flex items-center justify-center text-3xl">
                    {user &&
                    user.user &&
                    user.user.first_name &&
                    user.user.last_name
                      ? user.user.first_name[0] + user.user.last_name[0]
                      : "Hi"}
                  </div>
                </AvatarFallback>
              </Avatar>
            </div>
          </div>

          <Link href={"/user/dashboard"}>
            <div className="client-name-wrapper capitalize font-semibold text-2xl leading-10 hover:cursor-pointer hover:underline">
              <p> {userDetails?.first_name}</p>
              <p>{userDetails?.last_name}</p>
            </div>
          </Link>
        </div>
        <div className="profile-complition-status-wrapper ">
          <div className="progress-bar-title h-8  relative ">
            <div className="text-muted-foreground w-fit">
              Profile Completion
            </div>
            <div className="w-fit h-fit text-sm  absolute right-0 bottom-0 ">
              <p>{profileStatus}%</p>
            </div>
          </div>
          <div className="progress-bar-profile-wrapper ">
            <div>
              <Progress value={profileStatus} className="w-full" />
            </div>
          </div>
        </div>
        <div className="freelancer-secondary-details space-y-2 text-lg">
          {/* <div className="text-muted-foreground">
            <h3>Your Stats</h3>
          </div> */}
          <div className="flex gap-3">
            <div>
              <p>Work Profiles :</p>
            </div>
            <div>{workProfiles.length}</div>
          </div>
          <div className="flex gap-3">
            <div>
              <p>Projects Listed :</p>
            </div>
            <div></div>
          </div>
          <div className="flex gap-3">
            <div>
              <p>Projects Working :</p>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBarClient;
