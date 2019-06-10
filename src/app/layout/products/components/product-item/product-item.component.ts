import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LocalStorageService } from '../../../../services/local-storage.service';
import { Order } from '../../../../models/products';

@Component({
  // tslint:disable-next-line
  selector: 'product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  ngOnInit(): void {
  }

  @Input() product: Order;
  @Output() activeProduct = new EventEmitter();

  constructor(
    private localStorageService: LocalStorageService
  ) { }

  activateProduct(
  ) {
    this.product.activo = true; this.activeProduct.emit(this.product.idProducto);
  };
}
