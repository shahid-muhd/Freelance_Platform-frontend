import { useState } from "react";
import { Registration, login } from "@/api/authenticationApi";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
type userCredentials = {
  email: string;
  password?: string;
  first_name?: string;
  last_name?: string;
};

export function useFormSubmitter() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleAuthFormSubmits(
    formType: string,
    { email, password,first_name,last_name }: userCredentials
  ): Promise<void> {
    setLoading(true);
    setError(null);

    try {
      switch (formType) {
        case "register":
          await Registration({ email });
          localStorage.setItem("unVerifiedEmail", JSON.stringify(email));
          break;

        case "accountCreation":
          await Registration({ email, password,first_name,last_name });
          localStorage.clear();
          router.replace("/auth/login");
          break;

        case "login":
          console.log(email, password);

          const response = await login({ email, password });
          response &&
            localStorage.setItem(
              "access_token",
              JSON.stringify(response.data.access)
            );
            localStorage.setItem(
              "refresh_token",
              JSON.stringify(response.data.refresh)
            );
          router.push("/user/dashboard/");
          break;

        default:
          throw new Error("Invalid form type");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    error,
    handleAuthFormSubmits,
  };
}

// import {
//   RegistrationService,
//   loginService,
// } from "@/utils/services/authentication";

// type userCredentials = {
//   email: string;
//   password?: string;
// };

// async function formSubmitter(
//   formType: string,
//   { email, password }: userCredentials
// ): Promise<any> {
//   switch (formType) {
//     case "register":
//       const response = await RegistrationService({ email });
//       localStorage.setItem("unVerifiedEmail", JSON.stringify(email));
//       return response;
//       break;

//     case "accountCreation":
//       const res = await RegistrationService({ email, password });

//       return res;

//       break;
//     case "login":
//       loginService({ email, password });
//       break;
//   }
// }

// export default formSubmitter;
