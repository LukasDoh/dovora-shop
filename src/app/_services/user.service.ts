import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const URL = 'http://localhost:8080/auth/test/';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getPublicContent(): Observable<any> {
    return this.http.get(URL+'all', {responseType: 'text'});
  }

  getCustomerContent(): Observable<any> {
    return this.http.get(URL+'customer', {responseType: 'text'})
  }

  getEmployeeContent(): Observable<any> {
    return this.http.get(URL+'employee', {responseType: 'text'})
  }

  getAdminContent(): Observable<any> {
    return this.http.get(URL+'admin', {responseType: 'text'})
  }
}
