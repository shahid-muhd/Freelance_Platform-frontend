// components/ProtectedRoute.js
"use client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import userProfileServices from "@/app/services/userProfileServices";
import { useUserContext } from "../context/contextProviders";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const RouteProtection = ({ children }: ProtectedRouteProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { getUserDetails } = userProfileServices();
  const affectedPathnames=["/auth/login", "/auth/register", "auth/create-account"]
  useEffect(() => {

    getUserDetails().then(()=>{
      if (affectedPathnames.includes(pathname)) {
        router.replace("/user/dashboard");
      }
    }).catch(()=>{
      localStorage.clear()

      if (!affectedPathnames.includes(pathname)) {
        router.replace("/auth/login");
      }
    })

  }, [pathname]);

  return <>{children}</>;
};

export default RouteProtection;
