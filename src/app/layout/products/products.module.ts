import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { Daterangepicker } from 'ng2-daterangepicker';

@NgModule({
    imports: [CommonModule, ShopsRoutingModule, FormsModule,
        ReactiveFormsModule, Daterangepicker],
    declarations: [ProductsComponent, ProductItemComponent]
})
export class ProductsModule { }
