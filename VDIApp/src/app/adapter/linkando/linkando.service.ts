import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth/auth.service';

import {
  ConnectIngBaseService,
  ConnectIngChannel,
  ConnectIngComment,
  ConnectIngPost,
  ConnectIngUser
} from '../base/AbstractBaseService';

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
  inheritanceAttribute!: string;
  labelTags!: string[];
  id!: number;
  creationDate!: Date;
  modifiedDate!: Date;
  createdBy!: string;
  ObjectTypeId!: number;
  active!: boolean;
  templateId!: number;
  attributes!: ChannelAttributes;
}

class ChannelAttributes {
  channelBeschreibung!: string;
  channelTags!: string[];
  channelTyp!: string;
  channelAddress!: string;
  // tslint:disable-next-line:variable-name
  linked_from_245_otaga_4352_to_244!: number[]; // API function has to match
}


class ChannelChild {
  id!: number;
  name!: string;
  imagePath!: string;
}

class Finder {
  finderCode!: string;
}

class PostObject {
  name!: string;
  id!: string;
  parentId!: string;
  ObjectTypeId!: string;
  attributes!: PostAttributes;
  inheritanceAttribute!: string;
}

class PostAttributes {
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

class ConversationPostMin {
  conversationId!: number;
  text!: string;
  isEditAllowed!: boolean;
}

// adapter class
@Injectable({
  providedIn: 'root'
})
export class LinkandoService extends ConnectIngBaseService {

  // post interface
  offlineMode = false;

  constructor(private authSvc: AuthService, private http: HttpClient) {
    super();
  }

  // user interface
  connectUserAsync(username: string, password: string, callback: (user: ConnectIngUser) => void): void {
    console.log('connectUserAsync');
    let user: ConnectIngUser;
    let localId: string;
    const localToken: string = this.authSvc.getAuth();
    if (localToken !== '') {
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
    } else {
      callback(ConnectIngUser.GetDefault());
    }
  }

  disconnectUserAsync(user: ConnectIngUser, callback: (disconnected: boolean) => void): void {
    console.log('disconnectUserAsync');
    this.authSvc.deleteAuth();
    callback(true);
  }

  registerUserAsync(email: string, firstName: string, lastName: string,
                    callback: (isSuccess: boolean, message: string) => void): void {
    console.log('registerUserAsync');
    const userRoleID = 243; // for VDIUser
    const additionalRegistrationInformation =
      {
        FirstName: firstName,
        LastName: lastName,
      };
    this.http.post<RegisterResponse>('https://labs.linkando.co/api/People/Register?email=' + email
      + '&personType=' + userRoleID, additionalRegistrationInformation, {responseType: 'json'})
      .subscribe(registrationResult => {
        console.log(registrationResult);
        callback(registrationResult.isSuccess, registrationResult.message);
      });
  }

  /* since Linkando API handles registration no user is required to be created by us
  registerUserAsync(user: ConnectIngUser, password: string, callback: (registered: boolean) => void): void {
    console.log('registerUserAsync');
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
  */

  unregisterUserAsync(user: ConnectIngUser, callback: (unregistered: boolean) => void): void {
    console.log('unregisterUserAsync');
    callback(false);
    // FIXME no interface to api so this has to be done manually (e.g. via an email)
  }

