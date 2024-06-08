"use client";
import useUserProfileServices from "@/app/services/userProfileServices";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/utils/context/stateContextProviders";
import React, {  useEffect, useState } from "react";
import AddressModel from "./AddressEditModel";
import { Address,  } from "@/utils/types/types";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Input } from "@/components/ui/input";
import OtpModel from "./OtpModel";
import { MdOutlineEdit } from "react-icons/md";
import ProfilePictureChanger from "./profilePictureChanger";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";



import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
function UserDetailsComponent() {
  const { user } = useUserContext();
  const [editDisabler, seteditDisabler] = useState(true);

  const [firstName, setFirstName] = useState<string | undefined>("");
  const [lastName, setLastName] = useState<string | undefined>("");
  const [email, setEmail] = useState<string | undefined>("");
  const [phone, setPhone] = useState<string | undefined>("");
  const [selectedProfileImage, setSelectedProfileImage] = useState<
    File | string | null
  >();
  const [newProfileImage, setNewProfileImage] = useState<string | null>();
  const [address, setAddress] = useState<Address | null>(null);

  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isAddresModel, setIsAddresModel] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [otpType, setOtpType] = useState("");
  const [profilePicDialogue, setProfilePicDialogue] = useState(false);

  const { handleProfileFormSubmits, handleDataVerifications } =
    useUserProfileServices();

  useEffect(() => {
    setFirstName(user?.user?.first_name);
    setLastName(user?.user?.last_name);
    setEmail(user?.user?.email);
    setPhone(user?.user?.phone);

    user?.address && setAddress(user.address);
  }, [user]);

  const editDisabledFormStyle = "bg-transparent";

  const handleSubmits = (type?: string) => {
    setOtpType(type || "");
    if (type == "email") {
      setIsModelOpen(true);
      handleDataVerifications({ data: { email } }).catch((error) => {
        setIsModelOpen(false);
      });
    } else if (type == "phone") {
      handleDataVerifications({ data: { phone } }).then(() => {
        setIsModelOpen(true);
      });
    } else if (type == "image") {
      if (newProfileImage) {
        handleProfileFormSubmits({
          data: { user: { profile_image: newProfileImage as string } },
        }).then(()=>{
          setProfilePicDialogue(false)
        })
      }
    } else {
      handleProfileFormSubmits({
        data: { user: { first_name: firstName, last_name: lastName } },
      });
    }
  };

  const handleProfileImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    let files;

    files = e.target.files;

    const reader = new FileReader();
    reader.onload = () => {
      setSelectedProfileImage(reader.result as any);
    };
    files && reader.readAsDataURL(files[0]);
  };

  return (
    <div className="personal-details w-full h-full p-0  ">
      {user && (
        <div className="top-section h-2/5 bg-slate-300 dark:bg-zinc-900 w-full p-0 relative rounded-2xl ">
          <div
            className={`cover-img-wrapper w-full p-0 h-3/5  bg-[url('/images/user-cover.jpg')] bg-no-repeat bg-top bg-cover rounded-t-2xl `}
          ></div>

          <div className="absolute flex top-1/3 ml-10  w-full">
            <div className="profile-pic-wrapper ">
              <div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="profile-pic-holder  rounded-full w-36 h-36  flex flex-col items-center justify-center"
              >
                <Avatar className="w-full h-full">
                  <AvatarImage
                  className="w-full h-full"
                    src={`${
                      user.user?.profile_image &&
                      process.env.NEXT_PUBLIC_BASE_URL + user.user.profile_image
                    }`}
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                {isHovered && (
                  <div className="flex justify-center items-center hover:cursor-pointer  w-full h-full bg-black opacity-60 rounded-full">
                    {" "}
                    <div
                      onClick={() => setProfilePicDialogue(true)}
                      className="w-fit"
                    >
                      <p> Change Image</p>
                    </div>{" "}
                  </div>
                )}
              </div>

              <Dialog open={profilePicDialogue}>
                <DialogContent className="min-w-[1000px] max-h-[550px]">
                  <DialogHeader>
                    <DialogTitle className="p-2">
                      Add New Profile Picture
                    </DialogTitle>
                    <DialogDescription className="p-3">
                      {!selectedProfileImage ? (
                        <div className=" w-fit space-y-3">
                          <Label htmlFor="profile_image">
                            Choose an image from device
                          </Label>
                          <Input
                            name="profile_image"
                            id="profile_image"
                            type="file"
                            accept="image/png, image/jpeg,image/avif,image/webp"
                            onChange={handleProfileImageUpload}
                          />
                        </div>
                      ) : (
                        <div>
                          <ProfilePictureChanger
                            newImage={selectedProfileImage}
                            setNewProfileImage={setNewProfileImage}
                          />
                          <div className="">
                            {" "}
                            <Button
                              onClick={(e) => setSelectedProfileImage(null)}
                              className="p-0"
                              variant={"link"}
                            >
                              Change Image
                            </Button>
                          </div>
                        </div>
                      )}
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="sm:justify-start px-3 ">
                    <DialogClose asChild>
                      <div className="flex gap-5">
                        <Button
                          onClick={() => setProfilePicDialogue(false)}
                          variant="outline"
                        >
                          Cancel
                        </Button>
                        {selectedProfileImage && (
                          <Button
                            onClick={() => {
                              handleSubmits("image");
                            }}
                            variant={"secondary"}
                          >
                            Save
                          </Button>
                        )}
                      </div>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="flex justify-between  w-full mr-10">
              <div className="name-container h-full flex items-end p-5 ">
                {editDisabler ? (
                  <p className="text-3xl  font-bold  mb-2  text-foreground capitalize">
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
                      <Button onClick={() => handleSubmits()} variant={"ghost"}>
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
            <div className="address-wrapper">
              <div className="address-title flex gap-3 items-end ">
                <div className="text-2xl font-medium">
                  <h4>Billing Address</h4>
                </div>
                <div className="address-edit-model">
                  <AddressModel
                    isOpen={isAddresModel}
                    setIsOpen={setIsAddresModel}
                    address={address}
                  />
                </div>
                {address && (
                  <div>
                    <div
                      onClick={() => setIsAddresModel(true)}
                      className="mt-5 w-fit  "
                    >
                      <div className="flex items-center gap-3 text-lg  hover:cursor-pointer">
                        <div>
                          <p>Edit</p>
                        </div>
                        <div>
                          <span>
                            <MdOutlineEdit size={21} />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {address ? (
                <div className="mt-5 leading-7">
                  <p>{address.house_name}</p>
                  <p>
                    {address.street}, {address.place}
                  </p>
                  <p>
                    {address.city}, {address.state}
                  </p>
                  <p>
                    {address.country}, {address.postal_code}
                  </p>
                </div>
              ) : (
                <div>
                  <div className="mt-5 w-fit ">
                    <div
                      onClick={() => setIsAddresModel(true)}
                      className="flex gap-3 text-lg  hover:cursor-pointer"
                    >
                      <p>Add Address</p>
                      <p className="flex items-end">
                        <span>
                          <IoIosAddCircleOutline size={23} />
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
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
                    <p>Phone : {user.user?.phone}</p>
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
