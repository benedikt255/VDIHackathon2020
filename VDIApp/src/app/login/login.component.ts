import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../service/adapter/base/auth/auth.service'; // bypass für den linkando login,
// für die Serienvariante brauchen wir da noch was schöneres
import {environment} from '../../environments/environment'; // umgebungsvariablen, hauptsächlich link auf Pfad
import {ConnectIngBaseService, ConnectIngUser} from '../service/adapter/base/AbstractBaseService';
import {RegisterDialogComponent} from '../register-dialog/register-dialog.component';
import {MatDialog} from '@angular/material/dialog';

// Beispiel für Integration eines Service mit Interface in Angular
// https://medium.com/hackernoon/creating-interfaces-for-angular-services-1bb41fbbe47c


@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['../app.component.css']
})
export class LoginComponent implements OnInit {
  public isConnecting = false;
  public isDisconnected = true;
  public isConnected = false;
  public isDisconnecting = false;
  public userName: string;
  public userPassword: string;
  // helper für linkandologin
  private accessCode = '';
  private baseService: ConnectIngBaseService;
  private router: Router;

  public result = false;

  constructor(baseService: ConnectIngBaseService,
              router: Router,
              private route: ActivatedRoute,
              private authSvc: AuthService,
              public dialog: MatDialog) {
    this.router = router;
    this.baseService = baseService;
    this.userName = 'Please insert your Username';
    this.userPassword = 'Please insert your Password';

    // helper für linkado login, subscribe code param
    this.route.queryParams.subscribe(params => {
      this.accessCode = params.code;
      if (this.authSvc.getAuth() === '') {
        if (this.accessCode !== undefined) {
          this.authSvc.requestAuthWithAccessCode(this.accessCode);
          this.accessCode = '';
        }
      }
    });
  }

  ngOnInit(): void {
    this.result = false;
  }

  public Connect(): void {
    if (this.authSvc.getAuth() !== '') {
      this.setConnecting();
      this.baseService.connectUserAsync(
        this.userName,
        this.userPassword,
        (user: ConnectIngUser) => {
          if (user === ConnectIngUser.GetDefault()) {
            return;
          }
          this.baseService.currentUser = user;
          this.setConnected();
          this.router.navigateByUrl('welcome');
        }
      );
    } else {
      window.location.href = 'https://identity.linkando.co/oauth/auth?redirect_uri=' + encodeURIComponent(environment.authURI);
    }
  }

  public Register(): void {
    const dialogRef = this.dialog.open(RegisterDialogComponent, {
      width: '250px',
    });
    dialogRef.afterClosed().subscribe(success => {
      console.log('The dialog was closed');
      if (success) { this.result = true; }
    });
  }


  /**
   * Method - SetDisconnected State
   */
  private setDisconnected(): void {
    this.isConnected = false;
    this.isConnecting = false;
    this.isDisconnected = true;
    this.isDisconnecting = false;
  }

  /**
   * Method - SetConnecting State
   */
  private setConnecting(): void {
    this.isConnected = false;
    this.isConnecting = true;
    this.isDisconnected = false;
    this.isDisconnecting = false;
  }

  /**
   * Method - SetConnected State
   */
  private setConnected(): void {
    this.isConnected = true;
    this.isConnecting = false;
    this.isDisconnected = false;
    this.isDisconnecting = false;
  }

  /**
   * Method - SetDisconnecting State
   */
  private setDisconnecting(): void {
    this.isConnected = false;
    this.isConnecting = false;
    this.isDisconnected = false;
    this.isDisconnecting = true;
  }


}
