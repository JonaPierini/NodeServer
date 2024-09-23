import { Request, Response } from "express";
import { UserModel } from "../../models/user.model";
import * as bcrypt from "bcryptjs";

export class UserController {
  constructor() {}

  //GET ALL TODO
  public AllUsers = async (req: Request, res: Response) => {
    const allUser = await UserModel.find();
    res.json({
      msg: "All User in BD",
      allUser,
    });
  };

  //CREATE NEW USER
  public NewUser = async (req: Request, res: Response) => {
    const newUser = await UserModel.create({
      name: req.body.name,
      email: req.body.email,
      rol: req.body.rol,
      state: req.body.state,
      createdAt: req.body.createdAt,
      password: req.body.password,
    });

    //Encriptar la contraseña
    const salt = bcrypt.genSaltSync();
    newUser.password = bcrypt.hashSync(newUser.password, salt);

    //Guarda en bd
    await newUser.save();

    //Lo que muestro en postman
    res.json({
      msg: "New user created",
      newUser,
    });
  };

  public DeleteUser = async (req: Request, res: Response) => {
    const id = req.params.id;
    await UserModel.findByIdAndDelete(id, { state: false });
    res.json({
      msg: "User deleted sucessfuly:",
    });
  };
}
