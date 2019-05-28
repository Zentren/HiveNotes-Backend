import sql from 'mssql';


const config = {
  user: 'grads',
  password: 'zC0KY*^0hZ',
  server: 'bbd-learning-grad.database.windows.net',
  database: 'bbd-learning',
  encrypt: true
};

export const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to MSSQL');
    return pool;
  })
  .catch(err => console.log('Connection failed', err));