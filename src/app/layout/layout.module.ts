import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { ProductService } from '../services/product.service';

@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule
    ],
    providers: [ProductService],
    declarations: [LayoutComponent]
})
export class LayoutModule { }
