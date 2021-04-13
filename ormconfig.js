require('dotenv-extended').load();

module.exports = {
  type: 'postgres',
  url: process.env.POSTGRES_URI,
  entities: ['dist/src/entities/*.js'],
  synchronize: true,
  logging: process.env.TYPEORM_LOGGING === 'true',
};
