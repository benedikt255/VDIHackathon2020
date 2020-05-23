import {Component, DoCheck, OnInit} from '@angular/core';
import { ConnectIngCtrl } from '../controller/ConnectIngCtrl';
import { Router } from '@angular/router';

// Beispiel für Integration eines Service mit Interface in Angular
// https://medium.com/hackernoon/creating-interfaces-for-angular-services-1bb41fbbe47c



@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['../app.component.css'],
  providers: [ConnectIngCtrl]
})
export class LoginComponent implements OnInit {

  private coreCtrl: ConnectIngCtrl;
  private router: Router;

  public userName: string;
  public userPassword: string;

  constructor(coreCtrl: ConnectIngCtrl, router: Router) {
    this.router = router;
    this.coreCtrl = coreCtrl;
    this.userName = 'Please insert your Username';
    this.userPassword = 'Please insert your Password';
  }

  ngOnInit(): void {
  }

  public Connect(): void
  {
    this.coreCtrl.connectUser(
      this.userName,
      this.userPassword,
      () => {
        this.router.navigateByUrl('welcome');
      }
      );
  }

  public Register(): void{
    this.router.navigateByUrl('welcome');
  }


}
