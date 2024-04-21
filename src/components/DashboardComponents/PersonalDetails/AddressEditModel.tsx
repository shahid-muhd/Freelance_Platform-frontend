import React, { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Address } from "@/utils/types";
import { nameValidator } from "@/utils/validators/formValidators";
import userProfileServices from "@/app/services/userProfileServices";

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  address: Address | null;
};
function AddressModel(props: Props) {
  const addressInitial = {
    house_name: "",
    street: "",
    place: "",
    city: "",
    state: "",
    country: "",
    postal_code: "",
  };
  const [address, setAddress] = useState<Address>(addressInitial);
  const { handleProfileFormSubmits } = userProfileServices();

  useEffect(() => {
    props.address && setAddress(props.address);
  }, []);



  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    handleProfileFormSubmits({
      data: { address },
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    let cleanedValue = value;

    if (name != "postal_code") {
      cleanedValue = nameValidator(value);
    }

    setAddress((prevData) => ({
      ...prevData,
      [name]: cleanedValue,
    }));
  };

  const closeModel = () => {
    setAddress(addressInitial);
    props.setIsOpen(false);
  };
  return (
    <Dialog open={props.isOpen}>
      <DialogContent className="max-w-[700px] max-h-fit h-fit shadow-lg  ">
        <DialogHeader>
          <DialogTitle className="tracking-wide">
            {" "}
            Add / Edit Address
          </DialogTitle>
          <DialogDescription>
            <div className="form-wrapper mt-5 w-full border p-5">
              <form onSubmit={handleSubmit}>
                <div className=" gap-5">
                  <div className="grid grid-cols-2 w-full gap-5">
                    <div className="grid  gap-1">
                      <Label className="mb-2" htmlFor="house_name">
                        House / Appartment
                      </Label>
                      <Input
                        id="house_name"
                        name="house_name"
                        type="text"
                        autoCapitalize="none"
                        autoCorrect="off"
                        required
                        value={address.house_name}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="grid gap-1 ">
                      <Label className="mb-2" htmlFor="street">
                        Street
                      </Label>
                      <Input
                        id="street"
                        name="street"
                        type="text"
                        autoCapitalize="none"
                        autoComplete="False"
                        autoCorrect="off"
                        required
                        value={address.street}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="grid ">
                      <Label className="mb-2" htmlFor="place ">
                        Place
                      </Label>
                      <Input
                        id="place"
                        name="place"
                        type="text"
                        autoCapitalize="none"
                        autoComplete="emaFalseil"
                        autoCorrect="off"
                        required
                        value={address.place}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="grid gap-1 ">
                      <Label className="mb-2" htmlFor="city">
                        City
                      </Label>
                      <Input
                        id="city"
                        name="city"
                        type="text"
                        autoCapitalize="none"
                        autoComplete="False"
                        autoCorrect="off"
                        required
                        value={address.city}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="grid gap-1 ">
                      <Label className="mb-2" htmlFor="state">
                        State
                      </Label>
                      <Input
                        id="state"
                        name="state"
                        type="text"
                        autoCapitalize="none"
                        autoComplete="False"
                        autoCorrect="off"
                        required
                        value={address.state}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="grid gap-1 grid-cols-2">
                      <div className="grid gap-1  ">
                        <Label className="mb-2" htmlFor="country">
                          country
                        </Label>
                        <Input
                          id="country"
                          name="country"
                          type="text"
                          autoCapitalize="none"
                          autoComplete="False"
                          autoCorrect="off"
                          required
                          value={address.country}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="grid gap-1  ">
                        <Label className="mb-2" htmlFor="postal_code">
                          Postal Code
                        </Label>
                        <Input
                          id="postal_code"
                          name="postal_code"
                          type="number"
                          autoCapitalize="none"
                          autoComplete="False"
                          autoCorrect="off"
                          minLength={2}
                          maxLength={15}
                          required
                          value={address.postal_code}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-5 mt-5 w-full justify-end">
                  <div>
                    <Button onClick={closeModel}>Cancel</Button>
                  </div>
                  <div className="submit-btn">
                    <Button type="submit">Save</Button>
                  </div>
                </div>
              </form>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default AddressModel;
