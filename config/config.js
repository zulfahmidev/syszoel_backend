require('dotenv').config()

const {
  DB_USER,
  DB_PASS,
  DB_NAME,
  DB_HOST
} = process.env

module.exports = {
  "development": {
    "username": DB_USER,
    "password": DB_PASS,
    "database": DB_NAME,
    "host": DB_HOST,
    "dialect": "postgres"
  },
  "test": {
    "username": DB_USER,
    "password": DB_PASS,
    "database": DB_NAME,
    "host": DB_HOST,
    "dialect": "postgres"
  },
  "production": {
    "username": DB_USER,
    "password": DB_PASS,
    "database": DB_NAME,
    "host": DB_HOST,
    "dialect": "postgres"
  }
}
