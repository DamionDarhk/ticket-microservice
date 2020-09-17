import { CustomError } from './customError';

export class InternalServerError extends CustomError {
  statusCode = 500;
  reason = 'Internal Server Error has occoured';

  constructor() {
    super('LOG: Internal Server Error has occoured');

    //Use below when extending buid-in class
    Object.setPrototypeOf(this, InternalServerError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
