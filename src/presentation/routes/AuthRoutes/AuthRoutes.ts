import { Router } from "express";
import { UserController } from "../../controllers/users/userController";
import { check } from "express-validator";
import { validate } from "../../../middlewares/validate";
import { UserEmailExist, UserIdExist } from "../../../helpers/db-validators";
import { LoginController } from "../../controllers/auth/authController";

export const AuthRoute = () => {
  const router = Router();

  //Instanciamos el controlador del login
  const loginControler = new LoginController();

  router.post(
    "/login",
    [
      check("email", "El email es obligatorio").isEmail(),
      check("password", "El password es obligatorio").not().isEmpty(),
      validate,
    ],
    loginControler.Login
  );

  return router;
};
