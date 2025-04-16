import dotenv from "dotenv";
import * as process from "node:process";

dotenv.config();

export const ENV = {
    BASE_URL: process.env.BASE_URL!,
    IDP_CONTRACTS_URL: process.env.IDP_CONTRACTS_URL!,
}
