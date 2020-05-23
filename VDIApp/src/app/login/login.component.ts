import {Component, DoCheck, OnInit} from '@angular/core';
import { ConnectIngCtrl } from '../controller/ConnectIngCtrl';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './../adapter/linkando/auth/auth.service'; // bypass für den linkando login,
// für die Seirenvariante brauchen wir da noch was schöneres
import { environment } from './../../environments/environment'; // umgebungsvariablen, hauptsächlich link auf Pfad

// Beispiel für Integration eines Service mit Interface in Angular
// https://medium.com/hackernoon/creating-interfaces-for-angular-services-1bb41fbbe47c



@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['../app.component.css'],
  providers: [ConnectIngCtrl]
})
export class LoginComponent implements OnInit {
  // helper für linkandologin
  private accessCode = '';

  private coreCtrl: ConnectIngCtrl;
  private router: Router;

  public userName: string;
  public userPassword: string;

  constructor(coreCtrl: ConnectIngCtrl, router: Router, private route: ActivatedRoute, private authSvc: AuthService) {
    this.router = router;
    this.coreCtrl = coreCtrl;
    this.userName = 'Please insert your Username';
    this.userPassword = 'Please insert your Password';
    // helper für linkado login, subscribe code param
    this.route.queryParams.subscribe(params => {
      this.accessCode = params['code'];
      if (this.authSvc.getAuth() === '') {
        if (this.accessCode !== undefined) {
          this.authSvc.requestAuthWithAccessCode(this.accessCode);
          this.accessCode = '';
        }
      }
    });
  }

  ngOnInit(): void {
  }

  public Connect(): void
  {
    if (this.authSvc.getAuth() !== '')
    {
      this.coreCtrl.connectUser(
      this.userName,
      this.userPassword,
      () => {

        this.router.navigateByUrl('welcome');
      }
      );
    }
    else
    {
      window.location.href = 'https://identity.linkando.co/oauth/auth?redirect_uri=' + encodeURIComponent(environment.authURI);
    }
  }

  public Register(): void{
    this.router.navigateByUrl('welcome');
  }


}
