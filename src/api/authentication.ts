import { AxiosResponse } from "axios";

import { unAuthenticatedRequest, primaryRequest } from "../utils/axios/instances";

type userCredentials = {
  email: string;
  password?: string;
};

export const login = ({ email, password }: userCredentials) => {
  return unAuthenticatedRequest.post("/auth/login/", { email, password });
};

export const Registration = ({
  email,
  password,
}: userCredentials): Promise<AxiosResponse<any>> => {
  if (password == null) {
    return unAuthenticatedRequest.post("/auth/register/", { email });
  } else {
    return unAuthenticatedRequest.post("/auth/create-account/", {
      email,
      password,
    });
  }
};
