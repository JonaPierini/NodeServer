import { Request, Response } from "express";
import { UserModel } from "../../models/user.model";
import * as bcrypt from "bcryptjs";

export class LoginController {
    constructor() { }

    //LOGIN
    public Login = async (req: Request, res: Response) => {
        const email = req.body.email
        const password = req.body.password

        try {
            // Verificar si el email existe
            const usuario = await UserModel.findOne({ email });
            if (!usuario) {
                return res.status(400).json({
                    msg: 'Usuario / Password no son correctos - correo'
                });
            }

            // SI el usuario está activo
            if (!usuario.state) {
                return res.status(400).json({
                    msg: 'Usuario / Password no son correctos - estado: false'
                });
            }

            // Verificar la contraseña
            const validPassword = bcrypt.compareSync(password, usuario.password);
            if (!validPassword) {
                return res.status(400).json({
                    msg: 'Usuario / Password no son correctos - password'
                });
            }

            res.json({
                msg: 'User exist',
                usuario

            })


        } catch (error) {
            console.log(error)
            res.status(500).json({
                msg: 'Hable con el administrador'
            });
        }


    }



}