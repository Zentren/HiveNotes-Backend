import express from 'express';
import { selectAllCourses, selectCourseSections } from '../helpers/hive-db';


const router = express.Router();

router.get('/courses', async (req, res) => {
  const courses = await selectAllCourses();
  let result = [];
  for (const course of courses) {
    const courseSections = await selectCourseSections(course.CourseId);
    result.push({
      courseId: course.CourseId,
      code: course.Code,
      name: course.Name,
      description: course.Description,
      icon: course.Icon,
      modules: courseSections.map(courseSection => courseSection.SectionId)
    });
  };
  res.json(result);
});

export default router;