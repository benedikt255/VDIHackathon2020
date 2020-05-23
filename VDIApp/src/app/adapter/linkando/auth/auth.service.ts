import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CookieService} from '../../../cookie/cookie.service';


class AuthData {
  email!: string;
  // tslint:disable-next-line:variable-name
  access_token!: string; // ignore naming convention since we need the same fields as in the API
  tenant!: string;
  url!: string;
  image!: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private cookieService: CookieService, private http: HttpClient) {
  }

  getAuth(): string {
    if (this.cookieService.get('authToken') !== '') {
      return 'Basic ' + this.cookieService.get('authToken');
    } else {
      return '';
    }
  }

  requestAuthWithAccessCode(accessCode: string) {
    this.http.post<AuthData>('https://identity.linkando.co/oauth/token?code=' + accessCode, '', {
      responseType: 'json'
    }).subscribe(data => {
      this.cookieService.setWithExpiryInDays('authToken', data.access_token, 30);
    });

  }

  deleteAuth(): void {
    this.cookieService.delete('authToken');
  }
}
