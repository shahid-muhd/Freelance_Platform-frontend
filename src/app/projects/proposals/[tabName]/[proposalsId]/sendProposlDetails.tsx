import { proposalApi } from "@/api/proposalApi";
import { PrePaymentDetails, Proposal, WorkProfile } from "@/utils/types/types";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = {
  proposal: Proposal | undefined;
  workProfile: WorkProfile | undefined;
  paymentAddress: PrePaymentDetails;
};
function SendProposlDetails(props: Props) {
  const proposal = props.proposal;
  const paymentAddress = props.paymentAddress;
  return (
    <div>
      <div className="send-proposal-detail-card p-8 ">
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default SendProposlDetails;
