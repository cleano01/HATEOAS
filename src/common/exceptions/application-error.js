const httpStatus = require('http-status');

export default class AplicationError extends Error {
  constructor(code, statusCode = httpStatus.BAD_REQUEST) {
    super(code);
    this.statusCode = statusCode;
    this.code = code;
  }
}
