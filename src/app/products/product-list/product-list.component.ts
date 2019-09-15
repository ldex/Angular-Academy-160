import { Component, OnInit, OnDestroy } from '@angular/core';

import { ProductService } from '../product.service';
import { Product } from '../product.interface';
import { Observable, Subscription, EMPTY } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: []
})
export class ProductListComponent implements OnInit, OnDestroy {

  title: string = 'Products';
 // products: Product[];
  products$: Observable<Product[]>;
  selectedProduct: Product;
  sub: Subscription = new Subscription();
  errorMsg: string;

  // Pagination
  pageSize = 5;
  start = 0;
  end = this.pageSize;
  currentPage = 1;

  productsNb: number = 0;

  previousPage() {
    this.start -= this.pageSize;
    this.end -= this.pageSize;
    this.currentPage--;
    this.selectedProduct = null;
  }
  nextPage() {
    this.start += this.pageSize;
    this.end += this.pageSize;
    this.currentPage++;
    this.selectedProduct = null;
  }

  onSelect(product: Product) {
    this.selectedProduct = product;
  }

  constructor(private productService: ProductService) {

  }

  ngOnDestroy(): void {
    if(this.sub)
      this.sub.unsubscribe();
  }

  ngOnInit() {

    this.products$ = this
                        .productService
                        .products$
                        .pipe(
                          tap(products => this.productsNb = products.length),
                          catchError(
                            error => {
                              console.log(error);
                              this.errorMsg = 'Error while loading products: ' + error.message;
                              return EMPTY;
                            }
                          )
                        );

    // this.sub = this
    //   .productService
    //   .products$
    //   .subscribe(
    //     results => this.products = results
    //   )
  }

}
