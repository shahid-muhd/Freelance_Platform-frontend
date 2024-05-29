import { AxiosResponse } from "axios"; // Import AxiosResponse type if needed
import { primaryRequest } from "../utils/axios/instances";

import { UserData, verificationParams } from "../utils/types/types";
type HttpMethod = "get" | "post" | "patch" | "delete";

let url = "";
// Helper function to handle API requests and errors
const handleApiRequest = async <T>(
  method: HttpMethod,
  data?: UserData | verificationParams | string,
  userId?: number,
): Promise<T> => {
  url = "/auth/user/";
  if (userId) {
    url = `/auth/user/${userId}`;
  }
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
  getCurrentUser: () => handleApiRequest("get"),
  getSpecifiUser: (clientId: number) =>  handleApiRequest("get",'null',clientId),
  updateUser: (updatedUserData: UserData) =>
    handleApiRequest<UserData>("patch", updatedUserData),

  deleteUser: () => handleApiRequest<void>("delete"),

  verifyUserData: (data: verificationParams) =>
    handleApiRequest<verificationParams>("post", data),
};
