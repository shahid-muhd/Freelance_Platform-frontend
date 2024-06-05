import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import useUserProfileServices from "@/app/services/userProfileServices";

type Props = {
  isModelOpen: boolean;
  setIsModelOpen: (isModelOpen: boolean) => void;
  otpType: string;
  email?: string;
  phone?: string;
};
function OtpModel(props: Props) {
  const [otp, setOtp] = useState("");
  const otpType = props.otpType;
  const inputLength = props.otpType == "email" ? 6 : 4;
  const { handleDataVerifications } = useUserProfileServices();
  const [loading, setLoading] = useState(false);
  const closeModel = () => {
    props.setIsModelOpen(false);
  };

  function handleOtpSubmit() {
    setLoading(true);
    let data: any = {
      otp: "",
    };
    if (otpType == "email") {
      data = {
        otp,
        email: props.email,
      };
    }
    if (otpType == "phone") {
      data = {
        otp,
        phone: props.phone,
      };
    }
    handleDataVerifications({ data })
      .then(() => {
        setOtp("");
        closeModel();
      })
      .finally(() => {
        setLoading(false);
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
                  A one time password is sent your {otpType}
                </p>
              </div>
            </DialogTitle>
            <DialogDescription className="p-5 flex items-center justify-center">
              <div>
                <InputOTP
                  value={otp}
                  required={true}
                  onChange={(value) => setOtp(value)}
                  maxLength={inputLength}
                  render={({ slots }) => (
                    <>
                      <InputOTPGroup className="gap-2">
                        {slots.slice(0, inputLength).map((slot, index) => (
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
              <Button
                onClick={handleOtpSubmit}
                disabled={otp.length == inputLength ? false : true}
                variant={"secondary"}
              >
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
