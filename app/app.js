import express              from 'express';
import cors                 from 'cors';
import morgan               from 'morgan';
import bodyParser           from 'body-parser';
import swagger              from 'swagger-node-express';
import path                 from 'path';
import {errorHandler}       from './module-middlewares';

import restIdentity         from './rest-identity';
import restUsers            from './rest-users';
import restLocations        from './rest-locations';
import restEntities         from './rest-service-entity';


const app = express();
const subpath = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

restIdentity(app);
restUsers(app);
restLocations(app);
restEntities(app);

app.use(errorHandler);


app.use('/v1', subpath);
swagger.setAppHandler(app);

if (process.argv[2] === 'development') {
    console.log('<<<--- development mode --->>>');
    app.use(express.static(path.join(__dirname, 'dist')));
} else {
    console.log('<<<--- production mode --->>>');
    app.use(express.static(path.join(__dirname, '/')));
}

swagger.configureSwaggerPaths('', 'swagger', '');

swagger.setApiInfo({
    title: "Apartment Butler API",
    termsOfServiceUrl: "",
    contact: "",
    license: "",
    licenseUrl: ""
});

export default app;
