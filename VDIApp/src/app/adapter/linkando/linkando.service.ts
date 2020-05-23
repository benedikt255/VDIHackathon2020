import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth/auth.service';

import { ConnectIngBaseService, ConnectIngComment, ConnectIngUser, ConnectIngChannel, ConnectIngPost } from '../base/AbstractBaseService';

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
  fullName!: string;
  username!: string;
  email!: string;
  title!: string;
  salutation!: string;
  officePhone!: number;
  mobilePhone!: number;
  languageId!: number;
  timeZoneId!: string;
  isBlocked!: boolean;
  id!: number;
  creationDate!: Date;
  modifiedDate!: Date;
  createdBy!: number;
  ObjectTypeId!: number;
  active!: boolean;
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

class PostObject{
  name!: string;
  id!: string;
  parentId!: string;
  ObjectTypeId!: string;
  attributes!: PostAttributes;
  inheritanceAttribute!: string;
}

class PostAttributes{
  postBeschreibung!: string;
  postTags!: string[];
  postType!: string;
  dropdownRelatedChannel!: string;
}

class RegisterResponse {
  isSuccess!: boolean;
  message!: string;
  location!: string;
}

// Comment
class Conversation {
  conversationId!: number;
  posts!: ConversationPost[];
  description!: string;
  header!: string;
  isPostAllowed!: boolean;
  includeVotes!: boolean;
  isNotificationEnabled!: boolean;
  isCallAllowed!: boolean;
  isClosed!: boolean;
  currentPerson!: CurrentPerson;
  isOwner!: boolean;
  totalPostsCount!: number;
}

class ConversationPost {
  conversationId!: number;
  limitedAccess!: boolean;
  isVotePost!: boolean;
  isCallRecord!: boolean;
  postId!: number;
  isArchiveProcessing!: boolean;
  previewText!: string;
  deletedByPersonName!: string;
  deletionDate!: Date;
  deletionReason!: string;
  postVotesCount!: number;
  isVotedFor!: boolean;
  text!: string;
  isOwn!: boolean;
  postDate!: Date;
  person!: CurrentPerson;
  editedDate!: Date;
  isNotification!: boolean;
  attachments!: [];
  isEditAllowed!: boolean;
  referencedMessageId!: number;
}

// adapter class
@Injectable({
  providedIn: 'root'
})
export class LinkandoService extends ConnectIngBaseService {

  public userRoleID = 243;
  // post interface
  offlineMode = false;

  constructor(private authSvc: AuthService, private http: HttpClient) {
    super();
  }

  // user interface
  connectUserAsync(username: string, password: string, callback: (user: ConnectIngUser) => void): void {
    let user: ConnectIngUser;
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

  disconnectUserAsync(user: ConnectIngUser, callback: (disconnected: boolean) => void): void {
    this.authSvc.deleteAuth();
    callback(true);
  }

  registerUserAsync(user: ConnectIngUser, password: string, callback: (registered: boolean) => void): void {
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

  unregisterUserAsync(user: ConnectIngUser, callback: (unregistered: boolean) => void): void {
    callback(false);
    // FIXME no interface to api so this has to be done manually (e.g. via an email)
  }

  updateUserAsync(user: ConnectIngUser, callback: (user: ConnectIngUser) => void): void {
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
          .subscribe(() => {
            callback(user);
          });
      });
  }

