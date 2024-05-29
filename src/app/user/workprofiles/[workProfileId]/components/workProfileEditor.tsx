import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SkillsType, WorkProfile } from "@/utils/types/types";
import { SkillSearchComponent } from "@/components/skillSelectorComponents/skillSearchComponent";
import { Badge } from "@/components/ui/badge";
import { RxCross1 } from "react-icons/rx";
import useWorkProfileServices from "@/app/services/workProfileServices";
import SkillDisplayer from "@/components/skillSelectorComponents/skillDisplayer";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  workProfile: WorkProfile;
  setWorkProfile: React.Dispatch<React.SetStateAction<WorkProfile | undefined>>;
};

function WorkProfileEditor(props: Props) {
  const [skillInput, setskillInput] = useState("");
  const [skillsAvailable, setSkillsAvailable] = useState([""]);
  const { getSkillSuggestion, updateWorkProfileService } =
    useWorkProfileServices();

  const [workProfile, setWorkProfile] = useState<WorkProfile>(
    props.workProfile
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setWorkProfile((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // useEffect(() => {
  //   if (skillInput) {
  //     getSkillSuggestion(skillInput).then((response): void => {
  //       console.log(response.data);

  //       setSkillsAvailable(response.data);
  //     });
  //   }
  // }, [skillInput]);

  const handleSkillsChange = (newSkill: string | string[]) => {
    let clonedWorkProfile = { ...workProfile };
    if (Array.isArray(newSkill)) {
      console.log(newSkill);
      clonedWorkProfile.skills = newSkill;
    } else {
      if (clonedWorkProfile) {
        clonedWorkProfile.skills?.push(newSkill as string);
      }
    }
    setWorkProfile(clonedWorkProfile);
  };

  const closeEditor = () => {
    props.setWorkProfile((prevWorkProfile) => ({
      ...prevWorkProfile,
      ...workProfile,
    }));
    props.setIsOpen(false);
  };

  const handleSave = () => {
    updateWorkProfileService(workProfile, workProfile.id).then(() => {
      closeEditor();
    });
  };
  return (
    <div>
      <Sheet open={props.isOpen}>
        <SheetContent className="min-w-[50%]">
          <SheetHeader>
            <SheetTitle>Edit Work Profile</SheetTitle>
            <SheetDescription>
              Make changes to your work profile here. Click save when you&apos;re
              done.
            </SheetDescription>
          </SheetHeader>
          <div className="space-y-3 mt-3">
            <div >
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                name="title"
                onChange={handleInputChange}
                value={workProfile.title}
               
              />
            </div>
            <div >
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                name="description"
                value={workProfile.description}
                className=""
                onChange={handleInputChange}
              />
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Add Skills</CardTitle>
                <CardDescription>
                  You can add upto 10 skills matching this profile.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2  ">
                <SkillDisplayer
                  skills={workProfile.skills as SkillsType}
                  setSkills={handleSkillsChange}
                />
              </CardContent>
            </Card>
          </div>
          <SheetFooter className="absolute bottom-4 right-3">
            <SheetClose asChild>
              <Button variant={"outline"} onClick={closeEditor}>
                Cancel
              </Button>
            </SheetClose>
            <SheetClose asChild>
              <Button variant={"secondary"} onClick={handleSave} type="submit">
                Save changes
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default WorkProfileEditor;
