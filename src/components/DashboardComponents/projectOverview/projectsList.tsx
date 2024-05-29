import { Project } from "@/utils/types/types";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MdFolderDelete } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverAnchor,
} from "@/components/ui/popover";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/utils/context/stateContextProviders";
type Props = {
  projects: Project[];
};
function ProjectsList({ projects }: Props) {
  const router = useRouter();
  const { user } = useUserContext();
  const handleRouteChange = (projectID: number, clientId: number) => {
    {
      user?.user?.id && localStorage.setItem("userId", user.user.id.toString());
      localStorage.setItem("clientId", clientId.toString());
      router.push(`/projects/${projectID}`);
    }
  };
  return (
    <div>
      <div className="work-profiles-wrapper w-full p-5 min-h-full border rounded-md relative  grid  grid-cols-6  gap-10 mt-5">
        {projects &&
          projects.map((project) => (
            <div
              key={project.id}
              className="profile-card-wrapper   col-span-2 cursor-pointer hover:transform hover:scale-105 transition duration-300 ease-in-out"
            >
              <Card
                onClick={(e) =>
                  project.id &&
                  project.client &&
                  handleRouteChange(project.id, project.client)
                }
                className="h-full"
              >
                <CardHeader className="relative">
                  <div
                    // onClick={(e) => {
                    //   popOverController(e, project.id);
                    // }}
                    className="dlt-btn-wrapper absolute right-5 top-3"
                  >
                    <MdFolderDelete size={25} />
                  </div>
                  <CardTitle className="w-10/12 line-clamp-2 h-10">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-4 pt-1 space-y-3">
                    <div className="project-status ">
                      <Badge
                        className="text-sm tracking-wider"
                        variant="secondary"
                      >
                        {project.status}
                      </Badge>
                    </div>
                    <div className="project-description">
                      {project.description}{" "}
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div></div>
                </CardContent>
                <CardFooter></CardFooter>
              </Card>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ProjectsList;
