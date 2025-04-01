const bcrypt = require("bcrypt");

function createHash(password) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}

function validateHash(password, hashedPassword) {
  bcrypt.compare(password, hashedPassword).then((matched) => {
    if (!matched) {
      return {
        statusCode: 401,
        message: "Email ou senha incorretos",
      };
    }
    return hashedPassword;
  });
}

module.exports = {
  createHash,
  validateHash,
};
