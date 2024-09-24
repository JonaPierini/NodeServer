import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { envs } from "../config/envs";
import { UserModel } from "../presentation/models/user.model";

export const validateJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la petición - acordate de mandarlo en el header",
    });
  }

  try {
    // Verificamos el token y forzamos el tipo del payload
    const { id } = jwt.verify(token, envs.SECRETORPRIVATEKEY) as JwtPayload;

    // leer el usuario que corresponde al id
    const usuario = await UserModel.findById(id);

    if (!usuario) {
      return res.status(401).json({
        msg: "Token no válido - usuario no existe en la base de datos",
      });
    }

    // Verificar si el estado del usuario es true
    if (!usuario.state) {
      return res.status(401).json({
        msg: "Token no válido - usuario con estado: false",
      });
    }

    // Asignamos el usuario a req.user en lugar de modificar el body
    req.body.user = usuario;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      msg: "Token no válido",
    });
  }
};
