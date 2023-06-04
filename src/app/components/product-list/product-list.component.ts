import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  @Input()
  productType!: string;
  products: Product[] = [];
  pageSize = 16;
  currentPage = 1;
  totalPages = 0;

  constructor(private router: Router, private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService
      .getProducts(this.productType, this.currentPage)
      .subscribe((response) => {
        this.products = response.results.map((product) => ({
          ...product,
          type: this.productType,
        }));
        this.totalPages = this.productService.calculateTotalPages(
          response.count,
          this.pageSize
        );
      });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadProducts();
  }
}
