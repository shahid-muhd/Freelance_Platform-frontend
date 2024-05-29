import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useUserProfileServices from "@/app/services/userProfileServices";
import { UserData } from "@/utils/types/types";
import { MdOutlineMarkUnreadChatAlt } from "react-icons/md";
type Props = {
  userViewState: boolean;
  setUserViewState: React.Dispatch<React.SetStateAction<boolean>>;
  userId: number;
};

function UserView(props: Props) {
  const { getSpecificUserDetails } = useUserProfileServices();
  const [user, setUser] = useState<UserData>();
  useEffect(() => {
    getSpecificUserDetails(props.userId).then((user) => {
      setUser(user);
    });
  }, []);
  return (
    <div>
      <Sheet open={props.userViewState}>
        <SheetContent className="min-w-[50%] text-lg space-y-10">
          <SheetHeader>
            <SheetTitle className="dark:text-gray-300">
              Freelancer Details
            </SheetTitle>
          </SheetHeader>
          <div className="font-medium">
            <div className="freelancer-overview space-y-3">
              <div className="freelancer-avatar-wrapper flex justify-center">
                <div className="avatar w-fit">
                  <Avatar className="w-36 h-36">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>
              </div>
              <div className=" flex items-center justify-between">
                <div className="freelancer-name flex gap-5 p-10 ">
                  <div className="dark:text-gray-400">
                    <p>Name : </p>
                  </div>
                  <div>
                    <p>
                      {user?.user?.first_name} {user?.user?.last_name}
                    </p>
                  </div>
                </div>
                <div className="">
                  <div>
                    <Button className="py-1 gap-3 text-base" variant={"ghost"}>Open Chat <span> <MdOutlineMarkUnreadChatAlt size={20}/></span></Button>
                  </div>
                
                </div>
              </div>
            </div>
            <div className="work-profile-overview"></div>
          </div>
          <SheetFooter>
            <SheetClose>
              <Button
                onClick={() => props.setUserViewState(false)}
                variant={"secondary"}
              >
                Go Back
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default UserView;
