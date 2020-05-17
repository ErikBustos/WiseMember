import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token = '';
  loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient,
              private router: Router) { }

  private saveToken(token: string) {
    localStorage.setItem('token', token);
    this.token = token;
  }

  public isLoggedIn(): boolean {
    const tokenData = this.getTokenData();
    console.log(tokenData);
    if (tokenData) {
      let resp = tokenData.exp > Date.now() / 1000;
      this.loggedIn.next(true);
      return resp;
    } else {
      this.loggedIn.next(false);
      return false;
    }
  }

  public getTokenData() {
    let payload;
    if (this.token) {
      payload = this.token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public logout() {
    this.token = '';
    window.localStorage.removeItem('token');
    this.router.navigateByUrl('/');
    this.loggedIn.next(false);
  }

  public googleLogin(params) {
    return this.http.get(environment.url + '/api/google/redirect', {params})
    .pipe(
      map((data: any) => {
      console.log(data.token);
      if (data.token) {
        this.saveToken(data.token);
        this.isLoggedIn();
      }
      return data;
    }));
  }
}
