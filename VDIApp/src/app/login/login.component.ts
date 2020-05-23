import {Component, DoCheck, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../adapter/linkando/auth/auth.service';
import {environment} from '../../environments/environment';

class CurrentPerson {
  href!: string;
  id!: number;
  name!: string;
  imagePath!: string;
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, DoCheck {
  authURI = encodeURIComponent(environment.authURI); // use URI from environment, so we can debug on localhost but deploy on github/linkando
  name: string;
  private accessCode!: string;
  private oldCode!: string;
  private oldAuth!: boolean;

  constructor(private route: ActivatedRoute, private authSvc: AuthService, private http: HttpClient) {
    this.route.queryParams.subscribe(params => {
      this.accessCode = params.code;
      console.log(this.accessCode);
    });
    this.name = '';
    this.checkAuthAndGetName();
  }


  //Button on login
  onclick() {
    //<a *ngIf="this.name == ''" href="https://identity.linkando.co/oauth/auth?redirect_uri={{authURI}}">LogIn</a>
  }

  // better find a suitable OnChange event for this
  ngDoCheck() {
    if ((this.accessCode !== this.oldCode) || (this.oldAuth !== (this.authSvc.getAuth() !== ''))) {
      this.checkAuthAndGetName();
    }
    this.oldCode = this.accessCode;
  }

  ngOnInit(): void {
  }

  private checkAuthAndGetName() {
    if (this.authSvc.getAuth() === '') {
      console.log(this.accessCode);
      if (this.accessCode !== undefined) {
        this.authSvc.requestAuthWithAccessCode(this.accessCode);
        this.accessCode = '';
      }
    }
    this.http.get<CurrentPerson>('https://labs.linkando.co/api/Objects/GetCurrentPerson',
      {headers: {Authorization: this.authSvc.getAuth()}, responseType: 'json'})
      .subscribe(person => {
        this.name = person.name;
        console.log(person);
      });
    this.oldAuth = this.authSvc.getAuth() !== '';
  }

}
