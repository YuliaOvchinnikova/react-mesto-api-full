const express = require("express");
const bodyParser = require("body-parser");
const { isURL } = require("validator");

const { PORT = 3001 } = process.env;
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const { errors } = require("celebrate");
const { celebrate, Joi } = require("celebrate");
const ErrorNotFound = require("./errors/ErrorNotFound");
const errorHandler = require("./middlewares/errorHandler");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const { login, createUser } = require("./controllers/users");
const auth = require("./middlewares/auth");

const allowedCors = [
  "http://mestogram.students.nomoredomains.work",
  "https://mestogram.students.nomoredomains.work",
  "http://localhost:3000",
  "https://localhost:3000",
];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use((req, res, next) => {
  const { origin } = req.headers; // Save the request source to a variable origin
  if (allowedCors.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Credentials", "true");
  }

  const { method } = req;

  const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";

  if (method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", DEFAULT_ALLOWED_METHODS);
  }

  const requestHeaders = req.headers["access-control-request-headers"];
  if (method === "OPTIONS") {
    res.header("Access-Control-Allow-Headers", requestHeaders);
    return res.end();
  }
  next();
  return {};
});

app.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required().min(8),
    }),
  }),
  login
);

app.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().custom((url, helper) => {
        if (
          !isURL(url, { protocols: ["http", "https"], require_protocol: true })
        ) {
          return helper.message(`${url} is invalied link.`);
        }
        return url;
      }),
      email: Joi.string().email().required(),
      password: Joi.string().required().min(8),
    }),
  }),
  createUser
);

app.use(cookieParser());
app.use(auth);

app.get("/signout", (req, res) => {
  res.clearCookie("jwt");
  res.redirect("/");
});

app.use("/users", require("./routes/users"));
app.use("/cards", require("./routes/cards"));

app.use(() => {
  throw new ErrorNotFound("Page is not found.");
});

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

// connect mongo server
mongoose.connect("mongodb://localhost:27017/mestodb", {
  useNewUrlParser: true,
});

app.listen(PORT, () => {
  // eslint-disable-next-line
  console.log(`App listening on port ${PORT}`);
});
