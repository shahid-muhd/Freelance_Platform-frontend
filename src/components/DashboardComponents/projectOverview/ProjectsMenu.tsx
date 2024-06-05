import React, { useEffect, useState } from "react";

import { Project } from "@/utils/types/types";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import useProjectCrudServices from "@/app/services/projectCrudServices";
import ProjectsList from "./projectsList";
import { useUserContext } from "@/utils/context/stateContextProviders";

function UserProjects() {
  const [listedProjects, setListedProjects] = useState<Project[]>();
  const [workingProjects, setWorkingProjects] = useState<Project[]>();
  const { retrieveUserProjects } = useProjectCrudServices();
  const { user } = useUserContext();

  useEffect(() => {
    retrieveUserProjects().then((projects) => {
      console.log("all projects", projects);

      const listedProjects = projects.filter(
        (project) => project.client == user?.user?.id
      );
      const workingProjects = projects.filter((project) => 
        project.client !== user?.user?.id
      );
      console.log("listed", listedProjects);
      console.log(workingProjects);

      setListedProjects(listedProjects);
      setWorkingProjects(workingProjects);
    });
  }, []);

  return (
    <div>
      <Tabs defaultValue="listed_projects" className="w-full pl-2 ">
        <div>
          <TabsList className="w-1/2">
            <TabsTrigger className="w-1/2" value="listed_projects">
              Listed Projects
            </TabsTrigger>
            <TabsTrigger className="w-1/2" value="working_projects">
              Working Projects
            </TabsTrigger>
          </TabsList>
          {listedProjects && (
            <TabsContent className="" value="listed_projects">
              <ProjectsList projects={listedProjects} />
            </TabsContent>
          )}
          {workingProjects && (
            <TabsContent className="" value="working_projects">
              {" "}
              <ProjectsList projects={workingProjects} />
            </TabsContent>
          )}{" "}
        </div>
      </Tabs>
    </div>
  );
}

export default UserProjects;
