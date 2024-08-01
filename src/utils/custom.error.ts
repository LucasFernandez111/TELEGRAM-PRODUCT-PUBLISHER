interface ICustomError extends Error {
  clientMessage: string;
  functionName?: string;
}

export class CustomError extends Error implements ICustomError {
  clientMessage: string;
  functionName?: string;

  constructor(message: string, clientMessage: string, functionName?: string) {
    super(message);
    this.name = this.constructor.name;
    this.clientMessage = clientMessage || "Ocurrio un error.";
    this.functionName = functionName || "Unknown Function";
    Error.captureStackTrace(this, this.constructor);
  }
}
