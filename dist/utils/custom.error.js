"use strict";
class CustomError extends Error {
    constructor(message, clientMessage, functionName) {
        super(message);
        this.name = this.constructor.name;
        this.clientMessage = clientMessage || "Ocurrio un error.";
        this.functionName = functionName || "Unknown Function";
        Error.captureStackTrace(this, this.constructor);
    }
}
//# sourceMappingURL=custom.error.js.map