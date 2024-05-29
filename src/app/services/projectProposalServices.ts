import { proposalApi } from "@/api/proposalApi";
import { useToast } from "@/components/ui/use-toast";
import {
  ProjectApplicationType,
  ProposalFilterCondition,
  proposalStatus,
} from "@/utils/types/types";

function useProjectProposalServices() {
  const { toast } = useToast();
  const {
    createProposal,
    getAllProposals,
    getProposal,
    changeProposalStatus,
    terminateWorkContract,
  } = proposalApi;

  const toastMessages = {
    proposalAcceptance:
      "You have accepted the proposal. Pay advance amount to start the work.",
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
        description: "This Work Contract has been terminated.",
      });
    });
  };

  return {
    submitProposal,
    getProposalService,
    proposalStatusChangeService,
    terminateContractService,
  };
}

export default useProjectProposalServices;
