import { Injectable } from '@angular/core';

const TOKEN_KEY = "AuthToken"
const USERNAME_KEY = "AuthUserName"
const AUTHORITIES_KEY = "AuthAuthorities"

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  roles: Array<String> = [];

  constructor() { }

  public setToken(token: string): void {
    sessionStorage.removeItem(TOKEN_KEY)
    sessionStorage.setItem(TOKEN_KEY, token);
  }
  public getToken(): string{
    return sessionStorage.getItem(TOKEN_KEY) as string;
  }

  public setUserName(userName: string): void {
    sessionStorage.removeItem(USERNAME_KEY)
    sessionStorage.setItem(USERNAME_KEY, userName)
  }

  public getUserName(): string {
    return sessionStorage.getItem(USERNAME_KEY) as string
  }

    public setAuthorities(authorities: string[]): void {
      sessionStorage.removeItem(AUTHORITIES_KEY)
      sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities))
    }

    public getAuthorities(): string[] {
      this.roles = [];
      if(sessionStorage.getItem(AUTHORITIES_KEY)){
        JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY) as string).forEach((authority: string) => {
          this.roles.push(authority)
        })
      }

      return this.roles as string[];
    }

    public logOut(): void {
      sessionStorage.clear()
    }
}
