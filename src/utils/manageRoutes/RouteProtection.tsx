// components/ProtectedRoute.js
"use client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

import userCrudServices from "@/app/services/userCrudServices";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const RouteProtection = ({ children }: ProtectedRouteProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { getUserDetails } = userCrudServices();

  useEffect(() => {
    if (
      pathname == "/auth/login" ||
      "/auth/register" ||
      "auth/create-account"
    ) {
      getUserDetails()
        .then((res) => {
          console.log(res);

          router.replace("/user/dashboard"); // Redirect authenticated users away from login page
        })
        .catch(() => {});
    }
  }, [pathname]);

  return <>{children}</>;
};

export default RouteProtection;
