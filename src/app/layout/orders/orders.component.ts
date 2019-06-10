import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { ProductService } from '../../services/product.service';
import { Order } from 'src/app/models/products';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders: any;
  editButton: boolean;
  currentOrder: Order;
  myOrder: Order;
  orderForm: FormGroup;
  cities: string[] = ['Medellín', 'Bogotá', 'Cali'];

  ngOnInit(): void {
    this.getOrders();
  }

  constructor(
    private localStorageService: LocalStorageService,
    private formBuilder: FormBuilder
  ) { }

  getOrders() {
    this.orders = this.localStorageService.getValue(this.localStorageService.CATALOGO);
    console.log(JSON.stringify(this.orders));
  }

  edit(activeOrder) {
    this.editButton = true;
    this.orders = this.localStorageService.getValue(this.localStorageService.CATALOGO);
    this.currentOrder = this.orders.filter(x => x.idOrder == activeOrder)[0];
    this.orderForm = this.formBuilder.group({
      nameOrder: [this.currentOrder.nameOrder, Validators.required],
      addressOrder: [this.currentOrder.addressOrder, Validators.required],
      dateOrder: [this.currentOrder.dateOrder],
      cityOrder: [this.currentOrder.cityOrder, { onlySelf: true }],
      file: [this.currentOrder.file, [this.fileValidator]]
    });
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


  onSubmit = () => {
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'Realizar cambio.',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sí, cambiar!'
    }).then((result) => {
      if (result.value && this.orderForm.valid) {
        this.orders = this.localStorageService.getValue(this.localStorageService.CATALOGO);
        if (!this.orders) {
          this.orders = [];
        }
        this.myOrder = new Order(this.orderForm.value);
        var anArray = this.currentOrder;
        anArray.nameOrder = this.myOrder.nameOrder;
        anArray.addressOrder = this.myOrder.addressOrder;
        anArray.dateOrder = this.myOrder.dateOrder;
        anArray.cityOrder = this.myOrder.cityOrder;
        anArray.file = this.myOrder.file;
        this.updateArray(anArray);
      }
      this.editButton = false;
    });
  }

  updateArray(anArray) {
    this.orders.forEach(function (part) {
      if (part.idOrder === anArray.idOrder) {
        part.nameOrder = anArray.nameOrder;
        part.addressOrder = anArray.addressOrder;
        part.dateOrder = anArray.dateOrder;
        part.cityOrder = anArray.cityOrder;
        part.file = anArray.file;
      }
    }, this.orders);
    this.localStorageService.setValue(this.localStorageService.CATALOGO, this.orders);
    this.getOrders();
  }

  public dateOptions: any = {
    locale: { format: "DD-MM-YYYY" },
    singleDatePicker: true,
    showDropdowns: true,
    noDefaultRangeSelected: false
  };

  cancel() {
    this.editButton = false;
  };

  updateDate(event) {
    this.orderForm.controls["dateOrder"].setValue(
      event.start
    );
  }
}
