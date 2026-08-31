import { Sequelize } from "sequelize";
import './env';

const sequelize = new Sequelize(
  process.env.POSTGRES_DB as string,
  process.env.POSTGRES_USER as string,
  process.env.POSTGRES_PASSWORD as string,
  {
    host: process.env.POSTGRES_HOST || "db", // Usually in docker compose database service is called db
    port: parseInt(process.env.POSTGRES_PORT || "5432", 10),
    dialect: "postgres",
    logging: false, // Deactivate SQL logs in console to avoid data loss
  }
);

export default sequelize;