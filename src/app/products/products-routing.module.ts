import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductInsertComponent } from './product-insert/product-insert.component';

const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'insert', component: ProductInsertComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
