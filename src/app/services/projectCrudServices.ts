import { projectsApi } from "@/api/projectsApi";
import { Project, Skills, SkillsType } from "@/utils/types";
import React from "react";

type ProjectOverview = Omit<Omit<Project, "expertise">, "features">;
type features = {
  id: number;
  name: string;
};
function useProjectCrudServices() {
  const { createProject, getProjects } = projectsApi;
  const createProjectService = (
    projectOverview: ProjectOverview,
    features: features[],
    deadline: Date | undefined,
    expertise: string,
    skills?: SkillsType
  ) => {
    const featureNames = features.map((feature) => feature.name);
    const data = {
      title: projectOverview.title,
      description: projectOverview.description,
      budget: projectOverview.budget,
      features: featureNames,
      skills,
      expertise,
      deadline,
    };

    createProject(data);
  };

  const getAllProjectsService = () => {
    getProjects().then((data)=>{
     console.log(data);
     
    })
  };

  return { createProject: createProjectService, getAllProjectsService };
}

export default useProjectCrudServices;
