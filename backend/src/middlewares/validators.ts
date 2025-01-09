import { Segments, Joi, celebrate } from "celebrate";

const productSchema = Joi.object({
  title: Joi.string().min(2).max(30),
  image: Joi.object({
    fileName: Joi.string().required(),
    originalName: Joi.string().required(),
  }),
  category: Joi.string().required(),
  description: Joi.string().optional(),
  price: Joi.number().optional(),
});

const orderSchema = Joi.object({
  payment: Joi.string().valid("card", "online"),
  email: Joi.string().required().email(),
  phone: Joi.string().required(),
  address: Joi.string().required(),
  total: Joi.number().required(),
  items: Joi.array().min(1),
});

export const validateProductBody = celebrate({
  [Segments.BODY]: productSchema,
});

export const validateOrderBody = celebrate({
  [Segments.BODY]: orderSchema,
});
