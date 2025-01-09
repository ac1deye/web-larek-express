import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  error: any,
  _: Request,
  res: Response,
  __: NextFunction
) => {
  if (error.statusCode) {
    const includes = [400, 404, 409].includes(error.statusCode);
    const code = includes ? error.statusCode : 500;
    const message = includes ? error.message : "Произошла ошибка";

    res.status(code).send({ message: message });
    return;
  }

  res.status(500).send({ message: "Произошла ошибка" });
};
