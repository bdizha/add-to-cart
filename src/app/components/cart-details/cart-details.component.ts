import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { CartService } from 'src/app/services/cart.service';
import { PriceService } from 'src/app/services/price.service';
import { AppState } from '../../app.state';
import { Product } from '../../models/product.model';
import { removeFromCart } from '../../store/cart/cart.actions';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css'],
})
export class CartDetailsComponent {
  cartItems: Product[] = [];
  cartTotal$!: Observable<number>;

  constructor(
    private store: Store<AppState>,
    private cartService: CartService,
    private priceService: PriceService
  ) {
    this.store
      .select((state) => state.cart.items)
      .subscribe((items) => {
        this.cartItems = items;
      });
  }

  ngOnInit(): void {
    this.cartTotal$ = this.cartService.getTotalCartAmount();
  }

  removeFromCart(itemId: number): void {
    this.store.dispatch(removeFromCart({ productId: itemId }));
  }

  calculatePrice(priceInCredits: number | null): string {
    return this.priceService.calculatePrice(priceInCredits);
  }
}
