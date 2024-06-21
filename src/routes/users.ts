import { Request, Response, Router } from "express";
import { checkUser, createUser } from '../users/users';

class UserRoutes {
  router = Router();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.get("/", (req: Request, res: Response): Response => {
      return res.json({message: "Welcome user API."});
    });
    this.router.post("/register", async (req: Request, res: Response): Promise<Response> => {
      const {password, username, firstName, lastName} = req.body;
      console.log(req.body)
      console.log({password, username, firstName, lastName})
      await createUser({password, username, firstName, lastName})
      return res.status(201).json({message: "Welcome user API."});
    });

    this.router.post("/login", async (req: Request, res: Response): Promise<Response> => {
      const {password, username} = req.body;
      const token = await checkUser({password, username})
      console.log(token)
      if (token) {
        return res.json({token});
      }
      return res.status(404).json()
    });
  }

}

export default new UserRoutes().router;