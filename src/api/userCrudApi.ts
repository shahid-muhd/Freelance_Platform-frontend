import { AxiosResponse } from "axios"; // Import AxiosResponse type if needed
import { primaryRequest } from "../utils/axios/instances";
// Assuming you have defined primaryRequest elsewhere
import { ProfileFrom, UserData, verificationParams } from "../utils/types";
type HttpMethod = "get" | "post" | "patch" | "delete";

const url = "/auth/user/";
// Helper function to handle API requests and errors
const handleApiRequest = async <T>(
  method: HttpMethod,

  data?: UserData | verificationParams
): Promise<T> => {
  try {
    let response: AxiosResponse<T> | null = null;
    if (method === "get") {
      response = await primaryRequest.get<T>(url);
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

export const userCrudApi = {
  getUser: () => handleApiRequest("get"),

  updateUser: (updatedUserData: UserData) =>
    handleApiRequest<UserData>("patch", updatedUserData),  

  deleteUser: () => handleApiRequest<void>("delete"),

  verifyUserData: (data: verificationParams) =>
    handleApiRequest<verificationParams>("post", data),
};

