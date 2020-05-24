/**
 * ConnectING Base User
 */
import {RegisterResponse} from "../linkando/linkando.service";


export class ConnectIngUser {
  readonly id: string;
  userName: string;
  firstName: string;
  lastName: string;
  location: string;
  image: string;
  jobTitle: string;
  email: string;
  token: string;

  constructor(userId: string,
              userName: string,
              firstName: string,
              lastName: string,
              location: string,
              image: string,
              jobTitle: string,
              email: string,
              token: string
  ) {
    this.id = userId;
    this.userName = userName;
    this.firstName = firstName;
    this.lastName = lastName;
    this.location = location;
    this.image = image;
    this.jobTitle = jobTitle;
    this.email = email;
    this.token = token;
  }

  public static GetDefault(): ConnectIngUser {
    return new ConnectIngUser('', '', '', '', '', '', '', '', '');
  }
}


/**
 * ConnectING Base Channel
 */
export class ConnectIngChannel {
  readonly id: string;
  name: string;
  description: string;
  picture: string;
  persons: ConnectIngUser[];

  constructor(id: string, name: string, description: string, picture: string, persons: ConnectIngUser[]) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.picture = picture;
    this.persons = persons;
  }

  public static GetDefault(): ConnectIngChannel {
    return new ConnectIngChannel('', '', '', '', []);
  }
}


/**
 * ConnectING Base Post
 */
export class ConnectIngPost {
  readonly id: string;
  readonly channelId: string;
  readonly authorId: string;
  readonly author: string;
  readonly creationTS: Date;
  readonly title: string;
  message: string;

  constructor(id: string,
              channelId: string,
              authorId: string,
              author: string,
              ts: Date,
              title: string,
              message: string) {
    this.id = id;
    this.channelId = channelId;
    this.authorId = authorId;
    this.author = author;
    this.creationTS = ts;
    this.title = title;
    this.message = message;
  }

  public static GetDefault(): ConnectIngPost {
    return new ConnectIngPost('', '', '', '', new Date(''), '', '');
  }
}


/**
 * ConnectING Base Comment
 */
export class ConnectIngComment {
  readonly id: string;
  readonly postId: string;
  readonly authorId: string;
  readonly author: string;
  readonly creationTS: Date;
  text: string;

  constructor(id: string,
              postId: string,
              authorId: string,
              author: string,
              ts: Date,
              text: string) {
    this.id = id;
    this.postId = postId;
    this.authorId = authorId;
    this.author = author;
    this.creationTS = ts;
    this.text = text;
  }

  public static GetDefault(): ConnectIngComment {
    return new ConnectIngComment('', '', '', '', new Date(''), '');
  }
}


/**
 * AbstractBaseService for ConnectING
 */
export abstract class ConnectIngBaseService {

  /**
   * Current ConnectIng User
   */
  public currentUser: ConnectIngUser;

  /**
   * Current ConnectIng User
   */
  public currentChannel: ConnectIngChannel;

  /**
   * Current ConnectIng User
   */
  public currentPost: ConnectIngPost;

  /**
   * Current ConnectIng User
   */
  public currentComment: ConnectIngComment;

  /**
   * Abstract Constructor
   */
  public constructor() {
    this.currentUser = ConnectIngUser.GetDefault();
    this.currentChannel = ConnectIngChannel.GetDefault();
    this.currentPost = ConnectIngPost.GetDefault();
    this.currentComment = ConnectIngComment.GetDefault();
  }


  /**
   *
   * @param username
   * @param password
   * @param callback
   */
  abstract connectUserAsync(username: string, password: string, callback: (user: ConnectIngUser) => void): void;

  /**
   *
   * @param user
   * @param callback
   */
  abstract disconnectUserAsync(user: ConnectIngUser, callback: (disconnected: boolean) => void): void;

  /**
   *
   * @param email
   * @param firstName
   * @param lastName
   * @param callback
   */
  abstract registerUserAsync(email: string, firstName: string, lastName: string, callback: (registered: RegisterResponse) => void): void;

  /**
   *
   * @param user
   * @param callback
   */
  abstract unregisterUserAsync(user: ConnectIngUser, callback: (unregistered: boolean) => void): void;

