import { Router } from "express";
import { UserRoute } from "./UsersRoutes/UsersRoutes";
import { AuthRoute } from "./AuthRoutes/AuthRoutes";



export class AppRoutes {
    static get routes(): Router {


        const router = Router()

        //AUTH-LOGIN
        router.use('/api', AuthRoute())

        //USERS
        router.use('/api', UserRoute())


        return router



    }
}