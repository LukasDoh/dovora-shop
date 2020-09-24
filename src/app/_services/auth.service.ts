import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const URL = 'http://localhost:8080/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

/**
 * Authentication Service: provides login and register functions
 * @author Lukas Dohmeier <lukas.dohmeier@edu.fhdw.de>
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  /**
   * Logins users
   * @param credentials
   * @returns login
   */
  login(credentials): Observable<any> {
    return this.http.post(
      URL + 'signin',
      {
        username: credentials.username,
        password: credentials.password,
      },
      httpOptions
    );
  }

  /**
   * Registers users
   * @param user
   * @returns register
   */
  register(user): Observable<any> {
    return this.http.post(
      URL + 'signup',
      {
        username: user.username,
        password: user.password,
      },
      httpOptions
    );
  }
}
