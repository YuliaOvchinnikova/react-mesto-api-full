const mongoose = require("mongoose");
const { isEmail, isURL } = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
    minlength: 2,
    maxlength: 30,
    // default: "Жак-Ив Кусто",
  },
  about: {
    type: String,
    required: false,
    minlength: 2,
    maxlength: 30,
    // default: "Исследователь",
  },
  avatar: {
    type: String,
    required: false,
    default:
      "https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80",
    validate: {
      validator(url) {
        return isURL(url, {
          protocols: ["http", "https"],
          require_protocol: true,
        });
      },
      message: (props) => `${props.value} is invalid link.`,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: isEmail,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error("Invalid email or password."));
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error("Invalid email or password."));
        }

        return user;
      });
    });
};

module.exports = mongoose.model("user", userSchema);
