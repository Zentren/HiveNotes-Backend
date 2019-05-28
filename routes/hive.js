import express from 'express';
import { selectAllCourses } from '../helpers/hive-db';


const router = express.Router();

router.get('/courses', async (req, res) => {
  res.json(await selectAllCourses());
});

export default router;