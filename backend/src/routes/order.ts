import { Router } from "express";
import { createOrder } from "../controllers/orders";
import { validateOrderBody } from "../middlewares/validators";
const router = Router();

router.post("/", validateOrderBody, createOrder);

export default router;
