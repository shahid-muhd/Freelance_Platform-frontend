"use client";
import React, { useState } from "react";
import constate from "constate";
import { Message, PortfoliosState, Subscription, User, UserData } from "../types/types";


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



function useSubscriptionDetails() {
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  return { subscription, setSubscription };
}

export const [SubscriptionContextProvider, useSubscriptionContext] = constate(useSubscriptionDetails);





function useApplicationData() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  return { isSheetOpen, setIsSheetOpen };
}
export const [ApplicationContextProvider, useApplicationContext] =
  constate(useApplicationData);

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

function useMessageManager() {
  const [currentExchanger, setcurrentExchanger] = useState<User | null>();
  const [messages, setMessages] = useState<Message[] | null>([]);
  return { currentExchanger, setcurrentExchanger, messages, setMessages };
}
export const [MessageContextProvider, useMessageContext] =
  constate(useMessageManager);
