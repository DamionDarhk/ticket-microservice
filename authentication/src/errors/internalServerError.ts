export class InternalServerError extends Error {
  reason = 'Internal Server Error has occoured';

  constructor() {
    super();

    //Use below when extending buid-in class
    Object.setPrototypeOf(this, InternalServerError.prototype);
  }
}
