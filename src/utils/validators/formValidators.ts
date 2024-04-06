export const phoneValidator = (phone: string) => {
  //Remove all non-numeric values
  let phoneNumber = phone.replace(/[^0-9]/g, "");
  if (phoneNumber.length > 10) {
    phoneNumber = phoneNumber.slice(1);
  }

  return phoneNumber;
};
