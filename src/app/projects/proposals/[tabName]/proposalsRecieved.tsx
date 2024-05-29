"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import useProjectProposalServices from "@/app/services/projectProposalServices";
import { ProjectApplicationType, Proposal, ProposalFilterCondition } from "@/utils/types/types";
import { Button } from "@/components/ui/button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { LuCopy } from "react-icons/lu";
import useClipboard from "@/utils/clipboardAccessor";
import Link from "next/link";
import UserView from "@/components/userView/UserView";
import { Label } from "@/components/ui/label";
function ProposalsRecieved() {
  const [proposals, setproposals] = useState<Proposal[]>([]);
  const { getProposalService } = useProjectProposalServices();
  const { copyToClipboard } = useClipboard();
  const [userViewState, setUserViewState] = useState(false);
  const [userViewUser, setuserViewUser] = useState(0);

  const [filterCondition, setfilterCondition] = useState<ProposalFilterCondition>('all')
  useEffect(() => {
    getProposalService({type:"received",filterCondition}).then((proposalList) => {
      proposalList && setproposals(proposalList as Proposal[]);
    });
  }, [filterCondition]);
  const handleFilterChange = (value:string) => {
   setfilterCondition(value as ProposalFilterCondition)
   
  };
  return (
    <div>
      <UserView
        userViewState={userViewState}
        setUserViewState={setUserViewState}
        userId={userViewUser}
      />
      <div>
        <RadioGroup onValueChange={handleFilterChange} defaultValue='all'>
          <div className="flex gap-5">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all_radio" />
              <Label htmlFor="all_proposals">All Proposals</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="accepted" id="accepted_radio" />
              <Label htmlFor="accepted_radio">Accepted</Label>
            </div>

            <div className="flex items-center space-x-2">
              <RadioGroupItem value="unanswered" id="unanswered_proposals" />
              <Label htmlFor="unanswered_proposals">Unanswered</Label>
            </div>
          </div>
        </RadioGroup>
      </div>
      <div className="mt-5">
        <Table>
          <TableCaption>
            Proposals received for your published projects
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]"></TableHead>
              <TableHead>Project</TableHead>
              <TableHead>Freelancer</TableHead>
              <TableHead className="">Bid Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {proposals &&
              proposals.map((proposal, index) => (
                <TableRow key={proposal.id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{proposal.project_title}</TableCell>
                  <TableCell>
                    <div className="flex gap-3 items-center capitalize">
                      {proposal.freelancer_name}{" "}
                      <span
                        onClick={() =>
                          copyToClipboard(proposal.freelancer_name)
                        }
                        className="w-fit"
                      >
                        <LuCopy
                          size={12}
                          className="hover:text-muted-foreground"
                        />
                      </span>{" "}
                    </div>
                  </TableCell>
                  <TableCell className="">$ {proposal.bid_amount}</TableCell>
                  <TableCell className="">
                    {proposal.created_date.split("T")[0]}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <DotsHorizontalIcon className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="min-w-44" align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>

                        <DropdownMenuItem>
                          <Link
                            href={`/projects/proposals/received/${proposal.id}`}
                          >
                            View Proposal
                          </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={() => {
                            setuserViewUser(proposal.applicant);
                            setUserViewState(true);
                          }}
                        >
                          View Freelancer
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Save Proposal</DropdownMenuItem>

                        <DropdownMenuItem>Reject Proposal</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default ProposalsRecieved;