  /**
   *
   * @param user
   * @param callback
   */
  abstract updateUserAsync(user: ConnectIngUser, callback: (user: ConnectIngUser) => void): void;

  /**
   *
   * @param user
   * @param callback
   */
  abstract getUsersAsync(user: ConnectIngUser, callback: (users: ConnectIngUser[]) => void): void;


  /**
   *
   * @param user
   * @param name
   * @param description
   * @param callback
   */
  abstract createChannelAsync(user: ConnectIngUser, name: string, description: string, callback: (channel: ConnectIngChannel) => void): void;

  /**
   *
   * @param user
   * @param channel
   * @param callback
   */
  abstract updateChannelAsync(user: ConnectIngUser, channel: ConnectIngChannel, callback: (channel: ConnectIngChannel) => void): void;

  /**
   *
   * @param user
   * @param channel
   * @param callback
   */
  abstract removeChannelAsync(user: ConnectIngUser, channel: ConnectIngChannel, callback: (removed: boolean) => void): void;

  /**
   *
   * @param user
   * @param callback
   */
  abstract getChannelsAsync(user: ConnectIngUser, callback: (channels: ConnectIngChannel[]) => void): void;


  /**
   *
   * @param user
   * @param parent
   * @param title
   * @param message
   * @param callback
   */
  abstract createPostAsync(user: ConnectIngUser, parent: ConnectIngChannel, title: string, message: string, callback: (post: ConnectIngPost) => void): void;

  /**
   *
   * @param user
   * @param post
   * @param callback
   */
  abstract updatePostAsync(user: ConnectIngUser, post: ConnectIngPost, callback: (post: ConnectIngPost) => void): void;

  /**
   *
   * @param user
   * @param post
   * @param callback
   */
  abstract removePostAsync(user: ConnectIngUser, post: ConnectIngPost, callback: (removed: boolean) => void): void;

  /**
   *
   * @param user
   * @param parent
   * @param callback
   */
  abstract getPostsAsync(user: ConnectIngUser, parent: ConnectIngChannel, callback: (posts: Array<ConnectIngPost>) => void): void;


  /**
   *
   * @param user
   * @param parent
   * @param text
   * @param callback
   */
  abstract createCommentAsync(user: ConnectIngUser, parent: ConnectIngPost, text: string, callback: (comment: ConnectIngComment) => void): void;

  /**
   *
   * @param user
   * @param comment
   * @param callback
   */
  abstract updateCommentAsync(user: ConnectIngUser, comment: ConnectIngComment, callback: (comment: ConnectIngComment) => void): void;

  /**
   *
   * @param user
   * @param comment
   * @param callback
   */
  abstract removeCommentAsync(user: ConnectIngUser, comment: ConnectIngComment, callback: (removed: boolean) => void): void;

  /**
   *
   * @param user
   * @param parent
   * @param callback
   */
  abstract getCommentsAsync(user: ConnectIngUser, parent: ConnectIngPost, callback: (comments: Array<ConnectIngComment>) => void): void;


}


export class ConnectIngMockService implements ConnectIngBaseService {

  /**
   * Current ConnectIng User
   */
  public currentUser: ConnectIngUser;

  /**
   * Current ConnectIng User
   */
  public currentChannel: ConnectIngChannel;

  /**
   * Current ConnectIng User
   */
  public currentPost: ConnectIngPost;

  /**
   * Current ConnectIng User
   */
  public currentComment: ConnectIngComment;
  private user: ConnectIngUser = {
    id: '1',
    lastName: 'Mustermann',
    firstName: 'Max',
    location: 'Berlin',
    image: '',
    jobTitle: 'Ingenieur',
    email: 'Max.Mustermann@example.com',
    userName: 'user1',
    token: 'Basic 12345'
  };
  private channel: ConnectIngChannel = {
    id: '1',
    name: 'GoldenEye',
    description: 'Look your feets!',
    picture: 'abc',
    persons: [],
  };
  private channel2: ConnectIngChannel = {
    id: '2',
    name: 'Tomorrow never dies!',
    description: 'Look out!',
    picture: 'def',
    persons: [],
  };
  private post: ConnectIngPost = {
    id: '1',
    channelId: '1',
    authorId: '1',
    author: 'VDI',
    creationTS: new Date('24.05.2020'),
    title: 'Test',
    message: 'Dies ist ein Test.',
  };
  private comment: ConnectIngComment = {
    id: '1',
    postId: '1',
    authorId: '1',
    author: 'VDI',
    creationTS: new Date('24.05.2020'),
    text: 'Backend Team'
  };

