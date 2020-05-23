import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth/auth.service';

import { IUserMgmt, IUser, ConnectIngUser } from '../../interface/IUserMgmt';
import { IChannelMgmt, IChannel, ConnectIngChannel } from '../../interface/IChannelMgmt';
import { IPostMgmt, IPost, ConnectIngPost } from '../../interface/IPostMgmt';

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

class ChannelObject {
  modifiedBy!: number;
  name!: string;
  parentId!: number;
  kind!: number;
  description!: string;
  labelTags!: string[];
  id!: number;
  creationDate!: Date;
  modifiedDate!: Date;
  createdBy!: number;
  ObjectTypeId!: number;
  active!: boolean;
  templateId!: number;
  attributes!: ChannelAttributes;
}

class ChannelAttributes {
  channelBeschreibung!: string;
  channelTags!: string[];
  channelTyp!: number;
  channelAddress!: string;
  // tslint:disable-next-line:variable-name
  linked_from_245_otaga_4352_to_244!: number[]; // API function has to match
}


class ChannelChild {
  id!: number;
  name!: string;
  imagePath!: string;
}

class RegisterResponse {
  isSuccess!: boolean;
  message!: string;
  location!: string;
}

// adapter class
@Injectable({
  providedIn: 'root'
})
export class LinkandoService implements IUserMgmt, IChannelMgmt, IPostMgmt {

  public userRoleID = 243;
  // post interface
  offlineMode = false;

  constructor(private authSvc: AuthService, private http: HttpClient) {
  }

