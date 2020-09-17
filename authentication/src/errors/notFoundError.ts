import { CustomError } from './customError';

export class NotFoundError extends CustomError {
  statusCode = 404;

  constructor() {
    super('LOG: Route not found');

    //Use below when extending buid-in class
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: 'Route not found' }];
  }
}
