class ErrorValidation extends Error {
  constructor(message = "The email address is already registered.") {
    super(message);
    this.statusCode = 400;
  }
}

module.exports = ErrorValidation;
