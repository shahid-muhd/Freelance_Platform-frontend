"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons/social-icons";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useFormSubmitter } from "../../../services/formSubmit";
import { UserData } from "@/utils/types";
import { nameValidator } from "@/utils/validators/formValidators";
interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

function page({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [email, setEmail] = useState("");
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    password: "",
  });

  const { handleAuthFormSubmits } = useFormSubmitter();

  useEffect(() => {
    let verifiedEmail = localStorage.getItem("unVerifiedEmail");

    verifiedEmail && setEmail(JSON.parse(verifiedEmail));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name!='password') {
     var cleanedValue=nameValidator(value)
    }

    setData((prevData) => ({
      ...prevData,
      [name]:cleanedValue,
    }));
  };

  async function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    await handleAuthFormSubmits("accountCreation", {
      email,
      password: data.password,
      first_name: data.first_name,
      last_name: data.last_name,
    });

    setIsLoading(false);
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
              Provide your name and passsword
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
                      name="first_name"
                      placeholder="First Name"
                      type="text"
                      autoCapitalize="none"
                      autoCorrect="off"
                      aria-autocomplete="none"
                      autoComplete="off"
                      minLength={1}
                      maxLength={15}    
                      value={data.first_name}
                      onChange={(e) => handleInputChange(e)}
                      disabled={isLoading}
                    />
                  </div>
                  <div className=" grid gap-2">
                    <Input
                      id="last_name"
                      name="last_name"
                      placeholder="Last Name"
                      type="text"
                      autoCapitalize="none"
                      autoCorrect="off"
                      aria-autocomplete="none"
                      autoComplete="off"
                      value={data.last_name}
                      minLength={0}
                      maxLength={50}
                      onChange={(e) => handleInputChange(e)}
                      disabled={isLoading}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Input
                    id="password"
                    name="password"
                    placeholder="password"
                    type="password"
                    autoCapitalize="none"
                    autoCorrect="off"
                    aria-autocomplete="none"
                    autoComplete="off"
                    minLength={8}
                    maxLength={100}
                    value={data.password}
                    onChange={(e) => handleInputChange(e)}
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
