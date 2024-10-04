import { Router } from "express";
import { CategoryController } from "../../controllers/category/categoryController";
import { validate } from "../../../middlewares/validate";

export const CategoryRoute = () => {
  const router = Router();

  //Instanciamos el controlador del login
  const categroyControler = new CategoryController();

  router.get("/category", [validate], categroyControler.Category);

  return router;
};
