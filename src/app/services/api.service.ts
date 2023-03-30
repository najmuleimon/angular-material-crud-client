import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private serverUrl:string = 'http://localhost:5000';

  constructor(private httpClient:HttpClient) { }

  // add product
  addProduct(data:any){
    return this.httpClient.post<any>(`${this.serverUrl}/productList`, data);
  }

  // get all products
  getProducts(){
    return this.httpClient.get<any>(`${this.serverUrl}/productList`);
  }

  // update product
  updateProduct(data:any, id: number){
    return this.httpClient.put<any>(`${this.serverUrl}/productList/${id}`, data);
  }

  // delete product
  deleteProduct(id: number){
    return this.httpClient.delete<any>(`${this.serverUrl}/productList/${id}`);
  }
}
