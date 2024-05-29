"use client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const RouteProtection = ({ children }: ProtectedRouteProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const affectedPathnames = [
    "/auth/login",
    "/auth/register",
    "auth/create-account",
    "/",
  ];
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token !== null) {
      if (affectedPathnames.includes(pathname)) {
        router.replace("/user/dashboard");
      }
    }
  }, [pathname]);

  return <>{children}</>;
};

export default RouteProtection;
