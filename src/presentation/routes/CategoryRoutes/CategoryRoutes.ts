import { Router } from "express";
import { CategoryController } from "../../controllers/category/categoryController";
import { validate } from "../../../middlewares/validate";
import { validateJWT } from "../../../middlewares/validate-token";
import { check } from "express-validator";
import { CategoryIdExist } from "../../../helpers/db-validators";
import { validateRole } from "../../../middlewares/validate-role";

export const CategoryRoute = () => {
  const router = Router();

  //Instanciamos el controlador del login
  const categroyControler = new CategoryController();

  //Obtener todas las categorias - publico
  router.get("/allCategory", [validate], categroyControler.AllCategory);

  //Obtener una categoria por id - publico
  router.get(
    "/categoryById/:id",
    [
      check("id", "No es un ID válido").isMongoId(),
      check("id").custom(CategoryIdExist),
      validate,
    ],
    categroyControler.CategoryById
  );

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
  router.put(
    "/putCategory/:id",
    [
      validateJWT,
      check("_id", "El id no se puede cambiar").isEmpty(),
      check("state", "El estado no se puede cambiar").isEmpty(),
      check("name", "El nombre no puede estar vacio").not().isEmpty(),
      validate,
    ],
    categroyControler.PutCategory
  );

  //Borrar un categoria por id - Admin
  router.delete(
    "/deleteCategory/:id",
    [validateJWT, validateRole, check("id").custom(CategoryIdExist), validate],
    categroyControler.DeleteCategory
  );

  return router;
};
