import { Request, Response } from "express";
import { CategoryModel } from "../../models/category.model";

export class CategoryController {
  constructor() {}

  //ALL CATEGORY
  public ALLCategory = async (req: Request, res: Response) => {
    //Crear categoria - privado - con token valido
    res.json({
      msg: "Category",
    });
  };

  //CRATE CATEGORY
  public CreateCategory = async (req: Request, res: Response) => {
    //Crear categoria - privado - con token valido

    const name = req.body.name.toUpperCase();

    const categoryDB = await CategoryModel.findOne({ name });

    if (categoryDB) {
      return res.status(400).json({
        msg: `La categoria ${name} ya existe`,
      });
    }

    //Generar la data en db
    const newCategory = await CategoryModel.create({
      name: req.body.name.toUpperCase(),
      state: req.body.state,
      usuario: req.body.user._id,
    });

    //Guarda en bd que no haria falta pq ya arriba se esta creando
    await newCategory.save();

    res.status(200).json({
      msg: "Categoria Creada",
      newCategory,
    });
  };
}
