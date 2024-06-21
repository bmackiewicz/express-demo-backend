import { Application, Router } from "express";
import userRouters from "./users";
// import tutorialRoutes from "./tutorial.routes";

export default class Routes {
  constructor(app: Application) {
        app.use("/api/v1/users", userRouters);
        app.get('/api/v1/status', (req, res) => {
          res.send({ status: 'ok' });
        });

  }
}