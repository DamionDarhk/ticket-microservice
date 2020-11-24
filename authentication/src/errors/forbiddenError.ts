import { CustomError } from './customError';

export class ForbiddenError extends CustomError {
  statusCode = 401;

  constructor() {
    super('You are not authorized to utilize the resource');
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }

  serializeErrors() {
    return [{ message: 'You are not authorized to utilize the resource' }];
  }
}
