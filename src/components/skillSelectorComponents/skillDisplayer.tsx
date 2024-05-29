import { SkillsType } from "@/utils/types/types";
import React, { useEffect, useState } from "react";
import { SkillSearchComponent } from "./skillSearchComponent";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { RxCross1 } from "react-icons/rx";
import useWorkProfileServices from "@/app/services/workProfileServices";

type Props = {
  skills: SkillsType;
  setSkills: (skill:string|string[])=>void;
};

function SkillDisplayer(props:Props) {
 
  const [skillInput, setskillInput] = useState("");
  const [skillsAvailable, setSkillsAvailable] = useState([""]);
  const { getSkillSuggestion } = useWorkProfileServices();

  useEffect(() => {
    let query = skillInput;


    if (query) {
      getSkillSuggestion(query).then((response): void => {
    

        setSkillsAvailable(response.data);
     
      });
    }
  }, [skillInput]);

  const addSkill = (skill: string) => {
    if ((props.skills?.length && props.skills.length >= 10) || props.skills?.includes(skill)) {
      return false;
    } else {
      props.setSkills(skill)
      setskillInput('')
    }
  };

  const removeSkill = (removableSkill: string) => {
    if (removableSkill && props.skills) {
      const updatedSkills = props.skills.filter((skill) => skill !== removableSkill);
      props.setSkills(updatedSkills);
    }
  };

  return (
    <div className="skill-select-wrapper space-y-5">
      <div className="mt-5">
        <Input
          id="skill-input"
          type="text"
          placeholder="Start typing your skills..."
          value={skillInput}
          onChange={(e) => setskillInput(e.target.value)}
        />
      </div>
      <div>
        <SkillSearchComponent
       
          skillsAvailable={skillsAvailable}
          addSkill={addSkill}
        />
      </div>

      <div className="skills-listing">
        <div className="space-y-2 p-1  grid  grid-flow-row grid-cols-2 sm:grid-cols-3 w-full h-fit">
          {props.skills &&
            props.skills.map((skill, index) => (
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
      </div>
    </div>
  );
}

export default SkillDisplayer;
