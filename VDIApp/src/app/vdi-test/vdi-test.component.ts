import { Component, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { environment } from '../../environments/environment';

class CurrentPerson {
  href!: string;
  id!: number;
  name!: string;
  imagePath!: string;
}

@Component({
  selector: 'app-vdi-test',
  templateUrl: './vdi-test.component.html',
  styleUrls: ['./vdi-test.component.css']
})
export class VdiTestComponent implements OnInit, DoCheck {
  private accessCode!: string;
  private oldCode!: string;
  private oldAuth!: boolean;
  authURI = encodeURIComponent(environment.authURI); // use URI from environment, so we can debug on localhost but deploy on github/linkando
  name: string;
  constructor(private route: ActivatedRoute, private authSvc: AuthService, private http: HttpClient) {
    this.route.queryParams.subscribe(params => {
      this.accessCode = params.code;
      console.log(this.accessCode);
    });
    this.name = '';
    this.checkAuthAndGetName();
  }

  // better find a suitable OnChange event for this
  ngDoCheck() {
    if ((this.accessCode !== this.oldCode) || (this.oldAuth !== (this.authSvc.getAuth() !== ''))) {
      this.checkAuthAndGetName();
    }
    this.oldCode = this.accessCode;
  }

  private checkAuthAndGetName() {
    if (this.authSvc.getAuth() === '') {
      console.log(this.accessCode);
      if (this.accessCode !== undefined) {
        this.authSvc.requestAuthWithAccessCode(this.accessCode);
        this.accessCode = null;
      }
    }
    this.http.get<CurrentPerson>('https://labs.linkando.co/api/Objects/GetCurrentPerson',
      { headers: { Authorization: this.authSvc.getAuth() } , responseType: 'json' })
      .subscribe(person => { this.name = person.name; console.log(person); } );
    this.oldAuth = this.authSvc.getAuth() !== '';
  }



  ngOnInit(): void {
  }

}
