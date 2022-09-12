import { ProductImageList } from './productImageList';

export class ProductList {
  id: string;
  name: string;
  stock: number;
  price: number;
  createdDate: Date;
  updatedDate: Date;
  productImageFiles?: ProductImageList[];
  mainImagePath: string;
}
