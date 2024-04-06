import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import WorkProfileCreator from "./WorkProfileCreator";
import { WorkProfile } from "@/utils/types";

type Props = {
  workProfiles: WorkProfile[] | null;
};

function WorkProfiles(props: Props) {
  const workProfiles = props.workProfiles;

  return (
    <div className=" w-full p-5 min-h-full border rounded-md relative">
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
              <Card>
                <CardHeader>
                  <CardTitle>{workProfile.title}</CardTitle>
                  <CardDescription>{workProfile.description} </CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <div className="section-title text-gray-400 mb-2">
                      Skills
                    </div>
                    <div className="grid grid-flow-col  grid-rows-2 grow gap-y-2 max-w-full h-fit">
                      {workProfile.skills?.map((skill) => (
                        <div className="bg-secondary py-1 px-4 rounded-md max-w-fit text-base ">
                          <p>{skill}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter></CardFooter>
              </Card>
            </div>
          ))}
      </div>
    </div>
  );
}

export default WorkProfiles;
