type TokenData = {
  email: string;
  emailIsVerified: boolean;
  aud: string;
  iss: string;
};

export type ValidateInput = {
  network: "microsoft" | "google" | "apple";
  idToken: string;
};

export interface ITokenManager {
  validateToken: (
    network: ValidateInput["network"],
    idToken: string
  ) => TokenData | Promise<TokenData>;
  decode: (token: string) => Record<string, string>;
  verifyToken: (secretKey: string, token: string) => object;
  generateToken: (secretKey: string, payload: object) => Promise<string>;
}
