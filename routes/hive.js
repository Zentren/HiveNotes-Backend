import express from 'express';
import { selectAllCourses, selectCourseSections, selectCourse } from '../helpers/hive-db';


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

router.get('/course/:courseId', async (req, res) => {
  const course = (await selectCourse(req.params.courseId))[0];
  const courseSections = await selectCourseSections(course.CourseId);
  let result = {
    courseId: course.CourseId,
    code: course.Code,
    name: course.Name,
    description: course.Description,
    icon: course.Icon,
    modules: courseSections.map(courseSection => courseSection.SectionId)
  };
  res.json(result);
});

export default router;

router.get('/course/:courseId/modules/', async (req, res) => {
  const sections = await selectCourseSections(req.params.courseId);
  let result = [];
  for (const section of sections) {
    result.push({
      id: section.SectionId,
      name: section.Name
    });
  }
  res.json(result);
});