import { Component, OnInit, Input } from "@angular/core";
import { Product } from "../models/product";

@Component({
  selector: "product-card",
  templateUrl: "./product-card.component.html",
  styleUrls: ["./product-card.component.css"],
})
export class ProductCardComponent implements OnInit {
  @Input("product") product: Product;

  constructor() {}

  async ngOnInit() {
    //console.log("product", this.product);
  }
}