  /**
   * Abstract Constructor
   */
  public constructor() {
    this.currentUser = ConnectIngUser.GetDefault();
    this.currentChannel = ConnectIngChannel.GetDefault();
    this.currentPost = ConnectIngPost.GetDefault();
    this.currentComment = ConnectIngComment.GetDefault();
  }

  connectUserAsync(username: string, password: string, callback: (user: ConnectIngUser) => void): void {
    callback(this.user);
  }

  disconnectUserAsync(user: ConnectIngUser, callback: (disconnected: boolean) => void): void {
    callback(true);
  }

  registerUserAsync(user: ConnectIngUser, password: string, callback: (registered: boolean) => void): void {
    callback(true);
  }

  unregisterUserAsync(user: ConnectIngUser, callback: (unregistered: boolean) => void): void {
    callback(true);
  }

  updateUserAsync(user: ConnectIngUser, callback: (user: ConnectIngUser) => void): void {
    this.user = user;
    callback(this.user);
  }

  getUsersAsync(user: ConnectIngUser, callback: (users: ConnectIngUser[]) => void): void {
    callback([
      this.user,
      {
        id: '2',
        lastName: 'Musterfrau',
        firstName: 'Melanie',
        location: 'Busenbach',
        image: '',
        jobTitle: 'Ingenieurin',
        email: 'melanie.musterfrau@example.com',
        userName: 'user2',
        token: ''  // todo: der darf nicht zurückkommen
      },
      {
        id: '3',
        lastName: 'Mustermensch',
        firstName: 'Max-Sophie',
        location: 'Köln',
        image: '',
        jobTitle: 'Ingenieurende',
        email: 'max-sophie.mustermensch@example.com',
        userName: 'user3',
        token: '' // todo: der darf nicht zurückkommen
      }
    ]);
  }


  createChannelAsync(user: ConnectIngUser, name: string, description: string, callback: (channel: ConnectIngChannel) => void): void {
    callback(this.channel);
  }

  updateChannelAsync(user: ConnectIngUser, channel: ConnectIngChannel, callback: (channel: ConnectIngChannel) => void): void {
    callback(this.channel);
  }

  removeChannelAsync(user: ConnectIngUser, channelId: ConnectIngChannel, callback: (removed: boolean) => void): void {
    callback(true);
  }

  getChannelsAsync(user: ConnectIngUser, callback: (channels: ConnectIngChannel[]) => void) {
    callback([this.channel, this.channel2]);
  }


  createPostAsync(user: ConnectIngUser, parent: ConnectIngChannel, title: string, message: string, callback: (post: ConnectIngPost) => void): void {
    callback(this.post);
  }

  getPostsAsync(user: ConnectIngUser, parent: ConnectIngChannel, callback: (posts: Array<ConnectIngPost>) => void): void {
    callback([this.post]);
  }

  removePostAsync(user: ConnectIngUser, post: ConnectIngPost, callback: (removed: boolean) => void): void {
    callback(false);
  }

  updatePostAsync(user: ConnectIngUser, post: ConnectIngPost, callback: (post: ConnectIngPost) => void): void {
    callback(this.post);
  }


  createCommentAsync(user: ConnectIngUser, parent: ConnectIngPost, text: string, callback: (comment: ConnectIngComment) => void): void {
    callback(this.comment);
  }

  getCommentsAsync(user: ConnectIngUser, parent: ConnectIngPost, callback: (comments: Array<ConnectIngComment>) => void): void {
    callback([this.comment]);
  }

  removeCommentAsync(user: ConnectIngUser, comment: ConnectIngComment, callback: (removed: boolean) => void): void {
    callback(false);
  }

  updateCommentAsync(user: ConnectIngUser, comment: ConnectIngComment, callback: (comment: ConnectIngComment) => void): void {
    callback(this.comment);
  }


}
