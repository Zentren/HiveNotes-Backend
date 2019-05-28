import { poolPromise } from '../db';


export async function selectAllCourses() {
  const pool = await poolPromise;
  const result = await pool.request()
    .query('SELECT * FROM dbo.Courses');
  return result.recordset;
}