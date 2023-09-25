import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NodeapiService {

  constructor(private httpclient:HttpClient) { }
  getProducts(page:number){
    return this.httpclient.get<any>(`http://localhost:3000/products?page=${page}`);
  }
  deleteProduct(id:string){
    
    return this.httpclient.delete<any>('http://localhost:3000/products/'+id);
  }
  postProduct(data:any){
    return this.httpclient.post<any>('http://localhost:3000/products',data);
  }

  putProduct(id:string,data:any)
  {
    const url = 'http://localhost:3000/products/'+id;
    return this.httpclient.put<any>(url,data);
  }
  getProductById(id:string){
    return this.httpclient.get<any>('http://localhost:3000/products/'+id);
  }
}
