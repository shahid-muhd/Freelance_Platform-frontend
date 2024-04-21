"use client";
import React, { useEffect, useRef, useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Badge } from "@/components/ui/badge";
import { RxCross1 } from "react-icons/rx";
import workProfileServices from "@/app/services/workProfileServices";
import { SkillSearchComponent } from "../../skillSelectorComponents/skillSearchComponent";
import { ScrollArea } from "@/components/ui/scroll-area";
import PortfolioCreateComponent from "./PortfolioCreateComponent";
import {
  useWorkProfileContext,
  WorkProfileContextProvider,
} from "@/utils/context/contextProviders";
import Image from "next/image";
import { SkillsType, Overview } from "@/utils/types";
import PortfolioCreationManager from "@/app/services/PortfolioCreationManager";

function WorkProfileCreator() {
  const [isOpen, setIsOpen] = useState(false);
  const [skills, setSkills] = useState<SkillsType>(null);
  const [skillInput, setskillInput] = useState("");
  const [skillsAvailable, setSkillsAvailable] = useState([""]);
  const { getSkillSuggestion } = workProfileServices();
  const [isPortfolioCreateModel, setisPortfolioCreateModel] = useState(false);
  const [showRemoveBtn, setShowRemoveBtn] = useState(false);
  const { portfolios } = useWorkProfileContext();
  const { removePortfolio } = PortfolioCreationManager();
  const { createWorkProfile } = workProfileServices();
  const [workProfileOverview, setworkProfileOverview] =
    useState<Overview>({
      title: "",
      description: "",
    });

  useEffect(() => {
    let query = skillInput;
    console.log(query);

    if (query) {
      getSkillSuggestion(query).then((response): void => {
        console.log(response.data);

        setSkillsAvailable(response.data);
        console.log("useeefect skill availability setting working");
      });
    }
  }, [skillInput]);

  const addSkill = (skill: string) => {
    if ((skills?.length && skills.length >= 10) || skills?.includes(skill)) {
      return false;
    } else {
      setSkills((prevSkills) => {
        const updatedSkills = prevSkills || []; // Initialize as empty array if null
        return [...updatedSkills, skill];
      });
    }
  };

  const removeSkill = (removableSkill: string) => {
    if (removableSkill && skills) {
      const updatedSkills = skills.filter((skill) => skill !== removableSkill);
      // Update the state with the filtered skills array
      setSkills(updatedSkills);
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setworkProfileOverview((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const workProfile = {
      overview: workProfileOverview,
      skills,
      portfolios,
    };

    createWorkProfile(workProfile).then((res) => {
      setworkProfileOverview({
        title: "",
        description: "",
      })
      setSkills(null)
        
      setIsOpen(false);

    });
  };

  return (
    <div>
    
      <Dialog open={isOpen}>
        <DialogTrigger asChild>
          <div
            onClick={() => setIsOpen(true)}
            className=" flex gap-3 hover:cursor-pointer  w-fit"
          >
            <div className="btn-holder flex items-end text-lg">
              <p>Add Work Profile</p>
            </div>
            <div className="btn-symbol flex items-end">
              <IoIosAddCircleOutline size={24} />
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[1200px]">
          <DialogHeader>
            <DialogTitle>Create New Work Profile</DialogTitle>
            <DialogDescription className="p-3">
              <Tabs defaultValue="overview" className="w-full ">
                <TabsList className="grid w-full grid-cols-3 ">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="skills">Skills</TabsTrigger>
                  <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                </TabsList>
                <ScrollArea className="h-96 ">
                  <TabsContent value="overview">
                    <Card>
                      <CardHeader>
                        <CardTitle>Overview</CardTitle>
                        <CardDescription>
                          Add liguistic description for you profile
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="space-y-1">
                          <Label htmlFor="title">Profile Title</Label>
                          <Input
                            onChange={handleInputChange}
                            id="title"
                            name="title"
                            placeholder="Eg : Front End Developer"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="description">Summary</Label>
                          <Textarea
                            onChange={handleInputChange}
                            className="min-h-24 max-h-44"
                            id="description"
                            name="description"
                            maxLength={350}
                            placeholder="Write a short summary about your work profile"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="skills">
                    <Card>
                      <CardHeader>
                        <CardTitle>Add Skills</CardTitle>
                        <CardDescription>
                          You can add upto 10 skills matching this profile.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2  ">
                        <div className="space-y-1">
                          <Input
                            id="skill-input"
                            type="text"
                            placeholder="Start typing your skills..."
                            value={skillInput}
                            onChange={(e) => setskillInput(e.target.value)}
                          />
                        </div>
                        <SkillSearchComponent
                          skills={skills}
                          skillsAvailable={skillsAvailable}
                          addSkill={addSkill}
                        />
                      </CardContent>
                      <CardFooter>
                        <div className="space-1 p-1  grid  grid-flow-row grid-cols-3 w-full h-fit">
                          {skills &&
                            skills.map((skill, index) => (
                              <div
                                key={index}
                                className="flex w-fit p-1  bg-gray-900 rounded-lg items-center justify-evenly"
                              >
                                <Badge className="bg-transparent text-foreground text-sm ">
                                  {skill}
                                </Badge>
                                <div
                                  onClick={() => removeSkill(skill)}
                                  className="w-5 hover:cursor-pointer"
                                >
                                  <RxCross1 size={15} />
                                </div>
                              </div>
                            ))}
                        </div>
                      </CardFooter>
                    </Card>
                  </TabsContent>

                  <TabsContent value="portfolio">
                    <Card className=" h-fit">
                      <CardHeader>
                        <CardTitle>Add Portfolio</CardTitle>
                        <CardDescription>
                          You can add upto three portfolios for your profile.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="w-full  grid grid-flow-col grid-cols-4">
                          <div className="w-fit">
                            <div className="  add-portfolio  border-2 border-dashed rounded-sm border-gray-600 w-52 h-52">
                              <div className=" flex gap-3 hover:cursor-pointer w-full h-full items-center justify-center">
                                <div
                                  onClick={() =>
                                    setisPortfolioCreateModel(true)
                                  }
                                >
                                  <div className="btn-symbol flex items-center justify-center">
                                    <IoIosAddCircleOutline size={20} />
                                  </div>
                                  <div className="btn-holder flex items-end text-md mt-3">
                                    <p>Add Portfolio</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {portfolios.length > 0 &&
                            portfolios.map((portfolio) => (
                              <div
                                key={portfolio.listing_id}
                                className="w-fit "
                              >
                                <div
                                  onMouseEnter={() => setShowRemoveBtn(true)}
                                  onMouseLeave={() => setShowRemoveBtn(false)}
                                  className="portfolio-holder  border-2 border-dashed relative rounded-sm border-gray-600 w-52 h-52"
                                >
                                  <div
                                    className={`portfolio-remove-btn-wrapper ${
                                      showRemoveBtn ? "block " : "hidden"
                                    }   bg-transparent absolute w-full h-1/3 flex justify-center items-center `}
                                  >
                                    <div
                                      className="hover:cursor-pointer "
                                      onClick={() =>
                                        removePortfolio(portfolio.listing_id)
                                      }
                                    >
                                      <RxCross1 size={18} />
                                    </div>
                                  </div>
                                  <div className=" flex gap-3 hover:cursor-pointer w-full h-full items-center justify-center">
                                    <div>
                                      <div className="btn-holder flex items-end text-md mt-3">
                                        <p>{portfolio.title}</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}

                          {/* <div className="w-fit ">
                              <div className="add-portfolio  border-2 border-dashed rounded-sm border-gray-600 w-52 h-52">
                                <div className=" flex gap-3 hover:cursor-pointer w-full h-full items-center justify-center">
                                  <div>
                                    <div className="btn-holder flex items-end text-md mt-3">
                                      <p>Portfolio 2</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div> */}

                          {/* <div className="w-fit ">
                              <div className="add-portfolio  border-2 border-dashed rounded-sm border-gray-600 w-52 h-52">
                                <div className=" flex gap-3 hover:cursor-pointer w-full h-full items-center justify-center">
                                  <div>
                                    <div className="btn-holder flex items-end text-md mt-3">
                                      <p>Portfolio 3</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div> */}
                        </div>
                      </CardContent>
                      <CardFooter>
                        {isPortfolioCreateModel && (
                          <div className="portfolio-form w-full">
                            <PortfolioCreateComponent
                              isModelOpen={isPortfolioCreateModel}
                              closeModel={setisPortfolioCreateModel}
                            />
                          </div>
                        )}
                      </CardFooter>
                    </Card>
                  </TabsContent>
                </ScrollArea>
              </Tabs>
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            
              <Button onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button onClick={() => handleSubmit()}>Save</Button>
            
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
}

export default WorkProfileCreator;
