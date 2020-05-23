import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth/auth.service';
import { IUserMgmt, IUser, ConnectIngUser } from '../../interface/IUserMgmt';
import { IChannelMgmt, IChannel, ConnectIngChannel } from '../../interface/IChannelMgmt';

// helper classes
// user
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

// channel
class Channel {
  id!: number;
  name!: string;
  imagePath!: string;
}


// adapter class
@Injectable({
  providedIn: 'root'
})
export class LinkandoService implements IUserMgmt, IChannelMgmt {

  public static userRoleID = 243;

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
    const additionalRegistrationInformation =
      {
        FirstName: user.firstName,
        LastName: user.lastName,
      };
    this.http.post('https://labs.linkando.co/api/People/Register',
      user.email, userRoleID, additionalRegistrationInformation, true, 'de-DE')
      .subscribe( object => {
        console.log(object);
        callback(object.isSuccess);
      });
  }

  unregisterUserAsync(user: IUser, callback: (unregistered: boolean) => void): void {
    callback(false);
  }

  updateUserAsync(user: IUser, callback: (user: IUser) => void): void{
    callback(ConnectIngUser.GetDefault());
  }
  getUsersAsync(user: IUser, callback: (users: IUser[]) => void): void {
    callback([]);
  }

  createChannelAsync(user: IUser, name: string, description: string, callback: (channel: IChannel) => void): void {
    callback(ConnectIngChannel.GetDefault());
  }

  updateChannelAsync(user: IUser, channel: IChannel, callback: (channel: IChannel) => void): void {

  }

  removeChannelAsync(user: IUser, channel: IChannel, callback: (removed: boolean) => void): void {
    callback(false);
  }
  getChannelsAsync(user: IUser, callback: (channels: IChannel[]) => void): void {
    this.http.post<Channel[]>('https://labs.linkando.co/api/Objects/FinderSearch', '', {
      headers: { Authorization: user.token }, responseType: 'json'
    }).subscribe(data => {
      let channels!: ConnectIngChannel[];
      data.forEach(element => { channels.push( new ConnectIngChannel(element.id.toString(), element.name, '', '', [])); });
      callback(channels);
    } );
  }
}
