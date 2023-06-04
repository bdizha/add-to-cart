import { Product } from '../../models/product.model';

export interface CartState {
  items: Product[];
  count: number;
  totalAmount: number;
}
