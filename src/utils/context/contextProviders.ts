"use client";
import React, { useState } from "react";
import constate from "constate";
import { PortfoliosState, UserData } from "../types";
import { Url } from "url";

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
  const [user, setUser] = useState<UserData | null>();
  

  return { user, setUser };
}

export const [UserContextProvider, useUserContext] = constate(useUserData);

function useWorkProfileCreator() {
  const [profileDescription, setprofileDescription] = useState({
    profileTitle: "",
    profileSummary: "",
  });

  const [skills, setSkills] = useState<string[] | null>(null);

  const [portfolios, setPortfolios] = useState<PortfoliosState>([]);

  return {
    skills,
    setSkills,
    profileDescription,
    setprofileDescription,
    portfolios,
    setPortfolios,
  };
}

export const [WorkProfileContextProvider, useWorkProfileContext] = constate(
  useWorkProfileCreator
);
