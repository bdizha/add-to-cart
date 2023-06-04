import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { AppState } from '../app.state';
import {
  addToCart,
  removeFromCart,
  clearCart,
} from '../store/cart/cart.actions';

import { selectCartItems } from '../store/cart/cart.selectors';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private store: Store<AppState>) {}

  addToCart(product: Product): void {
    this.store.dispatch(addToCart({ product }));
  }

  removeFromCart(productId: number): void {
    this.store.dispatch(removeFromCart({ productId }));
  }

  clearCart(): void {
    this.store.dispatch(clearCart());
  }

  getProducts(): Observable<Product[]> {
    return this.store.select((state) => state.cart.items);
  }

  getTotalCartAmount(): Observable<number> {
    return this.store.select((state) => state.cart.totalAmount);
  }

  getProductCount(): Observable<number> {
    return this.store.select((state) => state.cart.count);
  }

  isProductInCart(product: Product): Observable<boolean> {
    return this.store
      .select(selectCartItems)
      .pipe(
        map((items: Product[]) => items.some((item) => item.id === product.id))
      );
  }
}
