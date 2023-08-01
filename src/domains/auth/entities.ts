import { BaseEntity } from "shared/base-entity";

export interface UserEntity extends BaseEntity {
  firstName: string;
  lastName: string;
  password: string;
  emailIsVerified?: boolean;
  email: string;
  dob?: Date | string;
  gender?: string;
}
