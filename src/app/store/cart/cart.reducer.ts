import { createReducer, on } from '@ngrx/store';
import { addToCart, removeFromCart, clearCart } from './cart.actions';
import { CartState } from './cart.state';

export const initialState: CartState = {
  items: [],
  count: 0,
  totalAmount: 0,
};

export const cartReducer = createReducer(
  initialState,
  on(addToCart, (state, { product }) => ({
    ...state,
    items: [...state.items, product],
    count: state.count + 1,
    totalAmount: state.totalAmount + parseFloat(product?.cost_in_credits),
  })),
  on(removeFromCart, (state, { productId }) => {
    const itemToRemove = state.items.find((item) => item.id === productId);
    if (!itemToRemove) return state;
    return {
      ...state,
      items: state.items.filter((item) => item.id !== productId),
      count: state.count - 1,
      totalAmount: state.totalAmount - parseFloat(itemToRemove.cost_in_credits),
    };
  }),
  on(clearCart, () => initialState)
);
