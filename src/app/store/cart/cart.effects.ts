import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { CartService } from '../../services/cart.service';
import { addToCart, removeFromCart } from './cart.actions';

@Injectable()
export class CartEffects {
  addToCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addToCart)
    ),
    { dispatch: false }
  );

  removeFromCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeFromCart),
    ),
    { dispatch: false }
  );

  constructor(private actions$: Actions) {}
}
