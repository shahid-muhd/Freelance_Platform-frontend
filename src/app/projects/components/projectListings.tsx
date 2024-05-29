"use client";
import useProjectCrudServices from "@/app/services/projectCrudServices";
import { Input } from "@/components/ui/input";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { CgDollar } from "react-icons/cg";
import { AiOutlineHeart } from "react-icons/ai";
import { FaClockRotateLeft } from "react-icons/fa6";
import { FaHeadSideVirus } from "react-icons/fa6";
import useProjectStore from "@/stores/projectStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AiFillHeart } from "react-icons/ai";
import { useUserContext } from "@/utils/context/stateContextProviders";
import DebouncedInput from "use-debounce";
function ProjectListings() {
  const [searchInput, setsearchInput] = useState<string>("");

  const router = useRouter();
  const { getAllProjectsService, saveProjectService } =
    useProjectCrudServices();

  useEffect(() => {
    getAllProjectsService(searchInput);
  }, [searchInput]);

  const projects = useProjectStore((state) => state.projects);
  const { user } = useUserContext();
  const projectDetailsRoute = (id: number | undefined) => {
    if (id && user?.user) {
      localStorage.setItem("clientId", JSON.stringify(id));
      localStorage.setItem("userId", JSON.stringify(user?.user.id));
      router.push(id.toString());
    }
  };

  const saveProject = (projectId: number) => {
    saveProjectService(projectId);
  };

  return (
    <div>
      <div className=" p-5 space-y-5">
        <section className="search-bar-wrapper sticky top-0 w-full ">
          <Input
            value={searchInput}
            onChange={(e) => setsearchInput(e.target.value)}
            maxLength={55}
            className="w-96 rounded-lg bg-secondary"
            placeholder="Search Jobs"
          />
        </section>

        <section className="project-list">
          <div className="project-wrapper space-y-5">
            {projects &&
              projects.map((project) => (
                <div
                  key={project.id}
                  className="project h-60  bg-secondary rounded-xl relative hover:cursor-pointer hover:bg-gray-900 "
                >
                  <Link href={`/projects/${project.id}`}>
                    <div
                      onClick={() => projectDetailsRoute(project.client)}
                      className="p-5 space-y-5"
                    >
                      <div className="project-head space-y-5 w-full  ">
                        <div className="project-title-wrapper flex justify-between">
                          <div className="project-titl w-full text-xl truncate font-bold">
                            <h2>{project.title}</h2>
                          </div>
                          <div className="flex w-36 gap-4">
                            {
                              <div
                                onClick={() =>
                                  saveProject(project.id as number)
                                }
                                className="project-save-icon hover:cursor-pointer  "
                              >
                                <AiOutlineHeart
                                  size={20}
                                  className="text-gray-500 "
                                />
                              </div>
                            }
                            <div className="project-age  w-28 text-right">
                              2 hrs ago
                            </div>
                          </div>
                        </div>

                        <div className="project-description-wrapper text-base  h-18 line-clamp-3  text-ellipsis text-justify w-10/12">
                          <p>{project.description}</p>
                        </div>
                      </div>

                      <div className="project-footer w-full absolute bottom-5 ">
                        <div className="project-element-wrapper flex w-2/3 justify-between">
                          <div className="footer-element flex items-center w-40 text-sm gap-3">
                            <div className="element-icon ">
                              <CgDollar className="size-5" />
                            </div>

                            <div className="element-description">
                              {project.budget}
                            </div>
                          </div>
                          <div className="footer-element flex items-center w-40 text-sm gap-3">
                            <div className="element-icon ">
                              <FaClockRotateLeft className="size-4" />
                            </div>

                            <div className="element-description">20days</div>
                          </div>
                          <div className="footer-element flex items-center w-40 text-sm gap-3">
                            <div className="element-icon ">
                              <FaHeadSideVirus className="size-4" />
                            </div>

                            <div className="element-description">
                              {project.freelancer_expertise}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default ProjectListings;
