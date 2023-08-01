const generateGoogleLoginURL = (clienId: string, redirect_uri: string) => {
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
console.log(
  generateGoogleLoginURL(
    process.env.GOOGLE_CLIENT_ID as string,
    process.env.GOOGLE_LOGIN_REDIRECT_URL as string
  )
);
