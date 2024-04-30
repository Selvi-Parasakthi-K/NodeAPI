import { Router } from 'express';
import { ProductController } from '@controllers/product.controller';
import { CreateProductDto } from '@dtos/products.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';

export class ProductRoute implements Routes {
  public path = '/products';
  public router = Router();
  public product = new ProductController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/GetAllProducts`, this.product.getProducts);
    this.router.get(`${this.path}/GetProductById/:id`, this.product.getProductById);
    this.router.post(`${this.path}/CreateProduct`, this.product.createProduct);
    this.router.put(`${this.path}/UpdateProduct/:id`,this.product.updateProduct);
    this.router.delete(`${this.path}/DeleteProduct/:id`, this.product.deleteProduct);
  }
}