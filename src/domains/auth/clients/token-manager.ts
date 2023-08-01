import { JwksClient } from "jwks-rsa";
import jwt from "jsonwebtoken";
import axios from "axios";
import { ITokenManager, ValidateInput } from "../usecases";
import { InvalidToken } from "../errors";
import { MICROSOFT_TENANT_ID } from "infrastructure/settings";

export class TokenManager implements ITokenManager {
  private publicKeyCache = new Map<
    string,
    { publicKey: string; expiresAt: number }
  >();

  private CACHE_DURATION_MS = 3600 * 1000; // 1 hour in milliseconds

  async generateToken(secretKey: string, payload: object) {
    return jwt.sign(payload, secretKey, { expiresIn: "1d" });
  }

  decode(token: string): any {
    try {
      const decoded = jwt.decode(token, { json: true });
      if (!decoded) throw new InvalidToken();
      return decoded;
    } catch (error) {
      throw new InvalidToken();
    }
  }

  async verifyToken(secretKey: string, token: string) {
    try {
      return jwt.verify(token, secretKey);
    } catch {
      throw new InvalidToken();
    }
  }

  async validateToken(network: ValidateInput["network"], idToken: string) {
    try {
      let tokenData;
      if (network === "google") {
        tokenData = await this.validateGoogleToken(idToken);
      } else {
        tokenData = await this.validateMicrosoftToken(idToken);
      }

      return {
        tld: tokenData.tld,
        iss: tokenData.iss,
        aud: tokenData.aud,
        email: tokenData.email,
        emailIsVerified: tokenData.email_verified,
      };
    } catch (error) {
      throw new InvalidToken("The token you provided is invalid");
    }
  }

  private async validateGoogleToken(idToken: string) {
    const response = await axios.post(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`
    );
    const data = response.data;

    const tokenIsFromGoogle =
      data.iss === "accounts.google.com" ||
      data.iss === "https://accounts.google.com";

    if (!tokenIsFromGoogle)
      throw new InvalidToken("The token you provided is invalid");
    return data;
  }

  private async validateMicrosoftToken(idToken: string) {
    const publicKey = await this.getPublicKey(idToken);

    const decodedData = jwt.verify(idToken, publicKey, {
      algorithms: ["RS256"],
    }) as object;

    return {
      ...decodedData,
      email_verified: true,
    };
  }

  private async getPublicKey(idToken: any) {
    const decodedToken: any = jwt.decode(idToken, { complete: true });
    const kid = decodedToken?.header?.kid;
    if (!kid) {
      throw new Error('Token header does not contain "kid" property.');
    }

    if (this.publicKeyCache.has(kid)) {
      const cachedKey = this.publicKeyCache.get(kid);
      if (cachedKey && cachedKey.expiresAt > Date.now()) {
        return cachedKey.publicKey;
      }
      // Key has expired, remove it from the cache
      this.publicKeyCache.delete(kid);
    }

    const publicKey = await this.fetchPbKey(kid);

    this.publicKeyCache.set(kid, {
      publicKey,
      expiresAt: Date.now() + this.CACHE_DURATION_MS,
    });
    return publicKey;
  }

  private async fetchPbKey(kid: string) {
    // some messy low level code that validates microsoft token
    // Fetch Azure AD public keys from OpenID configuration endpoint
    const openIdConfigUrl = `https://login.microsoftonline.com/${MICROSOFT_TENANT_ID}/.well-known/openid-configuration`;
    const response = await axios.get(openIdConfigUrl);
    const { jwks_uri } = response.data;

    const jwksClient = new JwksClient({ jwksUri: jwks_uri });

    const key = await jwksClient.getSigningKey(kid);
    const publicKey = key.getPublicKey();
    return publicKey;
  }
}
