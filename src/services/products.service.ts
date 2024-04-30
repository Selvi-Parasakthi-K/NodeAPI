import { Service } from 'typedi';
import { Product } from '@/interfaces/products.interface';
import { ProductModel } from '@/models/products.model';
import { HttpException } from '@exceptions/HttpException';
import { exit } from 'process';
import { randomUUID } from 'crypto';
@Service()
export class ProductService {
  public async findAllProduct(): Promise<Product[]> {
    const product: Product[] = await ProductModel.find();
    return product;
  }

  // public async CreateProduct(productdata: Product): Promise<Product> {
  //   const findProduct: Product = await ProductModel.findOne({ 
  //     productName: productdata.productName });
  //   if (findProduct) return;
  //   const createUserData: Product = await ProductModel.create({ ...productdata });
  //   return createUserData;
  // }

  public async createProduct(productData: Product | Product[]): Promise<Product | Product[]> {
    if (Array.isArray(productData)) {
      const createdProducts: Product[] = [];
      for (const product of productData) {
        const existingProduct: Product = await ProductModel.findOne({ productName: product.productName });
        if (!existingProduct) {
          const createdProduct: Product = await ProductModel.create({ ...product });
          createdProducts.push(createdProduct);
        }
      }
      return createdProducts;
    } else {
      const existingProduct: Product = await ProductModel.findOne({ productName: productData.productName });
      if (!existingProduct) {
        const createdProduct: Product = await ProductModel.create({ ...productData });
        return createdProduct;
      } else {
        return null;
      }
    }
  }

  public async GetProductById(uuid: string): Promise<Product> {
    const findProduct: Product = await ProductModel.findOne({ _id: uuid });
    return findProduct;
  }

  public async updateProduct(id: string, product: Product): Promise<any> {
    
    const updateDetails = await ProductModel.updateOne({_id:id},{$set:{...product}});
    return updateDetails;
  }

  public async deleteProduct(id: string): Promise<any> {
    
    await ProductModel.deleteOne({ _id:id});
  }
}