import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from '../cookie/cookie.service';



class AuthData {
  email!: string;
  accessToken!: string;
  tenant!: string;
  url!: string;
  image!: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private cookieService: CookieService, private http: HttpClient) { }

  getAuth(): string {
    if (this.cookieService.get('authToken') !== '') {
      return 'Basic ' + this.cookieService.get('authToken');
    }
    else {
      return '';
    }
  }

  requestAuthWithAccessCode(accessCode: string) {
    this.http.post<AuthData>('https://identity.linkando.co/oauth/token?code=' + accessCode, '', {
      responseType: 'json'
    }).subscribe(data => { this.cookieService.setWithExpiryInDays('authToken', data.accessToken, 30); } );

  }

  deleteAuth(): void {
    this.cookieService.delete('authToken');
  }
}
