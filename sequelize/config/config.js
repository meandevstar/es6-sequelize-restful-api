module.exports = {
  "local": {
    "username": process.env.PG_USER_NAME,
    "password": process.env.PG_PASSWORD,
    "database": process.env.PG_DBNAME,
    "host": process.env.PG_HOST,
    "port": process.env.PG_PORT,
    "protocol": "postgres",
    "dialect": "postgres"
  },
  "development": {
    "username": process.env.PG_USER_NAME,
    "password": process.env.PG_PASSWORD,
    "database": process.env.PG_DBNAME,
    "host": process.env.PG_HOST,
    "port": process.env.PG_PORT,
    "protocol": "postgres",
    "dialect": "postgres"
  },
  "production": {
    "username": process.env.PG_USER_NAME,
    "password": process.env.PG_PASSWORD,
    "database": process.env.PG_DBNAME,
    "host": process.env.PG_HOST,
    "port": process.env.PG_PORT,
    "protocol": "postgres",
    "dialect": "postgres"
  }
}