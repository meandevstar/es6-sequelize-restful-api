export default class UnauthorizedError extends Error {
    constructor(message = 'Unauthorized Error', details = []){
        super(message, details);
        this.name = 'UnauthorizedError';
        this.message = message;
        this.details = details;
        this.statusCode = 401;
    }
}
