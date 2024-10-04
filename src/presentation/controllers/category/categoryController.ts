import { Request, Response } from "express";

export class CategoryController {
  constructor() {}

  //CATEGORY
  public Category = async (req: Request, res: Response) => {
    //Obtener todas las categorias - publico

    //Obtener una categoria por id - publico

    //Crear categoria - privado - con token valido

    //Actualizar categoria por id - privado - con token valido

    //Borrar un categoria por id - Admin
    res.json({
      msg: "Category",
    });
  };
}
