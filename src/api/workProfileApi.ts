import { AxiosResponse } from "axios"; // Import AxiosResponse type if needed
import { primaryRequest } from "../utils/axios/instances";
import { NewWorkProfile, WorkProfile } from "@/utils/types/types";

type HttpMethod = "get" | "post" | "patch" | "delete";
const url = "/work-profiles/profile/";
type UserSpecificity = {
  userSpecific: boolean;
};
const handleApiRequest = async <T>(
  method: HttpMethod,
  data?: WorkProfile| NewWorkProfile | UserSpecificity|null,
  slug?: string | null
): Promise<T> => {
  let requestUrl = url;

  if (slug) {
    requestUrl += `${slug}/`;
  }
  try {
    let response: AxiosResponse<T> | null = null;
    if (method === "get") {
      response = await primaryRequest.get<T>(requestUrl, { params: { data } });
    } else if (method === "post") {
      response = await primaryRequest.post<T>(url, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } else if (method === "patch") {
      response = await primaryRequest.patch<T>(requestUrl, data);
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

export const workProfileApi = {
  getWorkProfiles: (userSpecific: boolean, slug?: string | null) =>
    handleApiRequest("get", { userSpecific: userSpecific }, slug),
  createWorkProfile: (data: any) =>
    handleApiRequest<NewWorkProfile>("post", data),
  updateWorkProfile:(data:WorkProfile,slug:string)=>handleApiRequest('patch',data,slug),
  deleteWorkProfile:( slug?: string | null)=>handleApiRequest("delete",null,slug)
};
