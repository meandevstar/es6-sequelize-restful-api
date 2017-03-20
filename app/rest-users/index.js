import getUser      from './src/handlers/get-user';
import updateUser   from './src/handlers/update-user';

export default function (app) {
	app.use(getUser);               //GET /v1/users/:userId
	app.use(updateUser);            //PUT /v1/users/:userId
}