import mongoose, { model, Schema } from "mongoose";

export interface IImageMeta {
  fileName: string;
  originalName: string;
}

export interface IProduct {
  title: string;
  image: IImageMeta;
  category: string;
  description: string;
  price: number;
}

const imageSchema = new mongoose.Schema<IImageMeta>(
  {
    fileName: {
      type: String,
      required: [true, 'Поле "fileName" должно быть заполнено'],
    },
    originalName: {
      type: String,
      required: [true, 'Поле "originalName" должно быть заполнено'],
    },
  },
  {
    _id: false,
    versionKey: false,
  }
);

const productSchema = new Schema<IProduct>(
  {
    title: {
      type: String,
      minlength: [2, 'Минимальная длина поля "title" - 2'],
      maxlength: [30, 'Максимальная длина поля "title" - 30'],
      required: [true, 'Поле "title" должно быть заполнено'],
      unique: true,
    },
    image: {
      type: imageSchema,
      required: [true, 'Поле "image" должно быть заполнено'],
    },
    category: {
      type: String,
      required: [true, 'Поле "category" должно быть заполнено'],
    },
    description: String,
    price: {
      type: Number,
      default: null,
    },
  },
  { versionKey: false }
);

export default model<IProduct>("product", productSchema);
