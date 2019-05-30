import { poolPromise } from '../db';


export async function selectAllCourses() {
  const pool = await poolPromise;
  const result = await pool.request()
    .query('SELECT * FROM dbo.Courses');
  return result.recordset;
}

export async function selectCourseSections(courseId) {
  const pool = await poolPromise;
  const result = await pool.request()
    .query(
      `SELECT dbo.CourseSections.SectionId, Code, Name, Description, PathToMarkdown
      FROM dbo.CourseSections
      JOIN dbo.Sections
      ON dbo.CourseSections.SectionId=dbo.Sections.SectionId
      WHERE CourseId=${courseId}`
    );
  return result.recordset;
}