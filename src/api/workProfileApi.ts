import { AxiosResponse } from "axios"; // Import AxiosResponse type if needed
import { primaryRequest } from "../utils/axios/instances";
import { NewWorkProfile } from "@/utils/types";
// Assuming you have defined primaryRequest elsewhere

type HttpMethod = "get" | "post" | "patch" | "delete";
const url = "/work_profiles/";
const handleApiRequest = async <T>(
  method: HttpMethod,

  data?: NewWorkProfile
): Promise<T> => {
  try {
    let response: AxiosResponse<T> | null = null;
    if (method === "get") {
      response = await primaryRequest.get<T>(url);
    } else if (method === "post") {
      response = await primaryRequest.post<T>(url, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
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

export const workProfileApi = {
  getWorkProfiles: () => handleApiRequest("get"),

  createWorkProfile: (data: any) => handleApiRequest<NewWorkProfile>("post", data),
};
