import express from 'express';
import { container } from "tsyringe";
import { UserController } from '../../application/controllers/UserController';
import { ProductController } from '../../application/controllers/ProductController';
import { errorHandler } from './errorHandler';

const router = express.Router();

router.get('/', (req: express.Request, res: express.Response) => {
    res.send('Hello World!');
});

const userController = container.resolve<UserController>("UserController");
const productController = container.resolve<ProductController>("ProductController");

router.post('/user', userController.createUser);
router.get('/users', userController.getUsers);

router.get('/products', productController.getProducts);
router.post('/product', productController.createProduct);

router.use(errorHandler);

export default router;