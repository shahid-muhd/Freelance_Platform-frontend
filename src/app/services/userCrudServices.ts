import { userCrudApi } from "@/api/userCrud";
import { useUserContext } from "@/utils/context/contextProviders";
import { useToast } from "@/components/ui/use-toast"

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
function userCrudServices() {
  const { getUser, updateUser, verifyUserData } = userCrudApi;
  const { setUserData, user } = useUserContext();
  const {toast}= useToast()
  const router=useRouter()
  
  const getUserDetails = async () => {
    const user = await getUser();
    if (user) {
      setUserData(user);
    }
    console.log(user);
  };

  const toaster=(updatedData:string)=>{
    toast({
      title: `Updated ${updatedData}`,
      // description: "Friday, February 10, 2023 at 5:57 PM",
    })
  }

  const handleProfileFormSubmits = async ({ data }: FormSubmitParams) => {
    updateUser(data).then((res) => {
      // const userData = {
      //   user: data,
      // };
      setUserData((prevUserData: UserData) => ({
        user: {
          ...prevUserData.user, // Preserve old data
          ...data, // Update changed fields
        },
      }));

      toaster('Name')


    });
  };

  const handleDataVerifications = async ({ data }: verificationParams) => {
    if (data?.otp) {
      console.log('daateee',data);
      
     return verifyUserData({data})
    }
    if (data.email == user?.user?.email || data.phone == user?.user?.phone) {
      console.log("already existing");
      throw new Error("Already Existing");
      
    } else {
     return  verifyUserData({ data });
    }
  };


  const handleLogout=()=>{
    logout().then(()=>{
      localStorage.clear()
      setUserData(null)
      router.replace('/auth/login')
    })
  }
  return { getUserDetails, handleProfileFormSubmits, handleDataVerifications,handleLogout };
}

export default userCrudServices;
