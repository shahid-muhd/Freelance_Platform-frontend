"use client";
import React, { useState } from "react";
import constate from "constate";

type UserData = {
  user?: {
    id?: number;
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
  };

  address?: {};
};
// For preventing users from accessing sections of the app in certain senarios.
function useDisabler() {
  const [disabler, setDisabler] = useState(false);
  const disable = () => setDisabler(true); // Enable GlobalDisabler
  const enable = () => setDisabler(false); // Disable GlobalDisabler
  return { disabler, disable, enable };
}

export const [DisablerContextProvider, useDisablerContext] =
  constate(useDisabler);

function useUserData() {
  const [user, setUser] = useState<UserData | null>(null);
  const setUserData = (data: UserData) => setUser(data);
  const clearUserData = () => setUser(null);
  return { user, setUserData, clearUserData };
}

export const [UserContextProvider, useUserContext] = constate(useUserData);
