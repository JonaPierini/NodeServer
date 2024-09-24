import jwt from "jsonwebtoken";
import { envs } from "../config/envs";

export const generarJWT = (id: String) => {
  return new Promise((resolve, reject) => {
    //payload es el ID del usuario
    const payload = { id };

    //Screto
    jwt.sign(
      payload,
      envs.SECRETORPRIVATEKEY,
      {
        expiresIn: "4h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("No se pudo generar el token");
        } else {
          resolve(token);
        }
      }
    );
  });
};
