import { projectsApi } from "@/api/projectsApi";
import useProjectStore from "@/stores/projectStore";
import { Project, Skills, SkillsType } from "@/utils/types/types";
import React from "react";
import usePaymentSerives from "./paymentSerives";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { title } from "process";

type ProjectOverview = Omit<
  Omit<Omit<Project, "freelancer_expertise">, "features">,
  "deadline"
>;
type features = {
  id: number;
  name: string;
};
function useProjectCrudServices() {
  const {
    createProject,
    getAllProjects,
    getProject: getProjects,
    getUserProjects,
    saveProjects
  } = projectsApi;
  const addProjects = useProjectStore((state) => state.addProjects);
  const { getSubscriptionDetails } = usePaymentSerives();
  const { toast } = useToast();
  const router = useRouter();

  const projectNotifier = async ({ title = "", description = "" }) => {
    toast({
      className:
        "top-0 right-0 fixed  flex  md:max-w-[420px] md:top-4 md:right-4",
      title: title,
      description: description,
    });
  };
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
      freelancer_expertise: expertise,
      deadline,
    };

    getSubscriptionDetails().then(() => {
      // allows project creation if and only if subscription exists.
      createProject(data).then(() => {
        projectNotifier({
          title: "Congratulations !!. Your project is live.",
          description: "You will be notified if you recieve proposals.",
        });
        router.back();
      });
    });
  };

  const getAllProjectsService = (searchInput:string) => {
    getAllProjects(searchInput).then((projects) => {
      let availableProjects = projects as Project[];
      availableProjects = availableProjects.filter(
        (project) => project.status == "recruiting"
      );
      addProjects(availableProjects);
    });
  };

  const retrieveUserProjects = async () => {
    const userProjects = await getUserProjects();

    return userProjects as Project[];
  };
  const saveProjectService = async (projectId:string|number) => {
  saveProjects(projectId);

  };

  const getProjectDetailsService = (projectId: string | number): Promise<Project> =>
    getProjects(projectId) as Promise<Project>;

  return {
    createProject: createProjectService,
    getAllProjectsService,
    getProjectDetailsService,
    retrieveUserProjects,
    saveProjectService
  };
}

export default useProjectCrudServices;
