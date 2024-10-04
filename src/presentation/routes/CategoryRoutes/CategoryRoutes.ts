import { Router } from "express";
import { CategoryController } from "../../controllers/category/categoryController";
import { validate } from "../../../middlewares/validate";
import { validateJWT } from "../../../middlewares/validate-token";
import { check } from "express-validator";

export const CategoryRoute = () => {
  const router = Router();

  //Instanciamos el controlador del login
  const categroyControler = new CategoryController();

  //Obtener todas las categorias - publico
  router.get("/allCategory", [validate], categroyControler.ALLCategory);

  //Obtener una categoria por id - publico

  //Crear categoria - privado - con token valido (con valideteJWT)
  router.post(
    "/createCategory",
    [
      validateJWT,
      check("name", "El nombre es obligatorio").not().isEmpty(),
      check("state", "El estado es obligatorio").not().isEmpty(),
      validate,
    ],
    categroyControler.CreateCategory
  );

  //Actualizar categoria por id - privado - con token valido

  //Borrar un categoria por id - Admin

  return router;
};
