"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons/social-icons";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useFormSubmitter } from "../../../services/formSubmit";
interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

function page({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { loading, error, handleAuthFormSubmits } = useFormSubmitter();

  useEffect(() => {
    let verifiedEmail = localStorage.getItem("unVerifiedEmail");

    verifiedEmail && setEmail(JSON.parse(verifiedEmail));
  }, []);

  async function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    const first_name = firstName;
    const last_name = lastName;
    handleAuthFormSubmits("accountCreation", { email, password, last_name });
  }

  return (
    <div
      className="container flex  justify-center items-center  h-svh"
      {...props}
    >
      <div className=" flex justify-center w-full md:w-2/3 lg:w-1/3  p-5 h-3/5 ">
        <div className="content-wrapper p-3 w-full">
          <div className="flex flex-col space-y-2 text-center mt-5 mb-24">
            <h1 className="text-2xl font-semibold tracking-tight">
              Enter Name And Passsword
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter a secure password for your account
            </p>
          </div>
          <div className="form-wrapper ">
            <form onSubmit={handleSubmit}>
              <div className="grid gap-5">
                <div className="grid gap-2 ">
                  <Label className="sr-only" htmlFor="email">
                    Email
                  </Label>
                  <Input
                    id="email"
                    defaultValue={email}
                    value={email}
                    type="email"
                    autoCapitalize="none"
                    autoCorrect="off"
                    aria-autocomplete="none"
                    autoComplete="off"
                    disabled={true}
                  />
                </div>
                <div className="flex gap-4">
                  <div className="grid gap-2">
                    <Input
                      id="first_name"
                      placeholder="First Name"
                      type="text"
                      autoCapitalize="none"
                      autoCorrect="off"
                      aria-autocomplete="none"
                      autoComplete="off"
                      maxLength={15}
                      onChange={(e) => setFirstName(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  <div className=" grid gap-2">
                    <Input
                      id="last_name"
                      placeholder="Last Name"
                      type="text"
                      autoCapitalize="none"
                      autoCorrect="off"
                      aria-autocomplete="none"
                      autoComplete="off"
                      minLength={15}
                      maxLength={15}
                      onChange={(e) => setLastName(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Input
                    id="password"
                    placeholder="password"
                    type="password"
                    autoCapitalize="none"
                    autoCorrect="off"
                    aria-autocomplete="none"
                    autoComplete="off"
                    minLength={8}
                    maxLength={100}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                  />
                </div>

                <Button disabled={isLoading}>
                  {isLoading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Create Account
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
