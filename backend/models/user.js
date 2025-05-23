const mongoose = require("mongoose");
const validator = require("validator");
const { validateHash } = require("../utils/hash");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlenght: 2,
    maxlenght: 30,
    required: true,
  },
  about: {
    type: String,
    minlenght: 2,
    maxlenght: 30,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
    validator: {
      function(v) {
        return validator.isURL(v);
      },
      message: "Link invalido",
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validator: {
      validator: (value) => validator.isEmail(value),
      message: "E-mail inválido",
    },
  },
  password: {
    type: String,
    required: true,
    minlenght: 8,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = async function ({
  email,
  password,
}) {
  const result = await this.findOne({ email }).select("+password");

  if (!result) {
    return {
      statusCode: 401,
      message: "Email ou senha incorretos!",
    };
  }

  return {
    validateHash: validateHash(password, result.password),
    user: result,
  };
};

module.exports = mongoose.model("user", userSchema);
