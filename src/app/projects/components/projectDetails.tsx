"use client";
import React, { useEffect, useState } from "react";
import { CgDollar } from "react-icons/cg";
import { AiOutlineHeart } from "react-icons/ai";
import { FaClockRotateLeft } from "react-icons/fa6";
import { FaHeadSideVirus } from "react-icons/fa6";
import useProjectCrudServices from "@/app/services/projectCrudServices";
import { Project } from "@/utils/types/types";
import { Button } from "@/components/ui/button";
import ProjectApplication from "./projectApplication";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
  project: Project;
};
function ProjectDetails(props: Props) {
  const project = props.project;
  const [showFullText, setShowFullText] = useState(false);
  const [isUserMatch, setIsUserMatch] = useState(false);
  const router = useRouter();
  const allowedTextLength = 1200;
  let clientId = Number(localStorage.getItem("clientId"));
  let userId = Number(localStorage.getItem("userId"));
  console.log('my freelancer',project.freelancer);
  console.log('my user id',userId);
  
  useEffect(() => {
    if (clientId && userId && clientId == userId) {
      setIsUserMatch(true);
    }

    return () => {
      setIsUserMatch(false);
    };
  }, []);

  const handleRouteChnage = () => {
    if (project.id && isUserMatch) {
      localStorage.setItem("editableProjectId", JSON.stringify(project.id));
      router.push(`create`);
    }
  };
  return (
    <div>
      {project.status == "accepted" && (
        <ProjectApplication
          budget={project ? project.budget : "0"}
          projectId={project.id?.toString() as string}
        />
      )}
      <div className="space-y-5 divide-y-2 relative">
        <div className="project-overview space-y-5 ">
          {<div className="right-0"></div>}
          {isUserMatch && project.status == "recruiting" && (
            <div className="project-edit-btn absolute right-0 hover:cursor-pointer">
              <Button variant={"link"} onClick={handleRouteChnage}>
                Edit
              </Button>
            </div>
          )}
          <div className="project-title font-bold text-2xl">
            <h2>{project?.title}</h2>
          </div>
          <div className="project-description text-base py-10 ">
            <div className="w-10/12 text-justify leading-7">
              {project &&
              !showFullText &&
              project?.description?.length > allowedTextLength ? (
                <div className="w-full">
                  <p>{project?.description.slice(0, 1000)}...</p>
                  <div className="read-more-btn">
                    <Button
                      className="p-0"
                      variant={"link"}
                      onClick={() => setShowFullText(true)}
                    >
                      show more
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="w-full">
                  <p>{project?.description}</p>
                  <div className="read-more-btn">
                    <Button
                      className="p-0 underline"
                      variant={"link"}
                      onClick={() => setShowFullText(false)}
                    >
                      show less
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-between p-5 px-10 py-10 ">
          <div className="footer-element flex items-center w-40 text-sm gap-3">
            <div className="element-icon ">
              <CgDollar className="size-5" />
            </div>

            <div className="element-description">{project?.budget}</div>
          </div>

          <div className="footer-element flex items-center w-40 text-sm gap-3">
            <div className="element-icon ">
              <FaClockRotateLeft className="size-5" />
            </div>

            <div className="element-description">
              {project?.deadline && project?.deadline.toString()}
            </div>
          </div>

          <div className="footer-element flex items-center w-40 text-sm gap-3">
            <div className="element-icon ">
              <FaHeadSideVirus className="size-5" />
            </div>

            <div className="element-description">
              {project?.freelancer_expertise}
            </div>
          </div>
        </div>

        <div className="project-description text-base py-10 space-y-5 ">
          <div>
            <h4 className="font-bold text-lg">Key Features</h4>
          </div>
          <div className="w-9/12 text-justify leading-7">
            {project &&
              project.features &&
              project.features.map((feature, index) => (
                <p key={index}>{feature}</p>
              ))}
          </div>
        </div>

      </div>
        {project.freelancer == userId && (
          <div className="work-submit-wrapper">
            <Button > Request Sample Work Validation </Button>
          </div>
        )}
    </div>
  );
}

export default ProjectDetails;
