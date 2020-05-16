import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './../auth/auth.service';

class CurrentPerson {
  href: string;
  id: number;
  name: string;
  imagePath: string;
}

@Component({
  selector: 'app-vdi-test',
  templateUrl: './vdi-test.component.html',
  styleUrls: ['./vdi-test.component.css']
})
export class VdiTestComponent implements OnInit {
  private accessCode: string;
  name: string;
  constructor(private route: ActivatedRoute, private authSvc: AuthService, private http: HttpClient) {
    this.name = '';
    if (this.authSvc.getAuth() == '') {
      this.route.queryParams.subscribe(params => {
        this.accessCode = params['code'];
        if (this.accessCode != undefined) {
          this.authSvc.requestAuthWithAccessCode(this.accessCode);
          this.accessCode = null;
        }
      });
    }
    this.http.get<CurrentPerson>('https://labs.linkando.co/api/Objects/GetCurrentPerson',
      { headers: { Authorization: this.authSvc.getAuth() } , responseType: 'json' })
       .subscribe(person => { this.name = person.name; console.log(person); } );
  }



  ngOnInit(): void {
  }

}
