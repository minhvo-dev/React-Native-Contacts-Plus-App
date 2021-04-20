export const emailValidator = (email) => {
  const re = /\S+@\S+\.\S+/;

  if (!email || email.length === 0) {
    return "Email cannot be empty";
  }
  if (!re.test(email)) {
    return "Invalid email";
  }

  return "";
};

export const phoneValidator = (phone) => {
  const re = /^\d{9,15}$/;

  if (!phone || phone.length === 0) {
    return "Phone number cannot be empty";
  }
  if (!re.test(phone)) {
    return "Invalid phone number";
  }

  return "";
};

export const passwordValidator = (password) => {
  if (!password || password.length === 0) {
    return "Password cannot be empty";
  }

  if (password.length < 8) {
    return "Password must be at least 8 character";
  }

  return "";
};

export const confirmPasswordValidator = (password, confirmPassword) => {
  if (!confirmPassword || confirmPassword.length === 0) {
    return "Confirm password cannot be empty";
  }

  if (password !== confirmPassword) {
    return "Confirm password does not match password";
  }

  return "";
};

export const nameValidator = (name) => {
  if (!name || name.length === 0) {
    return "Name cannot be empty";
  }
  if (name.length < 3) {
    return "Name is too short";
  }

  return "";
};

export const socialAccountValidator = (account) => {
  const re = /\S+/;

  if (!account || account.length === 0) {
    return "Account cannot be empty";
  }
  if (!re.test(account)) {
    return "Invalid account";
  }

  return "";
};