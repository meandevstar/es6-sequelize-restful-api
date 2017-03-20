import {Sequelize} from 'sequelize';
import {get} from '../../module-config';





const postgresUri = get('postgres_uri');
const sequelize = new Sequelize(postgresUri);

module.exports = sequelize;


