import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

/**
 * Token Service: Interacts with auth rest api to get token based authentication. Also interacts with user sessions
 * @author Lukas Dohmeier <lukas.dohmeier@edu.fhdw.de>
 */
@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  /**
   * Signs out
   */
  signOut(): void {
    window.sessionStorage.clear();
  }

  /**
   * Saves token
   * @param token
   */
  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  /**
   * Gets token
   * @returns token
   */
  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  /**
   * Saves user
   * @param user
   */
  public saveUser(user): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  /**
   * Gets user
   * @returns user
   */
  public getUser(): any {
    return JSON.parse(sessionStorage.getItem(USER_KEY));
  }
}
