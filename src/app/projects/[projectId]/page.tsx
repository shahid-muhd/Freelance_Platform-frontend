"use client";
import React, { useEffect, useState } from "react";

import ProjectDetails from "../components/projectDetails";
import SideBarClient from "../components/sideBarClient";
import { ApplicationContextProvider } from "@/utils/context/stateContextProviders";
import { Project } from "@/utils/types/types";
import useProjectCrudServices from "@/app/services/projectCrudServices";

export default function Page({
  params,
  searchParams,
}: {
  params: { projectId: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { projectId } = params;
  const [project, setProject] = useState<Project>();
  const [clientId, setclientId] = useState<number | null>(null);
  const { getProjectDetailsService } = useProjectCrudServices();
  useEffect(() => {
    getProjectDetailsService(projectId).then((project: Project) => {
      if (project.client) {
        setProject(project);
        setclientId(project.client);
      }
    });
  }, []);

  return (
    <ApplicationContextProvider>
      <div className="flex gap-5  w-100  min-h-screen ">
        <div className="w-9/12 border-2 p-10   rounded-xl">
          {project ? (
            <ProjectDetails project={project} />
          ) : (
            <div>Project Not Found </div>
          )}
        </div>
        <div className="w-3/12 ">
          {project?.status == "recruiting" && (
            <div className="sidebar-wrapper  w-full">
              <div className="w-11/12">
                <SideBarClient clientId={clientId} projectStatus={project.status} />
              </div>
            </div>
          )}
        </div>
      </div>
    </ApplicationContextProvider>
  );
}
