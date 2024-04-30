import { model, Schema, Document } from 'mongoose';
import { Product } from '@interfaces/products.interface';

const ProductSchema: Schema = new Schema({
  productName: {
    type: String,
    required: true,
    unique:true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
});

export const ProductModel = model<Product & Document>('Product', ProductSchema);