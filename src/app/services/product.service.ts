import { Injectable } from "@angular/core";
import { Product } from "../models/product";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  constructor(private _api: ApiService) {}

  getProducts(page: Number, size: Number) {
    return this._api.get<Product[]>(`/product?pageSize=${size}&page=${page}`);
  }
}
