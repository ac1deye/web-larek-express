import { Router } from 'express';
import { getProducts, addProduct } from '../controllers/products';
import { validateProductBody } from '../middlewares/validators';

const router = Router();

router.get('/', getProducts);
router.post('/', validateProductBody, addProduct);

export default router;