  getUsersAsync(user: ConnectIngUser, callback: (users: ConnectIngUser[]) => void): void {
    this.http.post<PersonObject[]>('https://labs.linkando.co/api/Objects/FinderSearch', '{ finderCode: %27allChannelsAPI%27 }', {
      headers: {Authorization: user.token}, responseType: 'json'
    }).subscribe(data => {
      const users: ConnectIngUser[] = [];
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
  createChannelAsync(user: ConnectIngUser, name: string, description: string, callback: (channel: ConnectIngChannel) => void): void {
    /*Beispiel
    url. https://labs.linkando.co/api/Objects/Save
    response = objectId
          {
                "name": "channel 6",
                "ObjectTypeId": 244,
                "attributes": {
              "channelBeschreibung": "test",
              "channelTyp": 880,
          }
          }
    */
    callback(ConnectIngChannel.GetDefault());
  }

  updateChannelAsync(user: ConnectIngUser, channel: ConnectIngChannel, callback: (channel: ConnectIngChannel) => void): void {
    let channelToUpdate: ChannelObject;
    this.http.get<ChannelObject>('https://labs.linkando.co/api/Objects/Get?id=' + channel.id, {
      headers: {Authorization: user.token}, responseType: 'json'
    })
      .subscribe(object => {
        channelToUpdate = object;
        channelToUpdate.name = channel.name;
        channelToUpdate.description = channel.description;
        // FIXME channel.picture has to be saved in cms but has wrong enconding
        // TODO channel.persons is delayed because now every user can access every channel
        this.http.post('https://labs.linkando.co/api/Objects/Save', channelToUpdate, {
          headers: {Authorization: user.token}, responseType: 'json'
        });
        callback(channel);
      });
  }

  removeChannelAsync(user: ConnectIngUser, channel: ConnectIngChannel, callback: (removed: boolean) => void): void {
    callback(false);
  }

  getChannelsAsync(user: ConnectIngUser, callback: (channels: ConnectIngChannel[]) => void): void {
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
  createPostAsync(user: ConnectIngUser, parent: ConnectIngChannel, title: string, message: string,
                  callback: (post: ConnectIngPost) => void): void {
    /*Beipsiel JSON
      Reponse : ObjectId
          {
            "name": "2 post",
            "parentId": 9510,
            "ObjectTypeId": 245, -- sollte matchen
            "attributes": {
                "postBeschreibung": "test",
                "postTags": [],
                "postType": 888,
                "dropdownRelatedChannel": 9510 -- mit der hier!
              }
          }
    */
   const attributes: PostAttributes = {
    postBeschreibung : message,
    postTags : [],
    postType : '',
    dropdownRelatedChannel : parent.id,
    };
   const postToUpload: PostObject = {
      id : '0',
      name : title,
      parentId : parent.id,
      ObjectTypeId : '245',
      inheritanceAttribute : 'DropDownRelatedChannel',
      attributes,
   };
   this.http.post<number>('https://labs.linkando.co/api/Objects/Save', postToUpload, {
     headers: {Authorization: user.token}, responseType: 'json'
   }).subscribe((Id) => {
    const post: ConnectIngPost = new ConnectIngPost(
      Id.toString(),
      parent.id,
      user.id,
      user.userName,
      new Date(),
      postToUpload.name,
      postToUpload.attributes.postBeschreibung
    );
    callback(post);
   });
  }

  // Method - UpdateComment
  // updates an existing post title or message of an existing post
  updatePostAsync(user: ConnectIngUser, post: ConnectIngPost, callback: (post: ConnectIngPost) => void): void{
    // ObjectType ID = 245
    /* Beispiel JSON
      Response: ObjectId
      {
            "name": "2 post",
            "id" : "9534", -- ID die der Post braucht
            "parentId": 9510,
            "ObjectTypeId": 245,
            "attributes": {
              "postBeschreibung": "test test",
              "postTags": [],
              "postType": 888,
              "dropdownRelatedChannel": 9510
            }
      }
    */
   let postToUpdate: PostObject;
   this.http.get<PostObject>('https://labs.linkando.co/api/Objects/Get?id=' + post.id, {
     headers: {Authorization: user.token}, responseType: 'json'
   })
     .subscribe(currentPost => {
      postToUpdate = currentPost;
      postToUpdate.name = post.title;
      postToUpdate.parentId = post.channelId;
      postToUpdate.attributes.postBeschreibung = post.message;
      this.http.post<number>('https://labs.linkando.co/api/Objects/Save', postToUpdate, {
         headers: {Authorization: user.token}, responseType: 'json'
       })
         .subscribe(() => {
           callback(post);
         });
     });
  }



  // Method - RemoveComment
  // removes an existing post
  // TODO Bitte prüfen!!!
  removePostAsync(user: ConnectIngUser, post: ConnectIngPost, callback: (removed: boolean) => void): void {
    this.http.post<ConnectIngPost[]>('https://labs.linkando.co/api/Objects/Delete?id=' + post.id, {
      headers: {Authorization: user.token}, responseType: 'json'
    });
  }

  // Method - GetPosts
  // returns the posts under an existing channel
  getPostsAsync(user: ConnectIngUser, parent: ConnectIngChannel, callback: (posts: Array<ConnectIngPost>) => void): void {
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

  // comment interface

  // Method - CreateComment
  // creates a new comment under a defined post
  createCommentAsync(user: ConnectIngUser, parent: ConnectIngPost, text: string, callback: (comment: ConnectIngComment) => void): void {

  }

  // Method - UpdateComment
  // updates an existing comment text of an existing comment
  updateCommentAsync(user: ConnectIngUser, comment: ConnectIngComment, callback: (comment: ConnectIngComment) => void): void {

  }

  // Method - RemoveComment
  // removes an existing comment
  removeCommentAsync(user: ConnectIngUser, comment: ConnectIngComment, callback: (removed: boolean) => void): void {
    this.http.delete('https://labs.linkando.co/api/Conversations/DeleteConversationPost?postId=' + comment.id,
      { headers: { Authorization: user.token } });
    callback(true);
  }

  // Method - GetComments
  // returns the comments under an existing post
  getCommentsAsync(user: ConnectIngUser, parent: ConnectIngPost, callback: (comments: Array<ConnectIngComment>) => void): void {
    this.http.get<number[]>('https://labs.linkando.co/api/Objects/GetConversationIds?objectId=' + parent.id,
    { headers: { Authorization: user.token } , responseType: 'json' }).subscribe(conversations => {
      this.http.get<Conversation>('https://labs.linkando.co/api/Conversations/GetConversation?conversationId='
      + conversations[0].toString() + '&count=100&offset=0',
      { headers: { Authorization: user.token } , responseType: 'json' }).subscribe(conversation => {
        // tslint:disable-next-line: prefer-const
        let comments!: ConnectIngComment[];
        conversation.posts.forEach(element => {
          comments.push(new ConnectIngComment(element.postId.toString(), element.conversationId.toString(),
            element.person.id.toString(), element.person.name, element.postDate, element.text));
        });
        callback(comments);
      }
    );
  });
  }
}
