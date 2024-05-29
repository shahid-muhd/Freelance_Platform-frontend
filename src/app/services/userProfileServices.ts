import { userCrudApi } from "@/api/userCrudApi";
import { useUserContext } from "@/utils/context/stateContextProviders";
import { useToast } from "@/components/ui/use-toast";

import {
  FormSubmitParams,
  User,
  UserData,
  verificationParams,
} from "../../utils/types/types";
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
function useUserProfileServices() {
  const {
    getCurrentUser: getUser,
    updateUser,
    verifyUserData,
    getSpecifiUser,
  } = userCrudApi;
  const { setUser, user } = useUserContext();
  const { toast } = useToast();
  const router = useRouter();

  const getCurrentUserDetails = async () => {
    const user = await getUser();
    if (user) {
      setUser(user);
    }
  };

  const getSpecificUserDetails = async (clientId: number) => {
    const user = getSpecifiUser(clientId);
    return user as UserData;
  };

  const toaster = (updatedData: string) => {
    toast({
      title: `Updated ${updatedData}`,
      // description: "Friday, February 10, 2023 at 5:57 PM",
    });
  };

  const handleProfileFormSubmits = async ({ data }: FormSubmitParams) => {
    let dataType: "user" | "address" = data.user ? "user" : "address";

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

  const getProfileCompletionStatus = (userData: UserData) => {
    let completionStatus = 0;
    const userBasics = userData.user;

    userBasics?.first_name && (completionStatus += 10);
    userBasics?.last_name && (completionStatus += 10);
    userBasics?.phone && (completionStatus += 20);
    userBasics?.profile_image && (completionStatus += 20);

    userData.address && (completionStatus += 40);

    return completionStatus
  };

  const handleLogout = () => {
    logout().then(() => {
      localStorage.clear();
      setUser(null);
      router.replace("/auth/login");
    });
  };
  return {
    getCurrentUserDetails,
    handleProfileFormSubmits,
    handleDataVerifications,
    getProfileCompletionStatus,
    handleLogout,
    getSpecificUserDetails,
  };
}

export default useUserProfileServices;
