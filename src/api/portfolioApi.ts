import { AxiosResponse } from "axios"; // Import AxiosResponse type if needed
import { primaryRequest } from "../utils/axios/instances";
// Assuming you have defined primaryRequest elsewhere
import {
  PortfolioItem,
  ProfileFrom,
  Project,
  UserData,
  verificationParams,
  WorkProfile,
} from "../utils/types/types";
type HttpMethod = "get" | "post" | "patch" | "put" | "delete";

type PortfolioId = number;
// Helper function to handle API requests and errors
let url = "/work-profiles/portfolio/";
const handleApiRequest = async <T>(
  method: HttpMethod,
  data?: PortfolioItem | string | null,
  slug?: PortfolioId
): Promise<T> => {
  if (slug) {
    url = `/work-profiles/portfolio/${slug}`;
  } else {
    url = "/work-profiles/portfolio/";
  }
  try {
    let response: AxiosResponse<T> | null = null;
    if (method === "get") {

  
      
      response = await primaryRequest.get<T>(url, {
        params: { workprofile: data },
      });
    } else if (method === "post") {
      response = await primaryRequest.post<T>(url, data);
    } else if (method === "patch") {
      response = await primaryRequest.patch<T>(url, data);
    } else if (method === "delete") {
      response = await primaryRequest.delete<T>(url);
    }
    if (response === null) {
      throw new Error("Response is null");
    }

    return response.data;
  } catch (error) {
    console.error(`Error in ${method.toUpperCase()} request to ${url}:`, error);
    throw error;
  }
};

export const portfolioApi = {
  getAllPorfolios: (workProfileId: string) =>
    handleApiRequest("get", workProfileId),
  getPortfolio: (porfolioId: PortfolioId) => {
    return handleApiRequest("get", null, porfolioId);
  },
};
