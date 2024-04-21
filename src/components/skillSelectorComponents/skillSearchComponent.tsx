"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useEffect, useState } from "react";
import workProfileServices from "@/app/services/workProfileServices";
import { PopoverAnchor } from "@radix-ui/react-popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RxCross1 } from "react-icons/rx";

type Props = {
  skills: string[] | null;
  skillsAvailable: string[];
  addSkill: (skill: string) => void;
};
export function SkillSearchComponent(props: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const addSkill=props.addSkill
  useEffect(() => {
    if (props.skillsAvailable.length > 1) {
      setIsOpen(true);
    }
  }, [props.skillsAvailable]);


  return (
    <div>
      <Popover open={isOpen}>
        <PopoverAnchor />
        <PopoverContent>
          <div className="close-btn w-full flex justify-end">
          <RxCross1 className="hover:cursor-pointer" onClick={()=>setIsOpen(false)} size={15}/>  
          </div>
          <ScrollArea>
            <div>
              {props.skillsAvailable &&
                props.skillsAvailable.map((skill,index) => (
                  <div
                  key={index}
                    className="hover:cursor-pointer leading-7"
                    onClick={() => addSkill(skill)}
                  >
                    {skill}
                  </div>
                ))}
            </div>
          </ScrollArea>
        </PopoverContent>
      </Popover>
    </div>
  );
}

// const [open, setOpen] = React.useState(false);
// const [value, setValue] = React.useState("");
