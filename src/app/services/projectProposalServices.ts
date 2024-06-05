import { proposalApi } from "@/api/proposalApi";
import { useToast } from "@/components/ui/use-toast";
import {
  ProjectApplicationType,
  Proposal,
  ProposalFilterCondition,
  proposalStatus,
} from "@/utils/types/types";
import { useRouter } from "next/navigation";

function useProjectProposalServices() {
  const { toast } = useToast();
  const { createProposal, getAllProposals, getProposal, changeProposalStatus } =
    proposalApi;
    const router=useRouter()
  const toastMessages = {
    proposalAcceptance:
      "You have accepted the proposal. Pay advance amount to start the work.",
    workContractTermination: "This Work Contract has been terminated.",
  };

  const getProposalService = async ({
    type,
    proposalId,
    filterCondition,
  }: {
    type: "send" | "received";
    proposalId?: string | number;
    filterCondition?: ProposalFilterCondition;
  }) => {
    let proposals = null;
    try {
      if (proposalId) {
        proposals = await getProposal(type, proposalId);
      } else {
        if (filterCondition == "all") {
          filterCondition = null;
        }
        proposals = await getAllProposals({
          proposalRequestType: type,
          filterCondition,
        });
      }
      console.log(proposals);
      if (proposals) {
        return proposals;
      }
    } catch (error) {
      console.log(error);
      toast({
        description: "No Proposals",
      });
    }
  };

  const submitProposal = async (data: ProjectApplicationType) => {
    const proposalData = new FormData();
    proposalData.append("bid_amount", data.bid);
    proposalData.append("work_profile", data.workProfile);
    proposalData.append("cover_letter", data.coverLetter);
    if (data.document) {
      proposalData.append("document", data.document);
    }
    proposalData.append("project", data.project);

    createProposal(proposalData)
      .then(() => {
        toast({
          description: `Proposal sent with bid amount of ${data.bid}`,
        });

        return true;
      })
      .catch((err) => {
        toast({
          description: err.response?.data || "An error occured",
        });
      });
  };

  const proposalStatusChangeService = async (
    proposalId: number,
    status: proposalStatus
  ) => {
    changeProposalStatus(proposalId, status)
      .then(() => {
        if (status == "accepted") {
          toast({
            description: toastMessages.proposalAcceptance,
          });
        }
      })
      .catch((err) => {
        console.log("err propose", err);
        toast({
          description: err.response.data.detail || err.response.data,
        });
      });
  };

  const terminateContractService = async (proposalId: number) => {
    console.log("inside service terminate");
    proposalApi.terminateWorkContract(proposalId).then(() => {
      toast({
        description: toastMessages.workContractTermination,
      });
     router.refresh()
    });
  };

  const approveWork = async (
    proposalId: number,
    type: "sample" | "final",
    setProposal: React.Dispatch<React.SetStateAction<Proposal | undefined>>
  ) => {
    proposalApi.acceptWork(proposalId, type).then((data) => {
      toast({
        description: data as string,
      });

      setProposal((prevState) => {
        if (!prevState) {
          return undefined;
        }
        return {
          ...prevState,
          accepted_work: type,
        };
      });
    });
  };

  return {
    submitProposal,
    getProposalService,
    proposalStatusChangeService,
    terminateContractService,
    approveWork,
  };
}

export default useProjectProposalServices;
