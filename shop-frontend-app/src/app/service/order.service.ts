import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Order} from "../model/order";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  public findOrdersByCurrentUser() {
    return this.http.get<Order[]>('/api/v1/order/all');
  }

  public createOrder() {
    return this.http.post<any>('/api/v1/order', {});
  }
}
