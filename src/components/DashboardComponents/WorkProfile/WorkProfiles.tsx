import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { WorkProfile } from "@/utils/types/types";
import { MdFolderDelete } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverAnchor,
} from "@/components/ui/popover";
import WorkProfileCreator from "./WorkProfileCreator";
import useWorkProfileServices from "@/app/services/workProfileServices";
import useWorkProfileStore from "@/stores/workProfileStore";
import Link from "next/link";

function WorkProfiles() {
  const { workProfiles } = useWorkProfileStore();

  const { removeWorkProfiles } = useWorkProfileStore();
  const [deletePopover, setDeletePopover] = useState({
    isOpen: false,
    profileId: "",
  });
  const { deleteWorkProfileService } = useWorkProfileServices();

  const popOverController = (
    e: React.SyntheticEvent,
    id: string,
    state: boolean,
  ) => {
    // e.stopPropagation();
    e.preventDefault()
    if (state == true) {
      setDeletePopover({ isOpen: true, profileId: id });
    } else {
      setDeletePopover({ isOpen: false, profileId: "" });
    }
  };

  const handleDelete = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    const profileId = deletePopover.profileId;
    deleteWorkProfileService(profileId).then(() => {
      popOverController(e,"", false);
      removeWorkProfiles(profileId);
    });
  };
  return (
    <div className=" w-full p-5 min-h-full border rounded-md relative">
      <Popover open={deletePopover.isOpen}>
        <PopoverAnchor />
        <PopoverContent className="w-80">
          <div>
            <p>Are you sure to delete this profile ?</p>
          </div>
          <div>
            {" "}
            <Button onClick={handleDelete} variant={"destructive"}>
              Delete
            </Button>{" "}
          </div>
        </PopoverContent>
      </Popover>
      <div className="add-wrk-profile-btn-wrapper  ">
        <WorkProfileCreator />
      </div>
      <div className="work-profiles-wrapper w-full  0 grid grid-cols-2 gap-10 mt-5">
        {workProfiles &&
          workProfiles.map((workProfile) => (
            <div
              key={workProfile.id}
              className="profile-card-wrapper  cursor-pointer hover:transform hover:scale-105 transition duration-300 ease-in-out"
            >
              <Link href={`/user/workprofiles/${workProfile.id}`}>
                <Card>
                  <CardHeader className="relative">
                    <div
                      onClick={(e) => {
                        popOverController(e,workProfile.id, true);
                      }}
                      className="dlt-btn-wrapper absolute right-5 top-3"
                    >
                      <MdFolderDelete size={25} />
                    </div>
                    <CardTitle>{workProfile.title}</CardTitle>
                    <CardDescription>
                      {workProfile.description}{" "}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <div className="section-title text-gray-400 mb-2">
                        Skills
                      </div>
                      <div className="grid grid-flow-col  grid-rows-2 grow gap-y-2 max-w-full h-fit">
                        {workProfile.skills?.map((skill, index) => (
                          <div
                            key={index}
                            className="bg-secondary py-1 px-4 rounded-md max-w-fit text-base "
                          >
                            <p>{skill}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter></CardFooter>
                </Card>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}

export default WorkProfiles;
