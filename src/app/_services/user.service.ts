import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const URL = 'http://localhost:8080/auth/test/';

/**
 * User Service: For testing purposes of auth route of rest api with user roles
 * @author Lukas Dohmeier <lukas.dohmeier@edu.fhdw.de>
 */
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  /**
   * Gets public content
   * @returns public content
   */
  getPublicContent(): Observable<any> {
    return this.http.get(URL+'all', {responseType: 'text'});
  }

  /**
   * Gets customer content
   * @returns customer content
   */
  getCustomerContent(): Observable<any> {
    return this.http.get(URL+'customer', {responseType: 'text'})
  }

  /**
   * Gets employee content
   * @returns employee content
   */
  getEmployeeContent(): Observable<any> {
    return this.http.get(URL+'employee', {responseType: 'text'})
  }

  /**
   * Gets admin content
   * @returns admin content
   */
  getAdminContent(): Observable<any> {
    return this.http.get(URL+'admin', {responseType: 'text'})
  }
}
