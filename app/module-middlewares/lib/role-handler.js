import { UnauthorizedError } from '../../module-errors';

export default (roles) => {
    return (req, res, next) => {
        if (req.token === undefined)
            return next();

        const userType = req.token.payload.type;
        const hasAccess = roles.indexOf(userType) !== -1;


        if (hasAccess) {
            return next();
        } else {
            return next(new UnauthorizedError(userType + ' is not allowed to access this.'));
        }
    }
}