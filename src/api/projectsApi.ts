import { AxiosResponse } from "axios"; // Import AxiosResponse type if needed
import { primaryRequest } from "../utils/axios/instances";
// Assuming you have defined primaryRequest elsewhere
import {

  Project,

} from "../utils/types/types";
type HttpMethod = "get" | "post" | "patch" | "put" | "delete";
type ActionMethods = "userProjects" | "save";

type ProjectId = string | number;
// Helper function to handle API requests and errors
let url = "/projects/";
const handleApiRequest = async <T>(
  method: HttpMethod | ActionMethods,
  data?: Project | ProjectId | string |null,
  slug?: ProjectId 
): Promise<T> => {
  if (slug) {
    url = `/projects/${slug}`;
  } else {
    url = "/projects/";
  }
  try {
    let response: AxiosResponse<T> | null = null;
    if (method === "get") {
      let query_param=''
      if (data) {
        query_param=data as string
      }
      response = await primaryRequest.get<T>(url,{params:{query_param}});
    } else if (method === "userProjects") {
      url += "user-projects/";
      response = await primaryRequest.get<T>(url);
    } else if (method === "save") {
      url += "saved/";
      response = await primaryRequest.post<T>(url);
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

export const projectsApi = {
  getAllProjects: (searchParam:string) => handleApiRequest("get",searchParam),
  getUserProjects: () => handleApiRequest("userProjects"),
  getProject: (projectId: ProjectId) => {
    return handleApiRequest("get", null, projectId);
  },

  saveProjects: (projectId: ProjectId) =>
    handleApiRequest("save", projectId),
  createProject: (data: Project) => handleApiRequest("post", data),
};
