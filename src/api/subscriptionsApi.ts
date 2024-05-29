import { AxiosResponse } from "axios"; // Import AxiosResponse type if needed
import { primaryRequest } from "../utils/axios/instances";
// Assuming you have defined primaryRequest elsewhere

type HttpMethod = "get" | "post" | "patch" | "delete";

let url = "";
// Helper function to handle API requests and errors
const handleApiRequest = async <T>(
  method: HttpMethod,
  data?: any
): Promise<T> => {
  url = "/payments/subscriptions/";

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

export const subscriptionsApi = {
  getSubscription: () => handleApiRequest("get"),
};
