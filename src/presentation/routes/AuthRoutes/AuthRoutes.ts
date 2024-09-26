import { Router } from "express";
import { UserController } from "../../controllers/users/userController";
import { check } from "express-validator";
import { validate } from "../../../middlewares/validate";
import { UserEmailExist, UserIdExist } from "../../../helpers/db-validators";
import { AuthController } from "../../controllers/auth/authController";

export const AuthRoute = () => {
  const router = Router();

  //Instanciamos el controlador del login
  const authControler = new AuthController();

  router.post(
    "/login",
    [
      check("email", "El email es obligatorio").isEmail(),
      check("password", "El password es obligatorio").not().isEmpty(),
      validate,
    ],
    authControler.Login
  );

  return router;
};
