"use client";
import { useFormSubmitter } from "@/app/services/formSubmit";
import userProfileServices from "@/app/services/userProfileServices";
import { Icons } from "@/components/icons/social-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { passwordValidators } from "@/utils/validators/formValidators";
import React, { useState } from "react";

function page() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isFieldDisabled, setIsFieldDisabled] = useState(false);
  const { handleDataVerifications } = userProfileServices();
  const { handleAuthFormSubmits } = useFormSubmitter();

  const handlerecoveryRequest = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    handleAuthFormSubmits("requestRecovery", { email }).then(()=>{
      setIsFieldDisabled(true);
      
    })
  };

  const handleOTPSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsFieldDisabled(true);
    if (passwordValidators(password, confirmPassword)) {
      handleAuthFormSubmits("recover", {
        email,
        password,
        confirmPassword,
        otp,
      });
    }else{

    }
  };

  return (
    <div className="container flex  justify-center items-center  h-svh">
      <div className=" flex justify-center w-full md:w-2/3 lg:w-1/3  p-5 min-h-3/5 max-h-fit border rounded-md">
        <div className="content-wrapper p-3 w-full">
          <div className="flex flex-col space-y-2 text-center mt-5 mb-12">
            <h1 className="text-2xl font-semibold tracking-tight">
              Provide Your Email Address
            </h1>
            <p className="text-sm text-muted-foreground">
              You will receive a verification code in the email address.
            </p>
          </div>
          <div className="form-wrapper ">
            <form
              onSubmit={
                !isFieldDisabled ? handlerecoveryRequest : handleOTPSubmit
              }
            >
              <div className="grid gap-5">
                <div className="grid gap-2 ">
                  <Label className="sr-only" htmlFor="email">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@example.com"
                    required
                    autoCapitalize="none"
                    autoCorrect="off"
                    aria-autocomplete="none"
                    autoComplete="off"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isFieldDisabled}
                  />
                </div>
                {isFieldDisabled && (
                  <div className="grid gap-5">
                    {" "}
                    <div className="grid gap-2 ">
                      <Label className="sr-only" htmlFor="password">
                        New Password
                      </Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="New Password"
                        required
                        autoCapitalize="none"
                        autoCorrect="off"
                        aria-autocomplete="none"
                        autoComplete="off"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                
                      />
                    </div>
                    <div className="grid gap-2 ">
                      <Label className="sr-only" htmlFor="confirm-password">
                        Confirm New Password
                      </Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="Confirm New Password"
                        required
                        autoCapitalize="none"
                        autoCorrect="off"
                        aria-autocomplete="none"
                        autoComplete="off"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                   
                      />
                    </div>
                    <div className="grid gap-2 ">
                      <Label className="sr-only" htmlFor="email">
                        One-Time Password
                      </Label>
                      <Input
                        id="otp"
                        type="text"
                        placeholder="Enter the noe time password you recieved in your email."
                        required
                        autoCapitalize="none"
                        autoCorrect="off"
                        aria-autocomplete="none"
                        autoComplete="off"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                   
                      />
                    </div>
                  </div>
                )}

                {isFieldDisabled && (
                  <div
                    onClick={() => setIsFieldDisabled(false)}
                    className="text-sm hover:cursor-pointer"
                  >
                    <p>Change Email</p>
                  </div>
                )}

                {!isFieldDisabled?
                  <Button disabled={isFieldDisabled} type="submit">
                    Send Verification Code
                  </Button>
                  :
                  <Button disabled={isLoading} type="submit">
                    Recover Account
                  </Button>


                }
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
