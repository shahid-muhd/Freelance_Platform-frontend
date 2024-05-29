"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import {
  useApplicationContext,
  useUserContext,
} from "@/utils/context/stateContextProviders";
import useUserProfileServices from "@/app/services/userProfileServices";
import { UserData } from "@/utils/types/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
type Props = {
  clientId: number | null;
  projectStatus: string;
};
function SideBarClient(props: Props) {
  const [client, setClient] = useState<UserData>();
  const { setIsSheetOpen } = useApplicationContext();
  const { getSpecificUserDetails } = useUserProfileServices();
  const [isUserMatch, setIsUserMatch] = useState(false);

  useEffect(() => {
    let clientId = props.clientId;
    let userId = Number(localStorage.getItem("userId"));
    userId && clientId == userId && setIsUserMatch(true);

    clientId &&
      getSpecificUserDetails(clientId).then((client) => {
        setClient(client as UserData);
      });
  }, []);

  return (
    <>
      {!isUserMatch && (
        <div className="p-5 bg-secondary rounded-2xl w-full h-80 ">
          <div className="client-details space-y-5">
            <div className="client-card-title text-xl font-medium mb-3">
              <h4>Client</h4>
            </div>

            <div className="client-basic-detail flex gap-3 items-center">
              <div className="client-avatar-wrapper">
                <div className="client-avatar w-20 h-20">
                  <Avatar className="min-w-full min-h-full">
                    <AvatarImage
                      src={`${
                        client?.user?.profile_image &&
                        process.env.NEXT_PUBLIC_BASE_URL +
                          client?.user?.profile_image
                      }`}
                      alt="@shadcn"
                    />
                    <AvatarFallback className="w-full h-full text-5xl capitalize rounded-full border-2">
                      <p>
                        {client?.user?.first_name && client.user.first_name[0]}{" "}
                      </p>
                      <p>
                        {client?.user?.last_name && client.user.last_name[0]}
                      </p>
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>

              <div className="client-name-wrapper capitalize font-bold text-2xl leading-10">
                <p> {client?.user?.first_name}</p>
                <p>{client?.user?.last_name}</p>
              </div>
            </div>

            <div className="project-buttons space-y-5 ">
              {props.projectStatus == "recruiting" && (
                <div className="apply-btn">
                  <Button
                    onClick={() => setIsSheetOpen(true)}
                    className="w-full text-base tracking-wider font-bold rounded-3xl bg-background hover:bg-gray-900 text-secondary-foreground"
                  >
                    Send Proposal
                  </Button>
                </div>
              )}
              <div className="save-btn">
                <Button className="w-full text-base tracking-wider font-bold rounded-3xl bg-slate-300 hover:bg-gray-900 hover:text-secondary-foreground">
                  Save Project
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SideBarClient;
