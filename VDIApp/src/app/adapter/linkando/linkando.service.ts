import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './../../auth/auth.service';
import { IUserMgmt, IUser } from './../../interface/IUserMgmt';
import { IChannelMgmt } from './../../interface/IChannelMgmt';
import { IPostMgmt } from './../../interface/IPostMgmt';
import { ICommentMgmt } from './../../interface/ICommentMgmt';
import { stringify } from 'querystring';
import { ObjectUnsubscribedError } from 'rxjs';

// helper classes

class CurrentPerson {
  href!: string;
  id!: number;
  name!: string;
  imagePath!: string;
}

class PersonObject {
  firstName!: string;
  lastName!: string;
  username!: string;
  email!: string;
  title!: string;
  salutation!: string;
}


// adapter class
@Injectable({
  providedIn: 'root'
})
export class LinkandoService implements IUserMgmt {

  constructor(private authSvc: AuthService, private http: HttpClient) { }

  connectUserAsync(username: string, password: string, callback: (user: IUser) => void): void {
    let user: IUser;
    let localId: string;
    const localToken: string = this.authSvc.getAuth();
    this.http.get<CurrentPerson>('https://labs.linkando.co/api/Objects/GetCurrentPerson',
      { headers: { Authorization: localToken } , responseType: 'json' })
      .subscribe(person => {
        localId = person.id.toString();
        console.log(person);
        this.http.get<PersonObject>('https://labs.linkando.co/api/Objects/Get?id=' + localId.toString(),
        { headers: { Authorization: localToken } , responseType: 'json' })
        .subscribe(object => {
            user =  {
            id: localId,
            firstName: object.firstName,
            lastName: object.lastName,
            location: '',
            image: '',
            jobTitle: object.title,
            email: object.email,
            userName: object.username,
            token: localToken
          };
            console.log(object);
            callback(user);
        } );
      } );
  }

  disconnectUserAsync(user: IUser, callback: (disconnected: boolean) => void): void {
    this.authSvc.deleteAuth();
    callback(true);
  }

  registerUserAsync(user: IUser, password: string, callback: (registered: boolean) => void): void {

  }
  unregisterUserAsync(user: IUser, callback: (unregistered: boolean) => void): void {

  }

  updateUserAsync(user: IUser, callback: (user: IUser) => void): void{

  }
  getUsersAsync(user: IUser, callback: (users: IUser[]) => void): void {

  }
}
