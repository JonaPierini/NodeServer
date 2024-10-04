import { Router } from "express";
import { UserRoute } from "./UsersRoutes/UsersRoutes";
import { AuthRoute } from "./AuthRoutes/AuthRoutes";
import { CategoryRoute } from "./CategoryRoutes/CategoryRoutes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    //AUTH-LOGIN
    router.use("/api", AuthRoute());

    //USERS
    router.use("/api", UserRoute());

    //CATEGORY
    router.use("/api", CategoryRoute());

    return router;
  }
}
