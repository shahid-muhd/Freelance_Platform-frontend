"use client";
import useProjectCrudServices from "@/app/services/projectCrudServices";
import { Input } from "@/components/ui/input";
import React, { useEffect } from "react";
import { CgDollar } from "react-icons/cg";
import { AiOutlineHeart } from "react-icons/ai";
import { FaClockRotateLeft } from "react-icons/fa6";
import { FaHeadSideVirus } from "react-icons/fa6";

function ProjectListings() {
  const { getAllProjectsService } = useProjectCrudServices();
  useEffect(() => {
    getAllProjectsService();
  }, []);

  const projectFooterElements = [
    {
      id: 1,
      description: "40",
      icon: <CgDollar className="size-5" />,
    },
    {
      id: 2,
      description: "12 Weeks",
      icon: <FaClockRotateLeft className="size-4" />,
    },
    {
      id: 3,
      description: "Intermediate",
      icon: <FaHeadSideVirus className="size-4" />,
    },
  ];

  return (
    <div className=" p-5 space-y-5">
      <section className="search-bar-wrapper sticky top-0 w-full ">
        <Input
          maxLength={55}
          className="w-96 rounded-lg bg-secondary"
          placeholder="Search Jobs"
        />
      </section>

      <section className="project-list">
        <div className="project-wrapper space-y-5">
          <div className="project h-52 p-5 space-y-7 bg-secondary rounded-3xl ">
            <div className="project-head space-y-3 w-full  ">
            <div className="project-title-wrapper flex justify-between">
                <div className="project-titl w-full text-xl truncate font-bold">
                  <h2>Lorem ipsum dolor sit</h2>
                </div>
                <div className="flex w-36 gap-4">
                  <div className="project-save-icon hover:cursor-pointer ">
                    <AiOutlineHeart size={20} />
                  </div>
                  <div className="project-age  w-28 text-right">2 months ago</div>
                </div>
              </div>

              <div className="project-description-wrapper  h-18 line-clamp-3  text-ellipsis text-justify w-10/12">
                <p>
                  Lorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem
                  ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum
                  dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit
                  amet Lorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem
                  ipsum dolor sit amet Lorem ipsum dolor sit ametLorem ipsum
                  dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit
                  amet
                </p>
              </div>
            </div>

            <div className="project-footer w-full  ">
              <div className="project-element-wrapper flex w-2/3 justify-between">
                {projectFooterElements.map((element) => (
                  <div
                    key={element.id}
                    className="footer-element flex items-center w-40 text-sm gap-3"
                  >
                    <div className="element-icon ">{element.icon}</div>

                    <div className="element-description">
                      {element.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="project h-52 p-5 space-y-7 bg-secondary rounded-3xl ">
            <div className="project-head space-y-3 w-full  ">
              <div className="project-title-wrapper flex justify-between">
                <div className="project-titl w-full text-xl truncate font-bold">
                  <h2>Lorem ipsum dolor sit</h2>
                </div>
                <div className="flex w-36 gap-4">
                  <div className="project-save-icon hover:cursor-pointer ">
                    <AiOutlineHeart size={20} className="text-gray-500"/>
                  </div>
                  <div className="project-age  w-28 text-right">2 hrs ago</div>
                </div>
              </div>

              <div className="project-description-wrapper  h-18 line-clamp-3  text-ellipsis text-justify w-10/12">
                <p>
                  Lorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem
                  ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum
                  dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit
                  amet Lorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem
                  ipsum dolor sit amet Lorem ipsum dolor sit ametLorem ipsum
                  dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit
                  amet
                </p>
              </div>
            </div>

            <div className="project-footer w-full  ">
              <div className="project-element-wrapper flex w-2/3 justify-between">
                {projectFooterElements.map((element) => (
                  <div
                    key={element.id}
                    className="footer-element flex items-center w-40 text-sm gap-3"
                  >
                    <div className="element-icon ">{element.icon}</div>

                    <div className="element-description">
                      {element.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProjectListings;
