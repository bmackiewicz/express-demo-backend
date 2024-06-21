import { Application, Router } from "express";
import userRouters from "./users";
// import tutorialRoutes from "./tutorial.routes";

export default class Routes {
  constructor(app: Application) {
        app.use("/api/v1/users", userRouters);

  }
}