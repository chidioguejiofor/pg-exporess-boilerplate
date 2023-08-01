import { InvalidToken } from "../errors";
import { ITokenManager, ValidateInput } from "./interfaces";
import { JWT_TOKEN_SECRET } from "infrastructure/settings";

type Input = {
  network: ValidateInput["network"];
  idToken: string;
};

export class LoginUserUsecase {
  constructor(private tokenManager: ITokenManager) {}

  public async execute(input: Input) {
    const { tokenData } = await this.verifyToken(input);

    const appTokenData = {
      email: tokenData.email,
    };
    const token = await this.tokenManager.generateToken(
      JWT_TOKEN_SECRET,
      appTokenData
    );

    return { user: appTokenData, token };
  }

  private async verifyToken(input: Input) {
    const { idToken, network } = input;
    const tokenData = await this.tokenManager.validateToken(network, idToken);

    if (!tokenData.emailIsVerified)
      throw new InvalidToken("Email is not verified");
    return { tokenData };
  }
}
