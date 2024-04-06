import React, { ReactElement, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import userCrudServices from "@/app/services/userCrudServices";
import { verificationParams } from "@/utils/types";

type Props = {
  isModelOpen: boolean;
  setIsModelOpen: (isModelOpen: boolean) => void;
  otpType: string;
  email?: string;
  phone?: string;
};
function OtpModel(props: Props) {
  const [otp, setOtp] = useState("");
  const { handleDataVerifications } = userCrudServices();

  const closeModel = () => {
    props.setIsModelOpen(false);
  };

  function handleOtpSubmit() {
    console.log(props.otpType);
    let data: any = {
      otp: "",
    };
    if (props.otpType == "email") {
      data = {
        otp,
        email: props.email,
      };
    }
    if (props.otpType == "phone") {
      data = {
        otp,
        phone: props.phone,
      };
    }
    handleDataVerifications({ data }).then((res) => {
      closeModel();
    });
  }
  return (
    <div>
      <Dialog open={props.isModelOpen}>
        <DialogContent className="sm:max-w-[425px] ">
          <DialogHeader>
            <DialogTitle>
              <div className="leading-10">
                <p>Enter One Time Password</p>

                <p className="text-sm  ">
                  A one time password is sent your email
                </p>
              </div>
            </DialogTitle>
            <DialogDescription className="p-5 flex items-center justify-center">
              <div>
                <InputOTP
                  value={otp}
                  onChange={(value) => setOtp(value)}
                  maxLength={6}
                  render={({ slots }) => (
                    <>
                      <InputOTPGroup className="gap-2">
                        {slots.slice(0, 6).map((slot, index) => (
                          <InputOTPSlot key={index} {...slot} />
                        ))}
                      </InputOTPGroup>
                    </>
                  )}
                />
              </div>
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <div className="flex gap-5">
              {" "}
              <Button onClick={closeModel} variant={"outline"}>
                Cancel
              </Button>{" "}
              <Button onClick={handleOtpSubmit} variant={"secondary"}>
                Submit
              </Button>{" "}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default OtpModel;
