import { Router } from "express";
import { UserController } from "../../controllers/users/userController";
import { check } from "express-validator";
import { validate } from "../../../middlewares/validate/validate";
import { UserEmailExist, UserIdExist } from "../../../helpers/db-validators";

export const UserRoute = () => {
  const router = Router();

  //Instanciamos el controlador de User
  const userControloer = new UserController();

  //GET ALL USER
  router.get("/allUsers", userControloer.AllUsers);

  //CREATE USER
  //ESE CHECK HACE LAS VALIDACIONES CONFORME ESTAN EN EL MODELO y CONFORME LO MANDO EN EL BODY. Por ejemplo si en el modelo usa name, en el check no puedo usar nombre
  router.post(
    "/newUser",
    [
      check("name", "El nombre es obligatorio").not().isEmpty(),
      check("email", "El email no puede estar vacio").not().isEmpty(),
      check(
        "password",
        "El password no puede estar vacio y tiene que tener minimo 8 caracteres"
      )
        .not()
        .isEmpty()
        .isLength({ min: 8 }),
      check("email", "Tiene que ser un correo válido").isEmail(),
      // check('rol', 'Tiene que existir').not().isEmpty(),
      // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
      //Este check tiene el custon que le pasa la funcion de EmailExist que verifica si el email ya existe guardado en la BD
      check("email").custom(UserEmailExist),
      //Validate es una funcion que permite manejar los errores
      validate,
    ],
    userControloer.NewUser
  );

  //DELETE USER
  router.delete(
    "/deleteUser/:id",
    [check("id").custom(UserIdExist), validate],
    userControloer.DeleteUser
  );

  //TO DO UPDATE USER

  return router;
};
