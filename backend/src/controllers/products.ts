import { NextFunction, Request, Response } from "express";
import Product from "../models/product";
import { Error as MongooseError } from "mongoose";
import BadRequestError from "../errors/bad-request-error";
import ConflictError from "../errors/conflict-error";

export const getProducts = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return Product.find({})
    .then((products) =>
      res.send({
        items: products,
        total: products.length,
      })
    )
    .catch(next);
};

export const addProduct = (req: Request, res: Response, next: NextFunction) => {
  const { title, image, category, description, price } = req.body;
  return Product.create({
    title,
    image,
    category,
    description,
    price,
  })
    .then((product) => {
      res.status(201).send(product);
    })
    .catch((error) => {
      if (error.code === 11000)
        return next(new ConflictError(`Продукт ${title} уже существует`));
      if (error instanceof MongooseError.ValidationError)
        return next(new BadRequestError(error.message));
      return next(error);
    });
};
