export class Order {
  idProducto: number;
  descripcion: string;
  cantidadDisponible: string;
  imagen: string;
  miniatura: string;
  categoria: string;
  precio: string;
  activo: boolean;
  idOrder: number;
  nameOrder: string;
  dateOrder: string;
  addressOrder: string;
  file: any;
  cityOrder: string;
  public constructor(init?: Partial<Order>) {
    Object.assign(this, init);
  }
}

