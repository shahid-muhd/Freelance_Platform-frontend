"use client";
import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useApplicationContext } from "@/utils/context/stateContextProviders";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useWorkProfileServices from "@/app/services/workProfileServices";
import useWorkProfileStore from "@/stores/workProfileStore";
import { ProjectApplicationType } from "@/utils/types/types";
import useProjectProposalServices from "@/app/services/projectProposalServices";
type Props = {
  budget: string;
  projectId: string;
};

function ProjectApplication(props: Props) {
  const { submitProposal } = useProjectProposalServices();
  const { isSheetOpen, setIsSheetOpen } = useApplicationContext();
  const { workProfiles } = useWorkProfileStore();
  const { getWorkProfiles } = useWorkProfileServices();
  const [applicationData, setApplicationData] =
    useState<ProjectApplicationType>({
      bid: "",
      coverLetter: "",
      document: null,
      workProfile: "",
      project: props.projectId,
    });
  const closeSheet = () => {
    setIsSheetOpen(false);
  };


  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    let cleanedValue = value;

    setApplicationData((prevData) => ({
      ...prevData,
      [name]: cleanedValue,
    }));
  };
  const handleWorkProfileSelector = (id: string) => {
    setApplicationData((prevData) => ({
      ...prevData,
      ["workProfile"]: id,
    }));
  };

  const uploadDocument = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target.files ? e.target.files[0] : null;

    setApplicationData({
      ...applicationData,
      document: file,
    });
  };

  useEffect(() => {
    getWorkProfiles({ userSpecific: true });
  }, []);

  const handleApplicationSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    submitProposal(applicationData).then(() => {
      setApplicationData({
        bid: "",
        coverLetter: "",
        document: null,
        workProfile: "",
        project: props.projectId,
      })
      setIsSheetOpen(false)
    });
  };
  return (
    <div>
      <Sheet open={isSheetOpen}>
        <SheetContent className="min-w-[55%]" onInteractOutside={closeSheet}>
          <SheetHeader>
            <SheetTitle>Apply For Project</SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          <div className="h-full">
            <ScrollArea className="w-full h-full">
              <form className=" h-full" onSubmit={handleApplicationSubmit}>
                <div className="grid gap-10 py-4 h-full">
                  <div className="grid grid-cols-4 items-center space-x-8 gap-4">
                    <div className="space-y-1">
                      <Label className="text-md" htmlFor="bid">
                        Your Bid
                      </Label>
                      <div className="text-sm">
                        <p>Total amount the client will see on your proposal</p>
                      </div>
                    </div>
                    <div className="col-span-1">
                      <Input
                        value={applicationData.bid}
                        // onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('Enter User Name Here')}
                        id="bid"
                        name="bid"
                        required
                        type="number"
                        min={0}
                        max={props.budget}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="w-full flex gap-10 text-base  ">
                    <div className="w-1/2 space-y-2">
                      <h6>Select Work Profile</h6>
                      <Select
                        required
                        onValueChange={(value: string) =>
                          handleWorkProfileSelector(value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          {workProfiles &&
                            workProfiles.map((profile) => (
                              <SelectItem
                                key={profile.id}
                                value={`${profile.id}`}
                              >
                                {profile.title}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="w-1/2 space-y-2">
                      <h6>Supporting Documents</h6>
                      <Input
                        name="document"
                        id="spporting_docs"
                        type="file"
                        onChange={uploadDocument}
                      />
                    </div>
                  </div>
                  <div className="grid grid-flow-row  items-center  gap-4">
                    <div>
                      <h4>Cover Letter</h4>
                    </div>

                    <div className="col-span-2">
                      <Textarea
                        name="coverLetter"
                        id="cover_letter"
                        className="w-full min-h-48 max-h-80"
                        placeholder=""
                        value={applicationData.coverLetter}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                <SheetFooter className=" absolute right-5 bottom-10">
                  <Button onClick={closeSheet} variant={"outline"}>
                    Cancel
                  </Button>

                  <Button type="submit">Send Application</Button>
                </SheetFooter>
              </form>
            </ScrollArea>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default ProjectApplication;
