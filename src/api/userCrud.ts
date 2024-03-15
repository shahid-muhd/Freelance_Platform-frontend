import { AxiosResponse } from "axios"; // Import AxiosResponse type if needed
import { primaryRequest } from "../utils/axios/instances";
// Assuming you have defined primaryRequest elsewhere

type HttpMethod = "get" | "post" | "patch" | "delete";

// Helper function to handle API requests and errors
const handleApiRequest = async <T>(
  method: HttpMethod,
  url: string,
  data?: any
): Promise<T> => {
  try {
    let response: AxiosResponse<T> | null = null;
    if (method === "get") {
      response = await primaryRequest.get<T>(url);
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
  getUser: () => handleApiRequest<UserData>("get", "/auth/user/"),

  updateUser: (userId: number, updatedUserData: any) =>
    handleApiRequest<UserData>("patch", `/auth/user/${userId}/`, updatedUserData),

  deleteUser: (userId: number) =>
    handleApiRequest<void>("delete", `/auth/user/${userId}/`),
};

// Define user interface if not already defined
interface UserData {
  user?: {
    id?: number;
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
  };

  address?: {};
}
