"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverAnchor,
} from "@/components/ui/popover";

import { useEffect, useState } from "react";
import useWorkProfileServices from "@/app/services/workProfileServices";

import { ScrollArea } from "@/components/ui/scroll-area";
import { RxCross1 } from "react-icons/rx";

type Props = {
  skillsAvailable: string[];
  addSkill: (skill: string) => void;
};
export function SkillSearchComponent(props: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const addSkill = props.addSkill;
  useEffect(() => {
    if (props.skillsAvailable.length > 0) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [props.skillsAvailable]);

  return (
    <div>
      <Popover open={isOpen}>
        <PopoverAnchor />
        <PopoverContent>
          <div className="close-btn w-full flex justify-end">
            <RxCross1
              className="hover:cursor-pointer"
              onClick={() => setIsOpen(false)}
              size={15}
            />
          </div>
          <ScrollArea>
            <div>
              {props.skillsAvailable &&
                props.skillsAvailable.map((skill, index) => (
                  <div
                    key={index}
                    className="hover:cursor-pointer leading-7"
                    onClick={() => {
                      addSkill(skill);
                      setIsOpen(false);
                    }}
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
