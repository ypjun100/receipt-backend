require('dotenv').config();

const { MYSQL_HOST, MYSQL_DATABASE, MYSQL_USERNAME, MYSQL_PASSWORD } = process.env;

// MySQL DB 연결 설정
const defaultConfig = {
  dialect: 'mysql',
  username: MYSQL_USERNAME,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
  host: MYSQL_HOST
};

const development = {
  ...defaultConfig
};

const test = {
  ...defaultConfig,
  logging: false,
};

const production = {
  ...defaultConfig,
  logging: false,
};

module.exports = {
  development,
  test,
  production
}