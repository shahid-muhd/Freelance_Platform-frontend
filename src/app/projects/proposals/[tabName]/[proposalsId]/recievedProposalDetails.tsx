import {
  PrePaymentDetails,
  Proposal,
  proposalStatus,
  WorkProfile,
} from "@/utils/types/types";
import React, { useState } from "react";
import { LuDollarSign } from "react-icons/lu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import useProjectProposalServices from "@/app/services/projectProposalServices";
import { TbHelpSquareRounded } from "react-icons/tb";
import Link from "next/link";
import StripeCheckout from "@/components/payment/stripeCheckout";
import { PopoverClose } from "@radix-ui/react-popover";
import downloadFile from "@/utils/controllers/fileDownloader";
type Props = {
  proposal: Proposal | undefined;
  workProfile: WorkProfile | undefined;
  paymentAddress: PrePaymentDetails;
  changeProposalStatus: (status: proposalStatus) => void;
};

function RecievedProposalDetails(props: Props) {
  const [proposal, setProposal] = useState(props.proposal);
  const changeProposalStatus = props.changeProposalStatus;
  const paymentAddress = props.paymentAddress;

  const { terminateContractService, approveWork } =
    useProjectProposalServices();

  const approveWorkHandler = (work_type: "sample" | "final") => {
    proposal &&
      approveWork(proposal?.id, work_type, setProposal).then(() => {});
  };

  const handleTermination = () => {
    proposal && terminateContractService(proposal.id);
  };
  return (
    <div className="border rounded-lg p-8">
      <div className="space-y-5 divide-y-2">
        <div className="proposal-overview  relative ">
          <div className="absolute right-0 top-0 ">
            <TooltipProvider>
              <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                  <p>{proposal?.created_date.split("T")[0]}</p>
                </TooltipTrigger>
                <TooltipContent
                  align="end"
                  alignOffset={50}
                  className="bg-secondary text-sm text-secondary-foreground "
                >
                  <p>Proposal Recieved Date</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="space-y-5  pt-10 md:pt-0">
            <div className="proposal-title font-bold text-2xl">
              <h2>Project : {proposal?.project_title}</h2>
            </div>
            {proposal?.status == "accepted" && !proposal.is_advance_paid && (
              <div className="text-muted-foreground flex items-center gap-2">
                <div>
                  <h5>
                    You have accepted this proposal. Pay advance to start the
                    work
                  </h5>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="hover:cursor-pointer">
                      <TbHelpSquareRounded size={23} />
                    </div>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogDescription className="text-lg">
                        The advance amount paid will not be credited to the
                        freelancers account until you approve the first stage of
                        work.
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
            )}
            <div className="bid-details flex gap-3 capitalize text-xl font-medium">
              <div>
                <p>Bid Amount :</p>
              </div>
              <div className="bid-amount flex gap-3 items-center">
                <p> {proposal?.bid_amount}</p>
                <div>
                  <LuDollarSign size={23} />
                </div>
              </div>
            </div>

            <div className="freelancer-details flex gap-3 capitalize text-xl font-medium">
              <div>
                <p>Freelancer :</p>
              </div>
              <div className="freelancer-name">
                <p> {proposal?.freelancer_name}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="supporing-content-view pt-5  ">
          <div className="font-semibold flex">
            <div>
              <Link href={`/user/workprofiles/${proposal?.work_profile}`}>
                <Button variant={"link"}> View work profile</Button>
              </Link>
            </div>
            {proposal?.document && (
              <div>
                <Button
                  onClick={() => {
                    downloadFile(
                      proposal?.document,
                      proposal?.freelancer_name + "attatchment.pdf"
                    );
                  }}
                  variant={"link"}
                >
                  View attatched document
                </Button>
              </div>
            )}
          </div>
        </div>
        <div className="proposal-cover-letter text-base py-10 ">
          <div className="font-semibold">
            <h4>Cover Letter</h4>
          </div>
          <div className="p-3  w-10/12 text-justify leading-7">
            <div className="bg-secondary rounded-md  p-3">
              <p>{proposal?.cover_letter}</p>
            </div>
          </div>
        </div>

        {proposal?.accepted_work !== "final" && (
          <div className="relative proposal-control-btn flex gap-5 w-full justify-end pt-5">
            <div>
              {proposal?.status == "unanswered" && (
                <Button variant={"outline"}>Shortlist Proposal</Button>
              )}
            </div>
            {!proposal?.is_advance_paid && (
              <div>
                <Button variant={"outline"}>Reject Proposal</Button>
              </div>
            )}
            <div>
              {proposal?.status == "accepted" ? (
                <div className="flex gap-5">
                  {!proposal.is_advance_paid ? (
                    <div>
                      <Button
                        onClick={() => changeProposalStatus("unanswered")}
                        variant={"secondary"}
                      >
                        Revoke Acceptance
                      </Button>
                    </div>
                  ) : (
                    <div className="  flex ">
                      <div className="absolute left-0">
                        <Button
                          onClick={handleTermination}
                          variant={"destructive"}
                        >
                          Terminate Work Contract
                        </Button>
                      </div>
                      {!proposal.accepted_work && (
                        <div>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant={"secondary"}>
                                Accept Sample Work
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-80">
                              <div className="w-full space-y-3">
                                <div>
                                  <p>
                                    Accepting a sample work initiates a
                                    non-refundable adavnce payout to the
                                    freelancer
                                  </p>
                                </div>

                                <div className="w-100 flex gap-3 justify-end">
                                  <PopoverClose>
                                    <Button variant={"outline"}> Cancel</Button>
                                  </PopoverClose>
                                  <Button
                                    onClick={() => approveWorkHandler("sample")}
                                    variant={"secondary"}
                                  >
                                    Confirm
                                  </Button>
                                </div>
                              </div>
                            </PopoverContent>
                          </Popover>
                        </div>
                      )}
                      {proposal.accepted_work == "sample" && (
                        <div>
                          <StripeCheckout
                            productType="payment"
                            pricingName={paymentAddress?.final_pricing_id}
                          >
                            <Button>Approve Final Work</Button>
                          </StripeCheckout>
                        </div>
                      )}
                    </div>
                  )}
                  <div>
                    {!proposal.is_advance_paid && (
                      <StripeCheckout
                        productType="payment"
                        pricingName={paymentAddress?.advance_pricing_id}
                      >
                        <Button>Pay Advance Amount</Button>
                      </StripeCheckout>
                    )}
                  </div>
                </div>
              ) : (
                <Button
                  onClick={() => changeProposalStatus("accepted")}
                  variant={"secondary"}
                >
                  Accept Propoal
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecievedProposalDetails;
