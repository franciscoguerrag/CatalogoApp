import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/products';

@Injectable()
export class ProductService {
  constructor(
    private http: HttpClient
  ) { }

  getProducts = (): Observable<Order> => {
    return this.http.get<Order>(`https://fvwzxk56cg.execute-api.us-east-1.amazonaws.com/mock/productos`);
  }

  getProductsbyId = (id): Observable<any> => {
    return this.http.get<Order>(`https://fvwzxk56cg.execute-api.us-east-1.amazonaws.com/mock/productos/${id}`);
  }

}