  // user interface
  connectUserAsync(username: string, password: string, callback: (user: IUser) => void): void {
    let user: IUser;
    let localId: string;
    const localToken: string = this.authSvc.getAuth();
    this.http.get<CurrentPerson>('https://labs.linkando.co/api/Objects/GetCurrentPerson',
      {headers: {Authorization: localToken}, responseType: 'json'})
      .subscribe(person => {
        localId = person.id.toString();
        console.log(person);
        this.http.get<PersonObject>('https://labs.linkando.co/api/Objects/Get?id=' + localId.toString(),
          {headers: {Authorization: localToken}, responseType: 'json'})
          .subscribe(object => {
            user = {
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
          });
      });
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
    this.http.post<RegisterResponse>('https://labs.linkando.co/api/People/Register?email=' + user.email + '&personType=' + this.userRoleID,
      additionalRegistrationInformation, {responseType: 'json'})
      .subscribe(registrationResult => {
        console.log(registrationResult);
        callback(registrationResult.isSuccess);
      });
  }

  unregisterUserAsync(user: IUser, callback: (unregistered: boolean) => void): void {
    callback(false);
    // FIXME no interface to api so this has to be done manually (e.g. via an email)
  }

  updateUserAsync(user: IUser, callback: (user: IUser) => void): void {
    let userToUpdate: PersonObject;
    this.http.get<PersonObject>('https://labs.linkando.co/api/Objects/Get?id=' + user.id, {
      headers: {Authorization: user.token}, responseType: 'json'
    })
      .subscribe(currentUser => {
        userToUpdate = currentUser;
        userToUpdate.email = user.email;
        userToUpdate.firstName = user.firstName;
        userToUpdate.lastName = user.lastName;
        userToUpdate.username = user.email;
        this.http.post<number>('https://labs.linkando.co/api/Objects/Save', userToUpdate, {
          headers: {Authorization: user.token}, responseType: 'json'
        })
          .subscribe(updatedUserID => {
            callback(user);
          });
      });
  }

  getUsersAsync(user: IUser, callback: (users: IUser[]) => void): void {
    this.http.post<PersonObject[]>('https://labs.linkando.co/api/Objects/FinderSearch', '{ finderCode: %27allChannelsAPI%27 }', {
      headers: {Authorization: user.token}, responseType: 'json'
    }).subscribe(data => {
      let users!: ConnectIngUser[];
      data.forEach(element => {
        this.http.get<CurrentPerson>('https://labs.linkando.co/api/Objects/GetCurrentPersonid', {
          headers: {Authorization: user.token}, responseType: 'json'
        })
          .subscribe(dataUser => {
            users.push(new ConnectIngUser(dataUser.id.toString(), element.username, element.firstName, element.lastName,
              '', '', element.title, element.email, user.token));
          });
      });
      callback(users);
    });
  }

  // channel interface
  createChannelAsync(user: IUser, name: string, description: string, callback: (channel: IChannel) => void): void {
    callback(ConnectIngChannel.GetDefault());
  }

  updateChannelAsync(user: IUser, channel: IChannel, callback: (channel: IChannel) => void): void {
    let channelToUpdate: ChannelObject;
    this.http.get<ChannelObject>('https://labs.linkando.co/api/Objects/Get?id=' + channel.id, {
      headers: {Authorization: user.token}, responseType: 'json'
    })
      .subscribe(object => {
        channelToUpdate = object;
        channelToUpdate.name = channel.name;
        channelToUpdate.description = channel.description;
        // TODO channel.picture has to be saved in cms but has wrong enconding
        // TODO channel.persons is delayed because now every user can access every channel
        this.http.post('https://labs.linkando.co/api/Objects/Save', channelToUpdate, {
          headers: {Authorization: user.token}, responseType: 'json'
        });
      });
  }

  removeChannelAsync(user: IUser, channel: IChannel, callback: (removed: boolean) => void): void {
    callback(false);
  }

  getChannelsAsync(user: IUser, callback: (channels: IChannel[]) => void): void {
    this.http.post<Channel[]>('https://labs.linkando.co/api/Objects/FinderSearch', '{ finderCode: %27allChannelsAPI%27 }', {
      headers: {Authorization: user.token}, responseType: 'json'
    }).subscribe(data => {
      const channels: ConnectIngChannel[] = [];
      data.forEach(element => {
        channels.push(new ConnectIngChannel(element.id.toString(), element.name, '', '', []));
      });
      callback(channels);
    });
  }

  // post interface
  // Method - CreateComment
  // creates a new post under a defined channel
  createPostAsync(user: IUser, parent: IChannel, title: string, message: string, callback: (post: IPost) => void): void {
  }

  // Method - UpdateComment
  // updates an existing post title or message of an existing post
  updatePostAsync(user: IUser, post: IPost, callback: (post: IPost) => void): void{
    // ObjectType ID = 245
    /*
      "name": "Some other post",
      "parentId": 9510,
      "id": 0,
      "creationDate": "2020-05-23T07:22:55.902Z",
      "modifiedDate": "2020-05-23T07:22:55.902Z",
      "createdBy": 0,
      "ObjectTypeId": 245,
      "active": true,
      "templateId": 0,
      "attributes": {}
    */
  }

  // Method - RemoveComment
  // removes an existing post
  // TODO Bitte prüfen!!!
  removePostAsync(user: IUser, post: IPost, callback: (removed: boolean) => void): void {
    this.http.post<IPost[]>('https://labs.linkando.co/api/Objects/Delete?id=' + post.id, {
      headers: {Authorization: user.token}, responseType: 'json'
    });
  }

  // Method - GetPosts
  // returns the posts under an existing channel
  getPostsAsync(user: IUser, parent: IChannel, callback: (posts: Array<IPost>) => void): void {
    this.http.get<ChannelChild[]>('https://labs.linkando.co/api/Objects/GetChildren?objectId=' + parent.id,
    { headers: { Authorization: user.token } , responseType: 'json' }).subscribe(children => {
      const posts: ConnectIngPost[] = [];
      children.forEach(element => {
        posts.push( new ConnectIngPost(element.id.toString(), parent.id, '', '', new Date(''), element.name, ''));
      });
      callback(posts);
      }
    );
  }
}
