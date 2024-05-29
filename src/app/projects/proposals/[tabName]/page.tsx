'use client'
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProposalsSend from "./proposalsSend";
import ProposalsRecieved from "./proposalsRecieved";

function Page({ params }: { params: { tabName: string } }) {
  const {  tabName } = params;

  
  return (
    <div>
      <Tabs defaultValue={tabName} className="w-full ">
        <TabsList className="w-1/2">
          <TabsTrigger className="w-1/2" value="send">
            Send
          </TabsTrigger>
          <TabsTrigger className="w-1/2" value="received">
            Recieved
          </TabsTrigger>
        </TabsList>
        <TabsContent className="p-5" value="send">
          <ProposalsSend />
        </TabsContent>
        <TabsContent  className="p-5" value="received">
          <ProposalsRecieved />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Page;
