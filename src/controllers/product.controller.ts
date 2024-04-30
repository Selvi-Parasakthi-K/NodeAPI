/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { ProductService } from '@/services/products.service';
import { Product } from '@/interfaces/products.interface';
export class ProductController {
  public product = Container.get(ProductService);

  public getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllProductsData: Product[] = await this.product.findAllProduct();
      res.status(200).json({ data: findAllProductsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  // public createProduct = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const productData: Product = req.body;
  //     const createProductData: Product = await this.product.CreateProduct(productData);
  //     res.status(201).json({ data: createProductData, message: 'created' });
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  public createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productData: Product | Product[] = req.body;
      
      const createdProducts: Product | Product[] = await this.product.createProduct(productData);
      if (Array.isArray(createdProducts)) {
        res.status(201).json({ data: createdProducts, message: 'created' });
      } else {
        res.status(201).json({ data: createdProducts, message: 'created' });
      }
    } catch (error) {
      next(error);
    }
  };

  public getProductById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productid: string = req.params.id;
      const ProductData: Product = await this.product.GetProductById(productid);
      res.status(200).json({ data: ProductData, message: 'Product' });
    } catch (error) {
      next(error);
    }
  };

  public updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productid: string = req.params.id;
      const products: Product = req.body;
      const productData:any = await this.product.updateProduct(productid, products);
      res.status(200).json({ data: productData, message: 'Product' });
    } catch (error) {
      next(error);
    }
  };

  public deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productId: string = req.params.id;
      await this.product.deleteProduct(productId);
      res.status(200).json({ message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}