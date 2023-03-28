class ErrorUnauthorized extends Error {
  constructor(message = "The email address is already registered.") {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = ErrorUnauthorized;
