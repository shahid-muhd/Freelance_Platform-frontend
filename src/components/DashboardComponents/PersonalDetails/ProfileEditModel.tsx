import React, { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/utils/context/contextProviders";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import userCrudServices from "@/app/services/userCrudServices";
import { ProfileFrom } from "@/utils/types";
function ProfileEditModel() {
  const { user, setUserData } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);
  const { handleProfileFormSubmits } = userCrudServices();

  const [formData, setFormData] = useState<ProfileFrom>({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const userData = user?.user;
    if (userData) {
      setFormData(userData);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    console.log(formData);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    // handleProfileFormSubmits(formData);
  };

  return (
    <Dialog>
      <DialogTrigger>
        {" "}
        <div>
          <Button>Edit Profile</Button>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-[700px] max-h-fit h-fit shadow-lg  ">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            <div className="form-wrapper mt-5 w-full border p-5">
              <form onSubmit={handleSubmit}>
                <div className="flex  gap-8">
                  <div className="grid w-1/2 gap-5">
                    <div className="grid  gap-1">
                      <Label className="mb-2" htmlFor="first_name">
                        First Name
                      </Label>
                      <Input
                        id="first_name"
                        name="first_name"
                        type="text"
                        value={formData.first_name}
                        onChange={(e) => handleInputChange(e)}
                        autoCapitalize="none"
                        autoComplete="emaFalseil"
                        autoCorrect="off"
                        disabled={isLoading}
                      />
                    </div>

                    <div className="grid gap-1 ">
                      <Label className="mb-2" htmlFor="last_name">
                        Last name
                      </Label>
                      <Input
                        id="last_name"
                        name="last_name"
                        type="text"
                        value={formData.last_name}
                        onChange={(e) => handleInputChange(e)}
                        autoCapitalize="none"
                        autoComplete="False"
                        autoCorrect="off"
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                  <div className="grid w-1/2 gap-2">
                    <div className="grid gap-1">
                      <Label className="mb-2" htmlFor="email ">
                        Email
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange(e)}
                        autoCapitalize="none"
                        autoComplete="emaFalseil"
                        autoCorrect="off"
                        disabled={isLoading}
                      />
                    </div>

                    <div className="grid gap-1 ">
                      <Label className="mb-2" htmlFor="phone">
                        Phone
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange(e)}
                        autoCapitalize="none"
                        autoComplete="False"
                        autoCorrect="off"
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                </div>
                  <div className="submit-btn mt-3 flex justify-end">
                    <Button  type="submit">Update Profile</Button>
                  </div>
              </form>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default ProfileEditModel;
