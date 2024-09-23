import { Request, Response } from "express";

//Validaciones que vienen de expresss-validatoer
//Next es una funcion que se ejecuta despues de hacer las validaciones
export const validateRole = (req: Request, res: Response, next: Function) => {
  const rol = req.body.rol;

  if (rol !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: ` no es administrador - No puede hacer esto`,
    });
  }

  next();
};
