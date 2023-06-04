import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product, Starship, Vehicle } from '../../models/product.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product!: Product;
  productType: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(): void {
    this.productType = this.route.snapshot?.paramMap?.get('productType');

    const id = this.route.snapshot?.paramMap?.get('id');
    this.productService
      .getProduct(this.productType, id)
      .subscribe((product) => (this.product = product));
  }

  getStarship(product: Product): Starship {
    return product as Starship;
  }

  getVehicle(product: Product): Vehicle {
    return product as Vehicle;
  }
}
