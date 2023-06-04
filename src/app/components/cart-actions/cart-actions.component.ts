import { Component, Input } from '@angular/core';
import { Product } from '../../models/product.model';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-actions',
  templateUrl: './cart-actions.component.html',
  styleUrls: ['./cart-actions.component.css'],
})
export class CartActionsComponent {
  @Input()
  product!: Product;

  isInCart$!: Observable<boolean>;

  constructor(private cartService: CartService) {}

  addToCart(): void {
    this.cartService.addToCart(this.product);
  }

  removeFromCart(): void {
    this.cartService.removeFromCart(this.product.id);
  }

  ngOnInit() {
    this.isInCart$ = this.cartService.isProductInCart(this.product);
  }
}
