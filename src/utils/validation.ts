export const validateAccount = (account: string) => {
  if (!account.match(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)) return false;
  return true;
};

export const validatePassword = (password: string) => {
  if (
    !password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()[\]{}|;:,.<>?/~`=_+-]).{8,}$/)
  )
    return false;
  return true;
};

export const validatePasswordMatch = (password1: string, password2: string) => {
  if (password1 !== password2) return false;
  return true;
};

export const validatePhone = (phone: string) => {
  if (!phone.match(/^\d{11}$/)) return false;
  return true;
};

export const validateEmail = (email: string) => {
  if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) return false;
  return true;
};
