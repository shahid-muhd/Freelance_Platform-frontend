import { AxiosResponse } from "axios"; // Import AxiosResponse type if needed
import { primaryRequest } from "../utils/axios/instances";

type HttpMethod = "get" | "post" | "patch" | "delete";

let url = "";
// Helper function to handle API requests and errors
const handleApiRequest = async <T>(
  method: HttpMethod,
  data?: object
): Promise<T> => {
  url = "/payments/pre-payment-details/";

  try {
    let response: AxiosResponse<T> | null = null;
    if (method === "get") {
      response = await primaryRequest.get<T>(url, { params: { data } });
    } else if (method === "post") {
      console.log(" payments request callled");

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

export const prePaymentsApi = {
  getPrePaymentDetails: (data: object) => handleApiRequest("get", data),
};
