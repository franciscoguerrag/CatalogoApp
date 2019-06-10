import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Daterangepicker } from 'ng2-daterangepicker';

@NgModule({
    imports: [CommonModule, OrdersRoutingModule, FormsModule,
        ReactiveFormsModule, Daterangepicker],
    declarations: [OrdersComponent]
})
export class OrdersModule { }
