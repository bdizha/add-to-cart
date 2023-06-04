import { Product } from './product.model';

export interface CartState {
  products: Product[];
  count: number;
}
