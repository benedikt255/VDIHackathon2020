import { IChannel } from './IChannelMgmt';
import { IUser } from './IUserMgmt';


// Interface - IPost
// It represents an elementary post under a channel
export interface IPost {
    // Post Identifier
    readonly id: string;
    // Channel Identifier
    readonly channelId: string;
    // Author Identifier
    readonly authorId: string;
    // Author Display Name
    readonly author: string;
    // Post Creation Timestamp
    readonly creationTS: Date;
    // Post Title
    readonly title: string;
    // Post Text
    message: string;
}


// Class - ConnectIngPost
// represents the elementary comment object
export class ConnectIngPost implements IPost {
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

  public static GetDefault(): IPost {
    return new ConnectIngPost('', '', '', '', new Date(''), '', '');
  }
}


// Interface - Post Management
// represents the ConnectING Facade for Posts, which shall be implemented
// by the backend infrastructure adapter (i.e. Linkando, AWS, Azure, CAS)
export interface IPostMgmt
{
    // Property - Offline Mode
    // true, if offline mode is active
    offlineMode: boolean;

    // Method - CreateComment
    // creates a new post under a defined channel
    createPostAsync(user: IUser, parent: IChannel, title: string, message: string, callback: (post: IPost) => void): void;

    // Method - UpdateComment
    // updates an existing post title or message of an existing post
    updatePostAsync(user: IUser, post: IPost, callback: (post: IPost) => void): void;

    // Method - RemoveComment
    // removes an existing post
    removePostAsync(user: IUser, post: IPost, callback: (removed: boolean) => void): void;

    // Method - GetPosts
    // returns the posts under an existing channel
    getPostsAsync(user: IUser, parent: IChannel, callback: (posts: Array<IPost>) => void): void;
}

export class MockPostMgmt implements IPostMgmt {
  private post: IPost = {
    id: '1',
    channelId: '1',
    authorId: '1',
    author: 'VDI',
    creationTS: new Date('24.05.2020'),
    title: 'Test',
    message: 'Dies ist ein Test.',
  };
  offlineMode = false;

  createPostAsync(user: IUser, parent: IChannel, title: string, message: string, callback: (post: IPost) => void): void {
    callback(this.post);
  }

  getPostsAsync(user: IUser, parent: IChannel, callback: (posts: Array<IPost>) => void): void {
    callback([this.post]);
  }

  removePostAsync(user: IUser, post: IPost, callback: (removed: boolean) => void): void {
    callback( false);
  }

  updatePostAsync(user: IUser, post: IPost, callback: (post: IPost) => void): void {
    callback(this.post);
  }
}
