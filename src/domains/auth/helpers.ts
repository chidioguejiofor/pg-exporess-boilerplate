import { UserEntity } from "./entities";

export function getNonSensitiveUserData(user: UserEntity) {
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    gender: user.gender,
  };
}

export const generateGoogleLoginURL = (
  clienId: string,
  redirect_uri: string
) => {
  const base = "https://accounts.google.com/o/oauth2/v2/auth";
  const search = new URLSearchParams({
    access_type: "offline",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
    response_type: "code",
    client_id: clienId,
    redirect_uri: redirect_uri,
  });

  return `${base}?${search}`;
};