  updateUserAsync(user: ConnectIngUser, callback: (user: ConnectIngUser) => void): void {
    console.log('updateUserAsync');
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
    console.log('getUsersAsync');
    const finder: Finder = {finderCode: 'allChannelsAPI'};
    this.http.post<PersonObject[]>('https://labs.linkando.co/api/Objects/FinderSearch', finder, {
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
    console.log('createChannelAsync');
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
    const channelAttributes: ChannelAttributes = {
      channelBeschreibung: description,
      channelTags: [],
      channelTyp: 'null',
      channelAddress: 'null',
      // tslint:disable-next-line:variable-name
      linked_from_245_otaga_4352_to_244: [] // API function has to match
    };
    const channelToUpload: ChannelObject = {
      modifiedBy: 0,
      inheritanceAttribute: 'null',
      name,
      parentId: 0,
      kind: 0,
      description: 'null',
      labelTags: [],
      id: 0,
      creationDate: new Date(),
      modifiedDate: new Date(),
      createdBy: user.id,
      ObjectTypeId: 244,
      active: true,
      templateId: 0,
      attributes: channelAttributes,
    };
    this.http.post<number>('https://labs.linkando.co/api/Objects/Save', channelToUpload, {
      headers: {Authorization: user.token}, responseType: 'json'
    }).subscribe(Id => {
      callback(new ConnectIngChannel(Id.toString(), name, description, '', []));
    });
  }

  updateChannelAsync(user: ConnectIngUser, channel: ConnectIngChannel, callback: (channel: ConnectIngChannel) => void): void {
    console.log('updateChannelAsync');
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
    console.log('removeChannelAsync');
    this.http.delete('https://labs.linkando.co/api/Objects/Delete?id=' + channel.id, {
      headers: {Authorization: user.token}, responseType: 'json'
    }).subscribe(() => {
      callback(true);
    });
  }

  getChannelsAsync(user: ConnectIngUser, callback: (channels: ConnectIngChannel[]) => void): void {
    console.log('getChannelsAsync');
    const finder: Finder = {finderCode: 'allChannelsAPI'};
    this.http.post<Channel[]>('https://labs.linkando.co/api/Objects/FinderSearch', finder, {
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
    console.log('createPostAsync');
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
      postBeschreibung: message,
      postTags: [],
      postType: '',
      dropdownRelatedChannel: parent.id,
    };
    const postToUpload: PostObject = {
      id: '0',
      name: title,
      parentId: parent.id,
      ObjectTypeId: '245',
      inheritanceAttribute: 'DropDownRelatedChannel',
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
  updatePostAsync(user: ConnectIngUser, post: ConnectIngPost, callback: (post: ConnectIngPost) => void): void {
    console.log('updatePostAsync');
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
    console.log('removePostAsync');
    this.http.post<ConnectIngPost[]>('https://labs.linkando.co/api/Objects/Delete?id=' + post.id, {
      headers: {Authorization: user.token}, responseType: 'json'
    });
  }

  // Method - GetPosts
  // returns the posts under an existing channel
  getPostsAsync(user: ConnectIngUser, parent: ConnectIngChannel, callback: (posts: Array<ConnectIngPost>) => void): void {
    console.log('getPostsAsync');
    console.log(user.token);
    this.http.get<ChannelChild[]>('https://labs.linkando.co/api/Objects/GetChildren?objectId=' + parent.id,
      {headers: {Authorization: user.token}, responseType: 'json'}).subscribe(children => {
        const posts: ConnectIngPost[] = [];
        children.forEach(element => {
          posts.push(new ConnectIngPost(element.id.toString(), parent.id, '', '', new Date(''), element.name, ''));
        });
        callback(posts);
      }
    );
  }

  // comment interface

  // Method - CreateComment
  // creates a new comment under a defined post
  createCommentAsync(user: ConnectIngUser, parent: ConnectIngPost, text: string, callback: (comment: ConnectIngComment) => void): void {
    console.log('createCommentAsync');
    this.http.get<number[]>('https://labs.linkando.co/api/Objects/GetConversationIds?objectId=' + parent.id,
      {headers: {Authorization: user.token}, responseType: 'json'}).subscribe(conversations => {
      const post: ConversationPostMin = {conversationId: conversations[0], text, isEditAllowed: true };
      this.http.post<ConversationPost>('https://labs.linkando.co/api/Conversations/CreateConversationPost', post,
        {headers: {Authorization: user.token}, responseType: 'json'}).subscribe(comment => {
        const commRet: ConnectIngComment = new ConnectIngComment(comment.postId.toString(), parent.id,
          comment.person.id.toString(), comment.person.name, comment.postDate, comment.text);
        callback(commRet);
      });
    });
  }

  // Method - UpdateComment
  // updates an existing comment text of an existing comment
  updateCommentAsync(user: ConnectIngUser, comment: ConnectIngComment, callback: (comment: ConnectIngComment) => void): void {
    console.log('updateCommentAsync');
    console.log(comment.id);
    console.log(comment.text);
    this.http.get<number[]>('https://labs.linkando.co/api/Objects/GetConversationIds?objectId=' + comment.postId,
      {headers: {Authorization: user.token}, responseType: 'json'}).subscribe(conversations => {
      this.http.get<Conversation>('https://labs.linkando.co/api/Conversations/GetConversation?conversationId='
        + conversations[0].toString() + '&count=100&offset=0',
        {headers: {Authorization: user.token}, responseType: 'json'}).subscribe(conversation => {
          const remote = conversation.posts.find(x => x.postId.toString() === comment.id);
          if (remote !== undefined) {
            remote.text = comment.text;
            this.http.post<ConversationPost>('https://labs.linkando.co/api/Conversations/EditConversationPost', remote,
              {headers: {Authorization: user.token}, responseType: 'json'}).subscribe(post => {
              comment.text = post.text;
              callback(comment);
            });
          }
        }
      );
    });
  }

  /**
   * Method to delete specific comment.
   * @param user Current User who performs the delete comment action
   * @param comment The comment to be deleted.
   * @param callback Gives back an boolean to verify the deletion.
   */
  // Method - RemoveComment
  // removes an existing comment
  removeCommentAsync(user: ConnectIngUser, comment: ConnectIngComment, callback: (removed: boolean) => void): void {
    console.log('removeCommentAsync');
    console.log(comment.id);
    this.http.delete<ConversationPost>('https://labs.linkando.co/api/Conversations/DeleteConversationPost?postId=' + comment.id,
      {headers: {Authorization: user.token}}).subscribe(post => {
      callback(true);
    });
  }

  /**
   * Method to get comments related to one post.
   * @param user Current User who performs the comment action
   * @param parent parent PostObject, which the Comment is created for. This represents the post you comment on.
   * @param callback gives back all the comments exsiting in the parent post.
   */
  getCommentsAsync(user: ConnectIngUser, parent: ConnectIngPost, callback: (comments: Array<ConnectIngComment>) => void): void {
    console.log('getCommentsAsync');
    console.log(user.token);
    console.log(parent.id);
    this.http.get<number[]>('https://labs.linkando.co/api/Objects/GetConversationIds?objectId=' + parent.id,
      {headers: {Authorization: user.token}, responseType: 'json'}).subscribe(conversations => {
      console.log(conversations);
      this.http.get<Conversation>('https://labs.linkando.co/api/Conversations/GetConversation?conversationId='
        + conversations[0].toString() + '&count=100&offset=0',
        {headers: {Authorization: user.token}, responseType: 'json'}).subscribe(conversation => {
          // tslint:disable-next-line: prefer-const
          let comments: ConnectIngComment[] = [];
          conversation.posts.forEach(element => {
            if (element.deletedByPersonName === null) {
              comments.push(new ConnectIngComment(element.postId.toString(), parent.id.toString(),
                element.person.id.toString(), element.person.name, element.postDate, element.text));
            }
          });
          callback(comments);
        }
      );
    });
  }
}
