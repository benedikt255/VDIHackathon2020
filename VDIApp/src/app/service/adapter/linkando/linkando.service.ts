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

class ChannelMember {
    username!: string;
    href!: string;
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
  createdBy!: number;
  creationDate!: Date;
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
/**
 * Class for interacting with the Linkando swagger API: https://labs.linkando.co/swagger/ui/index
 */
export class LinkandoService extends ConnectIngBaseService {

  // post interface
  offlineMode = false;

  constructor(private authSvc: AuthService, private http: HttpClient) {
    super();
  }

  /**
   * Method to connect user to service.
   * @param username Username to register
   * @param password Password for provided user
   * @param callback gives back the now connected user.
   */
  connectUserAsync(username: string, password: string, callback: (user: ConnectIngUser) => void): void {
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

  /**
   * Method to disconnect from the application, by deleting the authentification.
   * @param user User to be disconnected.
   * @param callback Gives back the if the disconnect was successful
   */
  disconnectUserAsync(user: ConnectIngUser, callback: (disconnected: boolean) => void): void {
    this.authSvc.deleteAuth();
    callback(true);
  }

  /**
   * Method to create a new User.
   * @param email Email of the new User.
   * @param firstName First name of the User.
   * @param lastName Last name of the User.
   * @param callback Gives back if the process was successful and an error message if it was unsuccessfull.
   */
  registerUserAsync(email: string, firstName: string, lastName: string,
                    callback: (isSuccess: boolean, errorMessage: string) => void): void {
    const userRoleID = 243; // for VDIUser
    const userRoleIDBusinessHub = 238; // FIXME workaround due to API handling
    const additionalRegistrationInformation =
      {
        FirstName: firstName,
        LastName: lastName
      };
    this.http.post<RegisterResponse>('https://labs.linkando.co/api/People/Register?email=' + email
      + '&personType=' + userRoleIDBusinessHub, additionalRegistrationInformation, {responseType: 'json'})
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

  /**
   * Not supported!
   */
  unregisterUserAsync(user: ConnectIngUser, callback: (unregistered: boolean) => void): void {
    callback(false);
    // FIXME no interface to api so this has to be done manually (e.g. via an email)
  }

  /**
   * Method to change informations of an User
   * @param user New User Object, which contains the changes.
   * @param callback Gives back the new represantation of the user.
   */
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

  /**
   * Method to obtain all Users.
   * @param user Current User, who requested all the Users
   * @param callback Returns all the Users in exsistence.
   */
  getUsersAsync(user: ConnectIngUser, callback: (users: ConnectIngUser[]) => void): void {
    const finder: Finder = {finderCode: 'VdiUsersFinderApi'};
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

  /**
   * Creates new post under a defined channel.
   * @param user Current user who performs the delete comment action.
   * @param parent Channel which the post is related to.
   * @param title Title of the comment.
   * @param message Message which should be contained in the post.
   * @param callback Gives back the post which you just created.
   */
  createChannelAsync(user: ConnectIngUser, name: string, description: string, callback: (channel: ConnectIngChannel) => void): void {
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

  /**
   * Mehod to change informations of an existing channel
   * @param user Current user who performs the update
   * @param channel Channel object, which already contains the changed information.
   * @param callback Gives back the updated representation of the channel.
   */
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
        this.http.post<ChannelObject>('https://labs.linkando.co/api/Objects/Save', channelToUpdate, {
          headers: {Authorization: user.token}, responseType: 'json'
        }).subscribe(res => { callback(channel); });
      });
  }

  /**
   * Mehtod to delete specific Channel
   * @param user Current user who performs the deletion
   * @param channel Channel to be deleted.
   * @param callback Gives back if the channel was deleted.
   */
  removeChannelAsync(user: ConnectIngUser, channel: ConnectIngChannel, callback: (removed: boolean) => void): void {
    this.http.delete('https://labs.linkando.co/api/Objects/Delete?id=' + channel.id, {
      headers: {Authorization: user.token}, responseType: 'json'
    }).subscribe(() => {
      callback(true);
    });
  }

  /**
   * Method to obtain all the channels.
   * @param user Current user who requested the channels.
   * @param callback Gives back all channels
   */
  getChannelsAsync(user: ConnectIngUser, callback: (channels: ConnectIngChannel[]) => void): void {
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

  /**
   * Creates new post under a defined channel.
   * @param user Current user who performs the delete comment action.
   * @param parent Channel which the post is related to.
   * @param title Title of the comment.
   * @param message Message which should be contained in the post.
   * @param callback Gives back the post which you just created.
   */
  createPostAsync(user: ConnectIngUser, parent: ConnectIngChannel, title: string, message: string,
                  callback: (post: ConnectIngPost) => void): void {
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
      createdBy: 0,
      creationDate: new Date()
    };
    console.log(postToUpload);
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

  /**
   * Method to update exsiting post.
   * @param user Current user who performs the delete comment action.
   * @param post Changed post, which should contain the altered information.
   * @param callback Gives back the new representation of the psot.
   */
  updatePostAsync(user: ConnectIngUser, post: ConnectIngPost, callback: (post: ConnectIngPost) => void): void {
    let postToUpdate: PostObject;
    this.http.get<PostObject>('https://labs.linkando.co/api/Objects/Get?id=' + post.id, {
      headers: {Authorization: user.token}, responseType: 'json'
    })
      .subscribe(currentPost => {
        postToUpdate = currentPost;
        postToUpdate.name = post.title;
        postToUpdate.parentId = post.channelId;
        postToUpdate.attributes.postBeschreibung = post.message;
        console.log(postToUpdate);
        this.http.post<number>('https://labs.linkando.co/api/Objects/Save', postToUpdate, {
          headers: {Authorization: user.token}, responseType: 'json'
        })
          .subscribe(() => {
            callback(post);
          });
      });
  }

  /**
   * Method to remove a post from exsistence.
   * @param user Current user who performs the remove post action.
   * @param post Post which you want obliterated.
   * @param callback Gives back a boolean if the deletion was completed
   */
  removePostAsync(user: ConnectIngUser, post: ConnectIngPost, callback: (removed: boolean) => void): void {
    this.http.post<ConnectIngPost[]>('https://labs.linkando.co/api/Objects/Delete?id=' + post.id, {
      headers: {Authorization: user.token}, responseType: 'json'
    }).subscribe(() => callback(true) );
  }

  /**
   * Method to get all posts related to specific channel
   * @param user Current user who requested the post.
   * @param parent Channel of which you want to get all the channels.
   * @param callback Gives back all the posts which inherit from this channel.
   */
  getPostsAsync(user: ConnectIngUser, parent: ConnectIngChannel, callback: (posts: Array<ConnectIngPost>) => void): void {
    this.http.get<ChannelMember[]>('https://labs.linkando.co/api/Objects/GetMembers?objectId=' + parent.id,
    {headers: {Authorization: user.token}, responseType: 'json'}).subscribe(members => {
      if (members !== undefined) {
        this.http.get<ChannelChild[]>('https://labs.linkando.co/api/Objects/GetChildren?objectId=' + parent.id,
        {headers: {Authorization: user.token}, responseType: 'json'}).subscribe(children => {
          const posts: ConnectIngPost[] = [];
          children.sort((a, b) => a.id - b.id).reverse();
          children.forEach(element => {
            this.http.get<PostObject>('https://labs.linkando.co/api/Objects/Get?id=' + element.id,
              {headers: {Authorization: user.token}, responseType: 'json'}).subscribe(post => {
                let creator = '';
                const member = members.find(x => x.id === post.createdBy);
                if (member !== undefined) {
                  creator = member.name;
                }
                posts.push(new ConnectIngPost(element.id.toString(), parent.id, post.createdBy.toString(),
                  creator, post.creationDate, element.name, post.attributes.postBeschreibung ));
            });
          });
          callback(posts);
        });
      }
      else {
        callback([]);
      }
    });
  }

  /**
   * Method to create comments related to a specific post.
   * @param user Current user who performs the create comment action
   * @param parent The post which the comment is related to.
   * @param text The Test which should be contained in the comment.
   * @param callback Gives back the new comment.
   */
  createCommentAsync(user: ConnectIngUser, parent: ConnectIngPost, text: string, callback: (comment: ConnectIngComment) => void): void {
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

  /**
   * Method to update an exsiting comment.
   * @param user Current user who performs the update comment action.
   * @param comment The changed comment, which contains the altered informations.
   * @param callback Gives back the new comment after it has been changed.
   */
  updateCommentAsync(user: ConnectIngUser, comment: ConnectIngComment, callback: (comment: ConnectIngComment) => void): void {
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
   * @param user Current User who performs the delete comment action.
   * @param comment The comment to be deleted.
   * @param callback Gives back an boolean to verify the deletion.
   */
  removeCommentAsync(user: ConnectIngUser, comment: ConnectIngComment, callback: (removed: boolean) => void): void {
    this.http.delete<ConversationPost>('https://labs.linkando.co/api/Conversations/DeleteConversationPost?postId=' + comment.id,
      {headers: {Authorization: user.token}}).subscribe(post => {
      callback(true);
    });
  }

  /**
   * Method to get comments related to one post.
   * @param user Current User who performs the comment action.
   * @param parent parent PostObject, which the Comment is created for. This represents the post you comment on.
   * @param callback gives back all the comments exsiting in the parent post.
   */
  getCommentsAsync(user: ConnectIngUser, parent: ConnectIngPost, callback: (comments: Array<ConnectIngComment>) => void): void {
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
