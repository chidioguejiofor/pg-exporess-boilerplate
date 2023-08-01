import { Sequelize } from "sequelize-typescript";
import { SEQUELIZE_CONFIG } from "../settings";
import { combinedModels } from "./combined-models";

export const sequelize = new Sequelize({
  ...SEQUELIZE_CONFIG,
  dialect: "postgres",
  models: combinedModels, // or [Player, Team],
});
