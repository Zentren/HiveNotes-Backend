import sql from 'mssql';

import hiveConfig from '../../config/hive-config';


export const connectionPool = new sql.ConnectionPool(hiveConfig.db)
  .connect()
  .then(pool => {
    console.log('Connected to MSSQL');
    return pool;
  })
  .catch(err => console.log('Connection failed', err));