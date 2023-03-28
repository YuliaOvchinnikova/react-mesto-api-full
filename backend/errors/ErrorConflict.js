class ErrorConflict extends Error {
  constructor(message = "The email address is already registered.") {
    super(message);
    this.statusCode = 409;
  }
}

module.exports = ErrorConflict;
