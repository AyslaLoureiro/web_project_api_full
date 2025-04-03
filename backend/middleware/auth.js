const jwt = "jsonwebtoken";
const { JWT_SECRET = "dev-secret" } = process.env;

const extractBearerToken = (token) => {
  token.replace("Bearer ", "");
};

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).json({
      statusCode: 401,
      message: "Autorização Necessária",
    });
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
    console.log(">>>>>>>>>>>>>>", token);
    console.log(">>>>>>>>>>>>>>", payload);
  } catch (error) {
    console.log(">>>>>>>>>>>>>>", "ENTREI");
    return res.status(401).json({
      statusCode: 401,
      message: "Autorização Necessária",
    });
  }

  req.user = payload;
  return next();
};

module.exports = auth;
