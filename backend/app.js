const express = require("express");
const bodyParser = require("body-parser");
const { isURL } = require("validator");

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3001 } = process.env;
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const { errors } = require("celebrate");
const { celebrate, Joi } = require("celebrate");
const ErrorNotFound = require("./errors/ErrorNotFound");
const errorHandler = require("./middlewares/errorHandler");

const { login, createUser } = require("./controllers/users");
const auth = require("./middlewares/auth");

const allowedCors = [
  'http://mestogram.students.nomoredomains.work',
];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(function(req, res, next) {
  const { origin } = req.headers; // Сохраняем источник запроса в переменную origin
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
}

  const { method } = req; 

  const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE"; 

  if (method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
  } 

  const requestHeaders = req.headers['access-control-request-headers']; 
  if (method === 'OPTIONS') {
      res.header('Access-Control-Allow-Headers', requestHeaders);
      return res.end();
  }
  next();
}); 

app.post("/signin", celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
  }),
}), login);

app.post("/signup", celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom((url, helper) => {
      if (!isURL(url, { protocols: ["http", "https"], require_protocol: true })) {
        return helper.message(`${url} не валидная ссылка.`);
      }
      return url;
    }),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),

  }),
}), createUser);

app.use(cookieParser());
app.use(auth);

app.use("/users", require("./routes/users"));
app.use("/cards", require("./routes/cards"));

app.use(errorLogger); 

app.use(() => {
  throw new ErrorNotFound("Страница не найдена!");
});

app.use(errors());

app.use(errorHandler);

// подключаемся к серверу mongo
mongoose.connect("mongodb://localhost:27017/mestodb", {
  useNewUrlParser: true,
});

app.listen(PORT, () => {
  // eslint-disable-next-line
  console.log(`App listening on port ${PORT}`);
});
