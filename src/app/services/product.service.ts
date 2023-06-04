import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Product, Starship, Vehicle } from '../models/product.model';

interface ProductResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'https://swapi.dev/api';

  productImages = 10;

  constructor(private http: HttpClient) {}

  getProducts(
    endpoint: string,
    page?: number,
    pageSize?: number
  ): Observable<ProductResponse<Product>> {
    let url = `${this.apiUrl}/${endpoint}`;
    if (page) {
      url += `?page=${page}`;
      if (pageSize) {
        url += `&pageSize=${pageSize}`;
      }
    }
    return this.http.get<ProductResponse<Starship | Vehicle>>(url).pipe(
      map((response) => ({
        ...response,
        results: response.results.map((result) =>
          this.transformProduct(result)
        ),
      }))
    );
  }

  private extractId(url: string): number {
    const extractedId = url
      .split('/')
      .filter((part) => !!part)
      .pop();

    if (!extractedId) return 0;
    return parseInt(extractedId);
  }

  private transformProduct(product: Starship | Vehicle): Starship | Vehicle {
    return {
      ...product,
      id: this.extractId(product.url),
      price: this.calculatePrice(product.cost_in_credits),
      image: this.getRandomImage(),
    };
  }

  getRandomImage(): string {
    const randomIndex = Math.floor(Math.random() * this.productImages) + 1;
    return `/assets/products/product-${randomIndex}.svg`;
  }

  calculatePrice(priceInCredits: string): string {
    const priceInDollars = parseFloat(priceInCredits);
    return priceInDollars.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  }

  getProduct(
    productType: string | null,
    id: string | null
  ): Observable<Starship | Vehicle> {
    const endpoint = `${productType?.toLowerCase()}/${id}`;
    const url = `${this.apiUrl}/${endpoint}`;
    return this.http
      .get<Starship | Vehicle>(url)
      .pipe(map((product) => this.transformProduct(product)));
  }

  calculateTotalPages(totalCount: number, pageSize: number): number {
    return Math.ceil(totalCount / pageSize);
  }
}
