const mongoURI =
  process.env.ENVIRONMENT === 'prod'
    ? 'mongodb://mongo/server-dev'
    : 'mongodb://localhost:27017/server-dev';

export default { mongoURI };
