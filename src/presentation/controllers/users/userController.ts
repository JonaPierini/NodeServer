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

  //GET BY ID
  public UserById = async (req: Request, res: Response) => {
    const id = req.params.id;
    const userById = await UserModel.findById(id);
    res.json({
      msg: "User",
      userById,
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
    const user = await UserModel.findByIdAndUpdate(
      id,
      { state: false },
      { new: true }
    );
    res.json({
      msg: "User deleted change state",
      user,
    });
  };

  public DeleteUserDB = async (req: Request, res: Response) => {
    const id = req.params.id;
    const user = await UserModel.findByIdAndDelete(id);
    res.json({
      msg: "User deleted DB",
      user,
    });
  };

  public PutUser = async (req: Request, res: Response) => {
    const id = req.params.id;
    //Actualizo el  rol, state y password
    const upDateUser = {
      //name: req.body.name,
      //email: req.body.email,
      rol: req.body.rol,
      password: req.body.password,
      state: req.body.state,
      // createdAt: req.body.createdAt,
    };
    if (upDateUser.password) {
      // Encriptar la contraseña
      const salt = bcrypt.genSaltSync();
      upDateUser.password = bcrypt.hashSync(upDateUser.password, salt);
    }

    // Actualizar el usuario y devolver el documento actualizado
    const usuario = await UserModel.findByIdAndUpdate(id, upDateUser, {
      new: true,
    });

    res.json(usuario);
  };

  //GET BY LIMIT (PAGINATIO)
  public PaginationUser = async (req: Request, res: Response) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { state: true };

    const [total, usuarios] = await Promise.all([
      UserModel.countDocuments(query),
      UserModel.find(query).skip(Number(desde)).limit(Number(limite)),
    ]);

    res.json({
      total,
      usuarios,
    });
  };
}
