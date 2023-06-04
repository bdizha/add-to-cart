import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from './app.state';
import { selectCartItemCount } from './store/cart/cart.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'add-to-cart';
  cartItemCount$!: Observable<number>;

  constructor(private store: Store<AppState>) {
    this.cartItemCount$ = this.store.select(selectCartItemCount);
  }
}
