import { AxiosResponse } from "axios"; // Import AxiosResponse type if needed
import { primaryRequest } from "../utils/axios/instances";

type HttpMethod = "get" | "post" | "patch" | "delete";
const url = "/communication/exchangers";

const handleApiRequest = async <T>(
  method: HttpMethod,
  slug?: string | null
): Promise<T> => {
  let requestUrl = url;

  if (slug) {
    requestUrl += `${slug}/`;
  }
  try {
    let response: AxiosResponse<T> | null = null;
    if (method === "get") {
      response = await primaryRequest.get<T>(requestUrl);
    } else if (method === "post") {
      response = await primaryRequest.post<T>(url);
    } else if (method === "patch") {
      response = await primaryRequest.patch<T>(requestUrl);
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

export const messageExchangerApi = {
  getAllExchangers: (slug?: string | null) => handleApiRequest("get", slug),
};
