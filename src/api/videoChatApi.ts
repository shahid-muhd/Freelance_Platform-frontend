import { primaryRequest } from "@/utils/axios/instances";
import { AxiosResponse } from "axios";
type HttpMethod = "get" | "post" | "patch" | "delete";

const handleApiRequest = async <T>(method: HttpMethod, data?: any) => {
  let url = "communication/video-chat/";
  let response: AxiosResponse<T> | null = null;
  try {
    if (method === "get") {
      response = await primaryRequest.get<T>(url);
    }
    return response?.data
  } catch (error) {}
};

export const VideoChatApi = {
  getToken: () => handleApiRequest("get"),
};
