import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { ProductService } from '../../services/product.service';
import { Order } from '../../models/products';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Router, } from '@angular/router';
import * as uuid from 'uuid';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: any;
  active: boolean;
  orderForm: FormGroup;
  productoActual: Order;
  orders: any;
  myOrder: Order;
  cities: string[] = ['Medellín', 'Bogotá', 'Cali'];
  default: string = 'Medellín';

  constructor(
    private localStorageService: LocalStorageService,
    private productService: ProductService,
    private formBuilder: FormBuilder,
    public router: Router,
    private cd: ChangeDetectorRef
  ) { }

  getProducts = () => {
    this.products = null;
    this.productService.getProducts()
      .subscribe(products => {
        this.products = products;
      });
  }

  ngOnInit() {
    this.orderForm = this.formBuilder.group({
      nameOrder: ['', Validators.required],
      addressOrder: ['', Validators.required],
      dateOrder: [''],
      cityOrder: [this.default, { onlySelf: true }],
      file: ['', [this.fileValidator]]
    });
    this.getProducts();
  }

  onFileChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.orderForm.patchValue({
          file: reader.result
        });
        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
    }
  }

  fileValidator(
    control: AbstractControl
  ): { [key: string]: any } | null {
    if (control.value) {
      console.log('control.value', control.value);
      //const extension = control.value.split('.')[1].toLowerCase();
      //if ('pdf'.toLowerCase() !== extension.toLowerCase()) {
      // return {
      //   requiredFileType: true
      //};
      //}
      return null;
    }
  }

  activeProduct(activeProduct) {
    this.active = true;
    this.products.forEach(function (part) {
      if (part.idProducto === activeProduct) {
        part.activo = true;
      }
      else {
        part.activo = false;
      }
    }, this.products);
    this.productoActual = this.products.filter(x => x.idProducto == activeProduct)[0];
  }

  clearsProducts() {
    this.active = false;
    this.products.forEach(function (part) {
      part.activo = false;
    }, this.products);
  }

  onSubmit = () => {
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'Realizar pedido.',
      type: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sí, realizar!'
    }).then((result) => {
      if (result.value && this.orderForm.valid) {
        console.log("saving changes");
        this.orders = this.localStorageService.getValue(this.localStorageService.CATALOGO);
        if (!this.orders) {
          this.orders = [];
        }
        const myId = uuid.v4();
        this.myOrder = new Order(this.orderForm.value);
        this.myOrder.idOrder = myId;
        this.myOrder.idProducto = this.productoActual.idProducto;
        this.myOrder.descripcion = this.productoActual.descripcion;
        this.myOrder.cantidadDisponible = this.productoActual.cantidadDisponible;
        this.orders.push(this.myOrder);
        this.localStorageService.setValue(this.localStorageService.CATALOGO, this.orders);
        this.clearsProducts();
      }
    });
  }

  public dateOptions: any = {
    locale: { format: "DD-MM-YYYY" },
    singleDatePicker: true,
    showDropdowns: true,
    noDefaultRangeSelected: false
  };

  updateDate(event) {
    console.log("changing date");
    this.orderForm.controls["dateOrder"].setValue(
      event.start
    );
  }

  cancel() {
    this.clearsProducts();
  };

  onlyQuantity(e) {
    if (e.target.checked) {
      this.products = this.products.filter(function (prod) {
        return prod.cantidadDisponible != 0;
      });
    }
    else {
      this.getProducts();
    }

  }
}
