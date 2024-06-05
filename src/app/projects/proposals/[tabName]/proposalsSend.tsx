"use client";
import React, { useEffect, useState } from "react";
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
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import useProjectProposalServices from "@/app/services/projectProposalServices";
import {
  Proposal,
  ProposalFilterCondition,
} from "@/utils/types/types";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { TbHelpSquareRounded } from "react-icons/tb";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

function ProposalsSend() {
  const [proposals, setproposals] = useState<Proposal[]>([]);
  const { getProposalService,terminateContractService } = useProjectProposalServices();

  const [filterCondition, setfilterCondition] =
    useState<ProposalFilterCondition>("all");
  useEffect(() => {
    getProposalService({ type: "send", filterCondition }).then(
      (proposalList) => {
        proposalList && setproposals(proposalList as Proposal[]);
      }
    );
  }, [filterCondition]);
  const handleFilterChange = (value: string) => {
    setfilterCondition(value as ProposalFilterCondition);
  };
  return (
    <div>
      <div>
        <RadioGroup onValueChange={handleFilterChange} defaultValue="all">
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
          <TableCaption>Proposals you have send</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]"></TableHead>
              <TableHead>Project</TableHead>
              <TableHead className="">Bid Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>
                <div className="flex gap-3 items-center  ">
                  Payment Status{" "}
                  <span>
                    <Popover>
                      <PopoverTrigger>
                        <TbHelpSquareRounded
                          size={16}
                          className="hover:cursor-pointer"
                        />
                      </PopoverTrigger>
                      <PopoverContent draggable>
                        <div>
                          <p>
                            You can start the work if advance has been initiated
                          </p>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </span>
                </div>{" "}
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {proposals &&
              proposals.map((proposal, index) => (
                <TableRow key={proposal.id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell className="w-72  truncate text-ellipsis">
                    {proposal.project_title}
                  </TableCell>

                  <TableCell className="">$ {proposal.bid_amount}</TableCell>
                  <TableCell className="">
                    {proposal.created_date.split("T")[0]}
                  </TableCell>
                  <TableCell className="">{proposal.status}</TableCell>
                  <TableCell className="">
                    {proposal.is_advance_paid && !proposal.accepted_work ? (
                      <Badge variant={"secondary"} className="text-sm">
                        Advance Initiated
                      </Badge>
                    ) : proposal.accepted_work == "sample" ? (
                      "Advance Received"
                    ) : proposal.accepted_work == "final" ? (
                      "Final Payment Credited"
                    ) : (
                      "No Payments"
                    )}
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
                          <Link href={`/projects/${proposal.project}`}>
                            View Project
                          </Link>
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        {!proposal.is_advance_paid ? (
                          <>
                            <DropdownMenuItem onClick={()=>terminateContractService(proposal.id)} >Cancel Proposal</DropdownMenuItem>
                          </>
                        ) : (
                          proposal.accepted_work !== "final" && (
                            <>
                              <DropdownMenuItem>
                                Terminate Contract
                              </DropdownMenuItem>
                            </>
                          )
                        )}
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

export default ProposalsSend;
