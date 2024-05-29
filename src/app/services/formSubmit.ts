import { useState } from "react";
import {
  Registration,
  login,
  recoverAccount,
  requestAccountRecovery,
} from "@/api/authenticationApi";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

type userCredentials = {
  email: string;
  password?: string;
  confirmPassword?: string;
  first_name?: string;
  last_name?: string;
  otp?: string;
};

export function useFormSubmitter() {
  const router = useRouter();
  const { toast } = useToast();
  async function handleAuthFormSubmits(
    formType: string,
    {
      email,
      password,
      confirmPassword,
      first_name,
      last_name,
      otp,
    }: userCredentials
  ): Promise<void> {
    try {
      switch (formType) {
        case "register":
          await Registration({ email });
     
          
          localStorage.setItem("unVerifiedEmail", JSON.stringify(email));
          toast({
            className: "bg-secondary border-6",
            description: "Check your mail for verification link.",
          });
          break;

        case "accountCreation":
          await Registration({ email, password, first_name, last_name });
          localStorage.clear();
          router.replace("/auth/login");
          break;

        case "requestRecovery":
          await requestAccountRecovery({ email });

          break;
        case "recover":
          await recoverAccount({ email, password, otp });

          toast({
            className: "bg-secondary border-6",
            title:'You can now use your new password'
          });

          break;

        case "login":
          console.log(email, password);

          const response = await login({ email, password });
          console.log(response);

          response &&
            localStorage.setItem(
              "access_token",
              JSON.stringify(response.data?.access)
            );
          localStorage.setItem(
            "refresh_token",
            JSON.stringify(response.data?.refresh)
          );
          router.push("/user/dashboard/");
          break;

        default:
          throw new Error("Invalid form type");
      }
    } catch (err: any) {
      console.log(err);
      
      toast({
        className: "bg-secondary border-6 ",
        description:
          err.response?.data?.detail ||
          err.response?.data ||
          err.message ||
          "An Error Occured",
      });
      console.log("my error", err);
    }
  }

  return {
    handleAuthFormSubmits,
  };
}
