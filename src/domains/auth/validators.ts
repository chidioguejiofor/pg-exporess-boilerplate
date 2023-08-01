export const resendOtpInputValidatorSchema = {
  email: "required|email",
};

export const registerInputValidatorSchema = {
  firstName: "required|string",
  lastName: "required|string",
  email: "required|email",
  password: "required|string|min:7",
  phoneNumber: "string|min:10",
  gender: [{ in: ["MALE", "FEMALE"] }],
  phoneCountryCode: "string|max:4",
  dob: "date",
};

export const refreshTokenSchema = {
  accessToken: "required|min:15",
  refreshToken: "required|min:15",
};

export const loginInputValidatorSchema = {
  email: "required|email",
  password: "required|string|min:4",
};

export const passwordResetValidatorSchema = {
  email: "required|email",
};

export const socialLoginSchema = {
  provider: "required|in:google",
  authCode: "required|string|min:5",
};

export const verifyOtpInputValidatorSchema = {
  otp: "required|min:6",
  email: "required|email",
};

export const verifyPasswordResetValidatorSchema = {
  email: "required|email",
  otp: "required|min:6",
  password: "required|string|min:7",
  confirmPassword: "required|string|min:7",
};
