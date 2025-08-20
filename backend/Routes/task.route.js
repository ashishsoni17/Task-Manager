import Router from 'express';
import { createTask, getTasks, updateTask, deleteTask } from '../Controllers/task.controller.js';
import verifyJWT from '../Middlewares/auth.middleware.js';

const router = Router();

router.route('/create-tasks').post(verifyJWT, createTask);
router.route('/get-tasks').get(verifyJWT, getTasks);
router.route('/update-task/:taskId').put(verifyJWT, updateTask);
router.route('/delete-task/:taskId').delete(verifyJWT, deleteTask);

export default router;