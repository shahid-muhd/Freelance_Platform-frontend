import { AxiosResponse } from "axios"; // Import AxiosResponse type if needed
import { primaryRequest } from "../utils/axios/instances";

import {
  ProjectApplicationType,
  ProposalFilterCondition,
  proposalStatus,
} from "../utils/types/types";
type HttpMethod = "get" | "post" | "put" | "patch" | "delete";
type proposalRequestTypes = "send" | "received";
let url = "/projects/proposals/";

type ProposalType = Record<"type", proposalRequestTypes>;
// Helper function to handle API requests and errors

type FilterCondition = "accepted" | "unanswered";
type RequestDataType =
  | ProjectApplicationType
  | FormData
  | ProposalType
  | proposalStatus
  | null;

const handleProposalApiRequest = async <T>({
  method,
  data,
  slug,
  filterCondition,
}: {
  method: HttpMethod;
  data: RequestDataType;
  slug?: string | number;
  filterCondition?: ProposalFilterCondition;
}): Promise<T> => {
  let requestUrl = url;

  if (slug) {
    requestUrl += `${slug}/`;
  }
  try {
    let response: AxiosResponse<T> | null = null;
    if (method === "get") {
      let requestData: any = data;

      if (filterCondition) {
        requestData.filter_condition = filterCondition;
      }

      response = await primaryRequest.get<T>(requestUrl, {
        params: { data: requestData },
      });
    } else if (method === "post") {
      response = await primaryRequest.post<T>(requestUrl, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } else if (method === "patch") {
      const requestData = {
        status: data,
      };
      console.log("re data patch :", requestData);

      response = await primaryRequest.patch<T>(requestUrl, requestData);
    } else if (method === "delete") {
      response = await primaryRequest.delete<T>(requestUrl);
    }
    if (response === null) {
      throw new Error("Response is null");
    }

    return response.data;
  } catch (error) {
    console.error(
      `Error in ${method.toUpperCase()} request to ${requestUrl}:`,
      error
    );
    throw error;
  }
};

const workContractApiRequest = async <T>({
  method,
  data,
}: {
  method: HttpMethod;
  data: any;
}): Promise<T> => {
  let requestUrl = "/projects/work-contract/";

  try {
    let response: AxiosResponse<T> | null = null;
    if (method === "delete") {
      const requestDataata = {
        data,
      };
      response = await primaryRequest.delete<T>(requestUrl, requestDataata);
    }
    if (response === null) {
      throw new Error("Response is null");
    }

    return response.data;
  } catch (error) {
    console.error(
      `Error in ${method.toUpperCase()} request to ${requestUrl}:`,
      error
    );
    throw error;
  }
};

export const proposalApi = {
  getAllProposals: ({
    proposalRequestType,
    filterCondition,
  }: {
    proposalRequestType: proposalRequestTypes;
    filterCondition?: ProposalFilterCondition;
  }) =>
    handleProposalApiRequest({
      method: "get",
      data: { type: proposalRequestType },
      filterCondition: filterCondition,
    }),

  getProposal: (
    proposalRequestType: proposalRequestTypes,
    proposalId: string | number
  ) => {
    return handleProposalApiRequest({
      method: "get",
      data: { type: proposalRequestType },
      slug: proposalId,
    });
  },

  createProposal: (data: FormData) =>
    handleProposalApiRequest({ method: "post", data }),

  changeProposalStatus: (proposalId: number, status: proposalStatus) =>
    handleProposalApiRequest({
      method: "patch",
      data: status,
      slug: proposalId,
    }),

  terminateWorkContract: (proposalId: number) =>
    workContractApiRequest({
      method: "delete",
      data: { proposal_id: proposalId },
    }),
};
