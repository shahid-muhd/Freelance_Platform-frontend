"use client";

import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { addDays, format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  date: Date |undefined;
  setDate: React.Dispatch<React.SetStateAction<any>>;
};
export default function DatePicker(props: Props) {

  
  React.useEffect(() => {
   props.setDate(props.date)
  }, [props.date]);

  const assignDate = (date: any) => {
    props.setDate(date.toISOString().split("T")[0]);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !props.date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {props.date ? format(props.date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="flex w-auto flex-col space-y-2 p-2"
      >
        <Select
          onValueChange={(value: string) =>
            props.setDate(addDays(new Date(), parseInt(value)))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="7">In a week</SelectItem>
            <SelectItem value="30">In a month</SelectItem>
            <SelectItem value="90">In three Months</SelectItem>
            <SelectItem value="180">In six months</SelectItem>
          </SelectContent>
        </Select>
        <div className="rounded-md border">
          <Calendar
            disabled={(date) =>
              date < new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)
            }
            mode="single"
            selected={props.date}
            onSelect={assignDate}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
