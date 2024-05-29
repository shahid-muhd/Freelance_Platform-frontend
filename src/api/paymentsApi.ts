import { AxiosResponse } from "axios"; // Import AxiosResponse type if needed
import { primaryRequest } from "../utils/axios/instances";

type HttpMethod = "get" | "post" | "patch" | "delete";

let url = "";
// Helper function to handle API requests and errors
const handleApiRequest = async <T>(
  method: HttpMethod,
  data?: any
): Promise<T> => {
  url = "/payments/create-checkout-session/";

  try {
    let response: AxiosResponse<T> | null = null;
    if (method === "get") {
      response = await primaryRequest.get<T>(url);
    } else if (method === "post") {
      console.log(' payments request callled');
      
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

export const paymentsApi = {
  createChecoutSession: (data: any) => handleApiRequest("post", data),
  
};
