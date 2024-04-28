import express from 'express';
import { container } from "tsyringe";
import { UserController } from '../../application/controllers/UserController';
import { ProductController } from '../../application/controllers/ProductController';
import { errorHandler } from './errorHandler';
import { CartController } from '../../application/controllers/CartController';

const router = express.Router();

router.get('/', (req: express.Request, res: express.Response) => {
    res.send('Hello World!');
});

const userController = container.resolve<UserController>("UserController");
const productController = container.resolve<ProductController>("ProductController");
const cartController = container.resolve<CartController>("CartController");

router.post('/user', userController.createUser);
router.get('/users', userController.getUsers);

router.get('/products', productController.getProducts);
router.post('/product', productController.createProduct);

router.post('/cart', cartController.createCart);
router.post('/cart/:cartId/items', cartController.addProductToCart);

router.use(errorHandler);

export default router;