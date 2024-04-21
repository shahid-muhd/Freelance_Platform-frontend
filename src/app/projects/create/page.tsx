"use client";
import React, { useEffect, useState } from "react";
import { message, Steps, theme } from "antd";
import { Button } from "@/components/ui/button";
import {
  budgetValidator,
  nameValidator,
} from "@/utils/validators/formValidators";
import { IoIosAddCircleOutline } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import { RxCross1, RxCrossCircled } from "react-icons/rx";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SkillSearchComponent } from "@/components/skillSelectorComponents/skillSearchComponent";
import { SkillsType } from "@/utils/types";
import workProfileServices from "@/app/services/workProfileServices";
import { Badge } from "@/components/ui/badge";
import DatePicker from "@/components/DatePicker/DatePicker";
import SkillDisplayer from "@/components/skillSelectorComponents/skillDisplayer";
import useProjectCrudServices from "@/app/services/projectCrudServices";

const CreateProject: React.FC = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [bulletSecondary, setBulletSecondary] = useState(false);
  const [newFeature, setNewFeature] = useState("");
  const [featureModel, setfeatureModel] = useState(false);
  const [skills, setSkills] = useState<SkillsType>(null);
  const [deadLine, setDeadLine] = useState<Date>()
  const {createProject}=useProjectCrudServices()
  const [freelancerExpertise, setfreelancerExpertise] =
    useState("intermediate");

  const { toast } = useToast();
  const [projectOverview, setProjectOverview] = useState({
    title: "",
    description: "",
    budget: "30",
  });

  const [features, setFeatures] = useState([
    {
      id: 1,
      name: "feature 1",
    },
  ]);
  

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    let cleanedValue = value;
    if (name == "budget") {
      console.log("budget");
    } else {
      cleanedValue = nameValidator(value);
    }

    setProjectOverview((prevData) => ({
      ...prevData,
      [name]: cleanedValue,
    }));
  };

  const openFeatureModel = () => {
    if (features.length >= 10) {
      toast({
        description: "Remove existing features to add more !!",
      });
    } else {
      setfeatureModel(true);
    }
  };

  const addFeature = () => {
    const existingFeatureCount = features.length;
    if (!newFeature) {
      return toast({
        description: "Field must not be empty",
      });
    }
    if (existingFeatureCount < 10) {
      let cleanedValue = nameValidator(newFeature);
      let addedFeature = { id: existingFeatureCount + 1, name: cleanedValue };
      setFeatures((prevData) => [...prevData, addedFeature]);
    } else {
      toast({
        description: "Remove existing features to add more !!",
      });
      setfeatureModel(false);
    }
  };

  const removeFeature = (id: number) => {
    const updatedFeatures = features.filter((feature) => feature.id != id);

    setFeatures(updatedFeatures);
  };

  const handleSubmit = () => {
    createProject(projectOverview,features,deadLine,freelancerExpertise,skills)
  };

  const steps = [
    {
      title: "Overview",
      content: (
        <div className="flex items-center justify-center text-2xl h-full ">
          <div className="w-2/3 ">
            <div className="flex gap-10 h-1/2 w-full ">
              <div className="input-title w-1/3 text-left">Project Title</div>

              <div className="w-full ">
                <input
                  name="title"
                  value={projectOverview.title}
                  onChange={handleInputChange}
                  className="rounded-md h-10 w-full"
                  type="text"
                />
              </div>
            </div>

            <div className="flex gap-10 h-1/2 w-full mt-10  ">
              <div className="input-title w-1/3 text-left">
                Project Description
              </div>

              <div className="w-full ">
                <textarea
                  name="description"
                  value={projectOverview.description}
                  onChange={handleInputChange}
                  className="rounded-md h-16 max-h-36 w-full"
                />
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Features",
      content: (
        <div className="w-full h-full p-3 relative">
          <div className="features-wrapper text-left mt-28 md:mt-20 lg:mt-16  w-2/3">
            <div className="add-feature-btn">
              <div className=" w-fit ">
                {" "}
                <div
                  onClick={openFeatureModel}
                  className="flex gap-3 text-lg  hover:cursor-pointer"
                >
                  <p>Add Features</p>
                  <p className="flex items-end">
                    <span>
                      <IoIosAddCircleOutline size={23} />
                    </span>
                  </p>
                </div>
                <Dialog open={featureModel}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Feature</DialogTitle>
                      <DialogDescription>
                        <div className="p-3">
                          <Input
                            type="text"
                            placeholder="Enter feature"
                            value={newFeature}
                            onChange={(e) => setNewFeature(e.target.value)}
                          />
                        </div>
                      </DialogDescription>
                      <DialogFooter>
                        <Button onClick={() => setfeatureModel(false)}>
                          Close
                        </Button>
                        <Button onClick={addFeature}>Save</Button>
                      </DialogFooter>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <ScrollArea className="h-72  rounded-md ">
              <div className="feature-listing-wrapper mt-3">
                {features &&
                  features.map((feature) => (
                    <div
                      key={feature.id}
                      onMouseEnter={() => setBulletSecondary(true)}
                      onMouseLeave={() => setBulletSecondary(false)}
                      className="feature-listing flex items-center gap-2 text-md leading-10 "
                    >
                      <div className="bullet">
                        {!bulletSecondary ? (
                          <div className="bullet-primary">
                            <GoDotFill size={23} />
                          </div>
                        ) : (
                          <div
                            onClick={() => removeFeature(feature.id)}
                            className="bullet-secondary"
                          >
                            <RxCrossCircled size={23} />
                          </div>
                        )}
                      </div>

                      <div>{feature.name}</div>
                    </div>
                  ))}
              </div>
            </ScrollArea>
          </div>

          <div className="features-title text-left md:text-right absolute top-3 md:right-10 ">
            <div className="features-title-wrapper text-3xl sm:text-4xl">
              <h2>Features List</h2>
            </div>
            <div className="features-description text-base sm:text-lg  mt-3">
              List out upto 10 key features that must be included in your
              project
            </div>

            <div className="skill-search-wrapper"></div>
          </div>
        </div>
      ),
    },
    {
      title: "Preferences",
      content: (
        <div className="w-full h-full p-3 ">
          <ScrollArea className="h-96  rounded-md ">
            <section className="skillset-wrapper text-left ">
              <div className="skillset-title-wrapper text-3xl sm:text-4xl">
                <h2>Preffered Skillset (Optional)</h2>
              </div>
              <div className="skillset-description text-base sm:text-lg  mt-3">
                Choose upto 8 skills to filter out freelancers
              </div>

              <SkillDisplayer skills={skills} setSkills={setSkills} />
            </section>
            <div className="flex h-full">
              <div className="budget-wrapper flex items-center justify-end p-5  w-1/2 ">
                <div className="flex gap-3">
                  <div>
                    <h3 className="text-2xl">Add Budget</h3>
                    <p className="text-base">(Above 30 dollars)</p>
                  </div>

                  <div>
                    <Input
                      name="budget"
                      type="number"
                      min={30}
                      max={15000}
                      className="w-60 h-9"
                      value={projectOverview.budget}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              <div className="deadline-wrapper flex items-center justify-start p-5 w-1/2 ">
                <div className="flex  gap-3">
                  <div>
                    <h3 className="text-2xl">Deadline</h3>
                    <p className="text-base">(Default : 30 days )</p>
                  </div>

                  <div>
                    <DatePicker date={deadLine}  setDate={setDeadLine}/>
                  </div>
                </div>
              </div>

              <div className="  expertise-wrapper flex items-center justify-start p-5 w-1/2 ">
                <div className="flex  gap-3">
                  <div>
                    <h3 className="text-2xl">Expertise</h3>
                    <p className="text-base">
                      (Preffered expertise of freelancer )
                    </p>
                  </div>
                  <div className="inline-block">
                    <Select
                      value={freelancerExpertise}
                      onValueChange={(value: string) =>
                        setfreelancerExpertise(value)
                      }
                    >
                      <SelectTrigger className="w-60 h-10">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="entry_level">Entry Level</SelectItem>
                        <SelectItem value="intermediate">
                          Intermediate
                        </SelectItem>
                        <SelectItem value="expert">Expert</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
            <section></section>
          </ScrollArea>
        </div>
      ),
    },
  ];

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const contentStyle: React.CSSProperties = {
    height: "460px",
    textAlign: "center",
    borderRadius: token.borderRadiusLG,
    border: `1px solid ${token.colorBorder}`,
    marginTop: 16,
    padding: 16,
  };

  return (
    <>
      <div className="p-5">
        <Steps current={current} items={items} />
        <div style={contentStyle}>{steps[current].content}</div>
        <div className="flex justify-end" style={{ marginTop: 24 }}>
          {current > 0 && (
            <Button
              variant={"outline"}
              style={{ margin: "0 8px" }}
              onClick={() => prev()}
            >
              Previous
            </Button>
          )}
          {current < steps.length - 1 && (
            <Button variant={"secondary"} onClick={() => next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button onClick={handleSubmit}>
              Done
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default CreateProject;
