import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product.interface';
import { HttpClient } from '@angular/common/http';
import { delay, tap, shareReplay } from "rxjs/operators";

@Injectable()
export class ProductService {

  private baseUrl: string = 'http://storerestservice.azurewebsites.net/api/products/';
  products$: Observable<Product[]>;
  url:string = this.baseUrl + `?$orderby=ModifiedDate%20desc`;

  insertProduct(newProduct: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, newProduct);
  }

  loadProducts() {
    this.products$ = 
                    this.http
                      .get<Product[]>(this.url)
                      .pipe(
                        delay(200),
                        tap(
                          products => {
                            console.groupCollapsed('Liste de produits');
                            console.table(products);
                            console.groupEnd()
                          }
                        ),
                        shareReplay()
                      );
  }

  constructor(private http: HttpClient) {
    this.loadProducts();
  }

}
