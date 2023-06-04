import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PriceService {
  calculatePrice(priceInCredits: number | null): string {
    if (!priceInCredits) return '';
    return priceInCredits.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  }
}
