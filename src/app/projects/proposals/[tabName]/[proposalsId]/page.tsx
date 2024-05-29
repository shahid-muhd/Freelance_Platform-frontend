"use client";
import React, { useEffect, useState } from "react";
import RecievedProposalDetails from "./recievedProposalDetails";
import SendProposlDetails from "./sendProposlDetails";
import useProjectProposalServices from "@/app/services/projectProposalServices";
import {
  PrePaymentDetails,
  Proposal,
  proposalStatus,
  WorkProfile,
} from "@/utils/types/types";
import useWorkProfileServices from "@/app/services/workProfileServices";
import usePaymentSerives from "@/app/services/paymentSerives";

type TabName = "send" | "received";
function Page({
  params,
}: {
  params: { tabName: TabName; proposalsId: string };
}) {
  const { tabName, proposalsId } = params;
  const { getProposalService } = useProjectProposalServices();
  const { getWorkProfiles } = useWorkProfileServices();
  const [proposal, setProposal] = useState<Proposal>();
  const [workProfile, setworkProfile] = useState<WorkProfile>();
  const { proposalStatusChangeService } = useProjectProposalServices();
  const [paymentAddress, setPaymentAddress] = useState<PrePaymentDetails>();
  const { getPaymentAddressService } = usePaymentSerives();
  useEffect(() => {
    getProposalService({ type: tabName, proposalId: proposalsId }).then(
      (proposalDetails) => {
        setProposal(proposalDetails as Proposal);
      }
    );
  }, []);

  useEffect(() => {
    if (proposal) {
      getWorkProfiles({
        userSpecific: false,
        slug: proposal?.work_profile,
      }).then((workProfile) => {
        setworkProfile(workProfile as WorkProfile);
      });

      getPaymentAddress();
    }
  }, [proposal]);

  const getPaymentAddress = () => {
    proposal &&
      setTimeout(() => {
        getPaymentAddressService(proposal.project, proposal.applicant).then(
          (data) => {
            console.log("fetched paymemt detils", data);

            setPaymentAddress(data);
          }
        );
      }, 1000);
  };

  const changeProposalStatus = async (status: proposalStatus) => {
    try {
      proposal && (await proposalStatusChangeService(proposal?.id, status));
      setProposal((prevData) => {
        if (!prevData) return prevData;
        return {
          ...prevData,
          status: status,
        };
      });
      getPaymentAddress();
    } catch (err: any) {}
  };

  return (
    <div className=" ">
      {tabName == "received" ? (
        <RecievedProposalDetails
          proposal={proposal}
          workProfile={workProfile}
          changeProposalStatus={changeProposalStatus}
          paymentAddress={paymentAddress as PrePaymentDetails}
        />
      ) : (
        <SendProposlDetails
          proposal={proposal}
          workProfile={workProfile}
          paymentAddress={paymentAddress as PrePaymentDetails}
        />
      )}
    </div>
  );
}

export default Page;
