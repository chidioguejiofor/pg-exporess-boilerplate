import {
  Table,
  Column,
  DefaultScope,
  Scopes,
  DataType,
} from "sequelize-typescript";
import bcrypt from "bcryptjs";

import { BaseModel } from "shared/base-model";
import { UserEntity } from "../entities";

@DefaultScope(() => ({
  attributes: {
    exclude: ["password"],
  },
}))
@Scopes(() => ({
  withPassword: {
    attributes: {
      include: ["password"],
    },
  },
}))
@Table({
  tableName: "user",
})
export class User extends BaseModel<UserEntity> {
  @Column({
    allowNull: false,
    field: "first_name",
    type: DataType.STRING,
  })
  firstName: string;

  @Column({
    allowNull: false,
    field: "last_name",
    type: DataType.STRING,
  })
  lastName: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  email: string;

  @Column({ allowNull: true, type: DataType.STRING })
  password: string;

  @Column({
    field: "email_is_verified",
    defaultValue: false,
    type: DataType.STRING,
  })
  emailIsVerified: boolean;

  @Column({ allowNull: true, type: DataType.STRING })
  gender: string;

  @Column({ allowNull: true, type: DataType.DATEONLY })
  dob: Date;

  static generateHash(password: string) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  }

  public isPasswordValid(unhashedPassword: string) {
    return bcrypt.compareSync(unhashedPassword, this.password as string);
  }
}
