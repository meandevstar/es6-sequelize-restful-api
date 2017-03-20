import registerUser         from './src/handlers/register-user';
import authenticateUser     from './src/handlers/authenticate-user';
import authorizeFacebook    from './src/handlers/authorize-facebook';
import authorizeGoogle      from './src/handlers/authorize-google';

export default function (app) {
    app.use(registerUser);              //[POST]    /v1/users
    app.use(authenticateUser);          //[POST]    /v1/users/authenticates
    app.use(authorizeFacebook);         //[POST]    /v1/users/authorize/facebook
	app.use(authorizeGoogle);           //[POST]    /v1/users/authorize/google
}