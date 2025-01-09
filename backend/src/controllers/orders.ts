import { Request, Response, NextFunction } from 'express';
import { faker } from '@faker-js/faker';
import Product, { IProduct } from '../models/product';
import NotFoundError from '../errors/not-found-error';
import BadRequestError from '../errors/bad-request-error';

export default (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { total, items } = req.body;
  Product.find({ _id: items })
    .then((documents) => {
      if (documents.length !== new Set(items).size) {
        return Promise.reject(new NotFoundError('Товар не найден'));
      }

      const notForSale: string[] = [];

      const cart = items.map((item: string) => {
        const docIndex = documents.findIndex(
          (doc) => doc._id.toString() === item,
        );
        return documents[docIndex];
      });

      const totalPrice = cart.reduce((prev: number, document: IProduct) => {
        if (document?.price) {
          return prev + Number(document.price);
        }
        notForSale.push(document.title);
        return prev;
      }, 0);

      if (notForSale.length > 0) {
        const message = `Не продается: ${notForSale.join(', ')}`;
        return Promise.reject(new BadRequestError(message));
      }
      if (totalPrice !== total) {
        return Promise.reject(new BadRequestError('Ошибка цены товаров'));
      }
      const orderId = faker.string.uuid();
      return res.status(201).send({ _id: orderId, total });
    })
    .catch(next);
};
