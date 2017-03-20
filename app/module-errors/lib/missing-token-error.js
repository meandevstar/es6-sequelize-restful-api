export default class MissingTokenError extends Error {
    constructor(message = 'Missing Token', details = []){
        super(message, details);
        this.name = 'MissingTokenError';
        this.message = message;
        this.details = details;
        this.statusCode = 401;
    }
}
