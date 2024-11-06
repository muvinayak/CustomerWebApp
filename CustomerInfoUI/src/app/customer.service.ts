import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Customer } from './Customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private customerURL = 'https://localhost:7022/api/Customer';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private httpClient: HttpClient) { }

  getCustomer(id: number): Observable<Customer> {
      const url = `${this.customerURL}/${id}`;
      return this.httpClient.get<Customer>(url).pipe(
          catchError(this.handleError<Customer>())
      );
  }

  addCustomer(customer: Customer): Observable<Customer> {
    return this.httpClient.post<Customer>(this.customerURL, customer, this.httpOptions).pipe(
      catchError(this.handleError<Customer>())
    );
  }

  private handleError<T>(result?: T) {
    return (err: any): Observable<T> => {
      console.error(err);
      return of(result as T);
    }
  }
}
