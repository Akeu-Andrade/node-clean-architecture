import express from 'express';
import { container } from "tsyringe";
import { UserController } from '../../application/controllers/UserController';
import { errorHandler } from './errorHandler';

const router = express.Router();

router.get('/', (req: express.Request, res: express.Response) => {
    res.send('Hello World!');
});

const userController = container.resolve<UserController>("UserController");

router.post('/user', userController.createUser);

router.get('/users', userController.getUsers);

router.use(errorHandler);

export default router;