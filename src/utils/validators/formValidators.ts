export const phoneValidator = (phone: string) => {
  //Remove all non-numeric values
  let phoneNumber = phone.replace(/[^0-9]/g, "");
  if (phoneNumber.length > 10) {
    phoneNumber = phoneNumber.slice(1);
  }

  return phoneNumber;
};

export const nameValidator = (name: string) => {
  let modifiedName = name.replace(/^\s+|\s+\g/, "").replace(/\s{2,}/g, " ");

  return modifiedName;
};

export const budgetValidator = (budget: string) => {
  let enteredBudget = Number(budget);

  if (enteredBudget > 15000 || enteredBudget < 30) {
    return false;
  } else {
    return true;
  }
};

export const passwordValidators = (
  passwordFirst: string,
  passwordSecond: string
) => {
  if (passwordFirst !== passwordSecond) {
    return false;
  }

  return true;
};
