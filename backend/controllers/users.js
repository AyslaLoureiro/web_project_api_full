const User = require("../models/user.js");
const { createHash } = require("../utils/hash.js");
const jwt = require("jsonwebtoken");

function getUsers(_req, res, next) {
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
      console.error("getUsers Error:", err);
      next(error);
    });
}

function getUserById(req, res, next) {
  const { _id: userId } = req.user;

  if (!userId) {
    const error = new Error("Dados inválidos");
    error.status = 400;
    throw error;
  }

  return User.findById(userId)
    .orFail(() => {
      const error = new Error("Usuário não encontrado");
      error.status = 404;
      throw error;
    })
    .then((user) => {
      return res.status(200).json(user);
    })
    .catch((error) => {
      console.error("getUserById Error:", err);
      next(error);
    });
}

function login(req, res, next) {
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
    .then((user) => {
      if (user.statusCode && user.statusCode === 401) {
        const error = new Error(user.message);
        error.status = user.statusCode;
        throw error;
      }

      return res.status(200).json({
        userId: user._id,
        token: jwt.sign(
          { _id: user._id },
          process.env.NODE_ENV === "production"
            ? process.env.JWT_SECRET
            : "dev-secret",
          {
            expiresIn: "7d",
          }
        ),
      });
    })
    .catch((error) => {
      console.error("createUser Error:", err);
      next(error);
    });
}

function createUser(req, res, next) {
  const { name, about, avatar, email, password } = req.body;

  if (!name && !about && !avatar && !email && !password) {
    const error = new Error("Dados inválidos");
    error.status = 400;
    throw error;
  }

  const hashedPassword = createHash(password);

  return User.create({
    name,
    about,
    avatar,
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
      console.error("createUser Error:", err);
      next(error);
    });
}

function updateUserProfile(req, res, next) {
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
      next(error);
    });
}

function updateUserAvatar(req, res, next) {
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
      next(error);
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
