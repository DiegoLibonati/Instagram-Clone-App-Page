import { regexEmail, regexPassword, regexUsername } from "../utils/regex.js";
import { UserModel } from "../models/UserModel.js";
import config from "../config.js";
import jwt from "jsonwebtoken";

export const Auth = {
  postLogin: async (req, res) => {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).json({ message: "¡El usuario no existe!" });

    const validation = user.comparePassword(password);

    if (!validation)
      return res
        .status(401)
        .json({ message: "¡La contraseña ingresado es incorrecta!" });

    const payload = {
      id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
    };

    const token = jwt.sign(payload, config.TOKEN_SECRET, {
      expiresIn: "1h",
    });

    res
      .status(200)
      .cookie("ig-sess", token, {
        expires: new Date(Date.now() + 1 * 60 * 60 * 1000),
      })
      .json({ payload: payload, token: token });
  },
  postRegister: async (req, res) => {
    const { name, username, email, password } = req.body;

    if (!name || !username || !email || !password)
      return res.status(400).json({
        message:
          "¡Los campos: correo electronico, nombre completo, nombre de usuario y contraseña son obligatorios!",
      });

    if (!email.match(regexEmail))
      return res
        .status(400)
        .json({ message: "¡El email ingresado es invalido!" });
    if (!username.match(regexUsername))
      return res
        .status(400)
        .json({ message: "¡El usuario ingresado es invalido!" });
    if (!password.match(regexPassword))
      return res.status(400).json({
        message:
          "¡La contraseña debe tener al menos 8 caracteres, 1 letra mayuscula, 1 letra miniscula y un numero!",
      });

    const existingUserEmail = await UserModel.findOne({ email });

    if (existingUserEmail)
      return res
        .status(400)
        .json({ message: "Ya existe un usuario con ese email" });

    const existingUserUsername = await UserModel.findOne({ username });

    if (existingUserUsername)
      return res
        .status(400)
        .json({ message: "Ya existe un usuario con ese username" });

    const user = new UserModel({
      name: name,
      username: username,
      email: email,
    });

    user.password = await user.generateHash(password);

    await user.save();

    res
      .status(201)
      .json({ message: "Usuario registrado exitosamente", user: user });
  },
};