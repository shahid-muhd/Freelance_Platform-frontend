import { userCrudApi } from "@/api/userCrud";
import { useUserContext } from "@/utils/context/contextProviders";

import React from "react";

function userCrudServices() {
  const { getUser, updateUser } = userCrudApi;
  const { setUserData } = useUserContext();

  const getUserDetails = async () => {
    const user = await getUser();
    if (user) {
      setUserData(user);
    }
    console.log(user);
  };

  return { getUserDetails };
}

export default userCrudServices;
