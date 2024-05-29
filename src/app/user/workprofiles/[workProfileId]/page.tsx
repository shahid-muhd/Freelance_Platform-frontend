"use client";
import useWorkProfileServices from "@/app/services/workProfileServices";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useUserContext } from "@/utils/context/stateContextProviders";
import {
  PortfolioItem,
  User,
  UserData,
  WorkProfile,
} from "@/utils/types/types";
import React, { useEffect, useState } from "react";
import WorkProfileEditor from "./components/workProfileEditor";
import useUserProfileServices from "@/app/services/userProfileServices";
import usePortfolioServices from "@/app/services/portfolioServices";

function WorkProfileDetails({ params }: { params: { workProfileId: string } }) {
  const { getWorkProfiles } = useWorkProfileServices();
  const [workProfile, setWorkProfile] = useState<WorkProfile>();
  const [enableEditing, setEnableEditing] = useState(false);
  const [freelancer, setFreelancer] = useState<User>();
  const { user } = useUserContext();
  const { getSpecificUserDetails } = useUserProfileServices();
  const [portfolios, setPortfolios] = useState<PortfolioItem[]>([]);
  const { getPortfolioService } = usePortfolioServices();
  useEffect(() => {
    getWorkProfiles({ userSpecific: false, slug: params.workProfileId }).then(
      (workProfile) => {
        setWorkProfile(workProfile);

        workProfile?.user &&
          getSpecificUserDetails(workProfile.user).then((freelancer) => {
            setFreelancer(freelancer.user);
          });
      }
    );
  }, []);

  useEffect(() => {
    if (workProfile) {
      console.log("clling...");

      getPortfolioService(workProfile?.id).then((portfolios) => {
        console.log("response__>>", portfolios);

        portfolios && setPortfolios(portfolios);
      });
    }
  }, [workProfile]);

  return (
    <div className="p-3 md:p-5 border h-full">
      {workProfile && (
        <WorkProfileEditor
          isOpen={enableEditing}
          setIsOpen={setEnableEditing}
          workProfile={workProfile as WorkProfile}
          setWorkProfile={setWorkProfile}
        />
      )}
      <div className="space-y-5 divide-y-2">
        <div className="proposal-overview  relative ">
          {user && user?.user?.id == workProfile?.user && (
            <div className="absolute right-0 top-0 ">
              <Button variant={"link"} onClick={() => setEnableEditing(true)}>
                Edit
              </Button>
            </div>
          )}
          <div className="space-y-5  pt-10 md:pt-0">
            <div className="proposal-title font-bold text-2xl">
              {<h2>Title : {workProfile?.title} </h2>}
            </div>

            {user && user?.user?.id !== workProfile?.user && (
              <div className="freelancer-details flex gap-3 capitalize text-xl font-medium">
                <div>
                  <p>Freelancer : </p>
                </div>
                <div className="freelancer-name">
                  <p> {freelancer?.first_name + " " + freelancer?.last_name}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="proposal-cover-letter text-base py-10 ">
          <div className="font-semibold">
            <h4>Summary</h4>
          </div>
          <div className="p-3 w-full md:w-10/12 text-justify leading-7">
            <div className="bg-secondary rounded-md  p-3">
              <p>{workProfile?.description}</p>
            </div>
          </div>
        </div>

        <div className="w-full py-5">
          <div className="font-semibold">
            <h4>Skills</h4>
          </div>
          <div className="py-2 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-y-3  grow  w-9/12 h-fit items-start justify-start ">
            {workProfile &&
              workProfile.skills?.map((skill, index) => (
                <div
                  key={index}
                  className="bg-secondary py-1 px-4 rounded-md max-w-fit text-base  "
                >
                  <p>{skill}</p>
                </div>
              ))}
          </div>
        </div>

        <div className="w-full py-5 portfolio-display grid md:grid-cols-2">
          {portfolios.length > 0 &&
            portfolios.map((portfolio,index) => (
              <div key={index} className="border p-5 rounded-md col-span-1">
                <div className=" flex gap-3 capitalize text-xl font-medium">
                  <div>
                    <p>Portfolio Title : </p>
                  </div>
                  <div>
                    <p> {portfolio.title}</p>
                  </div>
                </div>

                <div className=" text-base w-2/3 py-5 ">
                  <div className="  text-justify leading-7">
                    <div>
                      <p>{portfolio.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default WorkProfileDetails;
