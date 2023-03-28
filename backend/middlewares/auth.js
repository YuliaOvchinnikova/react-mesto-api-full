const jwt = require("jsonwebtoken");

const { NODE_ENV, JWT_SECRET } = process.env;

const ErrorUnauthorized = require("../errors/ErrorUnauthorized");

module.exports = (req, res, next) => {
  if (!req.cookies.jwt) {
    next(new ErrorUnauthorized("User hasn't been registered."));
    return;
  }

  const token = req.cookies.jwt;
  let payload;

  try {
    // we try to verify the token
    payload = jwt.verify(
      token,
      NODE_ENV === "production" ? JWT_SECRET : "dev-secret"
    );
  } catch (err) {
    // throw an error if something went wrong
    next(new ErrorUnauthorized("User hasn't been registered."));
    return;
  }

  req.user = payload; // add payload in the request object

  next();
};
