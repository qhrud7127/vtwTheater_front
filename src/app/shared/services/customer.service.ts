import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpParamsOptions} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Pageable} from "../../shared/services/pageable.service";

export interface Customer {
  userId: string;
  password: string;
  name: string;
  birth: string ;
}

const URL = '/dna/practice/customer';

@Injectable()
export class CustomerService {

  constructor(private http: HttpClient) {
  }

  list(params: Pageable): Observable<any> {
    return this.http.get<any>(`${URL}`, {params: params as any});
  }

  find(movieId: number): Observable<Customer> {
    return this.http.get<any>(`${URL}/${movieId}`);
  }

  create(customer: Customer): Observable<Customer> {
    return this.http.post<any>(`${URL}`, customer);
  }

  update(movieId: number, customer: Customer): Observable<Customer> {
    return this.http.put<any>(`${URL}/${movieId}`, customer);
  }

  delete(movieId: number): Observable<Customer> {
    return this.http.delete<any>(`${URL}/${movieId}`);
  }

}
