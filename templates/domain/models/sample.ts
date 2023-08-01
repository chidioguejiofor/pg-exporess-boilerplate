import { Table, Column, Model } from "sequelize-typescript";

@Table
export class SampleModel extends Model {
  @Column
  name: string;

  @Column
  birthday: Date;

  /*
  @HasMany(() => Hobby)
  hobbies: Hobby[];
  */
}
