import {Sequelize} from 'sequelize';
import {get} from '../../module-config';




const host = get('pg_host');
const port = get('pg_port');
const username = get('pg_user_name');
const password = get('pg_password');
const dbname = get('pg_db_name');

const postgresUri = 'postgres://' + username + ':' + password + '@' + host + ':' + port + '/' + dbname;
const sequelize = new Sequelize(postgresUri);

module.exports = sequelize;


