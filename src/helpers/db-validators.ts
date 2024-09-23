import { UserModel } from "../presentation/models/user.model";

export const UserEmailExist = async (email: String) => {
  const emailExist = await UserModel.findOne({ email });
  if (emailExist) {
    throw new Error(`El correo: ${email}, ya está registrado`);
  }
};

export const UserIdExist = async (id: String) => {
  // Verificar si el correo existe
  const userId = await UserModel.findById(id);
  if (!userId) {
    throw new Error(`El id: ${id}, no existe en la BD`);
  }
};
