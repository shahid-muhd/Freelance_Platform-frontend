"use client";
import usePaymentSerives from "@/app/services/paymentSerives";
import useUserProfileServices from "@/app/services/userProfileServices";
import React from "react";
import { useEffect } from "react";

interface Props {
  children: React.ReactNode;
}

function UserInjector({ children }: Props) {
  const { getCurrentUserDetails } = useUserProfileServices();
  const { getSubscriptionDetails } = usePaymentSerives();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("access_token");
      if (token) {
        getCurrentUserDetails().then(() => {
          getSubscriptionDetails();
        });
      }
    }
  }, []);

  return <>{children}</>;
}

export default UserInjector;
