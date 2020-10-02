const ValidateEmailInput = (Email) => {
  const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const result = reg.test(String(Email).toLowerCase());

  if (Email.length > 40 || Email.length < 2) {
    return false;
  } else if (!result) {
    return false;
  } else {
    return true;
  }
};
const ValidateNameInput = (Name) => {
  const reg = /^[A-Za-z]+$/;
  const result = reg.test(Name);
  if (Name.length > 30 || Name.length < 2) {
    return false;
  } else if (!result) {
    return false;
  } else {
    return true;
  }
};

const ValidatePasswordInput = (Password) => {
  const reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
  const result = reg.test(Password);
  if (Password.length > 30 || Password.length < 8) {
    return false;
  } else if (!result) {
    return false;
  } else {
    return true;
  }
};
const ValidatePasswordMatch = (password, rePassword) => {
  if (password !== rePassword) {
    return false;
  } else {
    return true;
  }
};

const ValidateBirthDate = (Birthdate) => {
  if (Birthdate) {
    const todayMinushundreadYears = new Date().getFullYear() - 100;
    const todayMinusSixteenYears = new Date().getFullYear() - 16;

    if (todayMinusSixteenYears < Birthdate.getFullYear()) {
      return false;
    } else if (todayMinushundreadYears > Birthdate.getFullYear()) {
      return false;
    } else {
      return true;
    }
  }
};

const ValidateAccountType = (Type) => {
  if (Type === '0') {
    return false;
  } else {
    return true;
  }
};

export {
  ValidateEmailInput,
  ValidateAccountType,
  ValidateNameInput,
  ValidatePasswordInput,
  ValidatePasswordMatch,
  ValidateBirthDate,
};
