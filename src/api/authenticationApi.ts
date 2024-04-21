import { AxiosResponse } from "axios";

import {
  unAuthenticatedRequest,
  primaryRequest,
} from "../utils/axios/instances";

type userCredentials = {
  email: string;
  password?: string;
  first_name?: string;
  last_name?: string;
  otp?: string;
};

export const login = ({ email, password }: userCredentials) => {
  return unAuthenticatedRequest.post("/auth/login/", { email, password });
};

export const Registration = ({
  email,
  password,
  first_name,
  last_name,
}: userCredentials): Promise<AxiosResponse<any>> => {
  if (password == null) {
    console.log('em: ',email);
    return unAuthenticatedRequest.post("/auth/register/", { email });
  } else {
    return unAuthenticatedRequest.post("/auth/create-account/", {
      email,
      password,
      first_name,
      last_name,
    });
  }
};

export const requestAccountRecovery = ({ email }: userCredentials) => {
  return unAuthenticatedRequest.post("/auth/recover/", { email });
};
export const recoverAccount = ({ email, password, otp }: userCredentials) => {
  return unAuthenticatedRequest.put("/auth/recover/", {
    email,
    password,
    otp,
  });
};

export const logout = () => {
  let refresh_token: string | null = "";
  refresh_token = localStorage.getItem("refresh_token");
  if (refresh_token) {
    refresh_token = JSON.parse(refresh_token);
  }
  return primaryRequest.post("/auth/logout/", {
    refresh_token: refresh_token,
  });
};

export const checkAuthentication = () => {
  return primaryRequest.post("/auth/check_auth/");
};
