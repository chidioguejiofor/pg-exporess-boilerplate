import cryptoRandomString from "crypto-random-string";
import { UserEntity } from "../entities";
import { User } from "../models";
import { UserNotFound } from "../errors";

export type UserRole = UserEntity["role"];

export class AuthRepository {
  public static async createUser(userDetails: UserEntity): Promise<UserEntity> {
    const userData = { ...userDetails };
    if (!userDetails.password) {
      userData["password"] = cryptoRandomString({ length: 12, type: "base64" });
    }
    userData["password"] = User.generateHash(userData["password"]);
    return User.create(userData);
  }
  private static generatePasswordHash(password: string) {
    return User.generateHash(password);
  }

  public static getUserByEmail(email: string) {
    return User.findOne({ where: { email } });
  }
  public static getUserById(userId: string) {
    return User.findOne({ where: { id: userId } });
  }

  public static getUserWithPasswordByEmail(
    email: string,
    role: UserRole = "customer"
  ) {
    return User.scope("withPassword").findOne({ where: { email, role } });
  }

  public static async getUserWithCredentials(
    email: string,
    password: string,
    role: UserRole[] = ["customer"]
  ): Promise<UserEntity> {
    const user = await User.scope("withPassword").findOne({
      where: { email, role },
    });
    if (user && user.isPasswordValid(password)) {
      return user;
    }
    throw new UserNotFound();
  }

  public static async changeUserPassword(
    password: string,
    email: string,
    role: UserRole = "customer"
  ) {
    const [isUpdated] = await User.update(
      { password: this.generatePasswordHash(password) },
      {
        where: {
          email,
          role,
        },
        returning: true,
      }
    );

    if (!isUpdated) {
      throw new UserNotFound();
    }
  }

  public static async verifyEmailAndGetUser(
    email: string,
    role: UserRole = "customer"
  ) {
    const [isUpdated, data] = await User.update(
      {
        emailIsVerified: true,
      },
      {
        where: {
          email,
          role,
        },
        returning: true,
      }
    );

    if (!isUpdated) {
      throw new UserNotFound();
    }

    return data[0] as UserEntity;
  }
}

export type AuthRepositoryType = typeof AuthRepository;
