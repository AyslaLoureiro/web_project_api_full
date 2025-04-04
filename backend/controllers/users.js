const User = require("../models/user.js");
const { createHash } = require("../utils/hash.js");
const jwt = require("jsonwebtoken");

function getUsers(_req, res) {
  return User.find({})
    .then((users) => {
      if (!users) {
        const error = new Error("Usuários não encontrados");
        error.status = 404;
        throw error;
      }

      return res.status(200).json(users);
    })
    .catch((error) => {
      console.error("getUsers Error:", error);
      return error;
    });
}

function getUserById(req, res) {
  const { _id } = req.user;

  if (!_id) {
    const error = new Error("Dados inválidos");
    error.status = 400;
    throw error;
  }

  return User.findById(_id)
    .orFail(() => {
      const error = new Error("Usuário não encontrado");
      error.status = 404;
      throw error;
    })
    .then((user) => {
      return res.status(200).json(user);
    })
    .catch((error) => {
      console.error("getUserById Error:", error);
      return error;
    });
}

function login(req, res) {
  const { email, password } = req.body;

  if (!email && !password) {
    const error = new Error("Dados inválidos");
    error.status = 400;
    throw error;
  }

  return User.findUserByCredentials({
    email,
    password,
  })
    .then((result) => {
      if (result.statusCode && result.statusCode === 401) {
        console.log(">>>>>>>>>>>>>>>> ei");
        const error = new Error(result.message);
        error.status = result.statusCode;
        throw error;
      }

      response.status(200).json({
        userId: result.user._id,
        token: jwt.sign(
          { _id: result.user._id },
          NODE_ENV === "production" ? JWT_SECRET : "dev-secret",
          {
            expiresIn: "7d",
          }
        ),
      });
    })
    .catch((error) => {
      console.error("Login Error:", error);
      return error;
    });
}

function createUser(req, res) {
  const { email, password } = req.body;

  if (!email && !password) {
    const error = new Error("Dados inválidos");
    error.status = 400;
    throw error;
  }

  const hashedPassword = createHash(password);

  return User.create({
    name: "Jacs",
    about: "DEV",
    avatar:
      "https://image.freepik.com/fotos-gratis/programador-em-desenvolvimento-desenvolvimento-design-de-sites-e-tecnologias-de-codificacao-trabalhando-no-escritorio-da-empresa-de-software_18497-1234.jpg",
    email,
    password: hashedPassword,
  })
    .then((user) => {
      if (!user) {
        const error = new Error("Error ao criar o usuário");
        error.status = 500;
        throw error;
      }

      return res.status(201).json(user);
    })
    .catch((error) => {
      console.error("createUser Error:", error);
      return error;
    });
}

function updateUserProfile(req, res) {
  const { name, about } = req.body;
  const userId = req.user._id;
  const updatedFields = {};

  if (name) updatedFields.name = name;

  if (about) updatedFields.about = about;

  if (!name && !about) {
    const error = new Error("Dados inválidos");
    error.status = 400;
    throw error;
  }

  return User.findByIdAndUpdate(userId, updatedFields, { new: true })
    .orFail(() => {
      const error = new Error("Usuário não encontrado");
      error.status = 404;
      throw error;
    })
    .then((user) => {
      return res.status(200).json(user);
    })
    .catch((error) => {
      console.error("updateUserProfile Error:", error);
      return error;
    });
}

function updateUserAvatar(req, res) {
  const { avatar } = req.body;
  const userId = req.user._id;

  if (!avatar) {
    const error = new Error("Dados inválidos");
    error.status = 400;
    throw error;
  }

  return User.findByIdAndUpdate(
    userId,
    { $set: { avatar: avatar } },
    { new: true }
  )
    .orFail(() => {
      const error = new Error("Usuário não encontrado");
      error.status = 404;
      throw error;
    })
    .then((user) => {
      return res.status(200).json(user);
    })
    .catch((error) => {
      console.error("updateUserAvatar Error:", error);
      return error;
    });
}

module.exports = {
  getUsers,
  getUserById,
  login,
  createUser,
  updateUserProfile,
  updateUserAvatar,
};
