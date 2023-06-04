import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Product } from 'src/app/models/product.model';
import { CartState } from './cart.state';

// Select the cart feature state
export const selectCartState = createFeatureSelector<CartState>('cart');

// Select the cart items
export const selectCartItems = createSelector(
  selectCartState,
  (state: CartState) => state.items
);

// Select the total amount
export const selectTotalAmount = createSelector(
  selectCartState,
  (state: CartState) => state.totalAmount
);

// Select the cart item count
export const selectCartItemCount = createSelector(
  selectCartState,
  (state: CartState) => state.count
);

// Select if a product is already in the cart
export const selectIsProductInCart = createSelector(
  selectCartItems,
  (cartItems: Product[], props: { product: Product }) => {
    return cartItems.some(item => item.id === props.product.id);
  }
);
