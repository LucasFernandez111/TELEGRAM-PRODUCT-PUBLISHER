"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
class CustomError extends Error {
    constructor(message, clientMessage, functionName) {
        super(message);
        this.name = this.constructor.name;
        this.clientMessage = clientMessage || "Ocurrio un error.";
        this.functionName = functionName || "Unknown Function";
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.CustomError = CustomError;
//# sourceMappingURL=custom.error.js.map