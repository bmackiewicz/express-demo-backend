import express, { Application } from "express";
import cors, { CorsOptions } from "cors";
import Routes from "./routes";
import dotenv from "dotenv"
import { createToken } from './auth/helpers/jwt';
export default class Server {
  constructor(app: Application) {
    this.config(app);
    new Routes(app);
  }

  private config(app: Application): void {

    // get config vars
    dotenv.config();

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
  }
}