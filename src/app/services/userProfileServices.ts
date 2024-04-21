import { userCrudApi } from "@/api/userCrudApi";
import { useUserContext } from "@/utils/context/contextProviders";
import { useToast } from "@/components/ui/use-toast";

import {
  FormSubmitParams,
  UserData,
  verificationParams,
} from "../../utils/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { logout } from "@/api/authenticationApi";
import { useRouter } from "next/navigation";
function userProfileServices() {
  const { getUser, updateUser, verifyUserData } = userCrudApi;
  const { setUser, user } = useUserContext();
  const { toast } = useToast();
  const router = useRouter();

  const getUserDetails = async () => {
    const user = await getUser();
    if (user) {
      setUser(user);
    }
    console.log(user);
  };

  const toaster = (updatedData: string) => {
    toast({
      title: `Updated ${updatedData}`,
      // description: "Friday, February 10, 2023 at 5:57 PM",
    });
  };

  const handleProfileFormSubmits = async ({ data }: FormSubmitParams) => {
    let dataType: "user" | "address" = data.user ? "user" : "address";
    console.log('my data ', data);
    
    updateUser(data).then((res) => {
      data &&
        setUser((prevUserData: UserData | null | undefined) => {
          if (!prevUserData) return null;
          return {
            ...prevUserData,
            [dataType]: {
              ...prevUserData[dataType], 
              ...data[dataType], 
            },
          };
        });

      toaster(dataType);
    });
  };

  const handleDataVerifications = async ({ data }: verificationParams) => {
    if (data?.otp) {
      verifyUserData({ data })
        .then(() => {
          setUser((prevState: UserData | null | undefined) => {
            // If prevState is null, return null (no change)
            if (!prevState) return null;
            return {
              ...prevState,
              user: {
                ...prevState.user,
                ...data,
              },
            };
          });

          toaster("Phone Number");
        })
        .catch(() => {
          toast({
            title: "Wrong OTP",
          });
        });
    }
    if (data.email == user?.user?.email || data.phone == user?.user?.phone) {
      toast({
        title: "Already Existing. Provide a new one.",
      });
      throw new Error("Already Existing");
    } else {
      console.log("verify user data email");

      return verifyUserData({ data });
    }
  };

  const handleLogout = () => {
    logout().then(() => {
      localStorage.clear();
      setUser(null);
      router.replace("/auth/login");
    });
  };
  return {
    getUserDetails,
    handleProfileFormSubmits,
    handleDataVerifications,
    handleLogout,
  };
}

export default userProfileServices;
