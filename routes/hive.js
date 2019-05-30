import express from 'express';
import request from 'request';

import hiveConfig from '../config/hive-config';
import { selectAllCourses, selectCourseSections, selectCourse, selectSection } from '../helpers/hive-db';


const router = express.Router();

router.get('/courses', async (req, res) => {
  const courses = await selectAllCourses();
  let result = courses.map(course => ({
    courseId: course.CourseId,
    code: course.Code,
    name: course.Name,
    description: course.Description,
    icon: course.Icon
  }));
  res.json(result);
});

router.get('/course/:courseId', async (req, res) => {
  const course = (await selectCourse(req.params.courseId))[0];
  let result = {
    courseId: course.CourseId,
    code: course.Code,
    name: course.Name,
    description: course.Description,
    icon: course.Icon,
  };
  res.json(result);
});

router.get('/course/:courseId/modules/', async (req, res) => {
  const sections = await selectCourseSections(req.params.courseId);
  let result = sections.map(section => ({
    moduleId: section.SectionId,
    name: section.Name,
    pathToMarkdown: section.PathToMarkdown
  }));
  res.json(result);
});

router.get('/module/:moduleId', async (req, res) => {
  const section = (await selectSection(req.params.moduleId))[0];
  let result = {
    moduleId: section.SectionId,
    name: section.Name,
    pathToMarkdown: section.PathToMarkdown
  };
  res.json(result);
});

router.get('/markdown/*', async (req, res) => {
  const url = `${hiveConfig.url}${hiveConfig.markdown}${req.params[0]}`;
  req.pipe(request(url)).pipe(res);
});

export default router;