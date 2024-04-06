"use client";
import userCrudServices from "@/app/services/userCrudServices";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/utils/context/contextProviders";
import React, { use, useEffect, useState } from "react";
import ProfileEditModel from "./ProfileEditModel";
import { FormSubmitParams } from "@/utils/types";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Input } from "@/components/ui/input";
import OtpModel from "./OtpModel";
import { error } from "console";
// type User = {
//   id: number;
//   first_name?: string;
//   last_name?: string;
//   email?: string;
//   phone?: string;
// };

function UserDetailsComponent() {
  const { user } = useUserContext();
  const [editDisabler, seteditDisabler] = useState(true);
  const [firstName, setFirstName] = useState<string | undefined>("");
  const [lastName, setLastName] = useState<string | undefined>("");
  const [email, setEmail] = useState<string | undefined>("");
  const [phone, setPhone] = useState<string | undefined>("");
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [otpType, setOtpType] = useState("");
  const { handleProfileFormSubmits, handleDataVerifications } =
    userCrudServices();
  useEffect(() => {
    setFirstName(user?.user?.first_name);
    setLastName(user?.user?.last_name);
    setEmail(user?.user?.email);
    setPhone(user?.user?.phone);
  }, [user]);

  const editDisabledFormStyle = "bg-transparent";

  const handleSubmits = (type: string) => {
    if (type == "email") {
      setOtpType("email");
      handleDataVerifications({ data: { email } })
        .then((res) => {
         
          setIsModelOpen(true);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (type == "phone") {
      setOtpType("phone");
      handleDataVerifications({ data: { phone } }).then(() => {
        setIsModelOpen(true);
      });
    } else {
      handleProfileFormSubmits({
        data: { first_name: firstName, last_name: lastName },
      });
    }
  };

  return (
    <div className="personal-details w-full h-full p-0  ">
      {user && (
        <div className="top-section h-2/5 bg-slate-300 dark:bg-zinc-900 w-full p-0 relative rounded-2xl ">
          <div className="cover-img-wrapper w-full p-0 h-3/5  bg-[url('/images/user-cover.jpg')] bg-no-repeat bg-top bg-cover rounded-t-2xl "></div>

          <div className="absolute flex top-1/3 ml-10  w-full">
            <div className="profile-pic-wrapper">
              <div className="profile-pic-holder rounded-full w-36 h-36  bg-[url('/images/unnamed.png')] bg-cover"></div>
            </div>

            <div className="flex justify-between  w-full mr-10">
              <div className="name-container h-full flex items-end p-5 ">
                {editDisabler ? (
                  <p className="text-3xl  font-bold  mb-2  text-foreground">
                    {user.user?.first_name} {user.user?.last_name}
                  </p>
                ) : (
                  <div className=" flex gap-1">
                    <Input
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    <Input
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />

                    <div className="save-btn">
                      <Button
                        onClick={() => handleSubmits("name")}
                        variant={"ghost"}
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <div className="profile-edit-btn-container flex items-end p-5">
                {editDisabler ? (
                  <Button onClick={() => seteditDisabler(!editDisabler)}>
                    Edit Profile
                  </Button>
                ) : (
                  <Button onClick={() => seteditDisabler(!editDisabler)}>
                    Done
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bottom-section rounded-2xl  h-3/5 min-h-fit bg-gray-900 mt-4 p-10">
        <div className="content-wrapper flex justify-between">
          <div className="profile-bottom-left w-1/2">
            <div className="text-2xl font-medium">
              <h4>Billing Address</h4>
            </div>
            {user?.address ? (
              <div className="mt-5 leading-7">
                <p>Lorem IPsum Ipsum</p>
                <p>Lorem IPsum Ipsum Lorem IPsum</p>
                <p>Lorem IPsum Ipsum Lorem IPsum Ipsum</p>
              </div>
            ) : (
              <div className="mt-5 ">
                <div className="flex gap-3 text-lg  hover:cursor-pointer">
                  <p>Add Address</p>
                  <p className="flex items-end">
                    <span>
                      <IoIosAddCircleOutline size={23} />
                    </span>
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="profile-bottom-right text-right w-1/2">
            <div className="text-2xl font-medium">
              <h4>Contact Details</h4>
            </div>
            {user && (
              <div className="mt-5 leading-10 ">
                <OtpModel
                  isModelOpen={isModelOpen}
                  setIsModelOpen={setIsModelOpen}
                  otpType={otpType}
                  email={email}
                  phone={phone}
                />
                {editDisabler ? (
                  <div>
                    {" "}
                    <p>phone : {user.user?.phone}</p>
                    <p>Email : {user.user?.email}</p>
                  </div>
                ) : (
                  <div className="form-content-wrapper">
                    <div className="flex  w-fit ml-auto gap-4 ">
                      <div className="save-btn">
                        <Button
                          onClick={() => handleSubmits("phone")}
                          variant={"ghost"}
                        >
                          Save
                        </Button>
                      </div>
                      <p> Phone: </p>{" "}
                      <Input
                        className={` ${
                          editDisabler && editDisabledFormStyle
                        }  border-0 text-right text-lg `}
                        disabled={editDisabler}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      ></Input>{" "}
                    </div>
                    <div className="flex  w-fit ml-auto gap-4  mt-3">
                      <div className="save-btn">
                        <Button
                          onClick={() => handleSubmits("email")}
                          variant={"ghost"}
                        >
                          Save
                        </Button>
                      </div>
                      <p> Email:</p>{" "}
                      <Input
                        className={` ${
                          editDisabler && editDisabledFormStyle
                        }  border-0 text-right text-lg `}
                        disabled={editDisabler}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      ></Input>{" "}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetailsComponent;
