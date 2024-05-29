import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import useMessageStore from "@/stores/messageStore";
import useExchangerStore from "@/stores/chatExchangerStore";

function UsersList() {
  const { setCurrentExchanger } = useMessageStore();
  const { exchangers } = useExchangerStore();




  return (
    <div className="users-list w-full">
      {exchangers && exchangers.length > 0 ? (
        exchangers.map((exchanger) => (
          <div
            key={exchanger.id}
            className="user-chat-card hover:cursor-pointer py-1 "
            onClick={()=>setCurrentExchanger(exchanger.id)}
          >
            <Card className="h-20 flex items-center  w-full  border-0 hover:scale-105 duration-150">
              <CardHeader className="w-full">
                <div className="flex items-center  w-full  gap-3">
                  <div className="w-fit ">
                    <Avatar className="w-14 h-14" >
                      <AvatarImage
                        src={
                          process.env.NEXT_PUBLIC_BASE_URL +
                          exchanger?.profile_image
                        }
                      />
                      <AvatarFallback>
                        <div className="uppercase w-full h-full flex items-center justify-center text-lg">
                          <p>
                            {" "}
                            {exchanger.first_name &&
                              exchanger.first_name[0]}{" "}
                          </p>{" "}
                          <p>
                            {" "}
                            {exchanger.last_name && exchanger.last_name[0]}
                          </p>
                        </div>
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="text-lg w-full flex truncate gap-1 capitalize ">
                    <div>
                      <p>{exchanger?.first_name}</p>
                    </div>
                    <div>
                      <p>{exchanger?.last_name}</p>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>
            <div className="w-full flex justify-center">
              <Separator className="w-11/12" />
            </div>
          </div>
        ))
      ) : (
        <div>No exchangers available</div>
      )}
    </div>
  );
}

export default UsersList;
