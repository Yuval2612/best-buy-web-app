import { Component, OnInit, OnDestroy } from "@angular/core";
import { ProductService } from "../services/product.service";
import { Product } from "../models/product";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  page = 1;
  size = 10;
  searchTerm: string;

  constructor(private productService: ProductService) {}

  async ngOnInit() {
    this.fetchProducts(this.page, this.size);
  }

  fetchProducts(page: Number, size: Number) {
    this.productService.getProducts(page, size).subscribe((response: any) => {
      this.filteredProducts.push(...response.products);
      this.products.push(...response.products);
    });
  }

  loadMore() {
    this.page++;
    this.fetchProducts(this.page, this.size);
  }

  search(value: string): void {
    this.filteredProducts = this.products.filter((val) =>
      val.name.toLowerCase().includes(value)
    );
  }
}
